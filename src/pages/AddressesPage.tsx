import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ArrowRight, Plus, Trash2, MapPin } from 'lucide-react';
import { generateId } from '../utils/helpers';

export default function AddressesPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ label: '', fullAddress: '', city: '', area: '', phone: '' });

  const handleAdd = () => {
    if (!form.fullAddress) return;
    dispatch({ type: 'ADD_ADDRESS', payload: { id: generateId(), ...form, isDefault: state.addresses.length === 0 } });
    setShowAdd(false);
    setForm({ label: '', fullAddress: '', city: '', area: '', phone: '' });
  };

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div />
        <h1 className="text-lg font-bold">عناويني</h1>
        <button onClick={() => navigate(-1)}><ArrowRight size={24} className="text-gray-600" /></button>
      </div>

      <div className="px-4 pt-4">
        {state.addresses.length === 0 && !showAdd ? (
          <div className="flex flex-col items-center justify-center py-32">
            <p className="text-gray-400 text-lg font-semibold mb-3">قائمة العناوين الخاصة بي فارغة</p>
            <button onClick={() => setShowAdd(true)} className="text-red-600 font-semibold">إضافة عنوان</button>
          </div>
        ) : (
          <div className="space-y-3">
            {state.addresses.map(addr => (
              <div key={addr.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-start justify-between">
                <button onClick={() => dispatch({ type: 'REMOVE_ADDRESS', payload: addr.id })} className="text-red-400 mt-1">
                  <Trash2 size={16} />
                </button>
                <div className="flex items-start gap-3">
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{addr.label || 'المنزل'}</p>
                    <p className="text-sm text-gray-600">{addr.fullAddress}</p>
                    <p className="text-xs text-gray-500">{addr.city} - {addr.area}</p>
                    {addr.isDefault && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">افتراضي</span>}
                  </div>
                  <MapPin size={20} className="text-red-500 mt-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {showAdd && (
          <div className="bg-white rounded-xl p-4 mt-4 border border-gray-200 space-y-3 animate-slide-up">
            <input value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} placeholder="عنوان (المنزل، العمل...)" className="w-full h-12 bg-gray-50 rounded-lg px-4 text-sm text-right outline-none border" />
            <input value={form.fullAddress} onChange={e => setForm({ ...form, fullAddress: e.target.value })} placeholder="العنوان الكامل" className="w-full h-12 bg-gray-50 rounded-lg px-4 text-sm text-right outline-none border" />
            <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="المدينة" className="w-full h-12 bg-gray-50 rounded-lg px-4 text-sm text-right outline-none border" />
            <input value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} placeholder="المنطقة" className="w-full h-12 bg-gray-50 rounded-lg px-4 text-sm text-right outline-none border" />
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="رقم الهاتف" className="w-full h-12 bg-gray-50 rounded-lg px-4 text-sm text-right outline-none border" />
            <button onClick={handleAdd} className="w-full gradient-primary text-white py-3 rounded-xl font-bold">حفظ العنوان</button>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      {!showAdd && (
        <button onClick={() => setShowAdd(true)} className="fixed bottom-24 left-4 w-14 h-14 gradient-primary rounded-full flex items-center justify-center shadow-lg z-40">
          <Plus size={28} className="text-white" />
        </button>
      )}
    </div>
  );
}
