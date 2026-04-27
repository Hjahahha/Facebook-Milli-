import { useApp } from '../store/AppContext';
import { Gift, Check, Lock } from 'lucide-react';

export default function DailyRewards() {
  const { state, dispatch } = useApp();

  if (!state.isLoggedIn) return null;

  return (
    <div className="mx-4 card-sovereign p-4 relative overflow-hidden" style={{ borderColor: 'rgba(255,215,0,0.15)' }}>
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-6 translate-x-6" style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.1), transparent)' }} />
      
      <div className="flex items-center gap-2.5 mb-3 justify-end relative z-10">
        <h3 className="text-sm font-bold" style={{ color: '#F5F5F5' }}>استلام النقاط اليومية</h3>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-glow-gold" style={{ background: 'linear-gradient(135deg, #FFD700, #CC9900)' }}>
          <Gift size={16} style={{ color: '#050505' }} />
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
            className="flex-1 rounded-xl p-3 text-center transition-all duration-300 animate-fade-in-up btn-press"
            style={{
              background: reward.collected ? 'rgba(0,230,118,0.1)' : reward.available ? 'rgba(255,215,0,0.08)' : '#111',
              border: `1px solid ${reward.collected ? 'rgba(0,230,118,0.3)' : reward.available ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.06)'}`,
              opacity: !reward.available && !reward.collected ? 0.5 : 1,
            }}
          >
            <p className="text-[10px] mb-1 font-medium" style={{ color: '#707070' }}>اليوم {reward.day}</p>
            <div className="flex items-center justify-center gap-1">
              {reward.collected ? (
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,230,118,0.2)' }}>
                  <Check size={12} style={{ color: '#00E676' }} />
                </div>
              ) : !reward.available ? (
                <Lock size={14} style={{ color: '#707070' }} />
              ) : (
                <>
                  <span className="text-sm">🪙</span>
                  <span className="text-sm font-bold" style={{ color: '#FFD700' }}>+{reward.points}</span>
                </>
              )}
            </div>
            <p className="text-[9px] mt-1 font-medium" style={{ color: '#707070' }}>
              {reward.collected ? 'تم' : reward.available ? 'اضغط للجمع' : `${reward.day} أيام`}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
