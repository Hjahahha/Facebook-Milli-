import { Heart, ShoppingCart } from 'lucide-react';
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

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer animate-fade-in border border-gray-100"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover" loading="lazy" />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-md font-bold">
            خصم {product.discount}%
          </span>
        )}
        <button
          onClick={e => { e.stopPropagation(); dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id }); }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
        >
          <Heart size={16} className={isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
        <button
          onClick={e => { e.stopPropagation(); dispatch({ type: 'ADD_TO_CART', payload: product }); }}
          className="absolute bottom-2 left-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-red-50"
        >
          <ShoppingCart size={14} className="text-gray-600" />
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2">{product.name}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-red-600 font-bold text-sm">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-xs line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          <span className="text-yellow-500 text-xs">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
        </div>
        <p className="text-[10px] text-red-500 mt-1 font-medium">{product.merchantName}</p>
      </div>
    </div>
  );
}
