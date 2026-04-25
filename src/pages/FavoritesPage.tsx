import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const favProducts = state.products.filter(p => state.favorites.includes(p.id));

  return (
    <div className="pb-20 animate-fade-in">
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-10">
        <div />
        <h1 className="text-lg font-bold">مفضلاتي ({favProducts.length})</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      {favProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Heart size={64} className="text-gray-200 mb-4" />
          <p className="text-gray-400 text-lg font-semibold mb-2">لا توجد مفضلات</p>
          <p className="text-gray-400 text-sm">أضف منتجات لقائمة المفضلات</p>
        </div>
      ) : (
        <div className="px-4 pt-4 grid grid-cols-2 gap-3">
          {favProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
