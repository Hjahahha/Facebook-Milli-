import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Camera } from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [form, setForm] = useState({
    name: state.user?.name || '',
    phone: state.user?.phone || '',
    email: state.user?.email || '',
    birthday: state.user?.birthday || '',
    location: state.user?.location || '',
    gender: state.user?.gender || 'male',
  });

  const handleUpdate = () => {
    dispatch({ type: 'UPDATE_USER', payload: form });
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-sovereign-card animate-fade-in">
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div />
        <h1 className="text-lg font-bold">حسابي</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-text-secondary" /></button>
      </div>

      <div className="px-6 pt-6">
        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-sovereign-card flex items-center justify-center overflow-hidden">
              <span className="text-5xl">👨‍💼</span>
            </div>
            <button className="absolute bottom-0 right-0 w-9 h-9 bg-neon rounded-full flex items-center justify-center shadow-lg">
              <Camera size={16} className="text-white" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary block text-right mb-1">رقم الهاتف</label>
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full h-14 bg-sovereign-surface rounded-xl px-4 text-sm text-right outline-none border border-sovereign-border" />
          </div>
          <div>
            <label className="text-xs text-text-secondary block text-right mb-1">اسم</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full h-14 bg-sovereign-surface rounded-xl px-4 text-sm text-right outline-none border border-sovereign-border font-bold" />
          </div>
          <div>
            <label className="text-xs text-text-secondary block text-right mb-1">البريد الإلكتروني</label>
            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="البريد الإلكتروني" className="w-full h-14 bg-sovereign-surface rounded-xl px-4 text-sm text-right outline-none border border-sovereign-border" />
          </div>
          <div>
            <label className="text-xs text-text-secondary block text-right mb-1">عيد ميلاد</label>
            <input type="date" value={form.birthday} onChange={e => setForm({ ...form, birthday: e.target.value })} className="w-full h-14 bg-sovereign-surface rounded-xl px-4 text-sm text-right outline-none border border-sovereign-border" />
          </div>
          <div>
            <label className="text-xs text-text-secondary block text-right mb-1">المكان</label>
            <div className="w-full h-14 bg-sovereign-surface rounded-xl px-4 text-sm flex items-center justify-between border border-sovereign-border">
              <span className="text-text-tertiary">‹</span>
              <span className="text-text-primary">{form.location || 'اختر المكان'}</span>
            </div>
          </div>
          <div>
            <label className="text-xs text-text-secondary block text-right mb-2">الجنس</label>
            <div className="flex items-center gap-4 justify-end">
              {[{ value: 'male', label: 'ذكر' }, { value: 'female', label: 'أنثى' }, { value: 'other', label: 'آخر' }].map(g => (
                <label key={g.value} className="flex items-center gap-1.5 cursor-pointer">
                  <span className="text-sm text-text-secondary">{g.label}</span>
                  <input type="radio" name="gender" value={g.value} checked={form.gender === g.value} onChange={e => setForm({ ...form, gender: e.target.value as 'male' | 'female' | 'other' })} className="accent-red-600 w-4 h-4" />
                </label>
              ))}
            </div>
          </div>

          <button onClick={handleUpdate} className="w-full gradient-primary text-white py-4 rounded-xl font-bold text-base mt-4">
            تحديث
          </button>
          <button className="w-full text-center text-error text-sm font-medium py-2">
            حذف الحساب
          </button>
        </div>
      </div>
    </div>
  );
}
