import { X, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CommentPanelProps {
  onClose: () => void;
}

export function CommentPanel({ onClose }: CommentPanelProps) {
  const comments = [
    { user: '@fashionlover88', text: 'This is amazing! Where can I get this? 😍', likes: '234', time: '2h ago' },
    { user: '@styleking', text: 'Great video! Love the content', likes: '89', time: '5h ago' },
    { user: '@trendwatcher', text: 'Absolutely fire! 🔥🔥🔥', likes: '156', time: '1d ago' },
  ];

  return (
    <div className="absolute inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-[28px] pb-8 animate-slide-up"
        style={{ maxHeight: '60%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1a1a] rounded-t-[28px] p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-semibold text-[15px]">5,234 comments</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Comments */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[400px]">
          {comments.map((comment, idx) => (
            <div key={idx} className="flex gap-3">
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-${1500000000000 + idx}?w=40&h=40&fit=crop`}
                alt={comment.user}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-[13px]">{comment.user}</span>
                  <span className="text-white/50 text-[11px]">{comment.time}</span>
                </div>
                <p className="text-white text-[14px] mb-2">{comment.text}</p>
                <div className="flex items-center gap-4">
                  <button className="text-white/50 text-[12px]">Reply</button>
                  <div className="flex items-center gap-1">
                    <Heart size={12} className="text-white/50" />
                    <span className="text-white/50 text-[12px]">{comment.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add comment..."
              className="flex-1 bg-white/10 text-white placeholder:text-white/50 px-4 py-2.5 rounded-full text-[14px] outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
