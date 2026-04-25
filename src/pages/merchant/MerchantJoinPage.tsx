import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { ArrowRight, Crown, Star, Check, Zap } from 'lucide-react';
import { generateId, sendWhatsAppNotification } from '../../utils/helpers';

export default function MerchantJoinPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [selectedTier, setSelectedTier] = useState<'standard' | 'premium'>('premium');
  const [step, setStep] = useState(1);
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

    const application = {
      id: generateId(),
      userId: state.user.id,
      userName: state.user.name,
      userPhone: state.user.phone,
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

    sendWhatsAppNotification(form.businessName, selectedTier, state.user.phone);
    navigate('/merchant-success');
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in pb-10">
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-10">
        <div />
        <h1 className="text-lg font-bold">انضم كتاجر</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      {step === 1 && (
        <div className="px-4 pt-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">اختر خطتك</h2>
            <p className="text-sm text-gray-500">ابدأ رحلتك التجارية معنا</p>
          </div>

          {/* Standard Tier */}
          <div
            onClick={() => setSelectedTier('standard')}
            className={`rounded-2xl p-5 mb-4 cursor-pointer transition-all border-2 ${
              selectedTier === 'standard' ? 'border-red-500 bg-red-50 shadow-md' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedTier === 'standard' ? 'border-red-500 bg-red-500' : 'border-gray-300'}`}>
                {selectedTier === 'standard' && <Check size={14} className="text-white" />}
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">الباقة العادية</h3>
                  <p className="text-2xl font-bold text-red-600">25,000 <span className="text-sm font-normal">دينار/شهر</span></p>
                </div>
                <Star size={28} className="text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              {standardFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-2 justify-end text-sm text-gray-600">
                  <span>{f}</span>
                  <Check size={14} className="text-green-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Premium Tier */}
          <div
            onClick={() => setSelectedTier('premium')}
            className={`rounded-2xl p-5 mb-6 cursor-pointer transition-all border-2 relative overflow-hidden ${
              selectedTier === 'premium' ? 'border-yellow-500 bg-yellow-50 shadow-lg' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="absolute top-0 left-0 bg-yellow-500 text-white text-[10px] font-bold px-3 py-1 rounded-br-xl">
              الأكثر شعبية
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedTier === 'premium' ? 'border-yellow-500 bg-yellow-500' : 'border-gray-300'}`}>
                {selectedTier === 'premium' && <Check size={14} className="text-white" />}
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">الباقة المميزة</h3>
                  <p className="text-2xl font-bold text-yellow-600">99,000 <span className="text-sm font-normal">دينار/شهر</span></p>
                </div>
                <Crown size={28} className="text-yellow-500 fill-yellow-500" />
              </div>
            </div>
            <div className="space-y-2">
              {premiumFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-2 justify-end text-sm text-gray-600">
                  <span>{f}</span>
                  <Zap size={14} className="text-yellow-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setStep(2)} className="w-full gradient-primary text-white py-4 rounded-xl font-bold text-base">
            متابعة - {selectedTier === 'premium' ? '99,000' : '25,000'} دينار
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="px-4 pt-6 space-y-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
            <h3 className="text-base font-bold text-gray-800 mb-1 text-right">معلومات النشاط التجاري</h3>
            <p className="text-xs text-gray-500 text-right">أكمل المعلومات التالية لتقديم طلب الانضمام</p>
          </div>

          <div>
            <label className="text-xs text-gray-500 block text-right mb-1">اسم النشاط التجاري *</label>
            <input required value={form.businessName} onChange={e => setForm({ ...form, businessName: e.target.value })} className="w-full h-14 bg-gray-50 rounded-xl px-4 text-sm text-right outline-none border border-gray-200 focus:border-red-400" placeholder="مثال: متجر الإلكترونيات" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block text-right mb-1">نوع النشاط *</label>
            <select required value={form.businessType} onChange={e => setForm({ ...form, businessType: e.target.value })} className="w-full h-14 bg-gray-50 rounded-xl px-4 text-sm text-right outline-none border border-gray-200 focus:border-red-400">
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
            <label className="text-xs text-gray-500 block text-right mb-1">المدينة *</label>
            <select required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="w-full h-14 bg-gray-50 rounded-xl px-4 text-sm text-right outline-none border border-gray-200 focus:border-red-400">
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
            <label className="text-xs text-gray-500 block text-right mb-1">عنوان المحل *</label>
            <input required value={form.businessAddress} onChange={e => setForm({ ...form, businessAddress: e.target.value })} className="w-full h-14 bg-gray-50 rounded-xl px-4 text-sm text-right outline-none border border-gray-200 focus:border-red-400" placeholder="العنوان التفصيلي" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block text-right mb-1">رقم الهوية الوطنية *</label>
            <input required value={form.nationalId} onChange={e => setForm({ ...form, nationalId: e.target.value })} className="w-full h-14 bg-gray-50 rounded-xl px-4 text-sm text-right outline-none border border-gray-200 focus:border-red-400" placeholder="رقم الهوية" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block text-right mb-1">وصف النشاط *</label>
            <textarea required value={form.businessDescription} onChange={e => setForm({ ...form, businessDescription: e.target.value })} className="w-full h-28 bg-gray-50 rounded-xl p-4 text-sm text-right outline-none border border-gray-200 focus:border-red-400 resize-none" placeholder="صف نشاطك التجاري..." />
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold">
              رجوع
            </button>
            <button type="submit" className="flex-1 gradient-primary text-white py-4 rounded-xl font-bold">
              تقديم الطلب
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
