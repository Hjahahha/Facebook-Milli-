import { Search, Bell, ScanLine } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const unreadCount = state.notifications.filter(n => !n.read).length;

  return (
    <div className="flex items-center gap-2.5 px-4 py-3" style={{ background: '#050505' }}>
      <button
        onClick={() => navigate('/notifications')}
        className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 btn-press"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Bell size={19} style={{ color: '#707070' }} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] text-[9px] rounded-full flex items-center justify-center font-bold animate-badge-pop shadow-glow-neon" style={{ background: '#00D4FF', color: '#050505' }}>
            {unreadCount}
          </span>
        )}
      </button>

      <button
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 btn-press"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <ScanLine size={19} style={{ color: '#707070' }} />
      </button>

      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="ابحث عن المنتجات..."
          value={state.searchQuery}
          onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && state.searchQuery && navigate(`/search?q=${state.searchQuery}`)}
          className="w-full h-10 rounded-xl pr-4 pl-10 text-sm outline-none transition-all duration-200"
          style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.06)',
            color: '#F5F5F5',
          }}
        />
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#707070' }} />
      </div>
    </div>
  );
}
