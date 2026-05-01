import { Heart, MessageCircle, Bookmark, Share2, Music } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RightSidebarProps {
  avatar?: string;
  showFollow?: boolean;
  showShopIcon?: boolean;
  likes: string;
  comments: string;
  isLiked?: boolean;
  onLikeClick?: () => void;
  onCommentClick?: () => void;
  onShareClick?: () => void;
  onMusicClick?: () => void;
}

export function RightSidebar({
  avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  showFollow = true,
  showShopIcon = false,
  likes,
  comments,
  isLiked = false,
  onLikeClick,
  onCommentClick,
  onShareClick,
  onMusicClick
}: RightSidebarProps) {
  return (
    <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5 z-30">
      {/* Avatar */}
      <div className="relative">
        <ImageWithFallback
          src={avatar}
          alt="User avatar"
          className="w-12 h-12 rounded-full border-2 border-white object-cover"
        />
        {showFollow && (
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#FE2C55] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">+</span>
          </div>
        )}
        {showShopIcon && (
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#FFC107] rounded-full flex items-center justify-center">
            <span className="text-white text-[10px]">🛍️</span>
          </div>
        )}
      </div>

      {/* Like */}
      <button
        className="flex flex-col items-center gap-1 transition-transform active:scale-110"
        onClick={onLikeClick}
      >
        <Heart
          className={`w-8 h-8 ${isLiked ? 'text-[#FE2C55]' : 'text-white'}`}
          fill={isLiked ? '#FE2C55' : 'white'}
          strokeWidth={1.5}
        />
        <span className="text-white text-xs font-semibold">{likes}</span>
      </button>

      {/* Comment */}
      <button
        className="flex flex-col items-center gap-1 transition-transform active:scale-110"
        onClick={onCommentClick}
      >
        <MessageCircle className="w-8 h-8 text-white" strokeWidth={1.5} />
        <span className="text-white text-xs font-semibold">{comments}</span>
      </button>

      {/* Bookmark */}
      <button className="flex flex-col items-center gap-1 transition-transform active:scale-110">
        <Bookmark className="w-8 h-8 text-white" strokeWidth={1.5} />
      </button>

      {/* Share */}
      <button
        className="flex flex-col items-center gap-1 transition-transform active:scale-110"
        onClick={onShareClick}
      >
        <Share2 className="w-8 h-8 text-white" strokeWidth={1.5} />
      </button>

      {/* Music disc */}
      <button
        className="mt-2 relative transition-transform active:scale-110"
        onClick={onMusicClick}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-spin-slow">
          <Music className="w-4 h-4 text-white" />
        </div>
      </button>
    </div>
  );
}
