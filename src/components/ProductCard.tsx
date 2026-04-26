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

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden card-hover cursor-pointer animate-fade-in-up border border-gray-100/80 shadow-premium"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.discount && (
          <div className="absolute top-2.5 left-2.5 animate-bounce-in">
            <span className="bg-red-600 text-white text-[10px] px-2.5 py-1 rounded-lg font-bold shadow-glow-red">
              -{product.discount}%
            </span>
          </div>
        )}

        <button
          onClick={handleFav}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-premium transition-all duration-300 btn-press ${
            isFav ? 'bg-red-50' : 'bg-white/90 hover:bg-white'
          } ${isHeartAnimating ? 'animate-heart-beat' : ''}`}
        >
          <Heart size={15} className={`transition-all duration-300 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-2.5 left-2.5 w-9 h-9 rounded-xl flex items-center justify-center shadow-premium transition-all duration-300 btn-press bg-white/90 hover:bg-red-600 hover:text-white group/btn"
        >
          {showAddedFeedback ? (
            <span className="text-xs animate-bounce-in">+1</span>
          ) : (
            <ShoppingCart size={15} className="text-gray-600 group-hover/btn:text-white transition-colors" />
          )}
        </button>
      </div>

      <div className="p-3">
        <h3 className="text-[13px] font-semibold text-gray-800 line-clamp-2 leading-relaxed mb-2">{product.name}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-red-600 font-extrabold text-sm">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-[11px] line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={11}
                className={star <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
              />
            ))}
          </div>
          <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-[8px]">🏪</span>
          </div>
          <p className="text-[10px] text-red-600 font-medium">{product.merchantName}</p>
        </div>
      </div>
    </div>
  );
}
