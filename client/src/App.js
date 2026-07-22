import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css';
import River from './components/River';
import ListenStage from './components/ListenStage';
import SpeakStage from './components/SpeakStage';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const socket = io(API_URL);

const pool = [
  "أشعر أني أضع كل جهدي في مكان لا أحد يراه فيه.",
  "كل ليلة أؤجل شيئًا أعرف أنه سيريحني لو فعلته الآن.",
  "أخاف أن أطلب المساعدة لأن ذلك يبدو ضعفًا في عيني.",
  "أحيانًا أضحك بصوت عالٍ لأخفي أني تعبت من الابتسام.",
  "لم أعد أعرف إن كنت أحب عملي أم فقط اعتدته.",
  "أشتاق لشخص كنت أظن أنه سيبقى للأبد.",
  "أكتب هذا لأن لا أحد حولي يسأل كيف حالي فعلاً.",
  "أشعر بالفخر لأني استمررت رغم كل ما مررت به هذا الشهر."
];

const names = ["مجهول ١٩", "صوت عابر", "غريب لطيف", "همسة ٧", "بلا اسم", "مسافر صامت"];

function App() {
  const [state, setState] = useState({
    sessionId: null,
    respondedFirst: false,
    myWhispers: [],
    whispers: [],
    currentWhisper: null,
    currentWhisperAuthor: null
  });
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    // Initialize session
    const initSession = async () => {
      try {
        const response = await axios.post(`${API_URL}/api/session`);
        setState(prev => ({ ...prev, sessionId: response.data.sessionId }));
      } catch (err) {
        console.error('Session init error:', err);
      }
    };

    // Fetch whispers
    const fetchWhispers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/whispers`);
        setState(prev => ({ ...prev, whispers: response.data }));
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    initSession();
    fetchWhispers();

    // Socket listeners
    socket.on('whisper:new', (whisper) => {
      setState(prev => ({
        ...prev,
        whispers: [whisper, ...prev.whispers]
      }));
    });

    socket.on('whisper:update', (whisper) => {
      setState(prev => ({
        ...prev,
        whispers: prev.whispers.map(w => w.id === whisper.id ? whisper : w),
        myWhispers: prev.myWhispers.map(w => w.id === whisper.id ? whisper : w)
      }));
    });

    pickWhisper();
  }, []);

  const pickWhisper = () => {
    const idx = Math.floor(Math.random() * pool.length);
    const author = names[Math.floor(Math.random() * names.length)];
    setState(prev => ({
      ...prev,
      currentWhisper: pool[idx],
      currentWhisperAuthor: author + "، بلا اسم"
    }));
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2600);
  };

  const handleReplySubmit = async (replyText) => {
    setState(prev => ({ ...prev, respondedFirst: true }));
    showToast('وصل إصغاؤك لصاحب الخاطرة. الآن دورك.');
    pickWhisper();
  };

  const handleWhisperSubmit = async (whisperText) => {
    try {
      const response = await axios.post(`${API_URL}/api/whispers`, {
        text: whisperText,
        author: state.sessionId
      });
      setState(prev => ({ ...prev, myWhispers: [...prev.myWhispers, response.data] }));
      showToast('انطلق صداك في النهر. بانتظار من يصغي إليه.');
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="wrap">
      <div className="brand">
        <h1>الصدى</h1>
        <p>لا متابعون. لا إعجابات. فقط أصداء تسافر.</p>
      </div>

      <River whispers={state.whispers} myWhispers={state.myWhispers} showToast={showToast} />

      {!state.respondedFirst ? (
        <ListenStage
          whisper={state.currentWhisper}
          author={state.currentWhisperAuthor}
          onSubmit={handleReplySubmit}
        />
      ) : (
        <SpeakStage onSubmit={handleWhisperSubmit} />
      )}

      <p className="rule">صوتك <b>لا ينتشر</b> إلا حين يصغي إلى غيره أولاً،<br />وانتشاره يُقاس بمن استجاب له، لا بمن أعجبه.</p>

      <div className={`toast ${toastMsg ? 'show' : ''}`}>{toastMsg}</div>
    </div>
  );
}

export default App;
