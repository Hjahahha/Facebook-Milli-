import { useApp } from '../store/AppContext';
import { Gift, Check, Lock } from 'lucide-react';

export default function DailyRewards() {
  const { state, dispatch } = useApp();

  if (!state.isLoggedIn) return null;

  return (
    <div className="mx-4 bg-gradient-to-l from-amber-50 via-orange-50 to-yellow-50 rounded-2xl p-4 border border-amber-100/80 shadow-premium relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full -translate-y-6 translate-x-6" />
      
      <div className="flex items-center gap-2.5 mb-3 justify-end relative z-10">
        <h3 className="text-sm font-bold text-gray-800">استلام النقاط اليومية</h3>
        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-glow-gold">
          <Gift size={16} className="text-white" />
        </div>
      </div>

      <div className="flex gap-2 justify-center stagger-children relative z-10">
        {state.dailyRewards.map(reward => (
          <button
            key={reward.day}
            onClick={() => {
              if (reward.available && !reward.collected) {
                dispatch({ type: 'COLLECT_DAILY_REWARD', payload: reward.day });
              }
            }}
            disabled={!reward.available || reward.collected}
            className={`flex-1 rounded-xl p-3 text-center transition-all duration-300 animate-fade-in-up ${
              reward.collected
                ? 'bg-emerald-50 border-2 border-emerald-300 shadow-sm'
                : reward.available
                ? 'bg-white border-2 border-amber-300 hover:border-amber-400 hover:shadow-md animate-pulse-glow cursor-pointer btn-press'
                : 'bg-gray-50/80 border border-gray-200/80 opacity-70'
            }`}
          >
            <p className="text-[10px] text-gray-400 mb-1 font-medium">اليوم {reward.day}</p>
            <div className="flex items-center justify-center gap-1">
              {reward.collected ? (
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Check size={12} className="text-emerald-600" />
                </div>
              ) : !reward.available ? (
                <Lock size={14} className="text-gray-300" />
              ) : (
                <>
                  <span className="text-amber-500 text-sm">🪙</span>
                  <span className="text-sm font-bold text-gray-800">+{reward.points}</span>
                </>
              )}
            </div>
            <p className="text-[9px] text-gray-400 mt-1 font-medium">
              {reward.collected ? 'تم ✓' : reward.available ? 'اضغط للجمع' : `${reward.day} أيام`}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
