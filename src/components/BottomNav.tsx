import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid3X3, Tag, ShoppingCart, User } from 'lucide-react';
import { useApp } from '../store/AppContext';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useApp();
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const tabs = [
    { path: '/account', label: 'حسابي', icon: User },
    { path: '/cart', label: 'عربتي', icon: ShoppingCart, badge: cartCount },
    { path: '/deals', label: 'تخفيضات', icon: Tag },
    { path: '/categories', label: 'الفئات', icon: Grid3X3 },
    { path: '/', label: 'الرئيسية', icon: Home },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="max-w-lg mx-auto px-2 pb-1">
        <div className="glass rounded-2xl border border-white/40 shadow-premium-xl">
          <div className="flex items-center justify-around py-1.5">
            {tabs.map(tab => {
              const isActive = location.pathname === tab.path;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center gap-0.5 px-4 py-1.5 relative transition-all duration-300 btn-press rounded-xl ${
                    isActive ? 'text-red-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <div className="relative">
                    {isActive && (
                      <div className="absolute -inset-2 bg-red-50 rounded-xl animate-scale-in" />
                    )}
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} className="relative z-10" />
                    {tab.badge ? (
                      <span className="absolute -top-2.5 -right-2.5 bg-red-600 text-white text-[9px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold animate-badge-pop shadow-glow-red">
                        {tab.badge > 99 ? '99+' : tab.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className={`text-[10px] transition-all duration-300 ${isActive ? 'font-bold text-red-600' : 'font-medium'}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-0.5 w-5 h-0.5 bg-red-600 rounded-full animate-scale-in" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
