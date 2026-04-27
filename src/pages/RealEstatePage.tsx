import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import { MapPin, Maximize, BedDouble, Bath } from 'lucide-react';

const properties = [
  { id: '1', title: 'شقة فاخرة في المنصور', price: '250,000,000', type: 'شقة', purpose: 'بيع', area: '180', beds: 3, baths: 2, location: 'بغداد - المنصور', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400', promoted: true },
  { id: '2', title: 'بيت مستقل في زيونة', price: '450,000,000', type: 'بيت', purpose: 'بيع', area: '300', beds: 5, baths: 3, location: 'بغداد - زيونة', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400', promoted: false },
  { id: '3', title: 'مكتب تجاري في الكرادة', price: '1,500,000', type: 'مكتب', purpose: 'إيجار', area: '120', beds: 0, baths: 1, location: 'بغداد - الكرادة', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400', promoted: true },
  { id: '4', title: 'أرض سكنية في أربيل', price: '180,000,000', type: 'أرض', purpose: 'بيع', area: '200', beds: 0, baths: 0, location: 'أربيل - عينكاوا', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400', promoted: false },
  { id: '5', title: 'شقة مفروشة للإيجار', price: '800,000', type: 'شقة', purpose: 'إيجار يومي', area: '100', beds: 2, baths: 1, location: 'البصرة', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', promoted: false },
];

const purposes = ['الكل', 'بيع', 'إيجار', 'إيجار يومي'];
const types = ['الكل', 'شقة', 'بيت', 'أرض', 'مكتب', 'محل'];

export default function RealEstatePage() {
  return (
    <div className="pb-24 animate-fade-in" style={{ background: '#050505' }}>
      <TopBar />
      <SearchBar />

      {/* Module Header */}
      <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.08), rgba(240,240,240,0.02))' }}>
        <div className="flex items-center justify-between">
          <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: 'rgba(0,230,118,0.15)', color: '#00E676', border: '1px solid rgba(0,230,118,0.3)' }}>
            + أضف عقارك
          </button>
          <div className="text-right">
            <h2 className="text-lg font-black" style={{ color: '#00E676' }}>العقارات</h2>
            <p className="text-[9px] font-bold tracking-[2px]" style={{ color: '#F0F0F0' }}>REAL ESTATE</p>
          </div>
        </div>
      </div>

      {/* Purpose Filters */}
      <div className="px-4 py-2">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {purposes.map((p, i) => (
            <button key={p} className="whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold btn-press"
              style={{
                background: i === 0 ? 'rgba(0,230,118,0.15)' : '#111',
                color: i === 0 ? '#00E676' : '#707070',
                border: `1px solid ${i === 0 ? 'rgba(0,230,118,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filters */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {types.map((t) => (
            <button key={t} className="whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-medium btn-press"
              style={{ background: '#111', color: '#B0B0B0', border: '1px solid rgba(255,255,255,0.06)' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Property Listings */}
      <div className="px-4 space-y-3">
        {properties.map(prop => (
          <div key={prop.id} className="card-sovereign overflow-hidden cursor-pointer" style={{ borderColor: prop.promoted ? 'rgba(0,230,118,0.2)' : undefined }}>
            <div className="relative">
              <img src={prop.image} alt={prop.title} className="w-full h-48 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {prop.promoted && (
                <div className="absolute top-2.5 left-2.5 tag-best-value" style={{ background: 'rgba(0,230,118,0.15)', borderColor: 'rgba(0,230,118,0.3)', color: '#00E676' }}>
                  الأفضل قيمة
                </div>
              )}
              <div className="absolute top-2.5 right-2.5 flex gap-1.5">
                <span className="px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(0,230,118,0.2)', color: '#00E676' }}>{prop.type}</span>
                <span className="px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(255,215,0,0.2)', color: '#FFD700' }}>{prop.purpose}</span>
              </div>
              <div className="absolute bottom-2.5 right-2.5">
                <span className="text-lg font-black" style={{ color: '#F5F5F5' }}>{prop.price} <span className="text-xs font-bold" style={{ color: '#F0F0F0' }}>{prop.purpose === 'بيع' ? 'د.ع' : 'د.ع/شهر'}</span></span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold mb-2" style={{ color: '#F5F5F5' }}>{prop.title}</h3>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1"><MapPin size={12} style={{ color: '#707070' }} /><span className="text-[11px]" style={{ color: '#B0B0B0' }}>{prop.location}</span></div>
                <div className="flex items-center gap-1"><Maximize size={12} style={{ color: '#707070' }} /><span className="text-[11px]" style={{ color: '#B0B0B0' }}>{prop.area} م²</span></div>
                {prop.beds > 0 && <div className="flex items-center gap-1"><BedDouble size={12} style={{ color: '#707070' }} /><span className="text-[11px]" style={{ color: '#B0B0B0' }}>{prop.beds} غرف</span></div>}
                {prop.baths > 0 && <div className="flex items-center gap-1"><Bath size={12} style={{ color: '#707070' }} /><span className="text-[11px]" style={{ color: '#B0B0B0' }}>{prop.baths} حمام</span></div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
