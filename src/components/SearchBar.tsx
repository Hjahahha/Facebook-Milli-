import { Search, Bell, ScanLine } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const unreadCount = state.notifications.filter(n => !n.read).length;

  return (
    <div className="flex items-center gap-2.5 px-4 py-3 bg-white">
      <button
        onClick={() => navigate('/notifications')}
        className="relative w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all duration-200 btn-press border border-gray-100"
      >
        <Bell size={19} className="text-gray-500" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold animate-badge-pop shadow-glow-red">
            {unreadCount}
          </span>
        )}
      </button>

      <button
        className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all duration-200 btn-press border border-gray-100"
      >
        <ScanLine size={19} className="text-gray-500" />
      </button>

      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="ابحث عن المنتجات..."
          value={state.searchQuery}
          onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && state.searchQuery && navigate(`/search?q=${state.searchQuery}`)}
          className="w-full h-10 bg-gray-50 rounded-xl pr-4 pl-10 text-sm text-gray-700 outline-none border border-gray-100 focus:border-red-300 focus:ring-2 focus:ring-red-100 focus:bg-white transition-all duration-200 placeholder:text-gray-400"
        />
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
