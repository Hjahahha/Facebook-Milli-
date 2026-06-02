import { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { useApp } from '../store/AppContext';
import { MapPin, Maximize, BedDouble, Bath, Plus, X, Phone, Edit3, Trash2, Search, Camera } from 'lucide-react';
import { generateId } from '../utils/helpers';

const purposes = ['الكل', 'بيع', 'إيجار', 'إيجار يومي'];
const types = ['الكل', 'شقة', 'بيت', 'أرض', 'مكتب', 'محل'];

function formatPropertyPrice(price: number, purpose: string): string {
  if (purpose === 'إيجار يومي') {
    return `${price.toLocaleString()} د.ع / يوم`;
  }
  if (purpose === 'إيجار') {
    return `${price.toLocaleString()} د.ع / شهر`;
  }
  if (price >= 1000000000) return `${(price / 1000000000).toFixed(1)} مليار د.ع`;
  if (price >= 1000000) return `${(price / 1000000).toFixed(0)} مليون د.ع`;
  return `${price.toLocaleString()} د.ع`;
}

export default function RealEstatePage() {
  const { state, dispatch } = useApp();
  const [activePurpose, setActivePurpose] = useState('الكل');
  const [activeType, setActiveType] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedProp, setSelectedProp] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '', price: '', type: 'شقة', purpose: 'بيع', area: '', beds: '',
    baths: '', location: '', description: '', image: '', ownerName: '', ownerPhone: '',
    furnished: false, floor: '',
  });

  const resetForm = () => {
    setFormData({ title: '', price: '', type: 'شقة', purpose: 'بيع', area: '', beds: '', baths: '', location: '', description: '', image: '', ownerName: '', ownerPhone: '', furnished: false, floor: '' });
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
    if (!formData.title || !formData.price || !formData.ownerPhone) return;
    const listing = {
      id: editingId || generateId(),
      title: formData.title,
      price: parseInt(formData.price) || 0,
      type: formData.type,
      purpose: formData.purpose,
      area: formData.area,
      beds: parseInt(formData.beds) || 0,
      baths: parseInt(formData.baths) || 0,
      location: formData.location,
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      images: [],
      ownerName: formData.ownerName,
      ownerPhone: formData.ownerPhone,
      promoted: false,
      createdAt: editingId ? (state.propertyListings.find(p => p.id === editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
      userId: state.user?.id || 'guest',
      furnished: formData.furnished,
      floor: formData.floor ? parseInt(formData.floor) : undefined,
    };

    if (editingId) {
      dispatch({ type: 'UPDATE_PROPERTY_LISTING', payload: listing });
    } else {
      dispatch({ type: 'ADD_PROPERTY_LISTING', payload: listing });
    }
    resetForm();
  };

  const handleEdit = (propId: string) => {
    const prop = state.propertyListings.find(p => p.id === propId);
    if (!prop) return;
    setFormData({
      title: prop.title, price: prop.price.toString(), type: prop.type, purpose: prop.purpose,
      area: prop.area, beds: prop.beds.toString(), baths: prop.baths.toString(),
      location: prop.location, description: prop.description, image: prop.image,
      ownerName: prop.ownerName, ownerPhone: prop.ownerPhone, furnished: prop.furnished,
      floor: prop.floor?.toString() || '',
    });
    setEditingId(propId);
    setShowAddForm(true);
  };

  const handleDelete = (propId: string) => {
    dispatch({ type: 'REMOVE_PROPERTY_LISTING', payload: propId });
    setDeleteConfirm(null);
    setSelectedProp(null);
  };

  const filteredProps = useMemo(() => {
    let props = [...state.propertyListings];
    if (activePurpose !== 'الكل') props = props.filter(p => p.purpose === activePurpose);
    if (activeType !== 'الكل') props = props.filter(p => p.type === activeType);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      props = props.filter(p => p.title.toLowerCase().includes(term) || p.location.includes(term) || p.type.includes(term));
    }
    return props.sort((a, b) => (b.promoted ? 1 : 0) - (a.promoted ? 1 : 0));
  }, [state.propertyListings, activePurpose, activeType, searchTerm]);

  const viewProp = selectedProp ? state.propertyListings.find(p => p.id === selectedProp) : null;

  if (viewProp) {
    const isOwner = state.user?.id === viewProp.userId || state.isAdmin;
    return (
      <div className="pb-24 animate-fade-in min-h-screen" style={{ background: '#050505' }}>
        <div className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b" style={{ background: 'rgba(5,5,5,0.95)', borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex gap-2">
            {isOwner && (
              <>
                <button onClick={() => handleEdit(viewProp.id)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,230,118,0.1)' }}>
                  <Edit3 size={16} style={{ color: '#00E676' }} />
                </button>
                <button onClick={() => setDeleteConfirm(viewProp.id)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,23,68,0.1)' }}>
                  <Trash2 size={16} style={{ color: '#FF1744' }} />
                </button>
              </>
            )}
          </div>
          <button onClick={() => setSelectedProp(null)} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#111' }}>
            <X size={20} style={{ color: '#B0B0B0' }} />
          </button>
        </div>

        <img src={viewProp.image} alt={viewProp.title} className="w-full h-64 object-cover" />

        <div className="p-4 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2 justify-end">
              <span className="px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(0,230,118,0.15)', color: '#00E676' }}>{viewProp.type}</span>
              <span className="px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(255,215,0,0.15)', color: '#FFD700' }}>{viewProp.purpose}</span>
            </div>
            <h1 className="text-lg font-black text-right" style={{ color: '#F5F5F5' }}>{viewProp.title}</h1>
          </div>
          <p className="text-xl font-black" style={{ color: '#00E676' }}>{formatPropertyPrice(viewProp.price, viewProp.purpose)}</p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Maximize, label: 'المساحة', value: `${viewProp.area} م²` },
              { icon: MapPin, label: 'الموقع', value: viewProp.location },
              ...(viewProp.beds > 0 ? [{ icon: BedDouble, label: 'غرف النوم', value: `${viewProp.beds}` }] : []),
              ...(viewProp.baths > 0 ? [{ icon: Bath, label: 'الحمامات', value: `${viewProp.baths}` }] : []),
            ].map(item => (
              <div key={item.label} className="p-3 rounded-xl text-right" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2 justify-end mb-1">
                  <span className="text-[10px]" style={{ color: '#707070' }}>{item.label}</span>
                  <item.icon size={12} style={{ color: '#00E676' }} />
                </div>
                <span className="text-xs font-bold" style={{ color: '#F5F5F5' }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {viewProp.furnished && (
              <span className="px-3 py-1.5 rounded-lg text-[11px] font-bold" style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF' }}>مفروش</span>
            )}
            {viewProp.floor !== undefined && viewProp.floor > 0 && (
              <span className="px-3 py-1.5 rounded-lg text-[11px] font-bold" style={{ background: 'rgba(255,215,0,0.1)', color: '#FFD700' }}>الطابق {viewProp.floor}</span>
            )}
          </div>

          {viewProp.description && (
            <div className="p-3 rounded-xl" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-sm font-bold mb-2 text-right" style={{ color: '#F5F5F5' }}>الوصف</h3>
              <p className="text-xs leading-relaxed text-right" style={{ color: '#B0B0B0' }}>{viewProp.description}</p>
            </div>
          )}

          <div className="p-4 rounded-xl" style={{ background: '#111', border: '1px solid rgba(0,230,118,0.15)' }}>
            <div className="flex items-center justify-between">
              <a href={`tel:${viewProp.ownerPhone}`} className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2" style={{ background: 'rgba(0,230,118,0.15)', color: '#00E676' }}>
                <Phone size={14} /> اتصل
              </a>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: '#F5F5F5' }}>{viewProp.ownerName}</p>
                <p className="text-[11px]" style={{ color: '#707070' }}>{viewProp.ownerPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {deleteConfirm === viewProp.id && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }}>
            <div className="mx-6 p-6 rounded-2xl w-full max-w-sm" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 className="text-base font-bold text-center mb-3" style={{ color: '#F5F5F5' }}>حذف الإعلان؟</h3>
              <p className="text-sm text-center mb-4" style={{ color: '#707070' }}>لا يمكن التراجع عن هذا الإجراء</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: '#222', color: '#B0B0B0' }}>إلغاء</button>
                <button onClick={() => handleDelete(viewProp.id)} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'rgba(255,23,68,0.2)', color: '#FF1744' }}>حذف</button>
              </div>
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
      <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.08), rgba(240,240,240,0.02))' }}>
        <div className="flex items-center justify-between">
          <button onClick={() => { resetForm(); setShowAddForm(true); }} className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1" style={{ background: 'rgba(0,230,118,0.15)', color: '#00E676', border: '1px solid rgba(0,230,118,0.3)' }}>
            <Plus size={14} /> أضف عقارك
          </button>
          <div className="text-right">
            <h2 className="text-lg font-black" style={{ color: '#00E676' }}>العقارات</h2>
            <p className="text-[9px] font-bold tracking-[2px]" style={{ color: '#F0F0F0' }}>REAL ESTATE</p>
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
            placeholder="ابحث عن عقار..."
            className="flex-1 bg-transparent text-sm outline-none text-right"
            style={{ color: '#F5F5F5' }}
            dir="rtl"
          />
        </div>
      </div>

      {/* Purpose Filters */}
      <div className="px-4 py-2">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {purposes.map(p => (
            <button key={p} onClick={() => setActivePurpose(p)} className="whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold btn-press"
              style={{
                background: activePurpose === p ? 'rgba(0,230,118,0.15)' : '#111',
                color: activePurpose === p ? '#00E676' : '#707070',
                border: `1px solid ${activePurpose === p ? 'rgba(0,230,118,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filters */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {types.map(t => (
            <button key={t} onClick={() => setActiveType(t)} className="whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-medium btn-press"
              style={{
                background: activeType === t ? 'rgba(0,230,118,0.1)' : '#111',
                color: activeType === t ? '#00E676' : '#B0B0B0',
                border: `1px solid ${activeType === t ? 'rgba(0,230,118,0.2)' : 'rgba(255,255,255,0.06)'}`,
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 pb-2">
        <p className="text-[11px] text-right" style={{ color: '#707070' }}>{filteredProps.length} نتيجة</p>
      </div>

      {/* Property Listings */}
      <div className="px-4 space-y-3">
        {filteredProps.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm font-bold mb-1" style={{ color: '#B0B0B0' }}>لا توجد نتائج</p>
            <p className="text-xs" style={{ color: '#707070' }}>جرب تغيير عوامل التصفية</p>
          </div>
        ) : filteredProps.map(prop => (
          <div key={prop.id} onClick={() => setSelectedProp(prop.id)} className="rounded-2xl overflow-hidden cursor-pointer" style={{ background: '#111', border: `1px solid ${prop.promoted ? 'rgba(0,230,118,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
            <div className="relative">
              <img src={prop.image} alt={prop.title} className="w-full h-48 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {prop.promoted && (
                <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(0,230,118,0.15)', border: '1px solid rgba(0,230,118,0.3)', color: '#00E676' }}>
                  الأفضل قيمة
                </div>
              )}
              <div className="absolute top-2.5 right-2.5 flex gap-1.5">
                <span className="px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(0,230,118,0.2)', color: '#00E676' }}>{prop.type}</span>
                <span className="px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(255,215,0,0.2)', color: '#FFD700' }}>{prop.purpose}</span>
              </div>
              <div className="absolute bottom-2.5 right-2.5">
                <span className="text-lg font-black" style={{ color: '#F5F5F5' }}>{formatPropertyPrice(prop.price, prop.purpose)}</span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold mb-2 text-right" style={{ color: '#F5F5F5' }}>{prop.title}</h3>
              <div className="flex items-center gap-3 flex-wrap justify-end">
                <div className="flex items-center gap-1">
                  <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{prop.location}</span>
                  <MapPin size={12} style={{ color: '#707070' }} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{prop.area} م²</span>
                  <Maximize size={12} style={{ color: '#707070' }} />
                </div>
                {prop.beds > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{prop.beds}</span>
                    <BedDouble size={12} style={{ color: '#707070' }} />
                  </div>
                )}
                {prop.baths > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{prop.baths}</span>
                    <Bath size={12} style={{ color: '#707070' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.85)' }}>
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-lg mx-auto rounded-2xl p-5 space-y-4" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between">
                <button onClick={resetForm} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#222' }}>
                  <X size={18} style={{ color: '#B0B0B0' }} />
                </button>
                <h2 className="text-base font-bold" style={{ color: '#00E676' }}>{editingId ? 'تعديل الإعلان' : 'أضف عقارك'}</h2>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>صورة العقار</label>
                {formData.image ? (
                  <div className="relative">
                    <img src={formData.image} alt="preview" className="w-full h-40 object-cover rounded-xl" />
                    <button onClick={() => setFormData(p => ({ ...p, image: '' }))} className="absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
                      <X size={14} style={{ color: '#fff' }} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-32 rounded-xl cursor-pointer" style={{ background: '#111', border: '2px dashed rgba(0,230,118,0.3)' }}>
                    <Camera size={28} style={{ color: '#00E676' }} />
                    <span className="text-xs mt-2" style={{ color: '#707070' }}>اضغط لرفع صورة</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>

              <InputField label="عنوان الإعلان *" value={formData.title} onChange={v => setFormData(p => ({ ...p, title: v }))} placeholder="مثال: شقة فاخرة في المنصور" />
              <InputField label="السعر بالدينار العراقي *" value={formData.price} onChange={v => setFormData(p => ({ ...p, price: v }))} placeholder="250000000" type="number" />

              <div className="grid grid-cols-2 gap-3">
                <SelectField label="نوع العقار" value={formData.type} options={['شقة', 'بيت', 'أرض', 'مكتب', 'محل']} onChange={v => setFormData(p => ({ ...p, type: v }))} />
                <SelectField label="الغرض" value={formData.purpose} options={['بيع', 'إيجار', 'إيجار يومي']} onChange={v => setFormData(p => ({ ...p, purpose: v }))} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <InputField label="المساحة م²" value={formData.area} onChange={v => setFormData(p => ({ ...p, area: v }))} placeholder="180" />
                <InputField label="غرف النوم" value={formData.beds} onChange={v => setFormData(p => ({ ...p, beds: v }))} placeholder="3" type="number" />
                <InputField label="الحمامات" value={formData.baths} onChange={v => setFormData(p => ({ ...p, baths: v }))} placeholder="2" type="number" />
              </div>

              <InputField label="الموقع" value={formData.location} onChange={v => setFormData(p => ({ ...p, location: v }))} placeholder="بغداد - المنصور" />

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 justify-end">
                  <label className="text-xs font-medium" style={{ color: '#B0B0B0' }}>مفروش</label>
                  <button
                    onClick={() => setFormData(p => ({ ...p, furnished: !p.furnished }))}
                    className="w-10 h-5 rounded-full relative transition-colors"
                    style={{ background: formData.furnished ? '#00E676' : '#333' }}
                  >
                    <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: formData.furnished ? '22px' : '2px' }} />
                  </button>
                </div>
                <InputField label="الطابق" value={formData.floor} onChange={v => setFormData(p => ({ ...p, floor: v }))} placeholder="5" type="number" />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>الوصف</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="وصف تفصيلي للعقار..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm text-right outline-none resize-none"
                  style={{ background: '#111', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.08)' }}
                  dir="rtl"
                />
              </div>

              <InputField label="اسم المالك / المكتب" value={formData.ownerName} onChange={v => setFormData(p => ({ ...p, ownerName: v }))} placeholder="اسمك أو اسم المكتب العقاري" />
              <InputField label="رقم الهاتف *" value={formData.ownerPhone} onChange={v => setFormData(p => ({ ...p, ownerPhone: v }))} placeholder="07XXXXXXXXX" type="tel" />

              <button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.price || !formData.ownerPhone}
                className="w-full py-3.5 rounded-xl font-bold text-sm"
                style={{
                  background: formData.title && formData.price && formData.ownerPhone ? '#00E676' : '#333',
                  color: formData.title && formData.price && formData.ownerPhone ? '#050505' : '#666',
                }}
              >
                {editingId ? 'حفظ التعديلات' : 'نشر الإعلان'}
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
