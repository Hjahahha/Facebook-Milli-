import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Package, Clock, Truck, CheckCircle, XCircle, MapPin, Phone, FileText } from 'lucide-react';
import { formatPrice, formatDate, getStatusText } from '../utils/helpers';

function getStatusInfo(status: string) {
  switch (status) {
    case 'pending': return { color: 'text-amber-400', bg: 'rgba(255,215,0,0.1)', border: 'rgba(255,215,0,0.2)', icon: Clock };
    case 'confirmed': return { color: 'text-blue-400', bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.2)', icon: CheckCircle };
    case 'shipped': return { color: 'text-indigo-400', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', icon: Truck };
    case 'delivered': return { color: 'text-emerald-400', bg: 'rgba(0,230,118,0.1)', border: 'rgba(0,230,118,0.2)', icon: CheckCircle };
    case 'cancelled': return { color: 'text-red-400', bg: 'rgba(255,23,68,0.1)', border: 'rgba(255,23,68,0.2)', icon: XCircle };
    default: return { color: 'text-gray-400', bg: '#111', border: 'rgba(255,255,255,0.06)', icon: Clock };
  }
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const { state } = useApp();

  return (
    <div className="pb-24 animate-fade-in min-h-screen" style={{ background: '#050505' }}>
      <div className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b" style={{ background: 'rgba(5,5,5,0.95)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="w-10" />
        <h1 className="text-lg font-extrabold" style={{ color: '#F5F5F5' }}>طلباتي</h1>
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#111' }}>
          <ArrowRight size={20} style={{ color: '#B0B0B0' }} />
        </button>
      </div>

      {state.orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6" style={{ background: '#111' }}>
            <Package size={48} style={{ color: '#404040' }} />
          </div>
          <p className="text-lg font-bold mb-2" style={{ color: '#B0B0B0' }}>لا توجد طلبات</p>
          <p className="text-sm mb-6" style={{ color: '#707070' }}>ابدأ التسوق الآن</p>
          <button onClick={() => navigate('/')} className="px-8 py-3.5 rounded-2xl font-bold" style={{ background: 'linear-gradient(135deg, #00D4FF, #0088CC)', color: '#fff' }}>
            تصفح المنتجات
          </button>
        </div>
      ) : (
        <div className="px-4 pt-4 space-y-3">
          {state.orders.map(order => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;
            return (
              <div key={order.id} className="rounded-2xl p-4" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1" style={{ background: statusInfo.bg, border: `1px solid ${statusInfo.border}` }}>
                    <StatusIcon size={11} className={statusInfo.color} />
                    <span className={statusInfo.color}>{getStatusText(order.status)}</span>
                  </span>
                  <div className="text-right">
                    <p className="font-extrabold text-sm" style={{ color: '#F5F5F5' }}>طلب #{order.id.slice(0, 6)}</p>
                    <p className="text-[10px] font-medium" style={{ color: '#707070' }}>{formatDate(order.createdAt)}</p>
                  </div>
                </div>

                {/* Customer Details */}
                {(order.customerName || order.customerPhone || order.address) && (
                  <div className="mb-3 p-2.5 rounded-xl space-y-1.5" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.08)' }}>
                    {order.customerName && (
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{order.customerName}</span>
                        <span className="text-[10px]" style={{ color: '#707070' }}>المستلم:</span>
                      </div>
                    )}
                    {order.customerPhone && (
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{order.customerPhone}</span>
                        <Phone size={10} style={{ color: '#707070' }} />
                      </div>
                    )}
                    {order.address && (
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-[11px]" style={{ color: '#B0B0B0' }}>{order.address.city} - {order.address.area}</span>
                        <MapPin size={10} style={{ color: '#707070' }} />
                      </div>
                    )}
                    {order.address?.fullAddress && (
                      <p className="text-[10px] text-right" style={{ color: '#606060' }}>{order.address.fullAddress}</p>
                    )}
                    {order.customerNotes && (
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-[10px]" style={{ color: '#909090' }}>{order.customerNotes}</span>
                        <FileText size={10} style={{ color: '#707070' }} />
                      </div>
                    )}
                    {order.paymentMethod && (
                      <p className="text-[10px] text-right" style={{ color: '#707070' }}>
                        الدفع: {order.paymentMethod === 'cash' ? 'عند الاستلام' : 'المحفظة'}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2.5 mb-3">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img src={item.product.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 text-right">
                        <p className="text-xs font-semibold line-clamp-1" style={{ color: '#F5F5F5' }}>{item.product.name}</p>
                        <p className="text-[10px] font-medium" style={{ color: '#707070' }}>الكمية: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
                <div className="flex items-center justify-between pt-3">
                  <span className="text-sm font-extrabold" style={{ color: '#00D4FF' }}>{formatPrice(order.total)}</span>
                  <span className="text-[10px] font-medium" style={{ color: '#707070' }}>{order.items.length} منتج</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
