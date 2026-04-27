import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../store/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BannerSlider() {
  const { state } = useApp();
  const activeAds = state.ads.filter(ad => ad.active && ad.position === 'banner');
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  useEffect(() => {
    if (activeAds.length <= 1) return;
    const timer = setInterval(() => {
      goTo((current + 1) % activeAds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeAds.length, current, goTo]);

  if (activeAds.length === 0) return null;

  return (
    <div className="relative mx-4 rounded-2xl overflow-hidden shadow-sovereign-lg group" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="relative h-44" style={{ background: '#111' }}>
        {activeAds.map((ad, i) => (
          <div
            key={ad.id}
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-end p-6">
              <div className="text-right max-w-[200px]">
                <h3 className="text-white text-lg font-bold leading-snug drop-shadow-lg">{ad.title}</h3>
                <button className="mt-3 text-xs px-4 py-2 rounded-xl font-semibold transition-all btn-press" style={{ background: 'rgba(0,212,255,0.2)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.3)' }}>
                  تسوق الآن
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeAds.length > 1 && (
        <>
          <button
            onClick={() => goTo((current - 1 + activeAds.length) % activeAds.length)}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 btn-press"
          >
            <ChevronLeft size={16} style={{ color: '#F5F5F5' }} />
          </button>
          <button
            onClick={() => goTo((current + 1) % activeAds.length)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 btn-press"
          >
            <ChevronRight size={16} style={{ color: '#F5F5F5' }} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {activeAds.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '20px' : '6px',
                  height: '6px',
                  background: i === current ? '#00D4FF' : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
