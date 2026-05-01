import { X, Instagram, MessageCircle, Link2, Copy } from 'lucide-react';

interface SharePanelProps {
  onClose: () => void;
}

export function SharePanel({ onClose }: SharePanelProps) {
  const shareOptions = [
    { icon: Instagram, label: 'Instagram', color: '#E4405F' },
    { icon: MessageCircle, label: 'WhatsApp', color: '#25D366' },
    { icon: Link2, label: 'Copy Link', color: '#8B8B8B' },
  ];

  return (
    <div className="absolute inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-[28px] p-6 pb-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-[16px]">Share to</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Options */}
        <div className="grid grid-cols-4 gap-4">
          {shareOptions.map((option, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: option.color + '20' }}
              >
                <option.icon size={24} style={{ color: option.color }} />
              </div>
              <span className="text-white text-[12px]">{option.label}</span>
            </button>
          ))}
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10">
              <Copy size={24} className="text-white" />
            </div>
            <span className="text-white text-[12px]">More</span>
          </button>
        </div>
      </div>
    </div>
  );
}
