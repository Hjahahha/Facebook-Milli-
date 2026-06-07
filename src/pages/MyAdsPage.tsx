import { useNavigate } from 'react-router-dom';
import { ArrowRight, RefreshCw } from 'lucide-react';

export default function MyAdsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
        <div />
        <h1 className="text-lg font-bold">إعلاناتي</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      <div className="flex flex-col items-center justify-center py-32">
        <p className="text-gray-400 text-lg font-semibold mb-3">قائمة إعلاناتي فارغة</p>
        <button className="text-red-600 font-semibold flex items-center gap-2">
          <RefreshCw size={16} />
          <span>تحديث</span>
        </button>
      </div>
    </div>
  );
}
