import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { Shield } from 'lucide-react';

export default function TopBar() {
  const navigate = useNavigate();
  const { state } = useApp();

  const sections = [
    { id: 'ibazar', label: 'متجر العراق', icon: '🛍️', active: true },
    { id: 'vehicles', label: 'مركبات', icon: '🚗', active: false },
    { id: 'realestate', label: 'العقارات', icon: '🏢', active: false },
    { id: 'marketplace', label: 'ماركت', icon: '🏪', active: false },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="gradient-hero px-4 pt-4 pb-3 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
        
        <div className="relative z-10">
          <div className="flex gap-2 justify-center">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => section.id === 'ibazar' ? navigate('/') : navigate(`/section/${section.id}`)}
                className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl transition-all duration-300 btn-press ${
                  section.active
                    ? 'bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg'
                    : 'hover:bg-white/10 border border-transparent'
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <span className={`text-[10px] font-bold ${section.active ? 'text-white' : 'text-white/70'}`}>
                  {section.label}
                </span>
              </button>
            ))}
          </div>

          {state.isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="mt-3 w-full bg-white/15 backdrop-blur-sm text-white text-xs py-2.5 rounded-xl font-bold hover:bg-white/25 transition-all duration-300 border border-white/20 flex items-center justify-center gap-2"
            >
              <Shield size={14} />
              <span>لوحة الإدارة</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
