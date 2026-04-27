import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { Shield } from 'lucide-react';

const modules = [
  { id: 'store', path: '/', label: 'المتجر', icon: '🛍️', accent: '#00D4FF', accentBg: 'rgba(0,212,255,0.15)', borderColor: 'rgba(0,212,255,0.3)' },
  { id: 'cars', path: '/cars', label: 'السيارات', icon: '🚗', accent: '#FF1744', accentBg: 'rgba(255,23,68,0.15)', borderColor: 'rgba(255,23,68,0.3)' },
  { id: 'realestate', path: '/realestate', label: 'العقارات', icon: '🏢', accent: '#00E676', accentBg: 'rgba(0,230,118,0.15)', borderColor: 'rgba(0,230,118,0.3)' },
  { id: 'services', path: '/services', label: 'الخدمات', icon: '🔧', accent: '#FF6D00', accentBg: 'rgba(255,109,0,0.15)', borderColor: 'rgba(255,109,0,0.3)' },
];

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useApp();

  const getActiveModule = () => {
    const path = location.pathname;
    if (path.startsWith('/cars')) return 'cars';
    if (path.startsWith('/realestate')) return 'realestate';
    if (path.startsWith('/services')) return 'services';
    return 'store';
  };

  const activeModule = getActiveModule();

  return (
    <div className="relative overflow-hidden">
      <div className="px-4 pt-4 pb-3 relative" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #050505 100%)' }}>
        {/* Subtle glow based on active module */}
        <div className="absolute inset-0 opacity-20" style={{
          background: `radial-gradient(circle at 50% 0%, ${modules.find(m => m.id === activeModule)?.accent || '#00D4FF'}33, transparent 60%)`
        }} />
        
        <div className="relative z-10">
          {/* Logo */}
          <div className="text-center mb-3">
            <h1 className="text-lg font-black text-text-primary">المنصة السيادية</h1>
            <p className="text-[9px] font-bold tracking-[3px] text-neon">SOVEREIGN PLATFORM</p>
          </div>

          <div className="flex gap-2 justify-center">
            {modules.map(mod => {
              const isActive = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => navigate(mod.path)}
                  className="flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl transition-all duration-300 btn-press"
                  style={{
                    background: isActive ? mod.accentBg : 'transparent',
                    border: `1px solid ${isActive ? mod.borderColor : 'transparent'}`,
                    boxShadow: isActive ? `0 4px 15px ${mod.accent}22` : 'none'
                  }}
                >
                  <span className="text-xl">{mod.icon}</span>
                  <span className="text-[10px] font-bold" style={{ color: isActive ? mod.accent : '#707070' }}>
                    {mod.label}
                  </span>
                </button>
              );
            })}
          </div>

          {state.isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="mt-3 w-full text-white text-xs py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: 'rgba(255,23,68,0.1)',
                border: '1px solid rgba(255,23,68,0.2)'
              }}
            >
              <Shield size={14} className="text-error" />
              <span className="text-error">لوحة الإدارة</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
