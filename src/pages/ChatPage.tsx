import { Search, Filter, BadgeCheck, Bot, ChevronLeft } from 'lucide-react';

const conversations = [
  { id: '1', name: 'أحمد الكهربائي', lastMsg: 'سأكون عندك الساعة 4 مساءً إن شاء الله', time: 'منذ 5 د', unread: 2, verified: true, autoReply: true, color: '#00D4FF' },
  { id: '2', name: 'مكتب الأمل العقاري', lastMsg: 'الشقة متاحة للمعاينة غداً', time: 'منذ 15 د', unread: 0, verified: true, autoReply: false, color: '#00E676' },
  { id: '3', name: 'متجر التقنية', lastMsg: 'تم شحن طلبك #1234', time: 'منذ ساعة', unread: 1, verified: false, autoReply: false, color: '#00D4FF' },
  { id: '4', name: 'ورشة النجم', lastMsg: '[رد آلي] شكراً لتواصلك! سأرد خلال 30 دقيقة', time: 'منذ 2 ساعة', unread: 0, verified: true, autoReply: true, color: '#FF1744' },
  { id: '5', name: 'سباكة الرافدين', lastMsg: 'تم إصلاح المشكلة بنجاح', time: 'أمس', unread: 0, verified: true, autoReply: false, color: '#FF6D00' },
  { id: '6', name: 'معرض الفردوس للسيارات', lastMsg: 'السعر النهائي 48,000,000 د.ع', time: 'أمس', unread: 3, verified: false, autoReply: false, color: '#FF1744' },
];

export default function ChatPage() {

  return (
    <div className="pb-24 animate-fade-in" style={{ background: '#050505' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3" style={{ background: 'linear-gradient(180deg, #0A0A0A, #050505)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Search size={16} style={{ color: '#707070' }} />
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Filter size={16} style={{ color: '#707070' }} />
            </button>
          </div>
          <div className="text-right">
            <h1 className="text-lg font-black" style={{ color: '#F5F5F5' }}>المحادثات</h1>
            <p className="text-[9px] font-bold tracking-[2px]" style={{ color: '#00D4FF' }}>IRON-CLAD MESSAGING</p>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-1.5 justify-end">
          <span className="text-[10px] font-medium" style={{ color: '#00E676' }}>متصل • Socket.io</span>
          <div className="w-2 h-2 rounded-full" style={{ background: '#00E676' }} />
        </div>
      </div>

      {/* Conversations */}
      <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {conversations.map(conv => (
          <div key={conv.id} className="px-4 py-3 flex items-center gap-3 cursor-pointer btn-press" style={{ borderBottomColor: 'rgba(255,255,255,0.04)', borderBottomWidth: '1px' }}>
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${conv.color}15` }}>
                <span className="text-lg font-bold" style={{ color: conv.color }}>{conv.name.charAt(0)}</span>
              </div>
              {conv.verified && (
                <div className="absolute -bottom-0.5 -right-0.5 rounded-full p-0.5" style={{ background: '#050505' }}>
                  <BadgeCheck size={14} style={{ color: '#1DA1F2' }} />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[11px]" style={{ color: conv.unread > 0 ? '#00D4FF' : '#707070' }}>{conv.time}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold truncate" style={{ color: '#F5F5F5' }}>{conv.name}</span>
                  {conv.autoReply && <Bot size={12} style={{ color: '#00D4FF' }} />}
                </div>
              </div>
              <div className="flex items-center justify-between">
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: '#00D4FF', color: '#050505' }}>
                    {conv.unread}
                  </div>
                )}
                <p className="text-[12px] truncate text-right flex-1" style={{ color: conv.unread > 0 ? '#B0B0B0' : '#707070' }}>{conv.lastMsg}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-Reply Settings */}
      <div className="px-4 mt-4">
        <div className="card-sovereign p-3 flex items-center gap-3 cursor-pointer" style={{ borderColor: 'rgba(0,212,255,0.15)' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.15)' }}>
            <Bot size={20} style={{ color: '#00D4FF' }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold" style={{ color: '#F5F5F5' }}>إعدادات الرد الآلي</p>
            <p className="text-[11px]" style={{ color: '#707070' }}>فعّل ردود تلقائية لزبائنك</p>
          </div>
          <ChevronLeft size={16} style={{ color: '#00D4FF' }} />
        </div>
      </div>
    </div>
  );
}
