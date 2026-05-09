import { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { useApp } from '../store/AppContext';
import { MapPin, Gauge, Fuel, Calendar, Plus, X, Phone, Edit3, Trash2, Search, Camera } from 'lucide-react';
import { generateId } from '../utils/helpers';

const conditionFilters = ['الكل', 'جديد', 'مستعمل'];
const fuelTypes = ['بنزين', 'ديزل', 'هايبرد', 'كهربائي'];
const carColors = ['أبيض', 'أسود', 'رمادي', 'فضي', 'أحمر', 'أزرق', 'أخضر', 'بني', 'ذهبي'];
function formatCarPrice(price: number): string {
  if (price >= 1000000000) return `${(price / 1000000000).toFixed(1)} مليار د.ع`;
  if (price >= 1000000) return `${(price / 1000000).toFixed(0)} مليون د.ع`;
  return `${price.toLocaleString()} د.ع`;
}

export default function CarsPage() {
  const { state, dispatch } = useApp();
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '', price: '', location: '', km: '', fuel: 'بنزين', year: '',
    condition: 'جديد', make: '', model: '', color: 'أبيض', description: '',
    image: '', sellerName: '', sellerPhone: '',
  });

  const resetForm = () => {
    setFormData({ title: '', price: '', location: '', km: '', fuel: 'بنزين', year: '', condition: 'جديد', make: '', model: '', color: 'أبيض', description: '', image: '', sellerName: '', sellerPhone: '' });
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
    if (!formData.title || !formData.price || !formData.sellerPhone) return;
    const listing = {
      id: editingId || generateId(),
      title: formData.title,
      price: parseInt(formData.price) || 0,
      location: formData.location,
      km: formData.km,
      fuel: formData.fuel,
      year: formData.year,
      condition: formData.condition,
      make: formData.make,
      model: formData.model,
      color: formData.color,
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
      images: [],
      sellerName: formData.sellerName,
      sellerPhone: formData.sellerPhone,
      promoted: false,
      createdAt: editingId ? (state.carListings.find(c => c.id === editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
      userId: state.user?.id || 'guest',
    };

    if (editingId) {
      dispatch({ type: 'UPDATE_CAR_LISTING', payload: listing });
    } else {
      dispatch({ type: 'ADD_CAR_LISTING', payload: listing });
    }
    resetForm();
  };

  const handleEdit = (carId: string) => {
    const car = state.carListings.find(c => c.id === carId);
    if (!car) return;
    setFormData({
      title: car.title, price: car.price.toString(), location: car.location, km: car.km,
      fuel: car.fuel, year: car.year, condition: car.condition, make: car.make, model: car.model,
      color: car.color, description: car.description, image: car.image, sellerName: car.sellerName, sellerPhone: car.sellerPhone,
    });
    setEditingId(carId);
    setShowAddForm(true);
  };

  const handleDelete = (carId: string) => {
    dispatch({ type: 'REMOVE_CAR_LISTING', payload: carId });
    setDeleteConfirm(null);
    setSelectedCar(null);
  };

  const filteredCars = useMemo(() => {
    let cars = [...state.carListings];
    if (activeFilter !== 'الكل') cars = cars.filter(c => c.condition === activeFilter);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      cars = cars.filter(c => c.title.toLowerCase().includes(term) || c.make.toLowerCase().includes(term) || c.model.toLowerCase().includes(term) || c.location.includes(term));
    }
    return cars.sort((a, b) => (b.promoted ? 1 : 0) - (a.promoted ? 1 : 0));
  }, [state.carListings, activeFilter, searchTerm]);

  const viewCar = selectedCar ? state.carListings.find(c => c.id === selectedCar) : null;

  if (viewCar) {
    const isOwner = state.user?.id === viewCar.userId || state.isAdmin;
    return (
      <div className="pb-24 animate-fade-in min-h-screen" style={{ background: '#050505' }}>
        <div className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b" style={{ background: 'rgba(5,5,5,0.95)', borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex gap-2">
            {isOwner && (
              <>
                <button onClick={() => handleEdit(viewCar.id)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.1)' }}>
                  <Edit3 size={16} style={{ color: '#00D4FF' }} />
                </button>
                <button onClick={() => setDeleteConfirm(viewCar.id)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,23,68,0.1)' }}>
                  <Trash2 size={16} style={{ color: '#FF1744' }} />
                </button>
              </>
            )}
          </div>
          <button onClick={() => setSelectedCar(null)} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#111' }}>
            <X size={20} style={{ color: '#B0B0B0' }} />
          </button>
        </div>

        <img src={viewCar.image} alt={viewCar.title} className="w-full h-64 object-cover" />

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: viewCar.condition === 'جديد' ? 'rgba(0,230,118,0.15)' : 'rgba(255,215,0,0.15)', color: viewCar.condition === 'جديد' ? '#00E676' : '#FFD700' }}>{viewCar.condition}</span>
            <h1 className="text-lg font-black text-right" style={{ color: '#F5F5F5' }}>{viewCar.title}</h1>
          </div>
          <p className="text-xl font-black" style={{ color: '#FF1744' }}>{formatCarPrice(viewCar.price)}</p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Calendar, label: 'السنة', value: viewCar.year },
              { icon: Gauge, label: 'المسافة', value: `${viewCar.km} كم` },
              { icon: Fuel, label: 'الوقود', value: viewCar.fuel },
              { icon: MapPin, label: 'الموقع', value: viewCar.location },
            ].map(item => (
              <div key={item.label} className="p-3 rounded-xl text-right" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2 justify-end mb-1">
                  <span className="text-[10px]" style={{ color: '#707070' }}>{item.label}</span>
                  <item.icon size={12} style={{ color: '#FF1744' }} />
                </div>
                <span className="text-xs font-bold" style={{ color: '#F5F5F5' }}>{item.value}</span>
              </div>
            ))}
          </div>

          {viewCar.color && (
            <div className="p-3 rounded-xl" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-xs" style={{ color: '#707070' }}>اللون: </span>
              <span className="text-xs font-bold" style={{ color: '#F5F5F5' }}>{viewCar.color}</span>
            </div>
          )}

          {viewCar.description && (
            <div className="p-3 rounded-xl" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-sm font-bold mb-2 text-right" style={{ color: '#F5F5F5' }}>الوصف</h3>
              <p className="text-xs leading-relaxed text-right" style={{ color: '#B0B0B0' }}>{viewCar.description}</p>
            </div>
          )}

          <div className="p-4 rounded-xl" style={{ background: '#111', border: '1px solid rgba(255,23,68,0.15)' }}>
            <div className="flex items-center justify-between mb-3">
              <a href={`tel:${viewCar.sellerPhone}`} className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2" style={{ background: 'rgba(255,23,68,0.15)', color: '#FF1744' }}>
                <Phone size={14} /> اتصل
              </a>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: '#F5F5F5' }}>{viewCar.sellerName}</p>
                <p className="text-[11px]" style={{ color: '#707070' }}>{viewCar.sellerPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {deleteConfirm === viewCar.id && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }}>
            <div className="mx-6 p-6 rounded-2xl w-full max-w-sm" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 className="text-base font-bold text-center mb-3" style={{ color: '#F5F5F5' }}>حذف الإعلان؟</h3>
              <p className="text-sm text-center mb-4" style={{ color: '#707070' }}>لا يمكن التراجع عن هذا الإجراء</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: '#222', color: '#B0B0B0' }}>إلغاء</button>
                <button onClick={() => handleDelete(viewCar.id)} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'rgba(255,23,68,0.2)', color: '#FF1744' }}>حذف</button>
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
      <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, rgba(255,23,68,0.08), rgba(192,192,192,0.04))' }}>
        <div className="flex items-center justify-between">
          <button onClick={() => { resetForm(); setShowAddForm(true); }} className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1" style={{ background: 'rgba(255,23,68,0.15)', color: '#FF1744', border: '1px solid rgba(255,23,68,0.3)' }}>
            <Plus size={14} /> أضف سيارتك
          </button>
          <div className="text-right">
            <h2 className="text-lg font-black" style={{ color: '#FF1744' }}>السيارات</h2>
            <p className="text-[9px] font-bold tracking-[2px]" style={{ color: '#C0C0C0' }}>VEHICLES</p>
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
            placeholder="ابحث عن سيارة..."
            className="flex-1 bg-transparent text-sm outline-none text-right"
            style={{ color: '#F5F5F5' }}
            dir="rtl"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {conditionFilters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className="whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold btn-press"
              style={{
                background: activeFilter === f ? 'rgba(255,23,68,0.15)' : '#111',
                color: activeFilter === f ? '#FF1744' : '#707070',
                border: `1px solid ${activeFilter === f ? 'rgba(255,23,68,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 pb-2">
        <p className="text-[11px] text-right" style={{ color: '#707070' }}>{filteredCars.length} نتيجة</p>
      </div>

      {/* Car Listings */}
      <div className="px-4 space-y-3">
        {filteredCars.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm font-bold mb-1" style={{ color: '#B0B0B0' }}>لا توجد نتائج</p>
            <p className="text-xs" style={{ color: '#707070' }}>جرب تغيير عوامل التصفية</p>
          </div>
        ) : filteredCars.map(car => (
          <div key={car.id} onClick={() => setSelectedCar(car.id)} className="rounded-2xl overflow-hidden cursor-pointer" style={{ background: '#111', border: `1px solid ${car.promoted ? 'rgba(255,23,68,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
            <div className="relative">
              <img src={car.image} alt={car.title} className="w-full h-48 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {car.promoted && (
                <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(255,23,68,0.15)', border: '1px solid rgba(255,23,68,0.3)', color: '#FF1744' }}>
                  الأفضل قيمة
                </div>
              )}
              <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg text-[10px] font-bold"
                style={{ background: car.condition === 'جديد' ? 'rgba(0,230,118,0.2)' : 'rgba(255,215,0,0.2)', color: car.condition === 'جديد' ? '#00E676' : '#FFD700' }}>
                {car.condition}
              </div>
              <div className="absolute bottom-2.5 right-2.5">
                <span className="text-lg font-black" style={{ color: '#F5F5F5' }}>{formatCarPrice(car.price)}</span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold mb-2 text-right" style={{ color: '#F5F5F5' }}>{car.title}</h3>
              <div className="flex items-center gap-3 flex-wrap justify-end">
                <div className="flex items-center gap-1">
                  <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{car.location}</span>
                  <MapPin size={12} style={{ color: '#707070' }} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{car.km} كم</span>
                  <Gauge size={12} style={{ color: '#707070' }} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{car.fuel}</span>
                  <Fuel size={12} style={{ color: '#707070' }} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{car.year}</span>
                  <Calendar size={12} style={{ color: '#707070' }} />
                </div>
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
                <h2 className="text-base font-bold" style={{ color: '#FF1744' }}>{editingId ? 'تعديل الإعلان' : 'أضف سيارتك'}</h2>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>صورة السيارة</label>
                <div className="relative">
                  {formData.image ? (
                    <div className="relative">
                      <img src={formData.image} alt="preview" className="w-full h-40 object-cover rounded-xl" />
                      <button onClick={() => setFormData(p => ({ ...p, image: '' }))} className="absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
                        <X size={14} style={{ color: '#fff' }} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-32 rounded-xl cursor-pointer" style={{ background: '#111', border: '2px dashed rgba(255,23,68,0.3)' }}>
                      <Camera size={28} style={{ color: '#FF1744' }} />
                      <span className="text-xs mt-2" style={{ color: '#707070' }}>اضغط لرفع صورة</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <InputField label="عنوان الإعلان *" value={formData.title} onChange={v => setFormData(p => ({ ...p, title: v }))} placeholder="مثال: تويوتا كامري 2024 فل كامل" />
              <InputField label="السعر بالدينار العراقي *" value={formData.price} onChange={v => setFormData(p => ({ ...p, price: v }))} placeholder="مثال: 48000000" type="number" />

              <div className="grid grid-cols-2 gap-3">
                <InputField label="الشركة المصنعة" value={formData.make} onChange={v => setFormData(p => ({ ...p, make: v }))} placeholder="تويوتا" />
                <InputField label="الموديل" value={formData.model} onChange={v => setFormData(p => ({ ...p, model: v }))} placeholder="كامري" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <InputField label="سنة الصنع" value={formData.year} onChange={v => setFormData(p => ({ ...p, year: v }))} placeholder="2024" />
                <InputField label="المسافة المقطوعة" value={formData.km} onChange={v => setFormData(p => ({ ...p, km: v }))} placeholder="12,000" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SelectField label="الحالة" value={formData.condition} options={['جديد', 'مستعمل']} onChange={v => setFormData(p => ({ ...p, condition: v }))} />
                <SelectField label="نوع الوقود" value={formData.fuel} options={fuelTypes} onChange={v => setFormData(p => ({ ...p, fuel: v }))} />
              </div>

              <SelectField label="اللون" value={formData.color} options={carColors} onChange={v => setFormData(p => ({ ...p, color: v }))} />
              <InputField label="الموقع" value={formData.location} onChange={v => setFormData(p => ({ ...p, location: v }))} placeholder="بغداد - المنصور" />

              <div>
                <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>الوصف</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="وصف تفصيلي للسيارة..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm text-right outline-none resize-none"
                  style={{ background: '#111', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.08)' }}
                  dir="rtl"
                />
              </div>

              <InputField label="اسم البائع" value={formData.sellerName} onChange={v => setFormData(p => ({ ...p, sellerName: v }))} placeholder="اسمك أو اسم المعرض" />
              <InputField label="رقم الهاتف *" value={formData.sellerPhone} onChange={v => setFormData(p => ({ ...p, sellerPhone: v }))} placeholder="07XXXXXXXXX" type="tel" />

              <button
                onClick={handleSubmit}
                disabled={!formData.title || !formData.price || !formData.sellerPhone}
                className="w-full py-3.5 rounded-xl font-bold text-sm"
                style={{
                  background: formData.title && formData.price && formData.sellerPhone ? '#FF1744' : '#333',
                  color: formData.title && formData.price && formData.sellerPhone ? '#fff' : '#666',
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
