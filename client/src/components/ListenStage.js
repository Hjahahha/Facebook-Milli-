import React, { useState } from 'react';

function ListenStage({ whisper, author, onSubmit }) {
  const [reply, setReply] = useState('');

  const handleSubmit = () => {
    if (reply.trim().length >= 10) {
      onSubmit(reply);
      setReply('');
    }
  };

  return (
    <div id="listenStage" className="card">
      <p className="eyebrow"><span>◐</span> اسمع أولاً</p>
      <p className="who">{author}</p>
      <p className="whisper-text">{whisper}</p>
      <textarea
        id="replyBox"
        placeholder="اكتب ردًا صادقًا... لن يصلك صوتك إلا بعد أن تصغي"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <div className="row">
        <span className="hint">{reply.trim().length < 10 ? `${10 - reply.trim().length} أحرف متبقية` : 'جاهز!'}</span>
        <button
          className="btn-teal"
          id="sendReply"
          disabled={reply.trim().length < 10}
          onClick={handleSubmit}
        >
          أرسل الإصغاء
        </button>
      </div>
    </div>
  );
}

export default ListenStage;
