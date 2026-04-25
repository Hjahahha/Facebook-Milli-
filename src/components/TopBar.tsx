import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';

export default function TopBar() {
  const navigate = useNavigate();
  const { state } = useApp();

  const sections = [
    { id: 'ibazar', label: 'ابازار', icon: '🔴', color: 'bg-red-600 text-white' },
    { id: 'vehicles', label: 'مركبات', icon: '🚗', color: 'bg-white text-gray-800' },
    { id: 'realestate', label: 'العقارات', icon: '🏢', color: 'bg-white text-gray-800' },
    { id: 'marketplace', label: 'ماركت بليس', icon: '🏪', color: 'bg-white text-gray-800' },
  ];

  return (
    <div className="bg-gradient-to-l from-red-50 to-pink-50 px-4 pt-3 pb-2">
      <div className="flex gap-2 justify-center">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => section.id === 'ibazar' ? navigate('/') : navigate(`/section/${section.id}`)}
            className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl transition-all ${section.color} ${
              section.id === 'ibazar' ? 'shadow-md' : 'border border-gray-200 hover:shadow-sm'
            }`}
          >
            <span className="text-lg">{section.icon}</span>
            <span className="text-[11px] font-semibold">{section.label}</span>
          </button>
        ))}
      </div>
      {state.isAdmin && (
        <button
          onClick={() => navigate('/admin')}
          className="mt-2 w-full bg-gray-900 text-white text-xs py-2 rounded-lg font-bold hover:bg-gray-800 transition-all"
        >
          🛡️ لوحة الإدارة
        </button>
      )}
    </div>
  );
}
