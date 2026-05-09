import { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { useApp } from '../store/AppContext';
import { Star, Clock, BadgeCheck, Wrench, Plus, X, Phone, Edit3, Trash2, Search, Camera, MapPin, Send } from 'lucide-react';
import { generateId } from '../utils/helpers';

const serviceCategories = [
  { icon: '🔧', label: 'سباكة' },
  { icon: '⚡', label: 'كهرباء' },
  { icon: '🪚', label: 'نجارة' },
  { icon: '🎨', label: 'دهان' },
  { icon: '❄️', label: 'تكييف' },
  { icon: '🔩', label: 'ميكانيك' },
  { icon: '🧹', label: 'تنظيف' },
  { icon: '📦', label: 'نقل' },
  { icon: '⚙️', label: 'لحام' },
  { icon: '🏗️', label: 'بلاط' },
  { icon: '💻', label: 'IT' },
  { icon: '🚚', label: 'توصيل' },
];

const specialtyOptions = ['سباكة', 'كهرباء', 'نجارة', 'دهان', 'تكييف', 'ميكانيك', 'تنظيف', 'نقل', 'لحام', 'بلاط', 'IT', 'توصيل', 'أخرى'];

export default function ServicesPage() {
  const { state, dispatch } = useApp();
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', specialty: 'سباكة', phone: '', location: '',
    description: '', image: '', price: '', autoReply: false,
  });

  const [requestData, setRequestData] = useState({
    description: '', location: '', customerName: '', customerPhone: '',
  });

  const resetForm = () => {
    setFormData({ name: '', specialty: 'سباكة', phone: '', location: '', description: '', image: '', price: '', autoReply: false });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone) return;
    const existing = editingId ? state.serviceProviders.find(s => s.id === editingId) : null;
    const provider = {
      id: editingId || generateId(),
      name: formData.name,
      specialty: formData.specialty,
      rating: existing?.rating ?? 5.0,
      jobs: existing?.jobs ?? 0,
      responseTime: existing?.responseTime || '10 دقائق',
      verified: existing?.verified ?? false,
      phone: formData.phone,
      location: formData.location,
      description: formData.description,
      image: formData.image,
      autoReply: formData.autoReply,
      price: formData.price,
      createdAt: existing?.createdAt || new Date().toISOString(),
      userId: state.user?.id || 'guest',
    };

    if (editingId) {
      dispatch({ type: 'UPDATE_SERVICE_PROVIDER', payload: provider });
    } else {
      dispatch({ type: 'ADD_SERVICE_PROVIDER', payload: provider });
    }
    resetForm();
  };

  const handleEdit = (providerId: string) => {
    const provider = state.serviceProviders.find(s => s.id === providerId);
    if (!provider) return;
    setFormData({
      name: provider.name, specialty: provider.specialty, phone: provider.phone,
      location: provider.location, description: provider.description, image: provider.image,
      price: provider.price, autoReply: provider.autoReply,
    });
    setEditingId(providerId);
    setShowAddForm(true);
    setSelectedProvider(null);
  };

  const handleDelete = (providerId: string) => {
    dispatch({ type: 'REMOVE_SERVICE_PROVIDER', payload: providerId });
    setDeleteConfirm(null);
    setSelectedProvider(null);
  };

  const handleRequestSubmit = (providerId: string) => {
    if (!requestData.description || !requestData.customerPhone) return;
    const provider = state.serviceProviders.find(s => s.id === providerId);
    if (!provider) return;

    dispatch({
      type: 'ADD_SERVICE_REQUEST',
      payload: {
        id: generateId(),
        providerId,
        providerName: provider.name,
        customerName: requestData.customerName || state.user?.name || 'زائر',
        customerPhone: requestData.customerPhone,
        description: requestData.description,
        location: requestData.location,
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId: state.user?.id || 'guest',
      },
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: generateId(),
        title: 'طلب خدمة جديد',
        message: `تم إرسال طلبك إلى ${provider.name}`,
        type: 'system',
        read: false,
        createdAt: new Date().toISOString(),
      },
    });

    setRequestData({ description: '', location: '', customerName: '', customerPhone: '' });
    setShowRequestForm(null);
  };

  const filteredProviders = useMemo(() => {
    let providers = [...state.serviceProviders];
    if (activeCategory !== 'الكل') providers = providers.filter(p => p.specialty === activeCategory);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      providers = providers.filter(p => p.name.toLowerCase().includes(term) || p.specialty.includes(term) || p.location.includes(term));
    }
    return providers.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
  }, [state.serviceProviders, activeCategory, searchTerm]);

  const viewProvider = selectedProvider ? state.serviceProviders.find(s => s.id === selectedProvider) : null;

  if (viewProvider) {
    const isOwner = state.user?.id === viewProvider.userId || state.isAdmin;
    const providerRequests = state.serviceRequests.filter(r => r.providerId === viewProvider.id);

    return (
      <div className="pb-24 animate-fade-in min-h-screen" style={{ background: '#050505' }}>
        <div className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b" style={{ background: 'rgba(5,5,5,0.95)', borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex gap-2">
            {isOwner && (
              <>
                <button onClick={() => handleEdit(viewProvider.id)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,109,0,0.1)' }}>
                  <Edit3 size={16} style={{ color: '#FF6D00' }} />
                </button>
                <button onClick={() => setDeleteConfirm(viewProvider.id)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,23,68,0.1)' }}>
                  <Trash2 size={16} style={{ color: '#FF1744' }} />
                </button>
              </>
            )}
          </div>
          <button onClick={() => setSelectedProvider(null)} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#111' }}>
            <X size={20} style={{ color: '#B0B0B0' }} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Provider Header */}
          <div className="flex items-center gap-4 justify-end">
            <div className="text-right flex-1">
              <div className="flex items-center gap-2 justify-end mb-1">
                <h1 className="text-lg font-black" style={{ color: '#F5F5F5' }}>{viewProvider.name}</h1>
                {viewProvider.verified && <BadgeCheck size={18} style={{ color: '#1DA1F2' }} />}
              </div>
              <p className="text-sm font-bold" style={{ color: '#FF6D00' }}>{viewProvider.specialty}</p>
              {viewProvider.price && <p className="text-xs mt-1" style={{ color: '#B0B0B0' }}>{viewProvider.price}</p>}
            </div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,109,0,0.15)' }}>
              {viewProvider.image ? (
                <img src={viewProvider.image} alt={viewProvider.name} className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <Wrench size={28} style={{ color: '#FF6D00' }} />
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl text-center" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-1 justify-center mb-1">
                <span className="text-sm font-bold" style={{ color: '#FFD700' }}>{viewProvider.rating}</span>
                <Star size={14} className="fill-yellow-400" style={{ color: '#FFD700' }} />
              </div>
              <span className="text-[10px]" style={{ color: '#707070' }}>التقييم</span>
            </div>
            <div className="p-3 rounded-xl text-center" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-sm font-bold block mb-1" style={{ color: '#F5F5F5' }}>{viewProvider.jobs}</span>
              <span className="text-[10px]" style={{ color: '#707070' }}>عمل منجز</span>
            </div>
            <div className="p-3 rounded-xl text-center" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-sm font-bold block mb-1" style={{ color: '#00E676' }}>{viewProvider.responseTime}</span>
              <span className="text-[10px]" style={{ color: '#707070' }}>وقت الرد</span>
            </div>
          </div>

          {viewProvider.location && (
            <div className="flex items-center gap-2 justify-end p-3 rounded-xl" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-xs" style={{ color: '#B0B0B0' }}>{viewProvider.location}</span>
              <MapPin size={14} style={{ color: '#FF6D00' }} />
            </div>
          )}

          {viewProvider.description && (
            <div className="p-3 rounded-xl" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-sm font-bold mb-2 text-right" style={{ color: '#F5F5F5' }}>نبذة</h3>
              <p className="text-xs leading-relaxed text-right" style={{ color: '#B0B0B0' }}>{viewProvider.description}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => setShowRequestForm(viewProvider.id)} className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2" style={{ background: 'rgba(255,109,0,0.15)', color: '#FF6D00', border: '1px solid rgba(255,109,0,0.3)' }}>
              <Send size={16} /> اطلب الخدمة
            </button>
            <a href={`tel:${viewProvider.phone}`} className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2" style={{ background: '#FF6D00', color: '#fff' }}>
              <Phone size={16} /> اتصل الآن
            </a>
          </div>

          {/* Service Requests for this provider (if owner) */}
          {isOwner && providerRequests.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-right" style={{ color: '#F5F5F5' }}>طلبات الخدمة ({providerRequests.length})</h3>
              {providerRequests.map(req => (
                <div key={req.id} className="p-3 rounded-xl" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-lg font-bold" style={{
                      background: req.status === 'pending' ? 'rgba(255,215,0,0.15)' : req.status === 'accepted' ? 'rgba(0,212,255,0.15)' : req.status === 'completed' ? 'rgba(0,230,118,0.15)' : 'rgba(255,23,68,0.15)',
                      color: req.status === 'pending' ? '#FFD700' : req.status === 'accepted' ? '#00D4FF' : req.status === 'completed' ? '#00E676' : '#FF1744',
                    }}>
                      {req.status === 'pending' ? 'بانتظار' : req.status === 'accepted' ? 'مقبول' : req.status === 'completed' ? 'مكتمل' : 'ملغي'}
                    </span>
                    <span className="text-xs font-bold" style={{ color: '#F5F5F5' }}>{req.customerName}</span>
                  </div>
                  <p className="text-xs text-right mb-1" style={{ color: '#B0B0B0' }}>{req.description}</p>
                  <p className="text-[11px] text-right" style={{ color: '#707070' }}>{req.customerPhone}</p>
                  {req.status === 'pending' && (
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => dispatch({ type: 'UPDATE_SERVICE_REQUEST', payload: { id: req.id, status: 'accepted' } })} className="flex-1 py-1.5 rounded-lg text-[11px] font-bold" style={{ background: 'rgba(0,230,118,0.15)', color: '#00E676' }}>قبول</button>
                      <button onClick={() => dispatch({ type: 'UPDATE_SERVICE_REQUEST', payload: { id: req.id, status: 'cancelled' } })} className="flex-1 py-1.5 rounded-lg text-[11px] font-bold" style={{ background: 'rgba(255,23,68,0.15)', color: '#FF1744' }}>رفض</button>
                    </div>
                  )}
                  {req.status === 'accepted' && (
                    <button onClick={() => dispatch({ type: 'UPDATE_SERVICE_REQUEST', payload: { id: req.id, status: 'completed' } })} className="w-full py-1.5 rounded-lg text-[11px] font-bold mt-2" style={{ background: 'rgba(0,230,118,0.15)', color: '#00E676' }}>تم الإنجاز</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirm */}
        {deleteConfirm === viewProvider.id && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }}>
            <div className="mx-6 p-6 rounded-2xl w-full max-w-sm" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 className="text-base font-bold text-center mb-3" style={{ color: '#F5F5F5' }}>حذف مقدم الخدمة؟</h3>
              <p className="text-sm text-center mb-4" style={{ color: '#707070' }}>لا يمكن التراجع عن هذا الإجراء</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: '#222', color: '#B0B0B0' }}>إلغاء</button>
                <button onClick={() => handleDelete(viewProvider.id)} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'rgba(255,23,68,0.2)', color: '#FF1744' }}>حذف</button>
              </div>
            </div>
          </div>
        )}

        {/* Service Request Form */}
        {showRequestForm === viewProvider.id && (
          <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.85)' }}>
            <div className="w-full max-w-lg rounded-t-2xl p-5 space-y-4" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between">
                <button onClick={() => setShowRequestForm(null)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#222' }}>
                  <X size={18} style={{ color: '#B0B0B0' }} />
                </button>
                <h2 className="text-base font-bold" style={{ color: '#FF6D00' }}>طلب خدمة من {viewProvider.name}</h2>
              </div>
              <InputField label="اسمك" value={requestData.customerName} onChange={v => setRequestData(p => ({ ...p, customerName: v }))} placeholder="أدخل اسمك" />
              <InputField label="رقم هاتفك *" value={requestData.customerPhone} onChange={v => setRequestData(p => ({ ...p, customerPhone: v }))} placeholder="07XXXXXXXXX" type="tel" />
              <InputField label="الموقع" value={requestData.location} onChange={v => setRequestData(p => ({ ...p, location: v }))} placeholder="بغداد - المنصور" />
              <div>
                <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>وصف المشكلة / الخدمة المطلوبة *</label>
                <textarea
                  value={requestData.description}
                  onChange={e => setRequestData(p => ({ ...p, description: e.target.value }))}
                  placeholder="اشرح المشكلة أو الخدمة التي تحتاجها..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm text-right outline-none resize-none"
                  style={{ background: '#111', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.08)' }}
                  dir="rtl"
                />
              </div>
              <button
                onClick={() => handleRequestSubmit(viewProvider.id)}
                disabled={!requestData.description || !requestData.customerPhone}
                className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                style={{
                  background: requestData.description && requestData.customerPhone ? '#FF6D00' : '#333',
                  color: requestData.description && requestData.customerPhone ? '#fff' : '#666',
                }}
              >
                <Send size={16} /> إرسال الطلب
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pb-24 animate-fade-in" style={{ background: '#050505' }}>
      <TopBar />

      {/* Module Header */}
      <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, rgba(255,109,0,0.08), rgba(120,144,156,0.04))' }}>
        <div className="flex items-center justify-between">
          <button onClick={() => { resetForm(); setShowAddForm(true); }} className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1" style={{ background: 'rgba(255,109,0,0.15)', color: '#FF6D00', border: '1px solid rgba(255,109,0,0.3)' }}>
            <Plus size={14} /> سجّل كمهني
          </button>
          <div className="text-right">
            <h2 className="text-lg font-black" style={{ color: '#FF6D00' }}>الخدمات</h2>
            <p className="text-[9px] font-bold tracking-[2px]" style={{ color: '#78909C' }}>SERVICES</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Search size={16} style={{ color: '#707070' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="ابحث عن مهني أو خدمة..."
            className="flex-1 bg-transparent text-sm outline-none text-right"
            style={{ color: '#F5F5F5' }}
            dir="rtl"
          />
        </div>
      </div>

      {/* Service Categories Grid */}
      <div className="px-4 py-2">
        <h3 className="text-sm font-bold mb-3 text-right" style={{ color: '#F5F5F5' }}>التخصصات</h3>
        <div className="grid grid-cols-4 gap-2">
          {serviceCategories.map(cat => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(activeCategory === cat.label ? 'الكل' : cat.label)}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl"
              style={{
                background: activeCategory === cat.label ? 'rgba(255,109,0,0.1)' : '#111',
                border: `1px solid ${activeCategory === cat.label ? 'rgba(255,109,0,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-[10px] font-bold" style={{ color: activeCategory === cat.label ? '#FF6D00' : '#B0B0B0' }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Professionals */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium" style={{ color: '#707070' }}>{filteredProviders.length} مهني</span>
          <h3 className="text-sm font-bold" style={{ color: '#F5F5F5' }}>
            {activeCategory === 'الكل' ? 'جميع المهنيين' : activeCategory}
          </h3>
        </div>

        <div className="space-y-3">
          {filteredProviders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-bold mb-1" style={{ color: '#B0B0B0' }}>لا يوجد مهنيون</p>
              <p className="text-xs" style={{ color: '#707070' }}>كن أول مهني في هذا التخصص!</p>
            </div>
          ) : filteredProviders.map(pro => (
            <div
              key={pro.id}
              onClick={() => setSelectedProvider(pro.id)}
              className="p-3 rounded-2xl cursor-pointer"
              style={{ background: '#111', border: `1px solid ${pro.verified ? 'rgba(255,109,0,0.15)' : 'rgba(255,255,255,0.06)'}` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,109,0,0.1)' }}>
                  {pro.image ? (
                    <img src={pro.image} alt={pro.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <Wrench size={20} style={{ color: '#FF6D00' }} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 justify-end">
                    {pro.autoReply && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF' }}>رد آلي</span>
                    )}
                    {pro.verified && <BadgeCheck size={14} style={{ color: '#1DA1F2' }} />}
                    <span className="text-sm font-bold" style={{ color: '#F5F5F5' }}>{pro.name}</span>
                  </div>
                  <p className="text-[11px] mb-1.5 text-right" style={{ color: '#FF6D00' }}>{pro.specialty}</p>

                  <div className="flex items-center gap-3 justify-end">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{pro.responseTime}</span>
                      <Clock size={11} style={{ color: '#707070' }} />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{pro.jobs} عمل</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-bold" style={{ color: '#FFD700' }}>{pro.rating}</span>
                      <Star size={11} className="fill-yellow-400" style={{ color: '#FFD700' }} />
                    </div>
                  </div>

                  {pro.price && (
                    <p className="text-[11px] mt-1 text-right" style={{ color: '#00E676' }}>{pro.price}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Service Requests */}
      {state.serviceRequests.length > 0 && state.isLoggedIn && (
        <div className="px-4 py-3">
          <h3 className="text-sm font-bold mb-3 text-right" style={{ color: '#F5F5F5' }}>طلباتي</h3>
          <div className="space-y-2">
            {state.serviceRequests.filter(r => r.userId === state.user?.id).map(req => (
              <div key={req.id} className="p-3 rounded-xl" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-lg font-bold" style={{
                    background: req.status === 'pending' ? 'rgba(255,215,0,0.15)' : req.status === 'accepted' ? 'rgba(0,212,255,0.15)' : req.status === 'completed' ? 'rgba(0,230,118,0.15)' : 'rgba(255,23,68,0.15)',
                    color: req.status === 'pending' ? '#FFD700' : req.status === 'accepted' ? '#00D4FF' : req.status === 'completed' ? '#00E676' : '#FF1744',
                  }}>
                    {req.status === 'pending' ? 'بانتظار' : req.status === 'accepted' ? 'مقبول' : req.status === 'completed' ? 'مكتمل' : 'ملغي'}
                  </span>
                  <span className="text-xs font-bold" style={{ color: '#FF6D00' }}>{req.providerName}</span>
                </div>
                <p className="text-xs text-right" style={{ color: '#B0B0B0' }}>{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Provider Form */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-lg mx-auto rounded-2xl p-5 space-y-4" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between">
                <button onClick={resetForm} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#222' }}>
                  <X size={18} style={{ color: '#B0B0B0' }} />
                </button>
                <h2 className="text-base font-bold" style={{ color: '#FF6D00' }}>{editingId ? 'تعديل الملف' : 'سجّل كمهني'}</h2>
              </div>

              {/* Avatar Upload */}
              <div className="flex justify-center">
                {formData.image ? (
                  <div className="relative">
                    <img src={formData.image} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
                    <button onClick={() => setFormData(p => ({ ...p, image: '' }))} className="absolute -top-1 -left-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#FF1744' }}>
                      <X size={12} style={{ color: '#fff' }} />
                    </button>
                  </div>
                ) : (
                  <label className="w-20 h-20 rounded-full flex flex-col items-center justify-center cursor-pointer" style={{ background: '#111', border: '2px dashed rgba(255,109,0,0.3)' }}>
                    <Camera size={22} style={{ color: '#FF6D00' }} />
                    <span className="text-[8px] mt-1" style={{ color: '#707070' }}>صورتك</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>

              <InputField label="اسمك أو اسم الورشة *" value={formData.name} onChange={v => setFormData(p => ({ ...p, name: v }))} placeholder="أحمد الكهربائي" />
              <SelectField label="التخصص" value={formData.specialty} options={specialtyOptions} onChange={v => setFormData(p => ({ ...p, specialty: v }))} />
              <InputField label="رقم الهاتف *" value={formData.phone} onChange={v => setFormData(p => ({ ...p, phone: v }))} placeholder="07XXXXXXXXX" type="tel" />
              <InputField label="الموقع" value={formData.location} onChange={v => setFormData(p => ({ ...p, location: v }))} placeholder="بغداد - المنصور" />
              <InputField label="الأسعار" value={formData.price} onChange={v => setFormData(p => ({ ...p, price: v }))} placeholder="يبدأ من 15,000 د.ع" />

              <div>
                <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>وصف الخدمات</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="اشرح خبرتك والخدمات التي تقدمها..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm text-right outline-none resize-none"
                  style={{ background: '#111', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.08)' }}
                  dir="rtl"
                />
              </div>

              <div className="flex items-center gap-2 justify-end">
                <label className="text-xs font-medium" style={{ color: '#B0B0B0' }}>تفعيل الرد الآلي</label>
                <button
                  onClick={() => setFormData(p => ({ ...p, autoReply: !p.autoReply }))}
                  className="w-10 h-5 rounded-full relative transition-colors"
                  style={{ background: formData.autoReply ? '#FF6D00' : '#333' }}
                >
                  <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: formData.autoReply ? '22px' : '2px' }} />
                </button>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.phone}
                className="w-full py-3.5 rounded-xl font-bold text-sm"
                style={{
                  background: formData.name && formData.phone ? '#FF6D00' : '#333',
                  color: formData.name && formData.phone ? '#fff' : '#666',
                }}
              >
                {editingId ? 'حفظ التعديلات' : 'تسجيل'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-right outline-none"
        style={{ background: '#111', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.08)' }}
        dir="rtl"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl text-sm text-right outline-none appearance-none"
        style={{ background: '#111', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.08)' }}
        dir="rtl"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
