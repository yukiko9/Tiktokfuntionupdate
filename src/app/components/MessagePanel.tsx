import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MessagePanelProps {
  onClose: () => void;
}

export function MessagePanel({ onClose }: MessagePanelProps) {
  const messages = [
    { user: 'Sarah Johnson', message: 'Hey! Love your latest video 🔥', time: '2m ago', unread: true },
    { user: 'Mike Chen', message: 'Thanks for the recommendation!', time: '1h ago', unread: false },
  ];

  return (
    <div className="absolute inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-[28px] pb-8 animate-slide-up"
        style={{ maxHeight: '70%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1a1a] rounded-t-[28px] p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-semibold text-[16px]">Messages</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer"
            >
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-${1600000000000 + idx}?w=50&h=50&fit=crop`}
                alt={msg.user}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-semibold text-[14px]">{msg.user}</span>
                  <span className="text-white/50 text-[11px]">{msg.time}</span>
                </div>
                <p className={`text-[13px] ${msg.unread ? 'text-white font-medium' : 'text-white/70'}`}>
                  {msg.message}
                </p>
              </div>
              {msg.unread && (
                <div className="w-2 h-2 rounded-full bg-[#FE2C55]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
