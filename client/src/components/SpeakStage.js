import React, { useState } from 'react';

function SpeakStage({ onSubmit }) {
  const [whisper, setWhisper] = useState('');

  const handleSubmit = () => {
    if (whisper.trim().length >= 6) {
      onSubmit(whisper);
      setWhisper('');
    }
  };

  return (
    <div id="speakStage" className="card">
      <p className="eyebrow"><span>◑</span> الآن صوتك</p>
      <textarea
        id="whisperBox"
        placeholder="اكتب خاطرتك هنا... ستنطلق عبر النهر بقدر ما يصغي إليها الآخرون"
        value={whisper}
        onChange={(e) => setWhisper(e.target.value)}
      />
      <div className="row">
        <span className="hint">{whisper.trim().length < 6 ? `${6 - whisper.trim().length} أحرف متبقية` : 'جاهز!'}</span>
        <button
          className="btn-gold"
          id="sendWhisper"
          disabled={whisper.trim().length < 6}
          onClick={handleSubmit}
        >
          أطلق الصدى
        </button>
      </div>
    </div>
  );
}

export default SpeakStage;
