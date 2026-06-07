import { useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, RefreshCw } from 'lucide-react';

export default function MessagesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <button><Settings size={22} className="text-gray-500" /></button>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">الرسائل</span>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xl">👨‍💼</span>
          </div>
        </div>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      <div className="flex flex-col items-center justify-center py-32">
        <p className="text-gray-400 text-lg font-semibold mb-3">قائمة الرسائل فارغة</p>
        <button className="text-red-600 font-semibold flex items-center gap-2">
          <RefreshCw size={16} />
          <span>تحديث</span>
        </button>
      </div>
    </div>
  );
}
