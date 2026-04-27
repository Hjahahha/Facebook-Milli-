import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../types';
import { useApp } from '../store/AppContext';
import { formatPrice } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const isFav = state.favorites.includes(product.id);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHeartAnimating(true);
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id });
    setTimeout(() => setIsHeartAnimating(false), 800);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setShowAddedFeedback(true);
    setTimeout(() => setShowAddedFeedback(false), 1200);
  };

  // Ghost Promotion tag
  const getPromotionTag = () => {
    if (product.featured && product.rating >= 4.5) return 'الأفضل قيمة';
    if (product.featured) return 'رائج';
    return null;
  };
  const promoTag = getPromotionTag();

  return (
    <div
      className="card-sovereign overflow-hidden cursor-pointer animate-fade-in-up"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {product.discount && (
          <div className="absolute top-2.5 left-2.5 animate-bounce-in">
            <span className="text-white text-[10px] px-2.5 py-1 rounded-lg font-bold" style={{ background: '#FF1744' }}>
              -{product.discount}%
            </span>
          </div>
        )}

        {promoTag && (
          <div className="absolute top-2.5 left-2.5 tag-best-value" style={{ marginTop: product.discount ? '28px' : '0' }}>
            {promoTag}
          </div>
        )}

        <button
          onClick={handleFav}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-sovereign transition-all duration-300 btn-press ${isHeartAnimating ? 'animate-heart-beat' : ''}`}
          style={{ background: isFav ? 'rgba(255,23,68,0.2)' : 'rgba(17,17,17,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Heart size={15} className={`transition-all duration-300 ${isFav ? 'fill-red-500 text-error' : ''}`} style={{ color: isFav ? '#FF1744' : '#707070' }} />
        </button>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-2.5 left-2.5 w-9 h-9 rounded-xl flex items-center justify-center shadow-sovereign transition-all duration-300 btn-press"
          style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.3)' }}
        >
          {showAddedFeedback ? (
            <span className="text-xs animate-bounce-in" style={{ color: '#00D4FF' }}>+1</span>
          ) : (
            <ShoppingCart size={15} style={{ color: '#00D4FF' }} />
          )}
        </button>
      </div>

      <div className="p-3">
        <h3 className="text-[13px] font-semibold line-clamp-2 leading-relaxed mb-2" style={{ color: '#F5F5F5' }}>{product.name}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-sm" style={{ color: '#00D4FF' }}>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[11px] line-through" style={{ color: '#707070' }}>{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={11}
                className={star <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : ''}
                style={{ color: star <= Math.floor(product.rating) ? '#FFD700' : '#333' }}
              />
            ))}
          </div>
          <span className="text-[10px]" style={{ color: '#707070' }}>({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.15)' }}>
            <span className="text-[8px]">🏪</span>
          </div>
          <p className="text-[10px] font-medium" style={{ color: '#00D4FF' }}>{product.merchantName}</p>
        </div>
      </div>
    </div>
  );
}
