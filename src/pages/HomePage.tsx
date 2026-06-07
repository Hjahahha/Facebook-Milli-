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
    <div className="pb-24 animate-fade-in bg-gray-50/50">
      <TopBar />
      <SearchBar />

      {/* Category Tabs */}
      <div className="px-4 mb-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => i > 0 ? navigate(`/category/${state.categories[i - 1]?.id || 'electronics'}`) : null}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 btn-press ${
                i === 0
                  ? 'bg-gray-900 text-white shadow-premium'
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
              }`}
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
        <div className="mx-4 mt-4 bg-white rounded-2xl p-3.5 shadow-premium flex items-center justify-between border border-gray-100/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg">
              <span className="text-amber-500 text-sm">🪙</span>
              <span className="text-xs font-bold text-amber-700">{state.user.points}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-red-50 px-2.5 py-1 rounded-lg">
              <Flame size={13} className="text-red-500" />
              <span className="text-xs font-bold text-red-600">0 يوم</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <span className="text-sm font-bold text-gray-800">{state.user.name}</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">{state.user.name.charAt(0)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Flash Deals Section */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate('/deals')} className="flex items-center gap-1 text-xs text-red-600 font-semibold hover:underline">
            <ChevronLeft size={14} />
            <span>اظهار الكل</span>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-gray-900">عروض سريعة</h2>
            <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
              <Flame size={15} className="text-red-600" />
            </div>
          </div>
        </div>

        {/* Flash deals horizontal scroll */}
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
          <button onClick={() => navigate('/deals')} className="flex items-center gap-1 text-xs text-red-600 font-semibold hover:underline">
            <ChevronLeft size={14} />
            <span>اظهار الكل</span>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-gray-900">مجموعة الربيع</h2>
            <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Sparkles size={15} className="text-emerald-600" />
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
          <button onClick={() => navigate('/deals')} className="flex items-center gap-1 text-xs text-red-600 font-semibold hover:underline">
            <ChevronLeft size={14} />
            <span>اظهار الكل</span>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-gray-900">الأكثر مبيعاً</h2>
            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={15} className="text-blue-600" />
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
          <button onClick={() => navigate('/deals')} className="flex items-center gap-1 text-xs text-red-600 font-semibold hover:underline">
            <ChevronLeft size={14} />
            <span>اظهار الكل</span>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-gray-900">أحدث المنتجات</h2>
            <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock size={15} className="text-purple-600" />
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
      <div className="mx-4 mt-8 mb-4 bg-white rounded-2xl p-4 shadow-premium border border-gray-100/80">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '🛡️', label: 'ضمان الجودة', sub: '100% أصلي' },
            { icon: '🚚', label: 'توصيل سريع', sub: 'خلال 24 ساعة' },
            { icon: '↩️', label: 'إرجاع مجاني', sub: '14 يوم' },
          ].map(badge => (
            <div key={badge.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-xl">{badge.icon}</span>
              <span className="text-[10px] font-bold text-gray-800">{badge.label}</span>
              <span className="text-[9px] text-gray-400">{badge.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
