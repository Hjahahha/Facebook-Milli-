import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import { Star, Clock, MessageCircle, BadgeCheck, Wrench } from 'lucide-react';

const categories = [
  { icon: '🔧', label: 'سباكة', color: '#2196F3' },
  { icon: '⚡', label: 'كهرباء', color: '#FFEB3B' },
  { icon: '🪚', label: 'نجارة', color: '#795548' },
  { icon: '🎨', label: 'دهان', color: '#E91E63' },
  { icon: '❄️', label: 'تكييف', color: '#00BCD4' },
  { icon: '🔩', label: 'ميكانيك', color: '#607D8B' },
  { icon: '🧹', label: 'تنظيف', color: '#4CAF50' },
  { icon: '📦', label: 'نقل', color: '#FF9800' },
  { icon: '⚙️', label: 'لحام', color: '#F44336' },
  { icon: '🏗️', label: 'بلاط', color: '#9C27B0' },
  { icon: '💻', label: 'IT', color: '#3F51B5' },
  { icon: '🚚', label: 'توصيل', color: '#FF5722' },
];

const professionals = [
  { id: '1', name: 'أحمد الكهربائي', specialty: 'كهربائي', rating: 4.9, jobs: 234, responseTime: '5 دقائق', verified: true, color: '#FFEB3B', autoReply: true },
  { id: '2', name: 'محمد السباك', specialty: 'سباك', rating: 4.8, jobs: 189, responseTime: '10 دقائق', verified: true, color: '#2196F3', autoReply: true },
  { id: '3', name: 'علي الدهان', specialty: 'دهان', rating: 4.7, jobs: 156, responseTime: '15 دقيقة', verified: false, color: '#E91E63', autoReply: false },
  { id: '4', name: 'حسن الميكانيكي', specialty: 'ميكانيكي', rating: 4.9, jobs: 312, responseTime: '3 دقائق', verified: true, color: '#607D8B', autoReply: true },
  { id: '5', name: 'ورشة النجم', specialty: 'نجار', rating: 4.6, jobs: 98, responseTime: '20 دقيقة', verified: true, color: '#795548', autoReply: false },
];

export default function ServicesPage() {
  return (
    <div className="pb-24 animate-fade-in" style={{ background: '#050505' }}>
      <TopBar />
      <SearchBar />

      {/* Module Header */}
      <div className="px-4 py-3" style={{ background: 'linear-gradient(135deg, rgba(255,109,0,0.08), rgba(120,144,156,0.04))' }}>
        <div className="flex items-center justify-between">
          <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,109,0,0.15)', color: '#FF6D00', border: '1px solid rgba(255,109,0,0.3)' }}>
            + سجّل كمهني
          </button>
          <div className="text-right">
            <h2 className="text-lg font-black" style={{ color: '#FF6D00' }}>الخدمات</h2>
            <p className="text-[9px] font-bold tracking-[2px]" style={{ color: '#78909C' }}>SERVICES</p>
          </div>
        </div>
      </div>

      {/* Service Categories Grid */}
      <div className="px-4 py-3">
        <h3 className="text-sm font-bold mb-3" style={{ color: '#F5F5F5' }}>التخصصات</h3>
        <div className="grid grid-cols-4 gap-2">
          {categories.map(cat => (
            <button key={cat.label} className="flex flex-col items-center gap-1.5 py-3 rounded-xl btn-press card-sovereign">
              <span className="text-xl">{cat.icon}</span>
              <span className="text-[10px] font-bold" style={{ color: cat.color }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Verified Professionals */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium" style={{ color: '#707070' }}>{professionals.length} مهني</span>
          <h3 className="text-sm font-bold" style={{ color: '#F5F5F5' }}>المهنيون الموثقون</h3>
        </div>

        <div className="space-y-3">
          {professionals.map(pro => (
            <div key={pro.id} className="card-sovereign p-3" style={{ borderColor: pro.verified ? 'rgba(255,109,0,0.15)' : undefined }}>
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${pro.color}22` }}>
                  <Wrench size={20} style={{ color: pro.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm font-bold" style={{ color: '#F5F5F5' }}>{pro.name}</span>
                    {pro.verified && <BadgeCheck size={14} style={{ color: '#1DA1F2' }} />}
                    {pro.autoReply && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF' }}>رد آلي</span>
                    )}
                  </div>
                  <p className="text-[11px] mb-1.5" style={{ color: pro.color }}>{pro.specialty}</p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="fill-yellow-400" style={{ color: '#FFD700' }} />
                      <span className="text-[11px] font-bold" style={{ color: '#FFD700' }}>{pro.rating}</span>
                      <span className="text-[10px]" style={{ color: '#707070' }}>({pro.jobs} عمل)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={11} style={{ color: '#00E676' }} />
                      <span className="text-[10px]" style={{ color: '#00E676' }}>يرد خلال {pro.responseTime}</span>
                    </div>
                  </div>
                </div>

                <button className="px-3 py-2 rounded-lg btn-press" style={{ background: 'rgba(255,109,0,0.15)', border: '1px solid rgba(255,109,0,0.3)' }}>
                  <MessageCircle size={16} style={{ color: '#FF6D00' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
