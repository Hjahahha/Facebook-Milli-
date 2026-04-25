import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Heart, ShoppingCart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const product = state.products.find(p => p.id === id);
  const isFav = product ? state.favorites.includes(product.id) : false;

  if (!product) {
    return (
      <div className="pb-20 flex items-center justify-center min-h-screen">
        <p className="text-gray-400">المنتج غير موجود</p>
      </div>
    );
  }

  const relatedProducts = state.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-10">
        <div className="flex gap-3">
          <button onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id })}>
            <Heart size={22} className={isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
          </button>
          <button><Share2 size={22} className="text-gray-400" /></button>
        </div>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      {/* Product Image */}
      <div className="bg-white p-4">
        <img src={product.image} alt={product.name} className="w-full h-72 object-contain rounded-xl bg-gray-50" />
      </div>

      {/* Product Info */}
      <div className="bg-white px-4 py-4 mt-2">
        <h1 className="text-lg font-bold text-gray-800 leading-relaxed">{product.name}</h1>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-bold text-red-600">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">{formatPrice(product.originalPrice)}</span>
          )}
          {product.discount && (
            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-md font-bold">-{product.discount}%</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} size={16} className={star <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviewCount} تقييم)</span>
        </div>

        {/* Merchant */}
        <button className="mt-3 flex items-center gap-2">
          <span className="text-sm text-red-600 font-medium">{product.merchantName}</span>
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-xs">🏪</span>
          </div>
        </button>
      </div>

      {/* Features */}
      <div className="bg-white px-4 py-4 mt-2">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1 text-center">
            <Truck size={20} className="text-green-600" />
            <span className="text-[10px] text-gray-600 font-medium">توصيل مجاني</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Shield size={20} className="text-blue-600" />
            <span className="text-[10px] text-gray-600 font-medium">ضمان المنتج</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <RotateCcw size={20} className="text-orange-600" />
            <span className="text-[10px] text-gray-600 font-medium">إرجاع مجاني</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white px-4 py-4 mt-2">
        <h3 className="font-bold text-gray-800 mb-2">وصف المنتج</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="px-4 py-4 mt-2">
          <h3 className="font-bold text-gray-800 mb-3">منتجات مشابهة</h3>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {relatedProducts.map(rp => (
              <div
                key={rp.id}
                onClick={() => navigate(`/product/${rp.id}`)}
                className="min-w-[140px] bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
              >
                <img src={rp.image} alt={rp.name} className="w-full h-28 object-cover" />
                <div className="p-2">
                  <p className="text-xs font-medium line-clamp-1">{rp.name}</p>
                  <p className="text-xs text-red-600 font-bold mt-1">{formatPrice(rp.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t px-4 py-3 flex gap-3 z-40">
        <button
          onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
          className="flex-1 gradient-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <span>أضف للعربة</span>
          <ShoppingCart size={18} />
        </button>
        <button className="w-14 bg-gray-100 rounded-xl flex items-center justify-center">
          <MessageSquareIcon />
        </button>
      </div>
    </div>
  );
}

function MessageSquareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
