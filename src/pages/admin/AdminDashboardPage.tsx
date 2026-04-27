import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import {
  ArrowRight, Users, Package, ShoppingBag, BarChart3, Image, Layers, Bell,
  Settings, Shield, FileText, MessageSquare, MapPin, Globe, CreditCard, Star,
  Truck, AlertTriangle, TrendingUp, PlusCircle, Trash2, Eye, EyeOff, Check, X,
  ChevronLeft
} from 'lucide-react';
import { generateId, formatDate, getStatusColor, getStatusText } from '../../utils/helpers';

type AdminTab = 'overview' | 'merchants' | 'products' | 'categories' | 'ads' | 'orders' | 'users' | 'notifications' | 'settings';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  if (!state.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield size={64} className="text-text-tertiary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text-primary mb-2">غير مصرح</h2>
          <p className="text-text-secondary mb-4">هذه الصفحة متاحة فقط لمدير التطبيق</p>
          <button onClick={() => navigate('/')} className="gradient-primary text-white px-6 py-2.5 rounded-xl font-bold">
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'المستخدمين', value: '1,248', icon: Users, color: 'text-blue-600 bg-blue-50', change: '+12%' },
    { label: 'المنتجات', value: state.products.length.toString(), icon: Package, color: 'text-green-600 bg-green-50', change: '+5%' },
    { label: 'الطلبات', value: state.orders.length.toString(), icon: ShoppingBag, color: 'text-purple-600 bg-purple-50', change: '+8%' },
    { label: 'الإيرادات', value: '2.5M', icon: CreditCard, color: 'text-orange-600 bg-orange-50', change: '+15%' },
  ];

  const menuItems: { id: AdminTab; label: string; icon: typeof Users }[] = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { id: 'merchants', label: 'طلبات التجار', icon: Star },
    { id: 'products', label: 'المنتجات', icon: Package },
    { id: 'categories', label: 'الفئات', icon: Layers },
    { id: 'ads', label: 'الإعلانات', icon: Image },
    { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
    { id: 'users', label: 'المستخدمين', icon: Users },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="gradient-dark px-4 py-4 flex items-center justify-between">
        <div />
        <h1 className="text-lg font-bold text-white flex items-center gap-2">
          <span>لوحة الإدارة</span>
          <Shield size={20} />
        </h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-white" /></button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-900 px-2 py-2 overflow-x-auto hide-scrollbar">
        <div className="flex gap-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === item.id ? 'bg-sovereign-card text-text-primary' : 'text-text-tertiary hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-4">
        {activeTab === 'overview' && <OverviewTab stats={stats} />}
        {activeTab === 'merchants' && <MerchantsTab />}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'categories' && <CategoriesTab />}
        {activeTab === 'ads' && <AdsTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
}

