import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import {
  User, Store, FileText, MessageSquare, MapPin, Gift, Globe, Receipt, Briefcase,
  LogOut, Heart, ShoppingCart, Package, PlusCircle, ChevronLeft, HelpCircle, Settings
} from 'lucide-react';

export default function AccountPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  if (!state.isLoggedIn) {
    return (
      <div className="pb-20 animate-fade-in">
        <div className="flex flex-col items-center justify-center py-20 px-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <User size={48} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">مرحباً بك</h2>
          <p className="text-gray-500 text-sm text-center mb-6">سجل دخول للوصول لجميع المميزات</p>
          <button onClick={() => navigate('/login')} className="w-full gradient-primary text-white py-3.5 rounded-xl font-bold text-base">
            تسجيل الدخول
          </button>
          <button onClick={() => navigate('/register')} className="w-full mt-3 border-2 border-red-600 text-red-600 py-3 rounded-xl font-bold text-sm">
            إنشاء حساب جديد
          </button>
        </div>
      </div>
    );
  }

  const menuSections = [
    {
      title: null,
      items: [
        { icon: Heart, label: 'مفضلاتي', path: '/favorites', color: 'text-red-500' },
        { icon: ShoppingCart, label: 'عربتي', path: '/cart', color: 'text-green-600' },
        { icon: Package, label: 'طلباتي', path: '/orders', color: 'text-yellow-600' },
        { icon: PlusCircle, label: 'بيع', path: '/sell', color: 'text-blue-600' },
      ],
    },
    {
      title: 'حسابي',
      items: [
        { icon: User, label: 'حسابي', path: '/profile', color: 'text-gray-600' },
        { icon: Store, label: 'متجري', path: '/my-store', color: 'text-gray-600' },
        { icon: FileText, label: 'إعلاناتي', path: '/my-ads', color: 'text-gray-600' },
        { icon: MessageSquare, label: 'دردشاتي', path: '/messages', color: 'text-gray-600' },
        { icon: MapPin, label: 'عناويني', path: '/addresses', color: 'text-gray-600' },
      ],
    },
    {
      title: 'التفضيلات والإعدادات',
      items: [
        { icon: Gift, label: 'رمز الدعوة', path: '/invite', color: 'text-gray-600' },
        { icon: Globe, label: 'اللغة', path: '/language', color: 'text-gray-600' },
      ],
    },
    {
      title: 'المدفوعات والاشتراكات',
      items: [
        { icon: Receipt, label: 'سجل المعاملات', path: '/transactions', color: 'text-gray-600' },
        { icon: Briefcase, label: 'خطط الأعمال', path: '/business-plans', color: 'text-gray-600' },
      ],
    },
  ];

  return (
    <div className="pb-20 animate-fade-in">
      {/* Profile Header */}
      <div className="bg-white px-4 pt-6 pb-4">
        <div className="flex items-center gap-4 justify-end">
          <div className="text-right">
            <h2 className="text-lg font-bold text-gray-800">{state.user?.name}</h2>
            <p className="text-sm text-gray-500">{state.user?.phone}</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {state.user?.avatar ? (
              <img src={state.user.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-gray-400" />
            )}
          </div>
        </div>

        {/* Wallet & Points */}
        <div className="mt-4 bg-gray-50 rounded-xl p-3 flex items-center justify-between border border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">نقطة</span>
            <span className="text-yellow-500">🪙</span>
            <span className="font-bold text-sm">{state.user?.points || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">محفظة</span>
            <span className="text-green-500">💳</span>
            <span className="font-bold text-sm">IQD {(state.user?.walletBalance || 0).toLocaleString()}</span>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {menuSections[0].items.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
              >
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                <Icon size={20} className={item.color} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="mt-2">
        {menuSections.slice(1).map((section, sIdx) => (
          <div key={sIdx} className="bg-white mt-2">
            {section.title && (
              <div className="px-4 pt-4 pb-2">
                <h3 className="text-sm font-bold text-gray-800 text-right border-b border-gray-100 pb-2">{section.title}</h3>
              </div>
            )}
            {section.items.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft size={18} className="text-gray-400" />
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <Icon size={20} className={item.color} />
                  </div>
                </button>
              );
            })}
          </div>
        ))}

        {/* Admin Panel Link - Only for admins */}
        {state.isAdmin && (
          <div className="bg-white mt-2">
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50"
            >
              <ChevronLeft size={18} className="text-gray-400" />
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">لوحة الإدارة</span>
                <Settings size={20} className="text-purple-600" />
              </div>
            </button>
          </div>
        )}

        {/* Logout */}
        <div className="bg-white mt-2">
          <button
            onClick={() => { dispatch({ type: 'LOGOUT' }); navigate('/'); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-red-600 hover:bg-red-50 transition-all"
          >
            <span className="text-sm font-semibold">تسجيل خروج</span>
            <LogOut size={20} />
          </button>
        </div>

        {/* Help Button */}
        <div className="fixed bottom-20 left-4 z-40">
          <button className="bg-red-800 text-white rounded-full px-4 py-2.5 flex items-center gap-2 shadow-lg hover:bg-red-700 transition-all">
            <span className="text-xs font-semibold">أحتاج مساعدة</span>
            <HelpCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
