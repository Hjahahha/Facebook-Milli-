import { useNavigate } from 'react-router-dom';
import { ArrowRight, Share2 } from 'lucide-react';

export default function BusinessPlansPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sovereign-card animate-fade-in">
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div />
        <h1 className="text-lg font-bold">خطط الأعمال</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-text-secondary" /></button>
      </div>

      <div className="px-6 pt-6">
        <h2 className="text-xl font-bold text-text-primary text-right leading-relaxed mb-4">
          قم بالترويج لحسابك والوصول إلى أكبر عدد ممكن من الأشخاص
        </h2>

        <h3 className="text-lg font-bold text-text-primary text-right mb-3">فتح المحلات التجارية أو المعارض</h3>

        <p className="text-sm text-text-secondary text-right leading-relaxed mb-6">
          هل لديك محل تجاري أو معرض سيارات أو وكالة عقارية؟ قم بإنشاء حساب خاص الآن وسنتواصل معك خلال 24 ساعة لتفعيل حسابك
        </p>

        <div className="space-y-3 mb-8">
          {[
            'نشر اعلانات غير محدودة',
            'إنشاء صفحة متجر مخصصة داخل التطبيق',
            'المتابعة من قبل المستخدمين',
            'قم بإدارة حسابك مع عدة مسؤولين بأذونات خاصة. (يمكن للمسؤول الدردشة مع العملاء وإضافة المنتجات وتعديلها وإزالتها.)',
            'الوصول إلى تقارير مفصلة لتحليل أداء عملك',
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-2 justify-end text-sm text-text-primary">
              <span>{feature}</span>
              <span className="text-neon mt-0.5">•</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/merchant-join')}
          className="w-full gradient-primary text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
        >
          <Share2 size={18} />
          <span>مشاركة</span>
        </button>
      </div>
    </div>
  );
}
