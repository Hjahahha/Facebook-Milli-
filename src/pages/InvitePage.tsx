import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Copy } from 'lucide-react';
import { useState } from 'react';

export default function InvitePage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [copied, setCopied] = useState(false);

  const code = state.user?.inviteCode || 'IY4Z-ENWI';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="px-4 py-3 flex items-center justify-end border-b">
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      <div className="px-6 pt-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">أرسل الكود الخاص بك واكسب النقاط</h1>
        <p className="text-red-600 font-semibold mb-8">كيف تعمل؟</p>

        <div className="space-y-3 mb-8">
          {[
            'انسخ الرمز الخاص بك وأرسله إلى أكبر عدد ممكن من الأصدقاء',
            'قم بتحميل وفتح حساب iBazaar الخاص بصديقك',
            'سوف تحصل على 250 نقطة من كل صديق',
            'سيحصل صديقك أيضًا على 500 نقطة مباشرة بعد إنشاء الحساب',
          ].map((step, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 text-right border border-gray-200">
              {step}
            </div>
          ))}
        </div>

        <p className="text-lg font-bold text-gray-800 mb-3">رمز الدعوة</p>
        <button onClick={handleCopy} className="inline-flex items-center gap-3 bg-gray-50 border-2 border-gray-200 rounded-xl px-8 py-3 mb-6">
          <Copy size={20} className="text-gray-500" />
          <span className="text-xl font-bold text-gray-800 tracking-wider">{code}</span>
        </button>
        {copied && <p className="text-green-600 text-sm mb-4">تم النسخ!</p>}

        <button className="w-full gradient-primary text-white py-4 rounded-xl font-bold text-base mb-3">
          مشاركة
        </button>
        <p className="text-sm text-gray-500 font-medium">قائمة الدعوة</p>
      </div>
    </div>
  );
}
