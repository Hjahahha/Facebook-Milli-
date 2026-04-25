import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Plus, Clock } from 'lucide-react';
import { generateId } from '../utils/helpers';

export default function WalletPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [amount, setAmount] = useState('');

  const handleAddBalance = () => {
    const val = parseInt(amount);
    if (!val || val <= 0) return;
    dispatch({ type: 'ADD_BALANCE', payload: val });
    dispatch({ type: 'ADD_TRANSACTION', payload: { id: generateId(), type: 'credit', amount: val, description: 'إضافة رصيد', date: new Date().toISOString() } });
    setAmount('');
    setShowAdd(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
        <div />
        <h1 className="text-lg font-bold">محفظة</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      <div className="px-4 pt-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍💼</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{state.user?.name || 'متجر العراق'}</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">IQD {(state.user?.walletBalance || 0).toLocaleString()}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => navigate('/transactions')} className="flex-1 border border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50">
              <span className="text-sm font-semibold text-gray-700">سجل المعاملات</span>
              <Clock size={18} className="text-gray-500" />
            </button>
            <button onClick={() => setShowAdd(!showAdd)} className="flex-1 border-2 border-green-500 text-green-600 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-green-50">
              <span className="text-sm font-semibold">إضافة رصيد</span>
              <Plus size={18} />
            </button>
          </div>
        </div>

        {showAdd && (
          <div className="bg-white rounded-xl p-4 mt-4 shadow-sm border border-gray-100 animate-slide-up">
            <h3 className="font-bold text-gray-800 mb-3 text-right">إضافة رصيد</h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[10000, 25000, 50000, 100000, 250000, 500000].map(val => (
                <button key={val} onClick={() => setAmount(val.toString())} className={`py-2 rounded-lg text-xs font-bold border transition-all ${amount === val.toString() ? 'bg-green-50 border-green-500 text-green-600' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                  {val.toLocaleString()}
                </button>
              ))}
            </div>
            <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="أو أدخل المبلغ" type="number" className="w-full h-12 bg-gray-50 rounded-lg px-4 text-sm text-right outline-none border mb-3" />
            <button onClick={handleAddBalance} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">
              إضافة {amount ? parseInt(amount).toLocaleString() + ' دينار' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
