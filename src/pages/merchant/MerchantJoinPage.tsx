import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { ArrowRight, Crown, Star, Check, Zap, Sparkles, Shield, Store } from 'lucide-react';
import { generateId, sendWhatsAppNotification } from '../../utils/helpers';

export default function MerchantJoinPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [selectedTier, setSelectedTier] = useState<'standard' | 'premium'>('premium');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    businessName: '', businessType: '', businessAddress: '', businessDescription: '',
    nationalId: '', city: '',
  });

  const standardFeatures = [
    'نشر حتى 10 إعلانات',
    'صفحة متجر بسيطة',
    'إدارة المنتجات الأساسية',
    'إشعارات الطلبات',
    'دعم عبر البريد الإلكتروني',
  ];

  const premiumFeatures = [
    'نشر إعلانات غير محدودة',
    'إنشاء صفحة متجر مخصصة داخل التطبيق',
    'المتابعة من قبل المستخدمين',
    'إدارة حسابك مع عدة مسؤولين بأذونات خاصة',
    'الدردشة مع العملاء',
    'إضافة المنتجات وتعديلها وإزالتها',
    'الوصول إلى تقارير مفصلة لتحليل أداء عملك',
    'ظهور مميز في نتائج البحث',
    'شارة التاجر المميز',
    'دعم أولوية على مدار الساعة',
    'عروض ترويجية مخصصة',
    'إحصائيات متقدمة للمبيعات',
    'تخفيضات وكوبونات خاصة',
    'تصدير التقارير',
    'إدارة المخزون المتقدمة',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.user) { navigate('/login'); return; }
    setIsSubmitting(true);

    setTimeout(() => {
      const application = {
        id: generateId(),
        userId: state.user!.id,
        userName: state.user!.name,
        userPhone: state.user!.phone,
        businessName: form.businessName,
        businessType: form.businessType,
        businessAddress: form.businessAddress,
        businessDescription: form.businessDescription,
        tier: selectedTier,
        documents: [],
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        nationalId: form.nationalId,
        city: form.city,
      };

      dispatch({ type: 'SUBMIT_MERCHANT_APPLICATION', payload: application });
      dispatch({ type: 'ADD_NOTIFICATION', payload: {
        id: generateId(), title: 'طلب انضمام تاجر', message: `تم تقديم طلبك للانضمام كتاجر ${selectedTier === 'premium' ? 'مميز' : 'عادي'}. سيتم مراجعة طلبك خلال 24 ساعة.`, type: 'merchant', read: false, createdAt: new Date().toISOString(),
      }});

      sendWhatsAppNotification(form.businessName, selectedTier, state.user!.phone);
      navigate('/merchant-success');
    }, 800);
  };

  const inputClass = "w-full h-14 bg-sovereign-surface rounded-2xl px-4 text-sm text-right outline-none border-2 border-glass-border focus:border-red-400 focus:ring-4 focus:ring-red-50 focus:bg-sovereign-card transition-all duration-300";

  return (
    <div className="min-h-screen bg-sovereign-surface/50 animate-fade-in pb-10">
      <div className="glass sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-glass-border/50">
        <div className="w-10" />
        <h1 className="text-lg font-extrabold text-text-primary">انضم كتاجر</h1>
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-sovereign-surface rounded-xl flex items-center justify-center hover:bg-sovereign-card transition-all btn-press">
          <ArrowRight size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* Step Indicator */}
      <div className="px-8 pt-5">
        <div className="flex items-center gap-3 justify-center">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${step >= 2 ? 'bg-emerald-100 text-emerald-700' : step === 1 ? 'bg-sovereign-card text-red-700' : 'bg-sovereign-card text-text-secondary'}`}>
            <span>اختر الباقة</span>
            {step >= 2 ? <Check size={14} /> : <span className="w-5 h-5 bg-neon text-white rounded-full flex items-center justify-center text-[10px]">1</span>}
          </div>
          <div className="w-8 h-0.5 bg-sovereign-border" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${step === 2 ? 'bg-sovereign-card text-red-700' : 'bg-sovereign-card text-text-secondary'}`}>
            <span>المعلومات</span>
            <span className="w-5 h-5 bg-gray-300 text-white rounded-full flex items-center justify-center text-[10px]">2</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="px-4 pt-6">
          <div className="text-center mb-6 animate-fade-in-up">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sovereign">
              <Store size={28} className="text-neon" />
            </div>
            <h2 className="text-xl font-black text-text-primary mb-2">ابدأ رحلتك التجارية</h2>
            <p className="text-sm text-text-tertiary font-medium">اختر الباقة المناسبة لعملك</p>
          </div>

          {/* Standard Tier */}
          <div
            onClick={() => setSelectedTier('standard')}
            className={`rounded-2xl p-5 mb-4 cursor-pointer transition-all duration-300 border-2 animate-fade-in-up card-hover ${
              selectedTier === 'standard' ? 'border-red-400 bg-sovereign-card/50 shadow-sovereign-lg' : 'border-glass-border bg-sovereign-card shadow-sovereign'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedTier === 'standard' ? 'border-red-500 bg-error' : 'border-sovereign-border'}`}>
                {selectedTier === 'standard' && <Check size={14} className="text-white" />}
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h3 className="text-lg font-extrabold text-text-primary">الباقة العادية</h3>
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-[10px] text-text-tertiary">/شهر</span>
                    <span className="text-2xl font-black text-neon">25,000</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-sovereign-card rounded-xl flex items-center justify-center">
                  <Star size={24} className="text-text-tertiary" />
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              {standardFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 justify-end text-sm text-text-secondary">
                  <span className="font-medium">{f}</span>
                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <Check size={10} className="text-emerald-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Tier */}
          <div
            onClick={() => setSelectedTier('premium')}
            className={`rounded-2xl p-5 mb-6 cursor-pointer transition-all duration-300 border-2 relative overflow-hidden animate-fade-in-up card-hover ${
              selectedTier === 'premium' ? 'border-amber-400 bg-amber-50/50 shadow-sovereign-lg' : 'border-glass-border bg-sovereign-card shadow-sovereign'
            }`}
          >
            <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-br-xl flex items-center gap-1 shadow-lg">
              <Sparkles size={10} />
              <span>الأكثر شعبية</span>
            </div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedTier === 'premium' ? 'border-amber-500 bg-amber-500' : 'border-sovereign-border'}`}>
                {selectedTier === 'premium' && <Check size={14} className="text-white" />}
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h3 className="text-lg font-extrabold text-text-primary">الباقة المميزة</h3>
                  <div className="flex items-center gap-1 justify-end">
                    <span className="text-[10px] text-text-tertiary">/شهر</span>
                    <span className="text-2xl font-black text-amber-600">99,000</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center shadow-sm">
                  <Crown size={24} className="text-amber-500 fill-amber-500" />
                </div>
              </div>
            </div>
            <div className="space-y-2.5 max-h-64 overflow-y-auto">
              {premiumFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 justify-end text-sm text-text-secondary">
                  <span className="font-medium">{f}</span>
                  <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                    <Zap size={10} className="text-amber-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setStep(2)} className="w-full gradient-primary text-white py-4 rounded-2xl font-bold text-base shadow-glow-red btn-press flex items-center justify-center gap-2">
            <span>متابعة - {selectedTier === 'premium' ? '99,000' : '25,000'} دينار</span>
            <ArrowRight size={18} className="rotate-180" />
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="px-4 pt-6 space-y-4 animate-slide-up">
          <div className="bg-sovereign-card rounded-2xl p-4 border border-glass-border/80 shadow-sovereign mb-4">
            <div className="flex items-center gap-3 justify-end">
              <div>
                <h3 className="text-base font-extrabold text-text-primary">معلومات النشاط التجاري</h3>
                <p className="text-xs text-text-tertiary font-medium">أكمل المعلومات التالية لتقديم طلب الانضمام</p>
              </div>
              <div className="w-10 h-10 bg-sovereign-card rounded-xl flex items-center justify-center">
                <Shield size={18} className="text-neon" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs text-text-secondary font-semibold block text-right mb-1.5">اسم النشاط التجاري *</label>
            <input required value={form.businessName} onChange={e => setForm({ ...form, businessName: e.target.value })} className={inputClass} placeholder="مثال: متجر الإلكترونيات" />
          </div>
          <div>
            <label className="text-xs text-text-secondary font-semibold block text-right mb-1.5">نوع النشاط *</label>
            <select required value={form.businessType} onChange={e => setForm({ ...form, businessType: e.target.value })} className={inputClass}>
              <option value="">اختر نوع النشاط</option>
              <option value="electronics">إلكترونيات</option>
              <option value="fashion">ملابس وأزياء</option>
              <option value="food">مواد غذائية</option>
              <option value="beauty">مستحضرات تجميل</option>
              <option value="home">أثاث ومنزل</option>
              <option value="auto">مركبات وقطع غيار</option>
              <option value="realestate">عقارات</option>
              <option value="services">خدمات</option>
              <option value="other">أخرى</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-text-secondary font-semibold block text-right mb-1.5">المدينة *</label>
            <select required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className={inputClass}>
              <option value="">اختر المدينة</option>
              <option value="baghdad">بغداد</option>
              <option value="basra">البصرة</option>
              <option value="erbil">أربيل</option>
              <option value="mosul">الموصل</option>
              <option value="najaf">النجف</option>
              <option value="karbala">كربلاء</option>
              <option value="sulaymaniyah">السليمانية</option>
              <option value="anbar">الانبار</option>
              <option value="diyala">ديالى</option>
              <option value="kirkuk">كركوك</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-text-secondary font-semibold block text-right mb-1.5">عنوان المحل *</label>
            <input required value={form.businessAddress} onChange={e => setForm({ ...form, businessAddress: e.target.value })} className={inputClass} placeholder="العنوان التفصيلي" />
          </div>
          <div>
            <label className="text-xs text-text-secondary font-semibold block text-right mb-1.5">رقم الهوية الوطنية *</label>
            <input required value={form.nationalId} onChange={e => setForm({ ...form, nationalId: e.target.value })} className={inputClass} placeholder="رقم الهوية" />
          </div>
          <div>
            <label className="text-xs text-text-secondary font-semibold block text-right mb-1.5">وصف النشاط *</label>
            <textarea required value={form.businessDescription} onChange={e => setForm({ ...form, businessDescription: e.target.value })} className="w-full h-28 bg-sovereign-surface rounded-2xl p-4 text-sm text-right outline-none border-2 border-glass-border focus:border-red-400 focus:ring-4 focus:ring-red-50 focus:bg-sovereign-card transition-all duration-300 resize-none" placeholder="صف نشاطك التجاري..." />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setStep(1)} className="flex-1 bg-sovereign-card text-text-primary py-4 rounded-2xl font-bold hover:bg-sovereign-border transition-all btn-press">
              رجوع
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 gradient-primary text-white py-4 rounded-2xl font-bold shadow-glow-red btn-press disabled:opacity-60 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'تقديم الطلب'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
