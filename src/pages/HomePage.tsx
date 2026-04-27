import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import BannerSlider from '../components/BannerSlider';
import CategoryGrid from '../components/CategoryGrid';
import DailyRewards from '../components/DailyRewards';
import ProductCard from '../components/ProductCard';
import { useApp } from '../store/AppContext';
import { ChevronLeft, TrendingUp, Sparkles, Clock, Flame } from 'lucide-react';

export default function HomePage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const featuredProducts = state.products.filter(p => p.featured);
  const tabs = ['الصفحة الرئيسية', 'إلكترونيات', 'الملابس', 'كوزمتك', 'المنزل', 'ألعاب'];

  return (
    <div className="pb-24 animate-fade-in" style={{ background: '#050505' }}>
      <TopBar />
      <SearchBar />

      {/* Category Tabs */}
      <div className="px-4 mb-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => i > 0 ? navigate(`/category/${state.categories[i - 1]?.id || 'electronics'}`) : null}
              className="whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 btn-press"
              style={{
                background: i === 0 ? 'rgba(0,212,255,0.15)' : '#111',
                color: i === 0 ? '#00D4FF' : '#707070',
                border: `1px solid ${i === 0 ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <BannerSlider />

      <CategoryGrid />

      {state.isLoggedIn && <DailyRewards />}

      {/* User Info Bar */}
      {state.isLoggedIn && state.user && (
        <div className="mx-4 mt-4 card-sovereign p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: 'rgba(255,215,0,0.1)' }}>
              <span className="text-sm">🪙</span>
              <span className="text-xs font-bold" style={{ color: '#FFD700' }}>{state.user.points}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: 'rgba(255,23,68,0.1)' }}>
              <Flame size={13} style={{ color: '#FF1744' }} />
              <span className="text-xs font-bold" style={{ color: '#FF1744' }}>0 يوم</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <span className="text-sm font-bold" style={{ color: '#F5F5F5' }}>{state.user.name}</span>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm" style={{ background: 'linear-gradient(135deg, #00D4FF, #0099CC)' }}>
              <span className="text-sm font-bold" style={{ color: '#050505' }}>{state.user.name.charAt(0)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Flash Deals Section */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate('/deals')} className="flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: '#00D4FF' }}>
            <ChevronLeft size={14} />
            <span>اظهار الكل</span>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold" style={{ color: '#F5F5F5' }}>عروض سريعة</h2>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,23,68,0.15)' }}>
              <Flame size={15} style={{ color: '#FF1744' }} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 stagger-children">
          {state.products.filter(p => p.discount && p.discount >= 20).slice(0, 6).map(product => (
            <div key={product.id} className="min-w-[160px] max-w-[160px] animate-fade-in-up">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate('/deals')} className="flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: '#FFD700' }}>
            <ChevronLeft size={14} />
            <span>اظهار الكل</span>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold" style={{ color: '#F5F5F5' }}>مجموعة الربيع</h2>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,230,118,0.15)' }}>
              <Sparkles size={15} style={{ color: '#00E676' }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 stagger-children">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Trending Products */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate('/deals')} className="flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: '#00D4FF' }}>
            <ChevronLeft size={14} />
            <span>اظهار الكل</span>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold" style={{ color: '#F5F5F5' }}>الأكثر مبيعاً</h2>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.15)' }}>
              <TrendingUp size={15} style={{ color: '#00D4FF' }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 stagger-children">
          {state.products.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Latest Products */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate('/deals')} className="flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: '#00D4FF' }}>
            <ChevronLeft size={14} />
            <span>اظهار الكل</span>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold" style={{ color: '#F5F5F5' }}>أحدث المنتجات</h2>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(138,43,226,0.15)' }}>
              <Clock size={15} style={{ color: '#9C27B0' }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 stagger-children">
          {state.products.slice(8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mx-4 mt-8 mb-4 card-sovereign p-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '🛡️', label: 'ضمان الجودة', sub: '100% أصلي' },
            { icon: '🚚', label: 'توصيل سريع', sub: 'خلال 24 ساعة' },
            { icon: '↩️', label: 'إرجاع مجاني', sub: '14 يوم' },
          ].map(badge => (
            <div key={badge.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-xl">{badge.icon}</span>
              <span className="text-[10px] font-bold" style={{ color: '#F5F5F5' }}>{badge.label}</span>
              <span className="text-[9px]" style={{ color: '#707070' }}>{badge.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
