import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Heart } from 'lucide-react';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const favProducts = state.products.filter(p => state.favorites.includes(p.id));

  return (
    <div className="pb-24 animate-fade-in bg-sovereign-surface/50 min-h-screen">
      <div className="glass sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-glass-border/50">
        <div className="w-10" />
        <h1 className="text-lg font-extrabold text-text-primary">مفضلاتي ({favProducts.length})</h1>
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-sovereign-surface rounded-xl flex items-center justify-center hover:bg-sovereign-card transition-all btn-press">
          <ArrowRight size={20} className="text-text-secondary" />
        </button>
      </div>

      {favProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in-up">
          <div className="w-24 h-24 bg-sovereign-card rounded-3xl flex items-center justify-center mb-6">
            <Heart size={48} className="text-red-200" />
          </div>
          <p className="text-text-secondary text-lg font-bold mb-2">لا توجد مفضلات</p>
          <p className="text-text-tertiary text-sm mb-6">أضف منتجات إلى قائمة المفضلات</p>
          <button onClick={() => navigate('/')} className="gradient-primary text-white px-8 py-3.5 rounded-2xl font-bold shadow-glow-red btn-press">
            تصفح المنتجات
          </button>
        </div>
      ) : (
        <div className="px-4 pt-4 grid grid-cols-2 gap-3 stagger-children">
          {favProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
