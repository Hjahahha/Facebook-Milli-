import { useState, useEffect } from 'react';
import { useApp } from '../store/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BannerSlider() {
  const { state } = useApp();
  const activeAds = state.ads.filter(ad => ad.active && ad.position === 'banner');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (activeAds.length <= 1) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % activeAds.length), 4000);
    return () => clearInterval(timer);
  }, [activeAds.length]);

  if (activeAds.length === 0) return null;

  return (
    <div className="relative mx-4 rounded-xl overflow-hidden shadow-md">
      <div className="relative h-40 bg-gradient-to-l from-purple-600 to-pink-500">
        <img
          src={activeAds[current].image}
          alt={activeAds[current].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent flex items-center justify-end p-6">
          <div className="text-right">
            <h3 className="text-white text-lg font-bold leading-snug">{activeAds[current].title}</h3>
          </div>
        </div>
      </div>
      {activeAds.length > 1 && (
        <>
          <button
            onClick={() => setCurrent(c => (c - 1 + activeAds.length) % activeAds.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrent(c => (c + 1) % activeAds.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {activeAds.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-4' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
