// Cars module page
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import { MapPin, Gauge, Fuel, Calendar } from 'lucide-react';

const carListings = [
  { id: '1', title: 'تويوتا كامري 2024', price: '48,000,000', location: 'بغداد - المنصور', km: '12,000', fuel: 'بنزين', year: '2024', condition: 'جديد', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400', promoted: true },
  { id: '2', title: 'هيونداي إلنترا 2023', price: '32,000,000', location: 'أربيل', km: '25,000', fuel: 'بنزين', year: '2023', condition: 'مستعمل', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400', promoted: false },
  { id: '3', title: 'كيا سبورتاج 2024', price: '55,000,000', location: 'بغداد - الكرادة', km: '5,000', fuel: 'بنزين', year: '2024', condition: 'جديد', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400', promoted: true },
  { id: '4', title: 'نيسان صني 2022', price: '22,000,000', location: 'البصرة', km: '40,000', fuel: 'بنزين', year: '2022', condition: 'مستعمل', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400', promoted: false },
  { id: '5', title: 'BMW X5 2023', price: '85,000,000', location: 'بغداد - زيونة', km: '15,000', fuel: 'بنزين', year: '2023', condition: 'مستعمل', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400', promoted: false },
  { id: '6', title: 'مرسيدس C200 2024', price: '92,000,000', location: 'أربيل - عينكاوا', km: '3,000', fuel: 'بنزين', year: '2024', condition: 'جديد', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400', promoted: true },
];

const filters = ['الكل', 'جديد', 'مستعمل', 'SUV', 'سيدان', 'بيك أب'];

export default function CarsPage() {

  return (
    <div className="pb-24 animate-fade-in" style={{ background: '#050505' }}>
      <TopBar />
      <SearchBar />

      {/* Module Header */}
      <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, rgba(255,23,68,0.08), rgba(192,192,192,0.04))' }}>
        <div className="flex items-center justify-between">
          <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,23,68,0.15)', color: '#FF1744', border: '1px solid rgba(255,23,68,0.3)' }}>
            + أضف سيارتك
          </button>
          <div className="text-right">
            <h2 className="text-lg font-black" style={{ color: '#FF1744' }}>السيارات</h2>
            <p className="text-[9px] font-bold tracking-[2px]" style={{ color: '#C0C0C0' }}>VEHICLES</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {filters.map((f, i) => (
            <button key={f} className="whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold btn-press"
              style={{
                background: i === 0 ? 'rgba(255,23,68,0.15)' : '#111',
                color: i === 0 ? '#FF1744' : '#707070',
                border: `1px solid ${i === 0 ? 'rgba(255,23,68,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Car Listings */}
      <div className="px-4 space-y-3">
        {carListings.map(car => (
          <div key={car.id} className="card-sovereign overflow-hidden cursor-pointer" style={{ borderColor: car.promoted ? 'rgba(255,23,68,0.2)' : undefined }}>
            <div className="relative">
              <img src={car.image} alt={car.title} className="w-full h-48 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {car.promoted && (
                <div className="absolute top-2.5 left-2.5 tag-best-value" style={{ background: 'rgba(255,23,68,0.15)', borderColor: 'rgba(255,23,68,0.3)', color: '#FF1744' }}>
                  الأفضل قيمة
                </div>
              )}
              <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg text-[10px] font-bold"
                style={{ background: car.condition === 'جديد' ? 'rgba(0,230,118,0.2)' : 'rgba(255,215,0,0.2)', color: car.condition === 'جديد' ? '#00E676' : '#FFD700' }}>
                {car.condition}
              </div>
              <div className="absolute bottom-2.5 right-2.5">
                <span className="text-lg font-black" style={{ color: '#F5F5F5' }}>{car.price} <span className="text-xs font-bold" style={{ color: '#C0C0C0' }}>د.ع</span></span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold mb-2" style={{ color: '#F5F5F5' }}>{car.title}</h3>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <MapPin size={12} style={{ color: '#707070' }} />
                  <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{car.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Gauge size={12} style={{ color: '#707070' }} />
                  <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{car.km} كم</span>
                </div>
                <div className="flex items-center gap-1">
                  <Fuel size={12} style={{ color: '#707070' }} />
                  <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{car.fuel}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={12} style={{ color: '#707070' }} />
                  <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{car.year}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
