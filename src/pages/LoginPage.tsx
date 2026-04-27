import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Phone, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { generateId } from '../utils/helpers';

export default function LoginPage() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user = {
        id: generateId(),
        name: isAdmin ? 'مدير التطبيق' : 'متجر العراق',
        phone: phone || '07506747685',
        email: '',
        points: 100,
        walletBalance: 0,
        inviteCode: 'IY4Z-ENWI',
        role: isAdmin ? 'admin' as const : 'user' as const,
        gender: 'male' as const,
        location: 'الانبار/ مركز الانبار',
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'LOGIN', payload: user });
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-sovereign-card animate-fade-in relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-80 gradient-hero opacity-5 rounded-b-[60px]" />
      <div className="absolute top-20 -left-20 w-40 h-40 bg-sovereign-card/30 rounded-full blur-3xl" />
      <div className="absolute top-40 -right-20 w-60 h-60 bg-sovereign-card/50 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="px-4 py-3 flex items-center justify-end">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-sovereign-surface rounded-xl flex items-center justify-center hover:bg-sovereign-card transition-all btn-press">
            <ArrowRight size={20} className="text-text-secondary" />
          </button>
        </div>

        <div className="px-6 pt-6">
          {/* Logo */}
          <div className="text-center mb-10 animate-fade-in-up">
            <div className="w-20 h-20 gradient-primary rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-glow-red rotate-3 hover:rotate-0 transition-transform duration-500">
              <span className="text-white text-3xl font-black">ع</span>
            </div>
            <h1 className="text-2xl font-black text-text-primary">متجر العراق</h1>
            <p className="text-text-tertiary text-sm mt-1 font-medium">تسجيل الدخول للمتابعة</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 animate-slide-up">
            <div className="relative group">
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="رقم الهاتف"
                className="w-full h-14 bg-sovereign-surface rounded-2xl pr-12 pl-4 text-sm outline-none border-2 border-glass-border focus:border-red-400 focus:ring-4 focus:ring-red-50 focus:bg-sovereign-card transition-all duration-300"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-sovereign-card rounded-lg flex items-center justify-center group-focus-within:bg-sovereign-card transition-colors">
                <Phone size={15} className="text-text-tertiary group-focus-within:text-error transition-colors" />
              </div>
            </div>

            <div className="relative group">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-full h-14 bg-sovereign-surface rounded-2xl pr-12 pl-12 text-sm outline-none border-2 border-glass-border focus:border-red-400 focus:ring-4 focus:ring-red-50 focus:bg-sovereign-card transition-all duration-300"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-sovereign-card rounded-lg flex items-center justify-center group-focus-within:bg-sovereign-card transition-colors">
                <Lock size={15} className="text-text-tertiary group-focus-within:text-error transition-colors" />
              </div>
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-sovereign-card transition-colors">
                {showPass ? <EyeOff size={16} className="text-text-tertiary" /> : <Eye size={16} className="text-text-tertiary" />}
              </button>
            </div>

            {/* Admin Toggle */}
            <label className="flex items-center gap-3 justify-end cursor-pointer py-2 select-none">
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary font-medium">تسجيل كمدير</span>
                <Shield size={15} className={`transition-colors duration-300 ${isAdmin ? 'text-neon' : 'text-text-tertiary'}`} />
              </div>
              <div className={`w-11 h-6 rounded-full transition-all duration-300 relative cursor-pointer ${isAdmin ? 'bg-neon' : 'bg-sovereign-border'}`}>
                <div className={`w-5 h-5 bg-sovereign-card rounded-full absolute top-0.5 transition-all duration-300 shadow-sm ${isAdmin ? 'right-0.5' : 'right-[22px]'}`} />
              </div>
              <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} className="hidden" />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-primary text-white py-4 rounded-2xl font-bold text-base hover:opacity-90 transition-all duration-300 shadow-glow-red btn-press disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <button className="text-neon text-sm font-semibold hover:underline">نسيت كلمة المرور؟</button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex-1 divider-gradient" />
            <span className="text-xs text-text-tertiary font-medium">أو</span>
            <div className="flex-1 divider-gradient" />
          </div>

          {/* Social Login */}
          <div className="flex gap-3 mt-6">
            {[
              { icon: '📱', label: 'Google' },
              { icon: '🍎', label: 'Apple' },
              { icon: '📘', label: 'Facebook' },
            ].map(social => (
              <button key={social.label} className="flex-1 h-12 bg-sovereign-surface rounded-xl flex items-center justify-center gap-2 border border-glass-border hover:bg-sovereign-card transition-all btn-press">
                <span className="text-lg">{social.icon}</span>
              </button>
            ))}
          </div>

          <div className="text-center mt-8 pb-8">
            <p className="text-text-tertiary text-sm">
              ليس لديك حساب؟{' '}
              <button onClick={() => navigate('/register')} className="text-neon font-bold hover:underline">إنشاء حساب</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
