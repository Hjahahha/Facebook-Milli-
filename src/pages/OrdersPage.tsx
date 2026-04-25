import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Package } from 'lucide-react';
import { formatPrice, formatDate, getStatusColor, getStatusText } from '../utils/helpers';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { state } = useApp();

  return (
    <div className="pb-20 animate-fade-in">
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-10">
        <div />
        <h1 className="text-lg font-bold">طلباتي</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      {state.orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Package size={64} className="text-gray-200 mb-4" />
          <p className="text-gray-400 text-lg font-semibold mb-2">لا توجد طلبات</p>
          <button onClick={() => navigate('/')} className="text-red-600 font-semibold">تصفح المنتجات</button>
        </div>
      ) : (
        <div className="px-4 pt-4 space-y-3">
          {state.orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
                <div className="text-right">
                  <p className="font-bold text-gray-800">طلب #{order.id.slice(0, 6)}</p>
                  <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
              </div>
              <div className="space-y-2 mb-3">
                {order.items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-2">
                    <img src={item.product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 text-right">
                      <p className="text-xs font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-gray-500">x{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-sm font-bold text-red-600">{formatPrice(order.total)}</span>
                <span className="text-xs text-gray-500">{order.items.length} منتج</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
