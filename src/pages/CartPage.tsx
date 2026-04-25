import { useApp } from '../store/AppContext';
import { ArrowRight, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
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
    <div className="pb-20 animate-fade-in">
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-10">
        <div className="w-8" />
        <h1 className="text-lg font-bold text-gray-800">عربتي ({state.cart.length})</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      {state.cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <ShoppingBag size={80} className="text-gray-200 mb-4" />
          <p className="text-gray-400 text-lg font-semibold mb-2">عربتك فارغة</p>
          <p className="text-gray-400 text-sm mb-6">أضف منتجات للمتابعة</p>
          <button onClick={() => navigate('/')} className="gradient-primary text-white px-8 py-3 rounded-xl font-semibold">
            تصفح المنتجات
          </button>
        </div>
      ) : (
        <>
          <div className="px-4 mt-4 space-y-3">
            {state.cart.map(item => (
              <div key={item.product.id} className="bg-white rounded-xl p-3 shadow-sm flex gap-3 border border-gray-100">
                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{item.product.name}</h3>
                  <p className="text-red-600 font-bold text-sm mt-1">{formatPrice(item.product.price)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id })} className="text-red-400">
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                      <button onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId: item.product.id, quantity: item.quantity + 1 } })}>
                        <Plus size={16} className="text-red-600" />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId: item.product.id, quantity: item.quantity - 1 } })}>
                        <Minus size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mx-4 mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3">ملخص الطلب</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">المجموع الفرعي</span><span>{formatPrice(totalOriginal)}</span></div>
              {savings > 0 && <div className="flex justify-between text-green-600"><span>التوفير</span><span>-{formatPrice(savings)}</span></div>}
              <div className="flex justify-between"><span className="text-gray-500">التوصيل</span><span className="text-green-600">مجاني</span></div>
              <hr />
              <div className="flex justify-between font-bold text-base"><span>الإجمالي</span><span className="text-red-600">{formatPrice(total)}</span></div>
            </div>
          </div>

          <div className="px-4 mt-4">
            <button onClick={handleCheckout} className="w-full gradient-primary text-white py-3.5 rounded-xl font-bold text-base hover:opacity-90 transition-all">
              إتمام الطلب - {formatPrice(total)}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
