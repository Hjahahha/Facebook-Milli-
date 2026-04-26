import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function MerchantSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 animate-slide-up">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-float">
        <CheckCircle size={56} className="text-green-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-3 text-center">تم تقديم طلبك بنجاح!</h1>
      <p className="text-gray-500 text-center text-sm leading-relaxed mb-2">
        شكراً لتقديم طلب الانضمام كتاجر في متجر العراق.
      </p>
      <p className="text-gray-500 text-center text-sm leading-relaxed mb-2">
        سيتم مراجعة طلبك خلال 24 ساعة وسنتواصل معك.
      </p>
      <p className="text-gray-500 text-center text-sm leading-relaxed mb-8">
        تم إرسال إشعار إلى فريق الإدارة عبر واتساب.
      </p>

      <div className="w-full space-y-3">
        <button onClick={() => navigate('/')} className="w-full gradient-primary text-white py-4 rounded-xl font-bold text-base">
          العودة للرئيسية
        </button>
        <button onClick={() => navigate('/account')} className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm">
          الذهاب لحسابي
        </button>
      </div>
    </div>
  );
}
