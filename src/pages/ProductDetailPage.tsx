import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Heart, ShoppingCart, Share2, Star, Truck, Shield, RotateCcw, MessageSquare, Check, ChevronLeft } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const product = state.products.find(p => p.id === id);
  const isFav = product ? state.favorites.includes(product.id) : false;
  const [addedToCart, setAddedToCart] = useState(false);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  if (!product) {
    return (
      <div className="pb-24 flex items-center justify-center min-h-screen bg-white">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <ShoppingCart size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-500 font-bold">المنتج غير موجود</p>
          <button onClick={() => navigate('/')} className="mt-4 text-red-600 text-sm font-semibold">العودة للرئيسية</button>
        </div>
      </div>
    );
  }

  const relatedProducts = state.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleFav = () => {
    setIsHeartAnimating(true);
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id });
    setTimeout(() => setIsHeartAnimating(false), 800);
  };

  return (
    <div className="pb-28 animate-fade-in bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="glass sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-gray-100/50">
        <div className="flex gap-2">
          <button onClick={handleToggleFav} className={`w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all btn-press ${isHeartAnimating ? 'animate-heart-beat' : ''}`}>
            <Heart size={18} className={`transition-all duration-300 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
          <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all btn-press">
            <Share2 size={18} className="text-gray-400" />
          </button>
        </div>
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all btn-press">
          <ArrowRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Product Image */}
      <div className="bg-white p-4">
        <div className="relative rounded-2xl overflow-hidden bg-gray-50">
          <img src={product.image} alt={product.name} className="w-full h-72 object-contain" />
          {product.discount && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1.5 rounded-xl font-bold shadow-glow-red">
              خصم {product.discount}%
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white px-4 py-5 mt-2 animate-fade-in-up">
        <h1 className="text-lg font-black text-gray-900 leading-relaxed">{product.name}</h1>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-black text-red-600">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">{formatPrice(product.originalPrice)}</span>
          )}
          {product.discount && (
            <span className="bg-red-50 text-red-600 text-xs px-2.5 py-1 rounded-lg font-bold">-{product.discount}%</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} size={16} className={star <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">({product.reviewCount} تقييم)</span>
          <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-bold">{product.rating}</span>
        </div>

        {/* Merchant */}
        <button className="mt-4 flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5 hover:bg-gray-100 transition-all w-full justify-end">
          <div className="text-right">
            <span className="text-sm text-red-600 font-bold">{product.merchantName}</span>
            <span className="text-[10px] text-gray-400 block">تاجر موثق</span>
          </div>
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <span className="text-sm">🏪</span>
          </div>
        </button>
      </div>

      {/* Features */}
      <div className="bg-white px-4 py-4 mt-2 animate-fade-in-up">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Truck, label: 'توصيل مجاني', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: Shield, label: 'ضمان المنتج', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: RotateCcw, label: 'إرجاع مجاني', color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map(feature => (
            <div key={feature.label} className="flex flex-col items-center gap-2 text-center py-3 bg-gray-50 rounded-xl">
              <div className={`w-9 h-9 ${feature.bg} rounded-xl flex items-center justify-center`}>
                <feature.icon size={18} className={feature.color} />
              </div>
              <span className="text-[10px] text-gray-600 font-semibold">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white px-4 py-5 mt-2 animate-fade-in-up">
        <h3 className="font-extrabold text-gray-900 mb-3">وصف المنتج</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="px-4 py-5 mt-2 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <button className="flex items-center gap-1 text-xs text-red-600 font-semibold">
              <ChevronLeft size={14} />
              <span>المزيد</span>
            </button>
            <h3 className="font-extrabold text-gray-900">منتجات مشابهة</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {relatedProducts.map(rp => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      )}

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-16 left-0 right-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="glass rounded-2xl p-3 flex gap-3 shadow-premium-xl border border-white/50">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 btn-press ${
                addedToCart
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'gradient-primary text-white shadow-glow-red'
              }`}
            >
              {addedToCart ? (
                <>
                  <span>تمت الإضافة</span>
                  <Check size={18} />
                </>
              ) : (
                <>
                  <span>أضف للعربة</span>
                  <ShoppingCart size={18} />
                </>
              )}
            </button>
            <button className="w-14 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all btn-press border border-gray-100">
              <MessageSquare size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
