import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function TransactionsPage() {
  const navigate = useNavigate();
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div />
        <h1 className="text-lg font-bold">سجل المعاملات</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      {state.transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-gray-400 text-lg font-semibold mb-3">قائمة سجل المعاملات فارغة</p>
          <button className="text-red-600 font-semibold flex items-center gap-2">
            <RefreshCw size={16} />
            <span>تحديث</span>
          </button>
        </div>
      ) : (
        <div className="px-4 pt-4 space-y-2">
          {state.transactions.map(t => (
            <div key={t.id} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-200">
              <span className={`font-bold ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {t.type === 'credit' ? '+' : '-'}{t.amount.toLocaleString()} IQD
              </span>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{t.description}</p>
                <p className="text-xs text-gray-500">{formatDate(t.date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
