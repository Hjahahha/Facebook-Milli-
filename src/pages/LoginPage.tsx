import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { generateId } from '../utils/helpers';

export default function LoginPage() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="px-4 py-3 flex items-center justify-end border-b">
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      <div className="px-6 pt-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-red-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg">
            <span className="text-white text-3xl font-bold">ع</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">متجر العراق</h1>
          <p className="text-gray-500 text-sm mt-1">تسجيل الدخول للمتابعة</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="رقم الهاتف"
              className="w-full h-14 bg-gray-50 rounded-xl pr-12 pl-4 text-sm outline-none border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
            <Phone size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full h-14 bg-gray-50 rounded-xl pr-12 pl-12 text-sm outline-none border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />
            <Lock size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-4 top-1/2 -translate-y-1/2">
              {showPass ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
            </button>
          </div>

          {/* Admin Toggle */}
          <label className="flex items-center gap-3 justify-end cursor-pointer py-2">
            <span className="text-sm text-gray-600">تسجيل كمدير</span>
            <div className={`w-10 h-5 rounded-full transition-all relative ${isAdmin ? 'bg-red-600' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${isAdmin ? 'right-0.5' : 'right-5'}`} />
            </div>
            <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} className="hidden" />
          </label>

          <button type="submit" className="w-full gradient-primary text-white py-4 rounded-xl font-bold text-base hover:opacity-90 transition-all shadow-lg">
            تسجيل الدخول
          </button>
        </form>

        <div className="text-center mt-6">
          <button className="text-red-600 text-sm font-medium">نسيت كلمة المرور؟</button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            ليس لديك حساب؟{' '}
            <button onClick={() => navigate('/register')} className="text-red-600 font-bold">إنشاء حساب</button>
          </p>
        </div>
      </div>
    </div>
  );
}
