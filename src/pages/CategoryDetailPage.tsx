import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, ShoppingCart } from 'lucide-react';

export default function CategoryDetailPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  const category = state.categories.find(c => c.id === categoryId);
  const products = state.products.filter(p => p.category === categoryId);
  const cartCount = state.cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="pb-20 animate-fade-in">
      <div className="bg-sovereign-card px-4 py-3 flex items-center justify-between border-b sticky top-0 z-10">
        <div className="relative">
          <button onClick={() => navigate('/cart')}><ShoppingCart size={22} className="text-text-secondary" /></button>
          {cartCount > 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-neon text-white text-[10px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
        </div>
        <h1 className="text-lg font-bold">{category?.name || 'فئة'}</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-text-secondary" /></button>
      </div>

      {/* Subcategories */}
      {category && category.subcategories.length > 0 && (
        <div className="px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar">
          <button className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold bg-neon text-white">
            الكل
          </button>
          {category.subcategories.map(sub => (
            <button
              key={sub.id}
              className="whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold bg-sovereign-card text-text-secondary hover:bg-sovereign-border"
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 pt-2 grid grid-cols-2 gap-3">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-tertiary text-lg">لا توجد منتجات في هذه الفئة</p>
        </div>
      )}
    </div>
  );
}
