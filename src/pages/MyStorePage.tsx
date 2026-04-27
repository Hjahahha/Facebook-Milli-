import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Store, PlusCircle } from 'lucide-react';

export default function MyStorePage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const hasMerchant = state.user?.role === 'merchant' && state.user?.merchantStatus === 'approved';

  return (
    <div className="min-h-screen bg-sovereign-card animate-fade-in">
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div />
        <h1 className="text-lg font-bold">متجري</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-text-secondary" /></button>
      </div>

      {hasMerchant ? (
        <div className="px-4 pt-6">
          <button onClick={() => navigate('/merchant-dashboard')} className="w-full gradient-primary text-white py-4 rounded-xl font-bold text-base">
            الذهاب للوحة التاجر
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <div className="w-24 h-24 bg-sovereign-card rounded-2xl flex items-center justify-center mb-6">
            <Store size={48} className="text-text-tertiary" />
          </div>
          <p className="text-text-secondary text-lg font-semibold mb-8">ليس لديك أي متجر</p>
          <button
            onClick={() => navigate('/merchant-join')}
            className="w-full gradient-primary text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
          >
            <span>إنشاء متجر</span>
            <PlusCircle size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
