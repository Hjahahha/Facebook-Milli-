import { useApp } from '../store/AppContext';
import { ArrowRight, Minus, Plus, Trash2, ShoppingBag, Truck, Shield, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, generateId } from '../utils/helpers';

export default function CartPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const total = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalOriginal = state.cart.reduce((sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity, 0);
  const savings = totalOriginal - total;

  const handleCheckout = () => {
    if (!state.isLoggedIn) {
      navigate('/login');
      return;
    }
    const order = {
      id: generateId(),
      items: [...state.cart],
      total,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      address: state.addresses[0] || { id: '1', label: 'العنوان الافتراضي', fullAddress: 'بغداد، العراق', city: 'بغداد', area: 'المنصور', phone: state.user?.phone || '', isDefault: true },
    };
    dispatch({ type: 'ADD_ORDER', payload: order });
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: generateId(), title: 'طلب جديد', message: `تم تقديم طلبك #${order.id.slice(0, 6)} بنجاح`, type: 'order', read: false, createdAt: new Date().toISOString() } });
    navigate('/orders');
  };

  return (
    <div className="pb-24 animate-fade-in bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="glass sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-gray-100/50">
        <div className="w-10" />
        <h1 className="text-lg font-extrabold text-gray-900">عربتي ({state.cart.length})</h1>
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all btn-press">
          <ArrowRight size={20} className="text-gray-600" />
        </button>
      </div>

      {state.cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in-up">
          <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
            <ShoppingBag size={48} className="text-gray-300" />
          </div>
          <p className="text-gray-600 text-lg font-bold mb-2">عربتك فارغة</p>
          <p className="text-gray-400 text-sm mb-6">أضف منتجات للمتابعة</p>
          <button onClick={() => navigate('/')} className="gradient-primary text-white px-8 py-3.5 rounded-2xl font-bold shadow-glow-red btn-press">
            تصفح المنتجات
          </button>
        </div>
      ) : (
        <>
          {/* Free Shipping Banner */}
          <div className="mx-4 mt-4 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 flex items-center gap-2 justify-end animate-slide-down">
            <span className="text-xs font-semibold text-emerald-700">التوصيل مجاني لجميع الطلبات!</span>
            <Truck size={16} className="text-emerald-600" />
          </div>

          <div className="px-4 mt-4 space-y-3 stagger-children">
            {state.cart.map(item => (
              <div key={item.product.id} className="bg-white rounded-2xl p-3.5 shadow-premium flex gap-3 border border-gray-100/80 animate-fade-in-up card-hover">
                <div className="relative overflow-hidden rounded-xl">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover" />
                  {item.product.discount && (
                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[8px] px-1.5 py-0.5 rounded font-bold">-{item.product.discount}%</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-relaxed">{item.product.name}</h3>
                  <p className="text-red-600 font-extrabold text-sm mt-1">{formatPrice(item.product.price)}</p>
                  <div className="flex items-center justify-between mt-2.5">
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id })}
                      className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors btn-press"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                    <div className="flex items-center gap-0 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId: item.product.id, quantity: item.quantity + 1 } })}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors btn-press"
                      >
                        <Plus size={14} className="text-red-600" />
                      </button>
                      <span className="text-sm font-bold w-8 text-center text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId: item.product.id, quantity: item.quantity - 1 } })}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors btn-press"
                      >
                        <Minus size={14} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-premium border border-gray-100/80 animate-fade-in-up">
            <h3 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2 justify-end">
              <span>ملخص الطلب</span>
              <Tag size={16} className="text-red-600" />
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">{formatPrice(totalOriginal)}</span>
                <span className="text-gray-500">المجموع الفرعي</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-emerald-600">-{formatPrice(savings)}</span>
                  <span className="text-emerald-600">التوفير</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-emerald-600">مجاني</span>
                <span className="text-gray-500">التوصيل</span>
              </div>

              {/* Warranty */}
              <div className="flex items-center gap-2 justify-end py-2 bg-blue-50 rounded-lg px-3">
                <span className="text-xs text-blue-700 font-medium">جميع المنتجات مشمولة بالضمان</span>
                <Shield size={14} className="text-blue-600" />
              </div>

              <div className="divider-gradient" />
              <div className="flex justify-between items-center pt-1">
                <span className="text-red-600 font-extrabold text-lg">{formatPrice(total)}</span>
                <span className="font-bold text-gray-900">الإجمالي</span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="px-4 mt-4 mb-4">
            <button
              onClick={handleCheckout}
              className="w-full gradient-primary text-white py-4 rounded-2xl font-bold text-base shadow-glow-red btn-press flex items-center justify-center gap-2"
            >
              <span>إتمام الطلب</span>
              <ShoppingBag size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
