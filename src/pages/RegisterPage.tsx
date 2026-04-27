import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, User, Phone, Lock, Mail, MapPin } from 'lucide-react';
import { generateId } from '../utils/helpers';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', location: '', gender: 'male' });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: generateId(),
      name: form.name || 'مستخدم جديد',
      phone: form.phone || '07500000000',
      email: form.email,
      points: 500,
      walletBalance: 0,
      inviteCode: generateId().slice(0, 8).toUpperCase(),
      role: 'user' as const,
      gender: form.gender as 'male' | 'female' | 'other',
      location: form.location || 'بغداد',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'LOGIN', payload: user });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { id: generateId(), title: 'مرحباً!', message: 'تم إنشاء حسابك بنجاح. حصلت على 500 نقطة ترحيبية!', type: 'system', read: false, createdAt: new Date().toISOString() } });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-sovereign-card animate-fade-in">
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div />
        <h1 className="text-lg font-bold">إنشاء حساب</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-text-secondary" /></button>
      </div>

      <div className="px-6 pt-6">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="الاسم الكامل" className="w-full h-14 bg-sovereign-surface rounded-xl pr-12 pl-4 text-sm outline-none border border-sovereign-border focus:border-red-400" />
            <User size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
          </div>
          <div className="relative">
            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="رقم الهاتف" className="w-full h-14 bg-sovereign-surface rounded-xl pr-12 pl-4 text-sm outline-none border border-sovereign-border focus:border-red-400" />
            <Phone size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
          </div>
          <div className="relative">
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="البريد الإلكتروني (اختياري)" className="w-full h-14 bg-sovereign-surface rounded-xl pr-12 pl-4 text-sm outline-none border border-sovereign-border focus:border-red-400" />
            <Mail size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
          </div>
          <div className="relative">
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="كلمة المرور" className="w-full h-14 bg-sovereign-surface rounded-xl pr-12 pl-4 text-sm outline-none border border-sovereign-border focus:border-red-400" />
            <Lock size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
          </div>
          <div className="relative">
            <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="المكان" className="w-full h-14 bg-sovereign-surface rounded-xl pr-12 pl-4 text-sm outline-none border border-sovereign-border focus:border-red-400" />
            <MapPin size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
          </div>

          <div className="flex items-center gap-4 justify-end py-2">
            <span className="text-sm text-text-secondary">الجنس</span>
            {['male', 'female', 'other'].map(g => (
              <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                <span className="text-xs text-text-secondary">{g === 'male' ? 'ذكر' : g === 'female' ? 'أنثى' : 'آخر'}</span>
                <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={e => setForm({ ...form, gender: e.target.value })} className="accent-red-600" />
              </label>
            ))}
          </div>

          <button type="submit" className="w-full gradient-primary text-white py-4 rounded-xl font-bold text-base">
            إنشاء حساب
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-text-secondary text-sm">
            لديك حساب بالفعل؟{' '}
            <button onClick={() => navigate('/login')} className="text-neon font-bold">تسجيل الدخول</button>
          </p>
        </div>
      </div>
    </div>
  );
}
