import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import {
  ArrowRight, Users, Package, ShoppingBag, BarChart3, Image, Layers, Bell,
  Settings, Shield, FileText, MessageSquare, MapPin, Globe, CreditCard, Star,
  Truck, AlertTriangle, PlusCircle, Trash2, Eye, EyeOff, Check, X,
  ChevronLeft, Edit3, Camera, Save, Upload, Search
} from 'lucide-react';
import { generateId, formatDate, getStatusColor, getStatusText, formatPrice } from '../../utils/helpers';
import { pickAndConvertImage } from '../../utils/imageUpload';

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

  const totalRevenue = state.orders.reduce((sum, o) => sum + o.total, 0);
  const stats = [
    { label: 'المستخدمين', value: state.merchantApplications.length > 0 ? (state.merchantApplications.length + 5).toString() : '5', icon: Users, color: 'text-blue-600 bg-blue-50', change: '+12%' },
    { label: 'المنتجات', value: state.products.length.toString(), icon: Package, color: 'text-green-600 bg-green-50', change: `${state.products.length}` },
    { label: 'الطلبات', value: state.orders.length.toString(), icon: ShoppingBag, color: 'text-purple-600 bg-purple-50', change: `${state.orders.length}` },
    { label: 'الإيرادات', value: totalRevenue > 0 ? formatPrice(totalRevenue) : '0', icon: CreditCard, color: 'text-orange-600 bg-orange-50', change: totalRevenue > 0 ? '+15%' : '0%' },
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
      <div className="gradient-dark px-4 py-4 flex items-center justify-between">
        <div />
        <h1 className="text-lg font-bold text-white flex items-center gap-2">
          <span>لوحة الإدارة</span>
          <Shield size={20} />
        </h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-white" /></button>
      </div>

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
        {activeTab === 'overview' && <OverviewTab stats={stats} setActiveTab={setActiveTab} />}
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

function OverviewTab({ stats, setActiveTab }: { stats: { label: string; value: string; icon: typeof Users; color: string; change: string }[]; setActiveTab: (tab: AdminTab) => void }) {
  const { state } = useApp();
  const pendingMerchants = state.merchantApplications.filter(a => a.status === 'pending').length;
  const pendingOrders = state.orders.filter(o => o.status === 'pending').length;

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

      {(pendingMerchants > 0 || pendingOrders > 0) && (
        <div className="mb-6 space-y-2">
          {pendingMerchants > 0 && (
            <button onClick={() => setActiveTab('merchants')} className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between">
              <ChevronLeft size={16} className="text-amber-500" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-amber-500 font-bold">{pendingMerchants} طلب تاجر بانتظار الموافقة</span>
                <AlertTriangle size={16} className="text-amber-500" />
              </div>
            </button>
          )}
          {pendingOrders > 0 && (
            <button onClick={() => setActiveTab('orders')} className="w-full bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 flex items-center justify-between">
              <ChevronLeft size={16} className="text-blue-500" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-500 font-bold">{pendingOrders} طلب جديد بانتظار التأكيد</span>
                <ShoppingBag size={16} className="text-blue-500" />
              </div>
            </button>
          )}
        </div>
      )}

      <h3 className="font-bold text-text-primary mb-3 text-right">إجراءات سريعة</h3>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'إضافة منتج', icon: Package, color: 'text-blue-600', tab: 'products' as AdminTab },
          { label: 'إضافة فئة', icon: Layers, color: 'text-green-600', tab: 'categories' as AdminTab },
          { label: 'إضافة إعلان', icon: Image, color: 'text-purple-600', tab: 'ads' as AdminTab },
          { label: 'إرسال إشعار', icon: Bell, color: 'text-orange-600', tab: 'notifications' as AdminTab },
          { label: 'إدارة التجار', icon: Star, color: 'text-yellow-600', tab: 'merchants' as AdminTab },
          { label: 'الإعدادات', icon: Settings, color: 'text-neon', tab: 'settings' as AdminTab },
        ].map(action => {
          const Icon = action.icon;
          return (
            <button key={action.label} onClick={() => setActiveTab(action.tab)} className="bg-sovereign-card rounded-xl p-3 text-center shadow-sm border border-glass-border hover:shadow-md transition-all">
              <Icon size={24} className={`${action.color} mx-auto mb-1`} />
              <p className="text-[10px] text-text-primary font-medium">{action.label}</p>
            </button>
          );
        })}
      </div>

      <h3 className="font-bold text-text-primary mt-6 mb-3 text-right">النشاط الأخير</h3>
      <div className="bg-sovereign-card rounded-xl shadow-sm border border-glass-border divide-y divide-glass-border">
        {state.notifications.slice(0, 5).map((notif, i) => (
          <div key={notif.id || i} className="flex items-center justify-between p-3">
            <span className="text-[10px] text-text-tertiary">{formatDate(notif.createdAt)}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-primary line-clamp-1">{notif.title}: {notif.message.slice(0, 40)}...</span>
              <Bell size={14} className="text-text-tertiary flex-shrink-0" />
            </div>
          </div>
        ))}
        {state.notifications.length === 0 && (
          <div className="p-4 text-center text-text-tertiary text-sm">لا يوجد نشاط حديث</div>
        )}
      </div>
    </div>
  );
}

