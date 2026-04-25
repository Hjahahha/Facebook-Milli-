import { Search, Bell } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const unreadCount = state.notifications.filter(n => !n.read).length;

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <button
        onClick={() => navigate('/notifications')}
        className="relative w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
      >
        <Bell size={20} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="بحث عن المنزل والحديقة"
          value={state.searchQuery}
          onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && state.searchQuery && navigate(`/search?q=${state.searchQuery}`)}
          className="w-full h-10 bg-gray-100 rounded-full pr-4 pl-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-red-300"
        />
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
