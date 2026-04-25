import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { useApp } from '../store/AppContext';

const categoryImages: Record<string, string[]> = {
  electronics: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120',
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=120',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=120',
  ],
  computers: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=120',
  ],
};

export default function CategoriesPage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(state.categories[0]?.id || '');
  const activeCat = state.categories.find(c => c.id === activeCategory);

  return (
    <div className="pb-20 animate-fade-in">
      {/* Search Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white">
        <button className="relative w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <Bell size={20} className="text-gray-600" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="بحث عن المنزل والحديقة"
            className="w-full h-10 bg-gray-100 rounded-full pr-4 pl-10 text-sm outline-none"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Right Sidebar - Category List */}
        <div className="w-1/3 bg-gray-50 border-l border-gray-200">
          {state.categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full text-right px-3 py-3.5 text-xs font-semibold border-b border-gray-100 transition-all ${
                activeCategory === cat.id
                  ? 'bg-white text-red-600 border-r-3 border-r-red-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Left Content - Subcategories */}
        <div className="flex-1 bg-white p-4 overflow-y-auto">
          {activeCat && (
            <div className="animate-fade-in">
              {activeCat.subcategories.map((sub, groupIndex) => (
                <div key={sub.id} className="mb-6">
                  {groupIndex === 0 && (
                    <h3 className="text-sm font-bold text-gray-800 mb-3 text-right">
                      {activeCat.name}
                    </h3>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    {activeCat.subcategories.slice(groupIndex * 3, groupIndex * 3 + 3).map(s => (
                      <button
                        key={s.id}
                        onClick={() => navigate(`/category/${activeCat.id}/${s.id}`)}
                        className="flex flex-col items-center gap-1.5 group"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 group-hover:shadow-md transition-all">
                          <img
                            src={categoryImages[activeCat.id]?.[0] || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=120'}
                            alt={s.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[10px] text-gray-600 text-center leading-tight">{s.name}</span>
                      </button>
                    ))}
                  </div>
                  {groupIndex === 0 && activeCat.subcategories.length > 3 && (
                    <button className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                      <span>أكثر</span>
                      <span>▼</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
