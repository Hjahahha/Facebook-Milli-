import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import {
  User, Store, FileText, MessageSquare, MapPin, Gift, Globe, Receipt, Briefcase,
  LogOut, Heart, ShoppingCart, Package, PlusCircle, ChevronLeft, HelpCircle, Settings,
  Crown, Wallet, Bell
} from 'lucide-react';

export default function AccountPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  if (!state.isLoggedIn) {
    return (
      <div className="pb-24 animate-fade-in min-h-screen bg-white">
        <div className="flex flex-col items-center justify-center py-20 px-8 animate-fade-in-up">
          <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl flex items-center justify-center mb-6 shadow-premium">
            <User size={48} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">مرحباً بك</h2>
          <p className="text-gray-400 text-sm text-center mb-8 font-medium">سجل دخول للوصول لجميع المميزات</p>
          <button onClick={() => navigate('/login')} className="w-full gradient-primary text-white py-4 rounded-2xl font-bold text-base shadow-glow-red btn-press">
            تسجيل الدخول
          </button>
          <button onClick={() => navigate('/register')} className="w-full mt-3 border-2 border-red-600 text-red-600 py-3.5 rounded-2xl font-bold text-sm hover:bg-red-50 transition-all btn-press">
            إنشاء حساب جديد
          </button>
        </div>
      </div>
    );
  }

  const quickActions = [
    { icon: Heart, label: 'مفضلاتي', path: '/favorites', color: 'from-red-400 to-rose-500', iconColor: 'text-white' },
    { icon: ShoppingCart, label: 'عربتي', path: '/cart', color: 'from-emerald-400 to-green-500', iconColor: 'text-white' },
    { icon: Package, label: 'طلباتي', path: '/orders', color: 'from-amber-400 to-yellow-500', iconColor: 'text-white' },
    { icon: PlusCircle, label: 'بيع', path: '/sell', color: 'from-blue-400 to-indigo-500', iconColor: 'text-white' },
  ];

  const menuSections = [
    {
      title: 'حسابي',
      items: [
        { icon: User, label: 'الملف الشخصي', path: '/profile' },
        { icon: Store, label: 'متجري', path: '/my-store' },
        { icon: FileText, label: 'إعلاناتي', path: '/my-ads' },
        { icon: MessageSquare, label: 'دردشاتي', path: '/messages' },
        { icon: MapPin, label: 'عناويني', path: '/addresses' },
        { icon: Bell, label: 'الإشعارات', path: '/notifications' },
      ],
    },
    {
      title: 'التفضيلات والإعدادات',
      items: [
        { icon: Gift, label: 'رمز الدعوة', path: '/invite' },
        { icon: Globe, label: 'اللغة', path: '/language' },
      ],
    },
    {
      title: 'المدفوعات والاشتراكات',
      items: [
        { icon: Wallet, label: 'محفظتي', path: '/wallet' },
        { icon: Receipt, label: 'سجل المعاملات', path: '/transactions' },
        { icon: Briefcase, label: 'خطط الأعمال', path: '/business-plans' },
      ],
    },
  ];

  return (
    <div className="pb-24 animate-fade-in bg-gray-50/50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 gradient-hero opacity-5" />
        <div className="relative z-10 px-4 pt-6 pb-5">
          <div className="flex items-center gap-4 justify-end">
            <div className="text-right">
              <h2 className="text-lg font-black text-gray-900">{state.user?.name}</h2>
              <p className="text-sm text-gray-400 font-medium">{state.user?.phone}</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-glow-red overflow-hidden">
              {state.user?.avatar ? (
                <img src={state.user.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-2xl font-black">{state.user?.name?.charAt(0)}</span>
              )}
            </div>
          </div>

          {/* Wallet & Points Card */}
          <div className="mt-4 bg-gradient-to-l from-gray-900 to-gray-800 rounded-2xl p-4 flex items-center justify-between shadow-premium-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-8 translate-x-8" />
            <div className="flex items-center gap-3">
              <div className="bg-white/10 rounded-xl px-3 py-1.5">
                <span className="text-[10px] text-gray-400 block">نقاط</span>
                <span className="text-white font-bold text-sm flex items-center gap-1">
                  <span>🪙</span> {state.user?.points || 0}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block">محفظة</span>
                <span className="text-white font-bold text-sm">IQD {(state.user?.walletBalance || 0).toLocaleString()}</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Wallet size={18} className="text-white" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 grid grid-cols-4 gap-2.5 stagger-children">
            {quickActions.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center gap-2 py-3 animate-fade-in-up btn-press"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-premium`}>
                    <Icon size={20} className={item.iconColor} />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-600">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="mt-2 space-y-2">
        {menuSections.map((section, sIdx) => (
          <div key={sIdx} className="bg-white">
            <div className="px-4 pt-4 pb-2">
              <h3 className="text-xs font-bold text-gray-400 text-right uppercase tracking-wider">{section.title}</h3>
            </div>
            <div className="divider-gradient mx-4" />
            {section.items.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-all duration-200 btn-press"
                >
                  <ChevronLeft size={16} className="text-gray-300" />
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                      <Icon size={16} className="text-gray-500" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}

        {/* Merchant / Admin Links */}
        <div className="bg-white">
          <button
            onClick={() => navigate('/merchant-join')}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-all btn-press"
          >
            <ChevronLeft size={16} className="text-gray-300" />
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-amber-600">انضم كتاجر</span>
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <Crown size={16} className="text-amber-500" />
              </div>
            </div>
          </button>

          {state.isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-all btn-press"
            >
              <ChevronLeft size={16} className="text-gray-300" />
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-purple-600">لوحة الإدارة</span>
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Settings size={16} className="text-purple-500" />
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Logout */}
        <div className="bg-white">
          <button
            onClick={() => { dispatch({ type: 'LOGOUT' }); navigate('/'); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-4 text-red-600 hover:bg-red-50 transition-all btn-press"
          >
            <span className="text-sm font-bold">تسجيل خروج</span>
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Help FAB */}
      <div className="fixed bottom-20 left-4 z-40">
        <button className="bg-gray-900 text-white rounded-2xl px-4 py-3 flex items-center gap-2 shadow-premium-xl hover:bg-gray-800 transition-all btn-press">
          <span className="text-xs font-bold">أحتاج مساعدة</span>
          <HelpCircle size={16} />
        </button>
      </div>
    </div>
  );
}