function MerchantsTab() {
  const { state, dispatch } = useApp();

  const handleApprove = (app: typeof state.merchantApplications[0]) => {
    dispatch({ type: 'UPDATE_MERCHANT_APPLICATION', payload: { id: app.id, status: 'approved' } });
    dispatch({ type: 'ADD_NOTIFICATION', payload: {
      id: generateId(), title: 'تمت الموافقة', message: `تمت الموافقة على طلب التاجر ${app.businessName}`, type: 'merchant', read: false, createdAt: new Date().toISOString()
    }});
  };

  const handleReject = (app: typeof state.merchantApplications[0]) => {
    dispatch({ type: 'UPDATE_MERCHANT_APPLICATION', payload: { id: app.id, status: 'rejected' } });
    dispatch({ type: 'ADD_NOTIFICATION', payload: {
      id: generateId(), title: 'تم الرفض', message: `تم رفض طلب التاجر ${app.businessName}`, type: 'merchant', read: false, createdAt: new Date().toISOString()
    }});
  };

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
                <p className="text-right">العنوان: {app.businessAddress}</p>
                <p className="text-right">المدينة: {app.city}</p>
                <p className="text-right">الهوية الوطنية: {app.nationalId}</p>
                <p className="text-right">الوصف: {app.businessDescription}</p>
                <p className="text-right">الباقة: <span className={app.tier === 'premium' ? 'text-yellow-600 font-bold' : 'text-text-secondary'}>{app.tier === 'premium' ? 'مميزة (99,000 دينار)' : 'عادية (25,000 دينار)'}</span></p>
                <p className="text-right">التاريخ: {formatDate(app.createdAt)}</p>
              </div>
              {app.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReject(app)}
                    className="flex-1 bg-sovereign-card text-neon py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 border border-glass-border"
                  >
                    <X size={14} /> رفض
                  </button>
                  <button
                    onClick={() => handleApprove(app)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1"
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '', image: '', originalPrice: '', discount: '' });

  const handlePickImage = async () => {
    const dataUrl = await pickAndConvertImage();
    if (dataUrl) setNewProduct({ ...newProduct, image: dataUrl });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const existingProduct = editingId ? state.products.find(p => p.id === editingId) : null;
    const product = {
      id: editingId || generateId(),
      name: newProduct.name,
      price: parseInt(newProduct.price) || 0,
      originalPrice: newProduct.originalPrice ? parseInt(newProduct.originalPrice) : undefined,
      discount: newProduct.discount ? parseInt(newProduct.discount) : undefined,
      image: newProduct.image || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300',
      category: newProduct.category || 'other',
      description: newProduct.description,
      merchantId: existingProduct?.merchantId || 'admin',
      merchantName: existingProduct?.merchantName || state.appSettings.appName,
      rating: existingProduct?.rating ?? 5,
      reviewCount: existingProduct?.reviewCount ?? 0,
      inStock: existingProduct?.inStock ?? true,
      featured: existingProduct?.featured,
      createdAt: existingProduct?.createdAt || new Date().toISOString(),
    };
    if (editingId) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: product });
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: product });
    }
    setShowAdd(false);
    setEditingId(null);
    setNewProduct({ name: '', price: '', category: '', description: '', image: '', originalPrice: '', discount: '' });
  };

  const handleEdit = (p: typeof state.products[0]) => {
    setEditingId(p.id);
    setNewProduct({
      name: p.name,
      price: p.price.toString(),
      category: p.category,
      description: p.description,
      image: p.image,
      originalPrice: p.originalPrice?.toString() || '',
      discount: p.discount?.toString() || '',
    });
    setShowAdd(true);
  };

  const filtered = state.products.filter(p =>
    !searchFilter || p.name.includes(searchFilter) || p.category.includes(searchFilter)
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => { setShowAdd(!showAdd); setEditingId(null); setNewProduct({ name: '', price: '', category: '', description: '', image: '', originalPrice: '', discount: '' }); }} className="bg-neon text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
          <PlusCircle size={14} /> إضافة منتج
        </button>
        <h3 className="font-bold text-text-primary">المنتجات ({state.products.length})</h3>
      </div>

      <div className="relative mb-3">
        <input
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
          placeholder="بحث في المنتجات..."
          className="w-full h-10 bg-sovereign-surface rounded-lg pr-10 pl-3 text-sm text-right outline-none border border-glass-border"
        />
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
      </div>

      {showAdd && (
        <div className="bg-sovereign-card rounded-xl p-4 mb-4 shadow-sm border border-sovereign-border space-y-3 animate-slide-up">
          <h4 className="text-sm font-bold text-text-primary text-right">{editingId ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h4>

          <div className="flex justify-center">
            <button onClick={handlePickImage} className="w-32 h-32 bg-sovereign-surface rounded-xl border-2 border-dashed border-glass-border flex flex-col items-center justify-center gap-2 hover:border-neon transition-colors overflow-hidden">
              {newProduct.image ? (
                <img src={newProduct.image} alt="" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <>
                  <Camera size={28} className="text-text-tertiary" />
                  <span className="text-[10px] text-text-tertiary">اختر صورة</span>
                </>
              )}
            </button>
          </div>

          <input value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="اسم المنتج *" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border focus:border-neon" />
          <div className="grid grid-cols-2 gap-2">
            <input value={newProduct.originalPrice} onChange={e => setNewProduct({ ...newProduct, originalPrice: e.target.value })} placeholder="السعر الأصلي" type="number" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border" />
            <input value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="السعر (دينار) *" type="number" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border focus:border-neon" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input value={newProduct.discount} onChange={e => setNewProduct({ ...newProduct, discount: e.target.value })} placeholder="نسبة الخصم %" type="number" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border" />
            <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border">
              <option value="">اختر الفئة</option>
              {state.categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <textarea value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="وصف المنتج" className="w-full h-20 bg-sovereign-surface rounded-lg p-3 text-sm text-right outline-none border border-glass-border resize-none" />
          <div className="flex gap-2">
            <button onClick={() => { setShowAdd(false); setEditingId(null); }} className="flex-1 bg-sovereign-surface text-text-secondary py-2.5 rounded-lg font-bold text-sm">إلغاء</button>
            <button onClick={handleAddProduct} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-1">
              <Save size={14} /> {editingId ? 'تحديث' : 'حفظ'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {filtered.map(p => (
          <div key={p.id} className="bg-sovereign-card rounded-xl p-3 shadow-sm border border-glass-border flex items-center gap-3">
            <div className="flex gap-1">
              <button onClick={() => dispatch({ type: 'REMOVE_PRODUCT', payload: p.id })} className="text-red-400 hover:text-red-300 p-1">
                <Trash2 size={14} />
              </button>
              <button onClick={() => handleEdit(p)} className="text-blue-400 hover:text-blue-300 p-1">
                <Edit3 size={14} />
              </button>
            </div>
            <div className="flex-1 text-right">
              <p className="text-sm font-semibold line-clamp-1 text-text-primary">{p.name}</p>
              <div className="flex items-center gap-2 justify-end">
                <p className="text-xs text-neon font-bold">{p.price.toLocaleString()} دينار</p>
                {p.discount && <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">-{p.discount}%</span>}
              </div>
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCat, setNewCat] = useState({ name: '', icon: '' });
  const [newSubcat, setNewSubcat] = useState({ catId: '', name: '' });
  const [showSubcatForm, setShowSubcatForm] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (!newCat.name) return;
    if (editingId) {
      const existing = state.categories.find(c => c.id === editingId);
      if (existing) {
        dispatch({ type: 'UPDATE_CATEGORY', payload: { ...existing, name: newCat.name, icon: newCat.icon || existing.icon } });
      }
    } else {
      const category = {
        id: generateId(),
        name: newCat.name,
        icon: newCat.icon || '📦',
        subcategories: [],
      };
      dispatch({ type: 'ADD_CATEGORY', payload: category });
    }
    setShowAdd(false);
    setEditingId(null);
    setNewCat({ name: '', icon: '' });
  };

  const handleAddSubcategory = (catId: string) => {
    if (!newSubcat.name) return;
    const cat = state.categories.find(c => c.id === catId);
    if (cat) {
      dispatch({ type: 'UPDATE_CATEGORY', payload: {
        ...cat,
        subcategories: [...cat.subcategories, { id: generateId(), name: newSubcat.name, parentId: catId }]
      }});
    }
    setNewSubcat({ catId: '', name: '' });
    setShowSubcatForm(null);
  };

  const handleRemoveSubcategory = (catId: string, subId: string) => {
    const cat = state.categories.find(c => c.id === catId);
    if (cat) {
      dispatch({ type: 'UPDATE_CATEGORY', payload: {
        ...cat,
        subcategories: cat.subcategories.filter(s => s.id !== subId)
      }});
    }
  };

  const handleEditCategory = (c: typeof state.categories[0]) => {
    setEditingId(c.id);
    setNewCat({ name: c.name, icon: c.icon });
    setShowAdd(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => { setShowAdd(!showAdd); setEditingId(null); setNewCat({ name: '', icon: '' }); }} className="bg-neon text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
          <PlusCircle size={14} /> إضافة فئة
        </button>
        <h3 className="font-bold text-text-primary">الفئات ({state.categories.length})</h3>
      </div>

      {showAdd && (
        <div className="bg-sovereign-card rounded-xl p-4 mb-4 shadow-sm border border-sovereign-border space-y-3 animate-slide-up">
          <h4 className="text-sm font-bold text-text-primary text-right">{editingId ? 'تعديل الفئة' : 'إضافة فئة جديدة'}</h4>
          <input value={newCat.name} onChange={e => setNewCat({ ...newCat, name: e.target.value })} placeholder="اسم الفئة *" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border focus:border-neon" />
          <input value={newCat.icon} onChange={e => setNewCat({ ...newCat, icon: e.target.value })} placeholder="أيقونة (إيموجي) مثل 📦" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border" />
          <div className="flex gap-2">
            <button onClick={() => { setShowAdd(false); setEditingId(null); }} className="flex-1 bg-sovereign-surface text-text-secondary py-2.5 rounded-lg font-bold text-sm">إلغاء</button>
            <button onClick={handleAddCategory} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm">{editingId ? 'تحديث' : 'حفظ'}</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {state.categories.map(c => (
          <div key={c.id} className="bg-sovereign-card rounded-xl shadow-sm border border-glass-border overflow-hidden">
            <div className="p-3 flex items-center justify-between">
              <div className="flex gap-1">
                <button onClick={() => dispatch({ type: 'REMOVE_CATEGORY', payload: c.id })} className="text-red-400 hover:text-red-300 p-1"><Trash2 size={14} /></button>
                <button onClick={() => handleEditCategory(c)} className="text-blue-400 hover:text-blue-300 p-1"><Edit3 size={14} /></button>
                <button onClick={() => setShowSubcatForm(showSubcatForm === c.id ? null : c.id)} className="text-green-400 hover:text-green-300 p-1"><PlusCircle size={14} /></button>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-text-primary">{c.name}</p>
                  <p className="text-xs text-text-secondary">{c.subcategories.length} فئة فرعية</p>
                </div>
                <span className="text-2xl">{c.icon}</span>
              </div>
            </div>

            {showSubcatForm === c.id && (
              <div className="px-3 pb-3 flex gap-2">
                <button onClick={() => handleAddSubcategory(c.id)} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold">إضافة</button>
                <input
                  value={newSubcat.catId === c.id ? newSubcat.name : ''}
                  onChange={e => setNewSubcat({ catId: c.id, name: e.target.value })}
                  placeholder="اسم الفئة الفرعية"
                  className="flex-1 h-8 bg-sovereign-surface rounded-lg px-3 text-xs text-right outline-none border border-glass-border"
                />
              </div>
            )}

            {c.subcategories.length > 0 && (
              <div className="px-3 pb-3">
                <div className="flex flex-wrap gap-1.5">
                  {c.subcategories.map(sub => (
                    <span key={sub.id} className="bg-sovereign-surface text-text-secondary text-[10px] px-2 py-1 rounded-lg flex items-center gap-1">
                      {sub.name}
                      <button onClick={() => handleRemoveSubcategory(c.id, sub.id)} className="text-red-400 hover:text-red-300"><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AdsTab() {
  const { state, dispatch } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAd, setNewAd] = useState({ title: '', image: '', link: '', position: 'banner' as 'banner' | 'popup' | 'sidebar' });

  const handlePickAdImage = async () => {
    const dataUrl = await pickAndConvertImage();
    if (dataUrl) setNewAd({ ...newAd, image: dataUrl });
  };

  const handleAddAd = () => {
    if (!newAd.title) return;
    const ad = {
      id: editingId || generateId(),
      title: newAd.title,
      image: newAd.image || 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800',
      link: newAd.link,
      active: true,
      position: newAd.position,
      createdAt: new Date().toISOString(),
    };
    if (editingId) {
      dispatch({ type: 'UPDATE_AD', payload: ad });
    } else {
      dispatch({ type: 'ADD_AD', payload: ad });
    }
    setShowAdd(false);
    setEditingId(null);
    setNewAd({ title: '', image: '', link: '', position: 'banner' });
  };

  const handleEditAd = (ad: typeof state.ads[0]) => {
    setEditingId(ad.id);
    setNewAd({ title: ad.title, image: ad.image, link: ad.link || '', position: ad.position as 'banner' | 'popup' | 'sidebar' });
    setShowAdd(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => { setShowAdd(!showAdd); setEditingId(null); setNewAd({ title: '', image: '', link: '', position: 'banner' }); }} className="bg-neon text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
          <PlusCircle size={14} /> إضافة إعلان
        </button>
        <h3 className="font-bold text-text-primary">الإعلانات ({state.ads.length})</h3>
      </div>

      {showAdd && (
        <div className="bg-sovereign-card rounded-xl p-4 mb-4 shadow-sm border border-sovereign-border space-y-3 animate-slide-up">
          <h4 className="text-sm font-bold text-text-primary text-right">{editingId ? 'تعديل الإعلان' : 'إضافة إعلان جديد'}</h4>

          <button onClick={handlePickAdImage} className="w-full h-32 bg-sovereign-surface rounded-xl border-2 border-dashed border-glass-border flex flex-col items-center justify-center gap-2 hover:border-neon transition-colors overflow-hidden">
            {newAd.image ? (
              <img src={newAd.image} alt="" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <>
                <Upload size={28} className="text-text-tertiary" />
                <span className="text-xs text-text-tertiary">اختر صورة الإعلان</span>
              </>
            )}
          </button>

          <input value={newAd.title} onChange={e => setNewAd({ ...newAd, title: e.target.value })} placeholder="عنوان الإعلان *" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border focus:border-neon" />
          <input value={newAd.link} onChange={e => setNewAd({ ...newAd, link: e.target.value })} placeholder="رابط الإعلان (اختياري)" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border" />
          <select value={newAd.position} onChange={e => setNewAd({ ...newAd, position: e.target.value as 'banner' | 'popup' | 'sidebar' })} className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border">
            <option value="banner">بانر رئيسي</option>
            <option value="popup">نافذة منبثقة</option>
            <option value="sidebar">شريط جانبي</option>
          </select>
          <div className="flex gap-2">
            <button onClick={() => { setShowAdd(false); setEditingId(null); }} className="flex-1 bg-sovereign-surface text-text-secondary py-2.5 rounded-lg font-bold text-sm">إلغاء</button>
            <button onClick={handleAddAd} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm">{editingId ? 'تحديث' : 'حفظ'}</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {state.ads.map(ad => (
          <div key={ad.id} className="bg-sovereign-card rounded-xl overflow-hidden shadow-sm border border-glass-border">
            <img src={ad.image} alt={ad.title} className="w-full h-32 object-cover" />
            <div className="p-3 flex items-center justify-between">
              <div className="flex gap-2">
                <button onClick={() => dispatch({ type: 'REMOVE_AD', payload: ad.id })} className="text-red-400 p-1"><Trash2 size={14} /></button>
                <button onClick={() => handleEditAd(ad)} className="text-blue-400 p-1"><Edit3 size={14} /></button>
                <button onClick={() => dispatch({ type: 'TOGGLE_AD', payload: ad.id })} className={ad.active ? 'text-green-500 p-1' : 'text-text-tertiary p-1'}>
                  {ad.active ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-text-primary">{ad.title}</p>
                <p className="text-[10px] text-text-secondary">{ad.active ? 'نشط' : 'متوقف'} • {ad.position === 'banner' ? 'بانر' : ad.position === 'popup' ? 'منبثق' : 'جانبي'}</p>
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
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = filterStatus === 'all' ? state.orders : state.orders.filter(o => o.status === filterStatus);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1">
          {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-[10px] px-2 py-1 rounded-lg font-bold ${filterStatus === s ? 'bg-neon/20 text-neon' : 'bg-sovereign-surface text-text-tertiary'}`}
            >
              {s === 'all' ? 'الكل' : getStatusText(s)}
            </button>
          ))}
        </div>
        <h3 className="font-bold text-text-primary text-right">الطلبات ({state.orders.length})</h3>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-10">
          <ShoppingBag size={48} className="text-sovereign-border mx-auto mb-3" />
          <p className="text-text-tertiary">لا توجد طلبات</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => (
            <div key={order.id} className="bg-sovereign-card rounded-xl p-4 shadow-sm border border-glass-border">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
                <p className="text-sm font-bold text-text-primary">#{order.id.slice(0, 6)}</p>
              </div>

              <div className="space-y-1 mb-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">{formatPrice(item.product.price)} × {item.quantity}</span>
                    <span className="text-text-primary">{item.product.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-3 pt-2 border-t border-glass-border">
                <span className="text-sm font-bold text-neon">{formatPrice(order.total)}</span>
                <span className="text-[10px] text-text-tertiary">{formatDate(order.createdAt)}</span>
              </div>

              {order.address && (
                <p className="text-[10px] text-text-tertiary text-right mb-3">العنوان: {order.address.fullAddress} - {order.address.city}</p>
              )}

              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <>
                      <button onClick={() => dispatch({ type: 'CANCEL_ORDER', payload: order.id })} className="flex-1 bg-red-500/10 text-red-400 py-1.5 rounded-lg text-[10px] font-bold">إلغاء</button>
                      <button onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId: order.id, status: 'confirmed' } })} className="flex-1 bg-green-600 text-white py-1.5 rounded-lg text-[10px] font-bold">تأكيد</button>
                    </>
                  )}
                  {order.status === 'confirmed' && (
                    <button onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId: order.id, status: 'shipped' } })} className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg text-[10px] font-bold">تم الشحن</button>
                  )}
                  {order.status === 'shipped' && (
                    <button onClick={() => dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId: order.id, status: 'delivered' } })} className="flex-1 bg-green-600 text-white py-1.5 rounded-lg text-[10px] font-bold">تم التسليم</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UsersTab() {
  const { state } = useApp();

  const registeredUsers = [
    ...(state.user ? [{ name: state.user.name, phone: state.user.phone, status: 'نشط', role: state.isAdmin ? 'مدير' : state.user.merchantTier === 'premium' ? 'تاجر مميز' : state.user.role === 'merchant' ? 'تاجر عادي' : 'مستخدم' }] : []),
    ...state.merchantApplications.filter(a => a.status === 'approved').map(a => ({
      name: a.userName, phone: a.userPhone, status: 'نشط', role: a.tier === 'premium' ? 'تاجر مميز' : 'تاجر عادي'
    })),
    ...state.merchantApplications.filter(a => a.status === 'pending').map(a => ({
      name: a.userName, phone: a.userPhone, status: 'معلق', role: 'طلب تاجر'
    })),
  ];

  return (
    <div className="animate-fade-in">
      <h3 className="font-bold text-text-primary mb-3 text-right">المستخدمين ({registeredUsers.length})</h3>
      {registeredUsers.length === 0 ? (
        <div className="text-center py-10">
          <Users size={48} className="text-sovereign-border mx-auto mb-3" />
          <p className="text-text-tertiary">لا يوجد مستخدمين مسجلين</p>
        </div>
      ) : (
        <div className="bg-sovereign-card rounded-xl shadow-sm border border-glass-border divide-y divide-glass-border">
          {registeredUsers.map((user, i) => (
            <div key={i} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${user.status === 'نشط' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
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
      )}
    </div>
  );
}

function NotificationsTab() {
  const { state, dispatch } = useApp();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const sendNotification = () => {
    if (!title || !message) return;
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: generateId(), title, message, type: 'system', read: false, createdAt: new Date().toISOString() } });
    setTitle('');
    setMessage('');
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      <h3 className="font-bold text-text-primary mb-3 text-right">إرسال إشعار جماعي</h3>
      <div className="bg-sovereign-card rounded-xl p-4 shadow-sm border border-glass-border space-y-3 mb-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="عنوان الإشعار *" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border focus:border-neon" />
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="نص الإشعار *" className="w-full h-24 bg-sovereign-surface rounded-lg p-3 text-sm text-right outline-none border border-glass-border resize-none" />
        <div className="flex gap-2">
          <button onClick={sendNotification} className="flex-1 gradient-primary text-white py-2.5 rounded-lg text-sm font-bold">
            {sent ? 'تم الإرسال!' : 'إرسال للجميع'}
          </button>
        </div>
      </div>

      <h3 className="font-bold text-text-primary mb-3 text-right flex items-center justify-between">
        <button onClick={() => dispatch({ type: 'CLEAR_NOTIFICATIONS' })} className="text-xs text-red-400 font-normal">مسح الكل</button>
        <span>الإشعارات ({state.notifications.length})</span>
      </h3>
      <div className="space-y-2">
        {state.notifications.map(n => (
          <div key={n.id} className={`rounded-xl p-3 shadow-sm border border-glass-border ${n.read ? 'bg-sovereign-card' : 'bg-sovereign-surface'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-text-tertiary">{formatDate(n.createdAt)}</span>
              <h4 className="text-sm font-bold text-text-primary">{n.title}</h4>
            </div>
            <p className="text-xs text-text-secondary text-right">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const { state, dispatch } = useApp();
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const settingsFields = [
    { key: 'appName', label: 'اسم التطبيق', icon: Globe },
    { key: 'currency', label: 'العملة', icon: CreditCard },
    { key: 'deliveryFee', label: 'رسوم التوصيل', icon: Truck },
    { key: 'minOrderAmount', label: 'حد الطلب الأدنى', icon: AlertTriangle },
    { key: 'whatsappNumber', label: 'WhatsApp الإدارة', icon: MessageSquare },
    { key: 'email', label: 'البريد الإلكتروني', icon: FileText },
    { key: 'location', label: 'الموقع', icon: MapPin },
  ];

  const handleSave = (key: string) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: editValue } });
    setEditing(null);
    setEditValue('');
  };

  return (
    <div className="animate-fade-in">
      <h3 className="font-bold text-text-primary mb-3 text-right">إعدادات التطبيق</h3>
      <div className="space-y-3">
        {settingsFields.map(setting => {
          const Icon = setting.icon;
          const value = state.appSettings[setting.key as keyof typeof state.appSettings];
          const isEditing = editing === setting.key;

          return (
            <div key={setting.key} className="bg-sovereign-card rounded-xl p-4 shadow-sm border border-glass-border">
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm font-semibold text-text-primary">{setting.label}</span>
                    <Icon size={18} className="text-text-tertiary" />
                  </div>
                  <input
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border focus:border-neon"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(null)} className="flex-1 bg-sovereign-surface text-text-secondary py-2 rounded-lg text-xs font-bold">إلغاء</button>
                    <button onClick={() => handleSave(setting.key)} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                      <Save size={12} /> حفظ
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button onClick={() => { setEditing(setting.key); setEditValue(value); }} className="text-neon">
                    <Edit3 size={16} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-text-primary">{setting.label}</p>
                      <p className="text-xs text-text-secondary">{value}</p>
                    </div>
                    <Icon size={20} className="text-text-tertiary" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-red-500/10 rounded-xl border border-red-500/30">
        <h4 className="text-sm font-bold text-red-400 text-right mb-2">منطقة الخطر</h4>
        <button
          onClick={() => { localStorage.removeItem('iraq-store-state'); window.location.reload(); }}
          className="w-full bg-red-600 text-white py-2.5 rounded-lg text-sm font-bold"
        >
          إعادة تعيين جميع البيانات
        </button>
      </div>
    </div>
  );
}
