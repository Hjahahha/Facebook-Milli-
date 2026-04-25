import { useState } from 'react';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DealsPage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'discount' | 'price-low' | 'price-high' | 'newest'>('discount');

  const dealsProducts = state.products
    .filter(p => p.discount && p.discount > 0)
    .sort((a, b) => {
      switch (sortBy) {
        case 'discount': return (b.discount || 0) - (a.discount || 0);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: return 0;
      }
    });

  return (
    <div className="pb-20 animate-fade-in">
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-10">
        <div className="w-8" />
        <h1 className="text-lg font-bold text-gray-800">تخفيضات</h1>
        <button onClick={() => navigate(-1)}>
          <ArrowRight size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Gradient Banner */}
      <div className="gradient-primary mx-4 mt-4 rounded-xl p-6 text-center text-white">
        <h2 className="text-2xl font-bold mb-1">خصومات حصرية</h2>
        <p className="text-sm opacity-90">وفّر أكثر مع عروضنا المميزة</p>
        <p className="text-xs mt-2 opacity-75">خصومات تصل إلى 50%</p>
      </div>

      {/* Sort Options */}
      <div className="px-4 mt-4 flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <SlidersHorizontal size={16} className="text-gray-500 shrink-0" />
        {[
          { value: 'discount' as const, label: 'أكبر خصم' },
          { value: 'price-low' as const, label: 'الأرخص' },
          { value: 'price-high' as const, label: 'الأغلى' },
          { value: 'newest' as const, label: 'الأحدث' },
        ].map(option => (
          <button
            key={option.value}
            onClick={() => setSortBy(option.value)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              sortBy === option.value ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-3">
        {dealsProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {dealsProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">لا توجد تخفيضات حالياً</p>
        </div>
      )}
    </div>
  );
}
