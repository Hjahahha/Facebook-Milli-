import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';

const categoryImages: Record<string, string> = {
  electronics: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150',
  computers: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150',
  gaming: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=150',
  home: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150',
  furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150',
  fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=150',
  beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150',
  business: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150',
  pets: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=150',
  other: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=150',
};

export default function CategoryGrid() {
  const { state } = useApp();
  const navigate = useNavigate();

  return (
    <div className="px-4 py-4">
      <div className="grid grid-cols-5 gap-3">
        {state.categories.slice(0, 10).map(cat => (
          <button
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-all group-hover:scale-105">
              <img
                src={categoryImages[cat.id] || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=150'}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] text-gray-700 text-center leading-tight font-medium line-clamp-2">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
