import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Search } from 'lucide-react';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { state } = useApp();

  const results = state.products.filter(p =>
    p.name.includes(query) || p.description.includes(query) || p.category.includes(query)
  );

  return (
    <div className="pb-20 animate-fade-in">
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b sticky top-0 z-10">
        <div className="flex-1 relative">
          <input
            type="text"
            defaultValue={query}
            placeholder="بحث..."
            className="w-full h-10 bg-gray-100 rounded-full pr-4 pl-10 text-sm outline-none"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const val = (e.target as HTMLInputElement).value;
                navigate(`/search?q=${val}`);
              }
            }}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      <div className="px-4 pt-4">
        <p className="text-sm text-gray-500 mb-4 text-right">
          {results.length} نتيجة لـ &quot;{query}&quot;
        </p>
        <div className="grid grid-cols-2 gap-3">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {results.length === 0 && (
          <div className="text-center py-20">
            <Search size={64} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">لا توجد نتائج</p>
          </div>
        )}
      </div>
    </div>
  );
}
