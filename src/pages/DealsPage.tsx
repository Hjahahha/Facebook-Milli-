import { useState } from 'react';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, SlidersHorizontal, Flame, Percent, Timer } from 'lucide-react';
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
    <div className="pb-24 animate-fade-in bg-gray-50/50 min-h-screen">
      <div className="glass sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-gray-100/50">
        <div className="w-10" />
        <h1 className="text-lg font-extrabold text-gray-900">تخفيضات</h1>
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all btn-press">
          <ArrowRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Hero Banner */}
      <div className="mx-4 mt-4 gradient-primary rounded-2xl p-6 text-center text-white relative overflow-hidden shadow-glow-red">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame size={24} className="text-yellow-300 animate-float" />
            <h2 className="text-2xl font-black">خصومات حصرية</h2>
            <Flame size={24} className="text-yellow-300 animate-float" />
          </div>
          <p className="text-sm opacity-90 font-medium">وفّر أكثر مع عروضنا المميزة</p>

          {/* Countdown Timer */}
          <div className="flex gap-2 justify-center mt-4">
            {[
              { val: '12', label: 'ساعة' },
              { val: '45', label: 'دقيقة' },
              { val: '30', label: 'ثانية' },
            ].map(t => (
              <div key={t.label} className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 min-w-[60px]">
                <span className="text-lg font-black">{t.val}</span>
                <p className="text-[9px] opacity-80">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mx-4 mt-3 flex gap-2 stagger-children">
        {[
          { icon: Percent, label: 'خصم حتى 50%', color: 'bg-red-50 text-red-600' },
          { icon: Timer, label: 'عروض محدودة', color: 'bg-amber-50 text-amber-600' },
        ].map(stat => (
          <div key={stat.label} className={`flex-1 flex items-center gap-2 justify-center ${stat.color} rounded-xl py-2.5 text-xs font-bold animate-fade-in-up`}>
            <stat.icon size={14} />
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Sort Options */}
      <div className="px-4 mt-4 flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
          <SlidersHorizontal size={14} className="text-gray-500" />
        </div>
        {[
          { value: 'discount' as const, label: 'أكبر خصم' },
          { value: 'price-low' as const, label: 'الأرخص' },
          { value: 'price-high' as const, label: 'الأغلى' },
          { value: 'newest' as const, label: 'الأحدث' },
        ].map(option => (
          <button
            key={option.value}
            onClick={() => setSortBy(option.value)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 btn-press ${
              sortBy === option.value
                ? 'bg-gray-900 text-white shadow-premium'
                : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-3 stagger-children">
        {dealsProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {dealsProducts.length === 0 && (
        <div className="text-center py-20 animate-fade-in-up">
          <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Percent size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-500 font-bold">لا توجد تخفيضات حالياً</p>
        </div>
      )}
    </div>
  );
}
