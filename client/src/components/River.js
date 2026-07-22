import React, { useEffect, useRef } from 'react';

function River({ whispers, myWhispers, showToast }) {
  const riverRef = useRef(null);

  useEffect(() => {
    if (!riverRef.current) return;

    const allWhispers = [...whispers, ...myWhispers];
    riverRef.current.innerHTML = '';

    allWhispers.forEach(w => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble' + (myWhispers.find(m => m.id === w.id) ? ' teal' : '');
      const size = 26 + Math.min(w.journey || 0, 6) * 6;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = Math.random() * 80 + '%';
      bubble.style.top = (10 + Math.random() * 55) + '%';
      bubble.style.animationDuration = (3 + Math.random() * 3) + 's';
      bubble.textContent = (w.journey || 0);
      bubble.title = w.text;
      bubble.onclick = () => showToast('"' + w.text.slice(0, 40) + (w.text.length > 40 ? '…' : '') + '"  —  رحلة عبر ' + (w.journey || 0) + ' شخص');
      riverRef.current.appendChild(bubble);
    });
  }, [whispers, myWhispers, showToast]);

  return (
    <div className="river">
      <div className="river-label">النهر الجمعي</div>
      <div ref={riverRef} style={{ position: 'relative', width: '100%', height: '100%' }}></div>
    </div>
  );
}

export default River;
