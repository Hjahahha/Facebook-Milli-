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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 relative transition-all ${
                isActive ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                {tab.badge ? (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                ) : null}
                {isActive && tab.path === '/' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full" />
                )}
              </div>
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
