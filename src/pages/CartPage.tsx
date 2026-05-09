import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { ArrowRight, Minus, Plus, Trash2, ShoppingBag, Truck, Shield, Tag, MapPin, Phone, FileText, CreditCard, Banknote, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, generateId } from '../utils/helpers';

const iraqCities = [
  'بغداد', 'البصرة', 'أربيل', 'الموصل', 'كركوك', 'النجف', 'كربلاء',
  'الحلة', 'الديوانية', 'الناصرية', 'العمارة', 'الكوت', 'السماوة',
  'الرمادي', 'تكريت', 'بعقوبة', 'السليمانية', 'دهوك', 'واسط',
];

export default function CartPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const total = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalOriginal = state.cart.reduce((sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity, 0);
  const savings = totalOriginal - total;

  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState(state.user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(state.user?.phone || '');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'wallet'>('cash');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const canPlaceOrder = customerName && customerPhone && city && area && fullAddress;

  const handlePlaceOrder = () => {
    if (!state.isLoggedIn) {
      navigate('/login');
      return;
    }
    if (!canPlaceOrder) return;

    const order = {
      id: generateId(),
      items: [...state.cart],
      total,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      address: {
        id: generateId(),
        label: `${city} - ${area}`,
        fullAddress,
        city,
        area,
        phone: customerPhone,
        isDefault: true,
      },
      customerName,
      customerPhone,
      customerNotes: notes || undefined,
      paymentMethod,
    };
    dispatch({ type: 'ADD_ORDER', payload: order });
    dispatch({ type: 'CLEAR_CART' });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: generateId(),
        title: 'تم تأكيد طلبك',
        message: `طلبك #${order.id.slice(0, 6)} قيد المعالجة. سيتم التوصيل إلى ${city} - ${area}`,
        type: 'order',
        read: false,
        createdAt: new Date().toISOString(),
      },
    });
    setOrderPlaced(true);
    setTimeout(() => navigate('/orders'), 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#050505' }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(0,230,118,0.15)' }}>
          <ShoppingBag size={36} style={{ color: '#00E676' }} />
        </div>
        <h2 className="text-xl font-black mb-2" style={{ color: '#F5F5F5' }}>تم تقديم طلبك بنجاح!</h2>
        <p className="text-sm text-center" style={{ color: '#B0B0B0' }}>سيتم مراجعة طلبك والتواصل معك قريباً</p>
      </div>
    );
  }

  return (
    <div className="pb-24 animate-fade-in min-h-screen" style={{ background: '#050505' }}>
      <div className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b" style={{ background: 'rgba(5,5,5,0.95)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="w-10" />
        <h1 className="text-lg font-extrabold" style={{ color: '#F5F5F5' }}>
          {showCheckout ? 'إتمام الطلب' : `عربتي (${state.cart.length})`}
        </h1>
        <button onClick={() => showCheckout ? setShowCheckout(false) : navigate(-1)} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#111' }}>
          {showCheckout ? <X size={20} style={{ color: '#B0B0B0' }} /> : <ArrowRight size={20} style={{ color: '#B0B0B0' }} />}
        </button>
      </div>

      {state.cart.length === 0 && !showCheckout ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6" style={{ background: '#111' }}>
            <ShoppingBag size={48} style={{ color: '#404040' }} />
          </div>
          <p className="text-lg font-bold mb-2" style={{ color: '#B0B0B0' }}>عربتك فارغة</p>
          <p className="text-sm mb-6" style={{ color: '#707070' }}>أضف منتجات للمتابعة</p>
          <button onClick={() => navigate('/')} className="px-8 py-3.5 rounded-2xl font-bold" style={{ background: 'linear-gradient(135deg, #00D4FF, #0088CC)', color: '#fff' }}>
            تصفح المنتجات
          </button>
        </div>
      ) : showCheckout ? (
        <div className="px-4 pt-4 space-y-4">
          {/* Customer Info */}
          <div className="rounded-2xl p-4 space-y-3" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-sm font-bold flex items-center gap-2 justify-end" style={{ color: '#F5F5F5' }}>
              <span>معلومات المستلم</span>
              <Phone size={16} style={{ color: '#00D4FF' }} />
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>الاسم الكامل *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className="w-full px-4 py-3 rounded-xl text-sm text-right outline-none"
                  style={{ background: '#1a1a1a', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.08)' }}
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>رقم الهاتف *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="07XXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl text-sm text-right outline-none"
                  style={{ background: '#1a1a1a', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.08)' }}
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="rounded-2xl p-4 space-y-3" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-sm font-bold flex items-center gap-2 justify-end" style={{ color: '#F5F5F5' }}>
              <span>عنوان التوصيل</span>
              <MapPin size={16} style={{ color: '#00E676' }} />
            </h3>
            <div className="space-y-3">
              <div className="relative">
                <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>المحافظة *</label>
                <button
                  onClick={() => setShowCityDropdown(!showCityDropdown)}
                  className="w-full px-4 py-3 rounded-xl text-sm text-right flex items-center justify-between"
                  style={{ background: '#1a1a1a', color: city ? '#F5F5F5' : '#707070', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <ChevronDown size={16} style={{ color: '#707070' }} />
                  <span>{city || 'اختر المحافظة'}</span>
                </button>
                {showCityDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20 max-h-48 overflow-y-auto" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {iraqCities.map(c => (
                      <button
                        key={c}
                        onClick={() => { setCity(c); setShowCityDropdown(false); }}
                        className="w-full px-4 py-2.5 text-sm text-right hover:bg-white/5 transition-colors"
                        style={{ color: c === city ? '#00D4FF' : '#B0B0B0' }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>المنطقة / الحي *</label>
                <input
                  type="text"
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  placeholder="مثال: المنصور، الكرادة، زيونة"
                  className="w-full px-4 py-3 rounded-xl text-sm text-right outline-none"
                  style={{ background: '#1a1a1a', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.08)' }}
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-right" style={{ color: '#B0B0B0' }}>العنوان التفصيلي *</label>
                <textarea
                  value={fullAddress}
                  onChange={e => setFullAddress(e.target.value)}
                  placeholder="رقم الدار، اسم الشارع، أقرب نقطة دالة"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl text-sm text-right outline-none resize-none"
                  style={{ background: '#1a1a1a', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.08)' }}
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-2xl p-4 space-y-3" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-sm font-bold flex items-center gap-2 justify-end" style={{ color: '#F5F5F5' }}>
              <span>ملاحظات</span>
              <FileText size={16} style={{ color: '#FFD700' }} />
            </h3>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="ملاحظات إضافية للتوصيل (اختياري)"
              rows={2}
              className="w-full px-4 py-3 rounded-xl text-sm text-right outline-none resize-none"
              style={{ background: '#1a1a1a', color: '#F5F5F5', border: '1px solid rgba(255,255,255,0.08)' }}
              dir="rtl"
            />
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl p-4 space-y-3" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-sm font-bold flex items-center gap-2 justify-end" style={{ color: '#F5F5F5' }}>
              <span>طريقة الدفع</span>
              <CreditCard size={16} style={{ color: '#FF6D00' }} />
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setPaymentMethod('cash')}
                className="w-full px-4 py-3 rounded-xl text-sm text-right flex items-center justify-between"
                style={{
                  background: paymentMethod === 'cash' ? 'rgba(0,212,255,0.08)' : '#1a1a1a',
                  border: `1px solid ${paymentMethod === 'cash' ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ border: `2px solid ${paymentMethod === 'cash' ? '#00D4FF' : '#404040'}` }}>
                  {paymentMethod === 'cash' && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00D4FF' }} />}
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#F5F5F5' }}>الدفع عند الاستلام</span>
                  <Banknote size={18} style={{ color: '#00E676' }} />
                </div>
              </button>
              <button
                onClick={() => setPaymentMethod('wallet')}
                className="w-full px-4 py-3 rounded-xl text-sm text-right flex items-center justify-between"
                style={{
                  background: paymentMethod === 'wallet' ? 'rgba(0,212,255,0.08)' : '#1a1a1a',
                  border: `1px solid ${paymentMethod === 'wallet' ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ border: `2px solid ${paymentMethod === 'wallet' ? '#00D4FF' : '#404040'}` }}>
                  {paymentMethod === 'wallet' && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#00D4FF' }} />}
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#F5F5F5' }}>المحفظة ({formatPrice(state.user?.walletBalance || 0)})</span>
                  <CreditCard size={18} style={{ color: '#FFD700' }} />
                </div>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl p-4 space-y-3" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-sm font-bold flex items-center gap-2 justify-end" style={{ color: '#F5F5F5' }}>
              <span>ملخص الطلب</span>
              <Tag size={16} style={{ color: '#00D4FF' }} />
            </h3>
            <div className="space-y-2 text-sm">
              {state.cart.map(item => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <span className="font-semibold" style={{ color: '#F5F5F5' }}>{formatPrice(item.product.price * item.quantity)}</span>
                  <span style={{ color: '#B0B0B0' }}>{item.product.name} x{item.quantity}</span>
                </div>
              ))}
              <div className="my-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
              <div className="flex justify-between items-center">
                <span className="font-semibold" style={{ color: '#00E676' }}>مجاني</span>
                <span style={{ color: '#B0B0B0' }}>التوصيل</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-semibold" style={{ color: '#00E676' }}>-{formatPrice(savings)}</span>
                  <span style={{ color: '#00E676' }}>التوفير</span>
                </div>
              )}
              <div className="my-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
              <div className="flex justify-between items-center pt-1">
                <span className="text-lg font-black" style={{ color: '#00D4FF' }}>{formatPrice(total)}</span>
                <span className="font-bold" style={{ color: '#F5F5F5' }}>الإجمالي</span>
              </div>
            </div>
          </div>

          {/* Place Order */}
          <button
            onClick={handlePlaceOrder}
            disabled={!canPlaceOrder}
            className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all"
            style={{
              background: canPlaceOrder ? 'linear-gradient(135deg, #00D4FF, #0088CC)' : '#222',
              color: canPlaceOrder ? '#fff' : '#555',
              opacity: canPlaceOrder ? 1 : 0.6,
            }}
          >
            <span>تأكيد الطلب</span>
            <ShoppingBag size={18} />
          </button>
          <div className="h-4" />
        </div>
      ) : (
        <>
          {/* Free Shipping Banner */}
          <div className="mx-4 mt-4 rounded-xl px-4 py-2.5 flex items-center gap-2 justify-end" style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)' }}>
            <span className="text-xs font-semibold" style={{ color: '#00E676' }}>التوصيل مجاني لجميع الطلبات!</span>
            <Truck size={16} style={{ color: '#00E676' }} />
          </div>

          <div className="px-4 mt-4 space-y-3">
            {state.cart.map(item => (
              <div key={item.product.id} className="rounded-2xl p-3.5 flex gap-3" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="relative overflow-hidden rounded-xl">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover" />
                  {item.product.discount && (
                    <span className="absolute top-1 left-1 text-white text-[8px] px-1.5 py-0.5 rounded font-bold" style={{ background: '#FF1744' }}>-{item.product.discount}%</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold line-clamp-2 leading-relaxed" style={{ color: '#F5F5F5' }}>{item.product.name}</h3>
                  <p className="font-extrabold text-sm mt-1" style={{ color: '#00D4FF' }}>{formatPrice(item.product.price)}</p>
                  <div className="flex items-center justify-between mt-2.5">
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id })}
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(255,23,68,0.1)' }}
                    >
                      <Trash2 size={14} style={{ color: '#FF1744' }} />
                    </button>
                    <div className="flex items-center gap-0 rounded-xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId: item.product.id, quantity: item.quantity + 1 } })}
                        className="w-9 h-9 flex items-center justify-center hover:bg-white/5 transition-colors"
                      >
                        <Plus size={14} style={{ color: '#00D4FF' }} />
                      </button>
                      <span className="text-sm font-bold w-8 text-center" style={{ color: '#F5F5F5' }}>{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId: item.product.id, quantity: item.quantity - 1 } })}
                        className="w-9 h-9 flex items-center justify-center hover:bg-white/5 transition-colors"
                      >
                        <Minus size={14} style={{ color: '#B0B0B0' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mx-4 mt-4 rounded-2xl p-4" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="font-extrabold mb-4 flex items-center gap-2 justify-end" style={{ color: '#F5F5F5' }}>
              <span>ملخص الطلب</span>
              <Tag size={16} style={{ color: '#00D4FF' }} />
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold" style={{ color: '#F5F5F5' }}>{formatPrice(totalOriginal)}</span>
                <span style={{ color: '#B0B0B0' }}>المجموع الفرعي</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-semibold" style={{ color: '#00E676' }}>-{formatPrice(savings)}</span>
                  <span style={{ color: '#00E676' }}>التوفير</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="font-semibold" style={{ color: '#00E676' }}>مجاني</span>
                <span style={{ color: '#B0B0B0' }}>التوصيل</span>
              </div>
              <div className="flex items-center gap-2 justify-end py-2 px-3 rounded-lg" style={{ background: 'rgba(0,212,255,0.06)' }}>
                <span className="text-xs font-medium" style={{ color: '#00D4FF' }}>جميع المنتجات مشمولة بالضمان</span>
                <Shield size={14} style={{ color: '#00D4FF' }} />
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
              <div className="flex justify-between items-center pt-1">
                <span className="text-lg font-extrabold" style={{ color: '#00D4FF' }}>{formatPrice(total)}</span>
                <span className="font-bold" style={{ color: '#F5F5F5' }}>الإجمالي</span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="px-4 mt-4 mb-4">
            <button
              onClick={() => {
                if (!state.isLoggedIn) { navigate('/login'); return; }
                setShowCheckout(true);
              }}
              className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #0088CC)', color: '#fff' }}
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
