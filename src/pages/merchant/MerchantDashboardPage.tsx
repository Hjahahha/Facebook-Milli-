import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import {
  ArrowRight, Package, BarChart3, ShoppingBag, MessageSquare, Star, Settings,
  TrendingUp, Users, DollarSign, Eye, PlusCircle, Bell, Layers, Image, FileText,
  Camera, Save, Trash2, Edit3
} from 'lucide-react';
import { generateId, formatPrice, formatDate } from '../../utils/helpers';
import { pickAndConvertImage } from '../../utils/imageUpload';

export default function MerchantDashboardPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const isPremium = state.user?.merchantTier === 'premium';
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '', image: '', originalPrice: '', discount: '' });

  const merchantProducts = state.products.filter(p => p.merchantId === state.user?.id);
  const merchantOrders = state.orders;
  const totalSales = merchantOrders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: 'المبيعات', value: formatPrice(totalSales), icon: DollarSign, color: 'bg-green-500/20 text-green-400' },
    { label: 'الطلبات', value: merchantOrders.length.toString(), icon: ShoppingBag, color: 'bg-blue-500/20 text-blue-400' },
    { label: 'المنتجات', value: merchantProducts.length.toString(), icon: Package, color: 'bg-purple-500/20 text-purple-400' },
    { label: 'المشاهدات', value: (merchantProducts.length * 47).toString(), icon: Eye, color: 'bg-orange-500/20 text-orange-400' },
  ];

  const handlePickImage = async () => {
    const dataUrl = await pickAndConvertImage();
    if (dataUrl) setNewProduct({ ...newProduct, image: dataUrl });
  };

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const existingProduct = editingProductId ? state.products.find(p => p.id === editingProductId) : null;
    const product = {
      id: editingProductId || generateId(),
      name: newProduct.name,
      price: parseInt(newProduct.price) || 0,
      originalPrice: newProduct.originalPrice ? parseInt(newProduct.originalPrice) : undefined,
      discount: newProduct.discount ? parseInt(newProduct.discount) : undefined,
      image: newProduct.image || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300',
      category: newProduct.category || 'other',
      description: newProduct.description,
      merchantId: existingProduct?.merchantId || state.user?.id || 'merchant',
      merchantName: existingProduct?.merchantName || state.user?.name || 'تاجر',
      rating: existingProduct?.rating ?? 5,
      reviewCount: existingProduct?.reviewCount ?? 0,
      inStock: existingProduct?.inStock ?? true,
      featured: existingProduct?.featured,
      createdAt: existingProduct?.createdAt || new Date().toISOString(),
    };
    if (editingProductId) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: product });
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: product });
      dispatch({ type: 'ADD_NOTIFICATION', payload: {
        id: generateId(), title: 'منتج جديد', message: `تم إضافة المنتج "${product.name}" بنجاح`, type: 'system', read: false, createdAt: new Date().toISOString()
      }});
    }
    setShowAddProduct(false);
    setEditingProductId(null);
    setNewProduct({ name: '', price: '', category: '', description: '', image: '', originalPrice: '', discount: '' });
  };

  const handleEditProduct = (p: typeof state.products[0]) => {
    setEditingProductId(p.id);
    setNewProduct({
      name: p.name, price: p.price.toString(), category: p.category, description: p.description,
      image: p.image, originalPrice: p.originalPrice?.toString() || '', discount: p.discount?.toString() || '',
    });
    setShowAddProduct(true);
    setActiveSection('products');
  };

  const standardFeatures = [
    { icon: Package, label: 'المنتجات', desc: `${merchantProducts.length} منتج`, action: 'products' },
    { icon: ShoppingBag, label: 'الطلبات', desc: `${merchantOrders.length} طلب`, action: 'orders' },
    { icon: MessageSquare, label: 'الرسائل', desc: 'دردشة العملاء', path: '/messages' },
    { icon: Bell, label: 'الإشعارات', desc: `${state.notifications.length} إشعار`, path: '/notifications' },
  ];

  const premiumFeatures = [
    { icon: BarChart3, label: 'التقارير', desc: 'تحليلات متقدمة', action: 'analytics' },
    { icon: TrendingUp, label: 'الإحصائيات', desc: 'أداء المتجر', action: 'stats' },
    { icon: Star, label: 'التقييمات', desc: 'تقييمات العملاء', action: 'reviews' },
    { icon: Layers, label: 'المخزون', desc: 'إدارة المخزون', action: 'inventory' },
    { icon: Image, label: 'العروض', desc: 'عروض ترويجية', action: 'promotions' },
    { icon: FileText, label: 'الكوبونات', desc: 'إدارة الكوبونات', action: 'coupons' },
    { icon: Users, label: 'المسؤولين', desc: 'إدارة الفريق', action: 'team' },
    { icon: Settings, label: 'الإعدادات', desc: 'إعدادات المتجر', action: 'settings' },
  ];

  return (
    <div className="pb-20 animate-fade-in">
      <div className="gradient-primary px-4 py-4 flex items-center justify-between">
        <div />
        <h1 className="text-lg font-bold text-white">لوحة التاجر</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-white" /></button>
      </div>

      <div className="gradient-primary px-4 pb-6">
        <div className="flex items-center gap-3 justify-end">
          <div className="text-right">
            <h2 className="text-white font-bold">{state.user?.name || 'متجرك'}</h2>
            <div className="flex items-center gap-2 justify-end mt-1">
              {isPremium ? (
                <span className="bg-yellow-400 text-yellow-900 text-[10px] px-2 py-0.5 rounded-full font-bold">مميز</span>
              ) : (
                <span className="bg-sovereign-card/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">عادي</span>
              )}
            </div>
          </div>
          <div className="w-14 h-14 bg-sovereign-card/20 rounded-full flex items-center justify-center overflow-hidden">
            {state.user?.avatar ? (
              <img src={state.user.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl">🏪</span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="bg-sovereign-card rounded-xl shadow-sm p-4 grid grid-cols-4 gap-2 border border-glass-border">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-1`}>
                  <Icon size={18} />
                </div>
                <p className="text-sm font-bold text-text-primary">{stat.value}</p>
                <p className="text-[10px] text-text-secondary">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-4">
        <button
          onClick={() => { setShowAddProduct(true); setEditingProductId(null); setNewProduct({ name: '', price: '', category: '', description: '', image: '', originalPrice: '', discount: '' }); setActiveSection('products'); }}
          className="w-full bg-sovereign-card border-2 border-dashed border-neon/30 text-neon py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-sovereign-surface transition-all"
        >
          <span>إضافة منتج جديد</span>
          <PlusCircle size={20} />
        </button>
      </div>

      {showAddProduct && (
        <div className="px-4 mt-4">
          <div className="bg-sovereign-card rounded-xl p-4 shadow-sm border border-glass-border space-y-3 animate-slide-up">
            <h4 className="text-sm font-bold text-text-primary text-right">{editingProductId ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h4>
            <div className="flex justify-center">
              <button onClick={handlePickImage} className="w-32 h-32 bg-sovereign-surface rounded-xl border-2 border-dashed border-glass-border flex flex-col items-center justify-center gap-2 hover:border-neon transition-colors overflow-hidden">
                {newProduct.image ? (
                  <img src={newProduct.image} alt="" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <>
                    <Camera size={28} className="text-text-tertiary" />
                    <span className="text-[10px] text-text-tertiary">صورة المنتج</span>
                  </>
                )}
              </button>
            </div>
            <input value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="اسم المنتج *" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border focus:border-neon text-text-primary" />
            <div className="grid grid-cols-2 gap-2">
              <input value={newProduct.originalPrice} onChange={e => setNewProduct({ ...newProduct, originalPrice: e.target.value })} placeholder="السعر الأصلي" type="number" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border text-text-primary" />
              <input value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="السعر *" type="number" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border focus:border-neon text-text-primary" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input value={newProduct.discount} onChange={e => setNewProduct({ ...newProduct, discount: e.target.value })} placeholder="خصم %" type="number" className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border text-text-primary" />
              <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full h-10 bg-sovereign-surface rounded-lg px-3 text-sm text-right outline-none border border-glass-border text-text-primary">
                <option value="">اختر الفئة</option>
                {state.categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
            </div>
            <textarea value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="وصف المنتج" className="w-full h-20 bg-sovereign-surface rounded-lg p-3 text-sm text-right outline-none border border-glass-border resize-none text-text-primary" />
            <div className="flex gap-2">
              <button onClick={() => { setShowAddProduct(false); setEditingProductId(null); }} className="flex-1 bg-sovereign-surface text-text-secondary py-2.5 rounded-lg font-bold text-sm">إلغاء</button>
              <button onClick={handleSaveProduct} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-1">
                <Save size={14} /> {editingProductId ? 'تحديث' : 'حفظ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'products' && !showAddProduct && (
        <div className="px-4 mt-4">
          <h3 className="text-sm font-bold text-text-primary mb-3 text-right">منتجاتي ({merchantProducts.length})</h3>
          <div className="space-y-2">
            {merchantProducts.map(p => (
              <div key={p.id} className="bg-sovereign-card rounded-xl p-3 shadow-sm border border-glass-border flex items-center gap-3">
                <div className="flex gap-1">
                  <button onClick={() => dispatch({ type: 'REMOVE_PRODUCT', payload: p.id })} className="text-red-400 p-1"><Trash2 size={14} /></button>
                  <button onClick={() => handleEditProduct(p)} className="text-blue-400 p-1"><Edit3 size={14} /></button>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm font-semibold line-clamp-1 text-text-primary">{p.name}</p>
                  <p className="text-xs text-neon font-bold">{formatPrice(p.price)}</p>
                </div>
                <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'orders' && (
        <div className="px-4 mt-4">
          <h3 className="text-sm font-bold text-text-primary mb-3 text-right">الطلبات ({merchantOrders.length})</h3>
          {merchantOrders.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingBag size={40} className="text-sovereign-border mx-auto mb-2" />
              <p className="text-text-tertiary text-sm">لا توجد طلبات بعد</p>
            </div>
          ) : (
            <div className="space-y-2">
              {merchantOrders.map(order => (
                <div key={order.id} className="bg-sovereign-card rounded-xl p-3 shadow-sm border border-glass-border">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-text-tertiary">{formatDate(order.createdAt)}</span>
                    <span className="text-sm font-bold text-text-primary">#{order.id.slice(0, 6)}</span>
                  </div>
                  <p className="text-xs text-text-secondary text-right">{order.items.length} منتج — {formatPrice(order.total)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="px-4 mt-6">
        <h3 className="text-sm font-bold text-text-primary mb-3 text-right">الميزات الأساسية</h3>
        <div className="grid grid-cols-2 gap-3">
          {standardFeatures.map(f => {
            const Icon = f.icon;
            return (
              <button
                key={f.label}
                onClick={() => f.path ? navigate(f.path) : setActiveSection(activeSection === f.action ? null : (f.action || null))}
                className={`bg-sovereign-card rounded-xl p-4 text-right shadow-sm border transition-all ${activeSection === f.action ? 'border-neon' : 'border-glass-border'} hover:shadow-md`}
              >
                <Icon size={24} className="text-neon mb-2" />
                <h4 className="text-sm font-bold text-text-primary">{f.label}</h4>
                <p className="text-[10px] text-text-secondary">{f.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {isPremium && (
        <div className="px-4 mt-6">
          <h3 className="text-sm font-bold text-text-primary mb-3 text-right flex items-center gap-2 justify-end">
            <span>ميزات مميزة</span>
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {premiumFeatures.map(f => {
              const Icon = f.icon;
              return (
                <button
                  key={f.label}
                  onClick={() => setActiveSection(activeSection === f.action ? null : (f.action || null))}
                  className={`bg-sovereign-card rounded-xl p-4 text-right shadow-sm border transition-all ${activeSection === f.action ? 'border-yellow-400' : 'border-glass-border'} hover:shadow-md`}
                >
                  <Icon size={24} className="text-yellow-400 mb-2" />
                  <h4 className="text-sm font-bold text-text-primary">{f.label}</h4>
                  <p className="text-[10px] text-text-secondary">{f.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!isPremium && (
        <div className="px-4 mt-6">
          <div className="bg-gradient-to-l from-yellow-500/20 to-amber-500/10 rounded-xl p-4 border border-yellow-500/30">
            <div className="flex items-center gap-2 justify-end mb-2">
              <h3 className="text-sm font-bold text-yellow-400">ترقية إلى الباقة المميزة</h3>
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
            </div>
            <p className="text-xs text-text-secondary text-right mb-3">احصل على 8 ميزات إضافية مع الباقة المميزة بـ 99,000 دينار</p>
            <button onClick={() => navigate('/merchant-join')} className="w-full bg-yellow-500 text-black py-2.5 rounded-lg font-bold text-sm">ترقية الآن</button>
          </div>
        </div>
      )}
    </div>
  );
}
