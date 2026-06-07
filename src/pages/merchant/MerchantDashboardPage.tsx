import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import {
  ArrowRight, Package, BarChart3, ShoppingBag, MessageSquare, Star, Settings,
  TrendingUp, Users, DollarSign, Eye, PlusCircle, Bell, Layers, Image, FileText
} from 'lucide-react';

export default function MerchantDashboardPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const isPremium = state.user?.merchantTier === 'premium';

  const stats = [
    { label: 'المبيعات', value: '0', icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'الطلبات', value: '0', icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { label: 'المشاهدات', value: '0', icon: Eye, color: 'bg-purple-50 text-purple-600' },
    { label: 'المتابعين', value: '0', icon: Users, color: 'bg-orange-50 text-orange-600' },
  ];

  const standardFeatures = [
    { icon: Package, label: 'المنتجات', desc: 'إدارة المنتجات', path: '/merchant/products' },
    { icon: ShoppingBag, label: 'الطلبات', desc: 'عرض الطلبات', path: '/merchant/orders' },
    { icon: MessageSquare, label: 'الرسائل', desc: 'دردشة العملاء', path: '/messages' },
    { icon: Bell, label: 'الإشعارات', desc: 'إشعاراتك', path: '/notifications' },
  ];

  const premiumFeatures = [
    { icon: BarChart3, label: 'التقارير', desc: 'تحليلات متقدمة', path: '/merchant/analytics' },
    { icon: TrendingUp, label: 'الإحصائيات', desc: 'أداء المتجر', path: '/merchant/stats' },
    { icon: Star, label: 'التقييمات', desc: 'تقييمات العملاء', path: '/merchant/reviews' },
    { icon: Layers, label: 'المخزون', desc: 'إدارة المخزون', path: '/merchant/inventory' },
    { icon: Image, label: 'العروض', desc: 'عروض ترويجية', path: '/merchant/promotions' },
    { icon: FileText, label: 'الكوبونات', desc: 'إدارة الكوبونات', path: '/merchant/coupons' },
    { icon: Users, label: 'المسؤولين', desc: 'إدارة الفريق', path: '/merchant/team' },
    { icon: Settings, label: 'الإعدادات', desc: 'إعدادات المتجر', path: '/merchant/settings' },
  ];

  return (
    <div className="pb-20 animate-fade-in">
      <div className="gradient-primary px-4 py-4 flex items-center justify-between">
        <div />
        <h1 className="text-lg font-bold text-white">لوحة التاجر</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-white" /></button>
      </div>

      {/* Store Info */}
      <div className="gradient-primary px-4 pb-6">
        <div className="flex items-center gap-3 justify-end">
          <div className="text-right">
            <h2 className="text-white font-bold">{state.user?.name || 'متجرك'}</h2>
            <div className="flex items-center gap-2 justify-end mt-1">
              {isPremium ? (
                <span className="bg-yellow-400 text-yellow-900 text-[10px] px-2 py-0.5 rounded-full font-bold">مميز</span>
              ) : (
                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">عادي</span>
              )}
            </div>
          </div>
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🏪</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-4 gap-2 border border-gray-100">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-1`}>
                  <Icon size={18} />
                </div>
                <p className="text-sm font-bold text-gray-800">{stat.value}</p>
                <p className="text-[10px] text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Product Button */}
      <div className="px-4 mt-4">
        <button className="w-full bg-white border-2 border-dashed border-red-300 text-red-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all">
          <span>إضافة منتج جديد</span>
          <PlusCircle size={20} />
        </button>
      </div>

      {/* Standard Features */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3 text-right">الميزات الأساسية</h3>
        <div className="grid grid-cols-2 gap-3">
          {standardFeatures.map(f => {
            const Icon = f.icon;
            return (
              <button key={f.label} onClick={() => navigate(f.path)} className="bg-white rounded-xl p-4 text-right shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <Icon size={24} className="text-red-600 mb-2" />
                <p className="text-sm font-semibold text-gray-800">{f.label}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{f.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Premium Features */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3 text-right flex items-center gap-2 justify-end">
          <span>ميزات الباقة المميزة</span>
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {premiumFeatures.map(f => {
            const Icon = f.icon;
            const isLocked = !isPremium;
            return (
              <button
                key={f.label}
                onClick={() => isPremium ? navigate(f.path) : null}
                className={`rounded-xl p-4 text-right shadow-sm border transition-all relative ${
                  isLocked ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-white border-gray-100 hover:shadow-md'
                }`}
              >
                {isLocked && (
                  <div className="absolute top-2 left-2 text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-bold">
                    مميز
                  </div>
                )}
                <Icon size={24} className={isLocked ? 'text-gray-400 mb-2' : 'text-yellow-600 mb-2'} />
                <p className="text-sm font-semibold text-gray-800">{f.label}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{f.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {!isPremium && (
        <div className="px-4 mt-6">
          <div className="gradient-gold rounded-xl p-5 text-center text-white">
            <h3 className="font-bold text-lg mb-2">ترقية للباقة المميزة</h3>
            <p className="text-sm opacity-90 mb-4">احصل على جميع الميزات المتقدمة مقابل 99,000 دينار فقط</p>
            <button onClick={() => navigate('/merchant-join')} className="bg-white text-yellow-700 px-8 py-2.5 rounded-xl font-bold text-sm">
              ترقية الآن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