function OverviewTab({ stats }: { stats: { label: string; value: string; icon: typeof Users; color: string; change: string }[] }) {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-sovereign-card rounded-xl p-4 shadow-sm border border-glass-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-500 text-xs font-bold">{stat.change}</span>
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-secondary">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <h3 className="font-bold text-text-primary mb-3 text-right">إجراءات سريعة</h3>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'إضافة منتج', icon: Package, color: 'text-blue-600' },
          { label: 'إضافة فئة', icon: Layers, color: 'text-green-600' },
          { label: 'إضافة إعلان', icon: Image, color: 'text-purple-600' },
          { label: 'إرسال إشعار', icon: Bell, color: 'text-orange-600' },
          { label: 'إدارة التجار', icon: Star, color: 'text-yellow-600' },
          { label: 'التقارير', icon: TrendingUp, color: 'text-neon' },
        ].map(action => {
          const Icon = action.icon;
          return (
            <button key={action.label} className="bg-sovereign-card rounded-xl p-3 text-center shadow-sm border border-glass-border hover:shadow-md transition-all">
              <Icon size={24} className={`${action.color} mx-auto mb-1`} />
              <p className="text-[10px] text-text-primary font-medium">{action.label}</p>
            </button>
          );
        })}
      </div>

      {/* Recent Activity */}
      <h3 className="font-bold text-text-primary mt-6 mb-3 text-right">النشاط الأخير</h3>
      <div className="bg-sovereign-card rounded-xl shadow-sm border border-glass-border divide-y">
        {[
          { text: 'تم تسجيل مستخدم جديد', time: 'منذ 5 دقائق', icon: Users },
          { text: 'طلب انضمام تاجر جديد', time: 'منذ 15 دقيقة', icon: Star },
          { text: 'طلب جديد #A4521', time: 'منذ 30 دقيقة', icon: ShoppingBag },
          { text: 'تم تحديث المنتج', time: 'منذ ساعة', icon: Package },
        ].map((activity, i) => {
          const Icon = activity.icon;
          return (
            <div key={i} className="flex items-center justify-between p-3">
              <span className="text-[10px] text-text-tertiary">{activity.time}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-primary">{activity.text}</span>
                <Icon size={16} className="text-text-tertiary" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MerchantsTab() {
  const { state, dispatch } = useApp();

  return (
    <div className="animate-fade-in">
      <h3 className="font-bold text-text-primary mb-3 text-right">طلبات انضمام التجار ({state.merchantApplications.length})</h3>
      {state.merchantApplications.length === 0 ? (
        <div className="text-center py-10">
          <Star size={48} className="text-sovereign-border mx-auto mb-3" />
          <p className="text-text-tertiary">لا توجد طلبات حالياً</p>
        </div>
      ) : (
        <div className="space-y-3">
          {state.merchantApplications.map(app => (
            <div key={app.id} className="bg-sovereign-card rounded-xl p-4 shadow-sm border border-glass-border">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${getStatusColor(app.status)}`}>
                  {getStatusText(app.status)}
                </span>
                <div className="text-right">
                  <h4 className="font-bold text-text-primary">{app.businessName}</h4>
                  <p className="text-xs text-text-secondary">{app.userName} - {app.userPhone}</p>
                </div>
              </div>
              <div className="text-xs text-text-secondary space-y-1 mb-3">
                <p className="text-right">النوع: {app.businessType}</p>
                <p className="text-right">المدينة: {app.city}</p>
                <p className="text-right">الباقة: <span className={app.tier === 'premium' ? 'text-yellow-600 font-bold' : 'text-text-secondary'}>{app.tier === 'premium' ? 'مميزة (99,000 دينار)' : 'عادية (25,000 دينار)'}</span></p>
                <p className="text-right">التاريخ: {formatDate(app.createdAt)}</p>
              </div>
              {app.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch({ type: 'UPDATE_MERCHANT_APPLICATION', payload: { id: app.id, status: 'rejected' } })}
                    className="flex-1 bg-sovereign-card text-neon py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <X size={14} /> رفض
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'UPDATE_MERCHANT_APPLICATION', payload: { id: app.id, status: 'approved' } })}
                    className="flex-1 bg-green-50 text-green-600 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <Check size={14} /> قبول
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductsTab() {
  const { state, dispatch } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '' });

  const handleAddProduct = () => {
    const product = {
      id: generateId(),
      name: newProduct.name,
      price: parseInt(newProduct.price) || 0,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300',
      category: newProduct.category || 'other',
      description: newProduct.description,
      merchantId: 'admin',
      merchantName: 'متجر العراق',
      rating: 5,
      reviewCount: 0,
      inStock: true,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_PRODUCT', payload: product });
    setShowAdd(false);
    setNewProduct({ name: '', price: '', category: '', description: '' });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setShowAdd(!showAdd)} className="bg-neon text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
          <PlusCircle size={14} /> إضافة منتج
        </button>
        <h3 className="font-bold text-text-primary">المنتجات ({state.products.length})</h3>
      </div>

      {showAdd && (
        <div className="bg-sovereign-card rounded-xl p-4 mb-4 shadow-sm border border-sovereign-border space-y-3 animate-slide-up">
          <input value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="اسم المنتج" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border" />
          <input value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="السعر (دينار)" type="number" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border" />
          <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border">
            <option value="">اختر الفئة</option>
            <option value="electronics">إلكترونيات</option>
            <option value="fashion">ملابس</option>
            <option value="home">المنزل</option>
            <option value="beauty">العناية والجمال</option>
          </select>
          <textarea value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="وصف المنتج" className="w-full h-20 bg-sovereign-surface rounded-lg p-3 text-sm text-right outline-none border resize-none" />
          <button onClick={handleAddProduct} className="w-full bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm">حفظ المنتج</button>
        </div>
      )}

      <div className="space-y-2">
        {state.products.map(p => (
          <div key={p.id} className="bg-sovereign-card rounded-xl p-3 shadow-sm border border-glass-border flex items-center gap-3">
            <button onClick={() => dispatch({ type: 'REMOVE_PRODUCT', payload: p.id })} className="text-red-400 hover:text-neon">
              <Trash2 size={16} />
            </button>
            <div className="flex-1 text-right">
              <p className="text-sm font-semibold line-clamp-1">{p.name}</p>
              <p className="text-xs text-neon font-bold">{p.price.toLocaleString()} دينار</p>
            </div>
            <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoriesTab() {
  const { state, dispatch } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', icon: '' });

  const handleAddCategory = () => {
    const category = {
      id: generateId(),
      name: newCat.name,
      icon: newCat.icon || '📦',
      subcategories: [],
    };
    dispatch({ type: 'ADD_CATEGORY', payload: category });
    setShowAdd(false);
    setNewCat({ name: '', icon: '' });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setShowAdd(!showAdd)} className="bg-neon text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
          <PlusCircle size={14} /> إضافة فئة
        </button>
        <h3 className="font-bold text-text-primary">الفئات ({state.categories.length})</h3>
      </div>

      {showAdd && (
        <div className="bg-sovereign-card rounded-xl p-4 mb-4 shadow-sm border border-sovereign-border space-y-3 animate-slide-up">
          <input value={newCat.name} onChange={e => setNewCat({ ...newCat, name: e.target.value })} placeholder="اسم الفئة" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border" />
          <input value={newCat.icon} onChange={e => setNewCat({ ...newCat, icon: e.target.value })} placeholder="أيقونة (إيموجي)" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border" />
          <button onClick={handleAddCategory} className="w-full bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm">حفظ الفئة</button>
        </div>
      )}

      <div className="space-y-2">
        {state.categories.map(c => (
          <div key={c.id} className="bg-sovereign-card rounded-xl p-3 shadow-sm border border-glass-border flex items-center justify-between">
            <button onClick={() => dispatch({ type: 'REMOVE_CATEGORY', payload: c.id })} className="text-red-400 hover:text-neon">
              <Trash2 size={16} />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-text-secondary">{c.subcategories.length} فئة فرعية</p>
              </div>
              <span className="text-2xl">{c.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdsTab() {
  const { state, dispatch } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newAd, setNewAd] = useState({ title: '', image: '', link: '' });

  const handleAddAd = () => {
    const ad = {
      id: generateId(),
      title: newAd.title,
      image: newAd.image || 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800',
      link: newAd.link,
      active: true,
      position: 'banner' as const,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_AD', payload: ad });
    setShowAdd(false);
    setNewAd({ title: '', image: '', link: '' });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setShowAdd(!showAdd)} className="bg-neon text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
          <PlusCircle size={14} /> إضافة إعلان
        </button>
        <h3 className="font-bold text-text-primary">الإعلانات ({state.ads.length})</h3>
      </div>

      {showAdd && (
        <div className="bg-sovereign-card rounded-xl p-4 mb-4 shadow-sm border border-sovereign-border space-y-3 animate-slide-up">
          <input value={newAd.title} onChange={e => setNewAd({ ...newAd, title: e.target.value })} placeholder="عنوان الإعلان" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border" />
          <input value={newAd.image} onChange={e => setNewAd({ ...newAd, image: e.target.value })} placeholder="رابط الصورة" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border" />
          <input value={newAd.link} onChange={e => setNewAd({ ...newAd, link: e.target.value })} placeholder="رابط الإعلان (اختياري)" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border" />
          <button onClick={handleAddAd} className="w-full bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm">حفظ الإعلان</button>
        </div>
      )}

      <div className="space-y-3">
        {state.ads.map(ad => (
          <div key={ad.id} className="bg-sovereign-card rounded-xl overflow-hidden shadow-sm border border-glass-border">
            <img src={ad.image} alt={ad.title} className="w-full h-32 object-cover" />
            <div className="p-3 flex items-center justify-between">
              <div className="flex gap-2">
                <button onClick={() => dispatch({ type: 'REMOVE_AD', payload: ad.id })} className="text-red-400"><Trash2 size={16} /></button>
                <button onClick={() => dispatch({ type: 'TOGGLE_AD', payload: ad.id })} className={ad.active ? 'text-green-500' : 'text-text-tertiary'}>
                  {ad.active ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{ad.title}</p>
                <p className="text-[10px] text-text-secondary">{ad.active ? 'نشط' : 'متوقف'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersTab() {
  const { state, dispatch } = useApp();

  return (
    <div className="animate-fade-in">
      <h3 className="font-bold text-text-primary mb-3 text-right">الطلبات ({state.orders.length})</h3>
      {state.orders.length === 0 ? (
        <div className="text-center py-10">
          <ShoppingBag size={48} className="text-sovereign-border mx-auto mb-3" />
          <p className="text-text-tertiary">لا توجد طلبات</p>
        </div>
      ) : (
        <div className="space-y-3">
          {state.orders.map(order => (
            <div key={order.id} className="bg-sovereign-card rounded-xl p-4 shadow-sm border border-glass-border">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
                <p className="text-sm font-bold text-text-primary">#{order.id.slice(0, 6)}</p>
              </div>
              <p className="text-xs text-text-secondary text-right">{order.items.length} منتج - {order.total.toLocaleString()} دينار</p>
              <p className="text-[10px] text-text-tertiary text-right mt-1">{formatDate(order.createdAt)}</p>
              <div className="flex gap-2 mt-3">
                {['confirmed', 'shipped', 'delivered'].map(s => (
                  <button
                    key={s}
                    onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId: order.id, status: s as 'confirmed' | 'shipped' | 'delivered' } })}
                    className="flex-1 bg-sovereign-surface text-text-secondary py-1.5 rounded-lg text-[10px] font-bold hover:bg-sovereign-card"
                  >
                    {getStatusText(s)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UsersTab() {
  return (
    <div className="animate-fade-in">
      <h3 className="font-bold text-text-primary mb-3 text-right">المستخدمين</h3>
      <div className="bg-sovereign-card rounded-xl shadow-sm border border-glass-border divide-y">
        {[
          { name: 'أحمد محمد', phone: '0770123456', status: 'نشط', role: 'مستخدم' },
          { name: 'فاطمة علي', phone: '0781234567', status: 'نشط', role: 'تاجر مميز' },
          { name: 'حسين كريم', phone: '0750987654', status: 'معلق', role: 'تاجر عادي' },
          { name: 'زينب عباس', phone: '0771456789', status: 'نشط', role: 'مستخدم' },
          { name: 'علي حسن', phone: '0782345678', status: 'نشط', role: 'مستخدم' },
        ].map((user, i) => (
          <div key={i} className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${user.status === 'نشط' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                {user.status}
              </span>
              <span className="text-[10px] text-text-tertiary">{user.role}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-text-primary">{user.name}</p>
              <p className="text-xs text-text-secondary">{user.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsTab() {
  const { dispatch } = useApp();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const sendNotification = () => {
    if (!title || !message) return;
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: generateId(), title, message, type: 'system', read: false, createdAt: new Date().toISOString() } });
    setTitle('');
    setMessage('');
  };

  return (
    <div className="animate-fade-in">
      <h3 className="font-bold text-text-primary mb-3 text-right">إرسال إشعار جماعي</h3>
      <div className="bg-sovereign-card rounded-xl p-4 shadow-sm border border-glass-border space-y-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="عنوان الإشعار" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border" />
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="نص الإشعار" className="w-full h-24 bg-sovereign-surface rounded-lg p-3 text-sm text-right outline-none border resize-none" />
        <div className="flex gap-2">
          <button className="flex-1 bg-sovereign-card text-text-primary py-2.5 rounded-lg text-sm font-bold">للتجار فقط</button>
          <button onClick={sendNotification} className="flex-1 gradient-primary text-white py-2.5 rounded-lg text-sm font-bold">إرسال للجميع</button>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="animate-fade-in">
      <h3 className="font-bold text-text-primary mb-3 text-right">إعدادات التطبيق</h3>
      <div className="space-y-3">
        {[
          { label: 'اسم التطبيق', value: 'متجر العراق', icon: Globe },
          { label: 'العملة', value: 'دينار عراقي (IQD)', icon: CreditCard },
          { label: 'رسوم التوصيل', value: 'مجاني', icon: Truck },
          { label: 'حد الطلب الأدنى', value: '10,000 دينار', icon: AlertTriangle },
          { label: 'WhatsApp الإدارة', value: '+9647506747685', icon: MessageSquare },
          { label: 'البريد الإلكتروني', value: 'admin@iraqstore.com', icon: FileText },
          { label: 'الموقع', value: 'بغداد، العراق', icon: MapPin },
        ].map(setting => {
          const Icon = setting.icon;
          return (
            <div key={setting.label} className="bg-sovereign-card rounded-xl p-4 shadow-sm border border-glass-border flex items-center justify-between">
              <ChevronLeft size={18} className="text-text-tertiary" />
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-text-primary">{setting.label}</p>
                  <p className="text-xs text-text-secondary">{setting.value}</p>
                </div>
                <Icon size={20} className="text-text-tertiary" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
