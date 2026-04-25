import { useApp } from '../store/AppContext';
import { Zap } from 'lucide-react';

export default function DailyRewards() {
  const { state, dispatch } = useApp();

  if (!state.isLoggedIn) return null;

  return (
    <div className="mx-4 bg-gradient-to-l from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
      <div className="flex items-center gap-2 mb-3 justify-end">
        <h3 className="text-sm font-bold text-gray-800">استلام النقاط اليومية</h3>
        <Zap size={18} className="text-yellow-500 fill-yellow-500" />
      </div>
      <div className="flex gap-2 justify-center">
        {state.dailyRewards.map(reward => (
          <button
            key={reward.day}
            onClick={() => {
              if (reward.available && !reward.collected) {
                dispatch({ type: 'COLLECT_DAILY_REWARD', payload: reward.day });
              }
            }}
            disabled={!reward.available || reward.collected}
            className={`flex-1 rounded-lg p-3 text-center transition-all ${
              reward.collected
                ? 'bg-green-100 border-2 border-green-400'
                : reward.available
                ? 'bg-white border-2 border-yellow-400 hover:bg-yellow-50 animate-pulse-glow cursor-pointer'
                : 'bg-gray-100 border border-gray-200 opacity-60'
            }`}
          >
            <p className="text-[10px] text-gray-500 mb-1">اليوم {reward.day}</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-yellow-600 text-sm">🪙</span>
              <span className="text-sm font-bold text-gray-800">+{reward.points}</span>
            </div>
            <p className="text-[9px] text-gray-400 mt-1">
              {reward.collected ? 'تم الجمع' : reward.available ? 'يجمع' : `${reward.day} أيام`}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
