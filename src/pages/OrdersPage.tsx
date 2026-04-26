import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { formatPrice, formatDate, getStatusText } from '../utils/helpers';

function getStatusInfo(status: string) {
  switch (status) {
    case 'pending': return { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock, iconColor: 'text-amber-500' };
    case 'processing': return { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Truck, iconColor: 'text-blue-500' };
    case 'delivered': return { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle, iconColor: 'text-emerald-500' };
    case 'cancelled': return { color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle, iconColor: 'text-red-500' };
    default: return { color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Clock, iconColor: 'text-gray-500' };
  }
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const { state } = useApp();

  return (
    <div className="pb-24 animate-fade-in bg-gray-50/50 min-h-screen">
      <div className="glass sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-gray-100/50">
        <div className="w-10" />
        <h1 className="text-lg font-extrabold text-gray-900">طلباتي</h1>
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all btn-press">
          <ArrowRight size={20} className="text-gray-600" />
        </button>
      </div>

      {state.orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in-up">
          <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
            <Package size={48} className="text-gray-300" />
          </div>
          <p className="text-gray-600 text-lg font-bold mb-2">لا توجد طلبات</p>
          <p className="text-gray-400 text-sm mb-6">ابدأ التسوق الآن</p>
          <button onClick={() => navigate('/')} className="gradient-primary text-white px-8 py-3.5 rounded-2xl font-bold shadow-glow-red btn-press">
            تصفح المنتجات
          </button>
        </div>
      ) : (
        <div className="px-4 pt-4 space-y-3 stagger-children">
          {state.orders.map(order => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;
            return (
              <div key={order.id} className="bg-white rounded-2xl p-4 shadow-premium border border-gray-100/80 animate-fade-in-up card-hover">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] px-2.5 py-1 rounded-lg font-bold border flex items-center gap-1 ${statusInfo.color}`}>
                    <StatusIcon size={11} />
                    {getStatusText(order.status)}
                  </span>
                  <div className="text-right">
                    <p className="font-extrabold text-gray-800 text-sm">طلب #{order.id.slice(0, 6)}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                <div className="space-y-2.5 mb-3">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img src={item.product.image} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                      <div className="flex-1 text-right">
                        <p className="text-xs font-semibold line-clamp-1 text-gray-700">{item.product.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">الكمية: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="divider-gradient" />
                <div className="flex items-center justify-between pt-3">
                  <span className="text-sm font-extrabold text-red-600">{formatPrice(order.total)}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{order.items.length} منتج</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
