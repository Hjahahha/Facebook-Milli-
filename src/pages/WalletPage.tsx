import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Plus, Clock, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50/50 animate-fade-in pb-24">
      <div className="glass sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-gray-100/50">
        <div />
        <h1 className="text-lg font-extrabold text-gray-900">محفظتي</h1>
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all btn-press">
          <ArrowRight size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="px-4 pt-6">
        {/* Main Balance Card */}
        <div className="bg-gradient-to-l from-gray-900 to-gray-800 rounded-3xl p-6 shadow-premium-xl relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-12 translate-x-12" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-500/10 to-transparent rounded-full translate-y-8 -translate-x-8" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-semibold">+0.0%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{state.user?.name || 'متجر العراق'}</span>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Wallet size={18} className="text-white" />
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[11px] text-gray-500 mb-1">الرصيد المتاح</p>
              <p className="text-3xl font-black text-white">IQD {(state.user?.walletBalance || 0).toLocaleString()}</p>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => navigate('/transactions')} className="flex-1 bg-white/10 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white/15 transition-all btn-press border border-white/10">
                <span className="text-sm font-semibold text-white">السجل</span>
                <Clock size={16} className="text-gray-400" />
              </button>
              <button onClick={() => setShowAdd(!showAdd)} className="flex-1 bg-emerald-500 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all btn-press shadow-lg">
                <span className="text-sm font-bold text-white">إضافة رصيد</span>
                <Plus size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4 stagger-children">
          <div className="bg-white rounded-2xl p-4 shadow-premium border border-gray-100/80 animate-fade-in-up">
            <div className="flex items-center gap-2 justify-end mb-2">
              <span className="text-xs font-bold text-gray-500">الإيداعات</span>
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <ArrowDownRight size={16} className="text-emerald-600" />
              </div>
            </div>
            <p className="text-right text-lg font-black text-gray-900">
              {state.transactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0).toLocaleString()}
            </p>
            <p className="text-right text-[10px] text-gray-400">دينار عراقي</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-premium border border-gray-100/80 animate-fade-in-up">
            <div className="flex items-center gap-2 justify-end mb-2">
              <span className="text-xs font-bold text-gray-500">المصروفات</span>
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <ArrowUpRight size={16} className="text-red-600" />
              </div>
            </div>
            <p className="text-right text-lg font-black text-gray-900">
              {state.transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0).toLocaleString()}
            </p>
            <p className="text-right text-[10px] text-gray-400">دينار عراقي</p>
          </div>
        </div>

        {showAdd && (
          <div className="bg-white rounded-2xl p-5 mt-4 shadow-premium border border-gray-100/80 animate-slide-up">
            <h3 className="font-extrabold text-gray-900 mb-4 text-right">إضافة رصيد</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[10000, 25000, 50000, 100000, 250000, 500000].map(val => (
                <button
                  key={val}
                  onClick={() => setAmount(val.toString())}
                  className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all duration-300 btn-press ${
                    amount === val.toString()
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                      : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-gray-200'
                  }`}
                >
                  {val.toLocaleString()}
                </button>
              ))}
            </div>
            <input
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="أو أدخل المبلغ"
              type="number"
              className="w-full h-12 bg-gray-50 rounded-xl px-4 text-sm text-right outline-none border-2 border-gray-100 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 mb-4 transition-all"
            />
            <button
              onClick={handleAddBalance}
              disabled={!amount || parseInt(amount) <= 0}
              className="w-full bg-emerald-500 text-white py-3.5 rounded-xl font-bold shadow-lg hover:bg-emerald-600 transition-all btn-press disabled:opacity-50 disabled:cursor-not-allowed"
            >
              إضافة {amount && parseInt(amount) > 0 ? parseInt(amount).toLocaleString() + ' دينار' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
