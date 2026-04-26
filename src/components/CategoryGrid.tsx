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

const categoryGradients = [
  'from-red-50 to-rose-100',
  'from-blue-50 to-indigo-100',
  'from-purple-50 to-violet-100',
  'from-amber-50 to-yellow-100',
  'from-green-50 to-emerald-100',
  'from-pink-50 to-fuchsia-100',
  'from-cyan-50 to-teal-100',
  'from-orange-50 to-amber-100',
  'from-lime-50 to-green-100',
  'from-slate-50 to-gray-100',
];

export default function CategoryGrid() {
  const { state } = useApp();
  const navigate = useNavigate();

  return (
    <div className="px-4 py-4">
      <div className="grid grid-cols-5 gap-2.5 stagger-children">
        {state.categories.slice(0, 10).map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="flex flex-col items-center gap-1.5 group animate-fade-in-up"
          >
            <div className={`w-[52px] h-[52px] rounded-2xl overflow-hidden bg-gradient-to-br ${categoryGradients[idx % categoryGradients.length]} shadow-premium group-hover:shadow-premium-lg transition-all duration-300 group-hover:scale-110 group-active:scale-95 p-[3px]`}>
              <img
                src={categoryImages[cat.id] || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=150'}
                alt={cat.name}
                className="w-full h-full object-cover rounded-[13px]"
                loading="lazy"
              />
            </div>
            <span className="text-[10px] text-gray-600 text-center leading-tight font-semibold line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
