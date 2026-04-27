import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Bell, Package, Star, Tag } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package size={20} className="text-blue-500" />;
      case 'promo': return <Tag size={20} className="text-green-500" />;
      case 'merchant': return <Star size={20} className="text-yellow-500" />;
      default: return <Bell size={20} className="text-text-secondary" />;
    }
  };

  return (
    <div className="pb-20 animate-fade-in">
      <div className="bg-sovereign-card px-4 py-3 flex items-center justify-between border-b sticky top-0 z-10">
        <div />
        <h1 className="text-lg font-bold">الإشعارات</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-text-secondary" /></button>
      </div>

      {state.notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Bell size={64} className="text-sovereign-border mb-4" />
          <p className="text-text-tertiary text-lg font-semibold">لا توجد إشعارات</p>
        </div>
      ) : (
        <div className="divide-y">
          {state.notifications.map(notif => (
            <button
              key={notif.id}
              onClick={() => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notif.id })}
              className={`w-full px-4 py-4 flex items-start gap-3 text-right transition-all ${
                notif.read ? 'bg-sovereign-card' : 'bg-sovereign-card'
              }`}
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-text-primary">{notif.title}</p>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{notif.message}</p>
                <p className="text-[10px] text-text-tertiary mt-1">{formatDate(notif.createdAt)}</p>
              </div>
              <div className="w-10 h-10 bg-sovereign-card rounded-full flex items-center justify-center shrink-0 mt-1">
                {getIcon(notif.type)}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
