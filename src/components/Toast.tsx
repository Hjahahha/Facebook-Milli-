import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = { success: CheckCircle, error: AlertCircle, info: Info };
  const colors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  const iconColors = { success: 'text-emerald-500', error: 'text-red-500', info: 'text-blue-500' };
  const Icon = icons[type];

  return (
    <div className={`fixed top-4 left-4 right-4 z-[100] max-w-lg mx-auto transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-premium-lg ${colors[type]}`}>
        <Icon size={20} className={iconColors[type]} />
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }} className="p-1 rounded-full hover:bg-black/5">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
