import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import BannerSlider from '../components/BannerSlider';
import CategoryGrid from '../components/CategoryGrid';
import DailyRewards from '../components/DailyRewards';
import ProductCard from '../components/ProductCard';
import { useApp } from '../store/AppContext';

export default function HomePage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const featuredProducts = state.products.filter(p => p.featured);
  const tabs = ['الصفحة الرئيسية', 'إلكترونيات', 'الملابس', 'كوزمتك', 'المنزل'];

  return (
    <div className="pb-20 animate-fade-in">
      <TopBar />
      <SearchBar />

      {/* Category Tabs */}
      <div className="px-4 mb-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => i > 0 ? navigate(`/category/${state.categories[i - 1]?.id || 'electronics'}`) : null}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                i === 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
        <div className="mx-4 mt-4 bg-white rounded-xl p-3 shadow-sm flex items-center justify-between border border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">🪙</span>
            <span className="text-xs text-gray-600">نقطة: <strong>{state.user.points}</strong></span>
            <span className="text-red-500 ml-2">🔥</span>
            <span className="text-xs text-gray-600">التسلسل: <strong>0</strong> الأيام</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">{state.user.name}</span>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-lg">🏪</span>
            </div>
          </div>
        </div>
      )}

      {/* Featured Products */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate('/deals')} className="text-xs text-gray-500 font-medium">اظهار الكل</button>
          <h2 className="text-base font-bold text-gray-800">مجموعة الربيع</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* All Products */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate('/deals')} className="text-xs text-gray-500 font-medium">اظهار الكل</button>
          <h2 className="text-base font-bold text-gray-800">منتجات مميزة</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {state.products.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Latest Products */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate('/deals')} className="text-xs text-gray-500 font-medium">اظهار الكل</button>
          <h2 className="text-base font-bold text-gray-800">أحدث المنتجات</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {state.products.slice(8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
