import {
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share2,
  ShoppingBag,
  MoreHorizontal,
  Play,
  Pause,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface CarouselCardProps {
  video: {
    thumbnail: string;
    description: string;
    tags: string;
    username: string;
    likes: string;
    comments: string;
  };
  isActive: boolean;
  onCardClick: () => void;
}

export function CarouselCard({
  video,
  isActive,
  onCardClick,
}: CarouselCardProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [avatarColor] = useState(`hsl(${Math.random() * 360}, 70%, 60%)`);

  return (
    <div
      className={`relative w-[320px] h-[675px] rounded-[24px] bg-black overflow-hidden transition-all duration-300 flex-shrink-0 ${
        isActive
          ? "scale-100 opacity-100"
          : "scale-90 opacity-50"
      }`}
      style={{ boxShadow: "0px 8px 20px rgba(0,0,0,0.4)" }}
    >
      {/* Video Preview Area - 70% */}
      <div
        className="relative w-full h-[75%] rounded-t-[20px] overflow-hidden cursor-pointer"
        onClick={onCardClick}
      >
        <ImageWithFallback
          src={video.thumbnail}
          alt="Video preview"
          className="w-full h-full object-cover"
        />

        {/* Mute/Unmute Button */}
        <button
          className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-10"
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
        >
          {isMuted ? (
            <VolumeX size={14} className="text-white" />
          ) : (
            <Volume2 size={14} className="text-white" />
          )}
        </button>

        {/* Auto-play Timer Indicator - moved to top center */}
        {isActive && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
            <div
              className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        )}

        {/* Playing Indicator */}
        {isActive && (
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              <span className="text-white text-[10px]">
                Playing
              </span>
            </div>
          </div>
        )}

        {/* Right Side Actions - TikTok Style */}
        <div className="absolute right-3 top-3 flex flex-col gap-3 items-center z-20">
          {/* User Avatar with Follow Button */}
          <div className="relative">
            <div
              className="w-12 h-12 rounded-full border-2 border-white overflow-hidden"
              style={{ backgroundColor: avatarColor }}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                {video.username.charAt(1).toUpperCase()}
              </div>
            </div>
            {!isFollowing && (
              <button
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FE2C55] flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFollowing(true);
                }}
              >
                <span className="text-white text-lg font-bold leading-none">+</span>
              </button>
            )}
          </div>

          {/* Music Icon - Rotating */}
          <button
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${isPlaying && isActive ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          </button>

          {/* Play/Pause Button */}
          
        </div>
      </div>

      {/* Description Area - 30% */}
      <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-sm">
        <div className="p-3 h-full flex flex-col justify-end">
          {/* Description Text */}
          <p className="text-white text-[13px] leading-[1.4] mb-1.5 line-clamp-2">
            {video.description}
          </p>

          {/* Tags */}
          <p className="text-[#25F4EE] text-[11px] mb-2 line-clamp-1">
            {video.tags}
          </p>

          {/* Username and Follow Button */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-bold text-[12px]">
              {video.username}
            </span>
            <button
              className="text-[#25F4EE] text-[12px] font-semibold"
              onClick={(e) => e.stopPropagation()}
            >
              Follow
            </button>
          </div>

          {/* Interaction Buttons */}
          <div className="flex items-center justify-between px-1">
            <button
              className="flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart
                className="w-5 h-5 text-white"
                strokeWidth={1.5}
              />
              <span className="text-white text-[10px] font-semibold">
                {video.likes}
              </span>
            </button>

            <button
              className="flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle
                className="w-5 h-5 text-white"
                strokeWidth={1.5}
              />
              <span className="text-white text-[10px] font-semibold">
                {video.comments}
              </span>
            </button>

            <button
              className="flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Share2
                className="w-5 h-5 text-white"
                strokeWidth={1.5}
              />
            </button>

            <button
              className="flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-6 h-6 rounded-full bg-[#FFC107] flex items-center justify-center">
                <ShoppingBag
                  className="w-3.5 h-3.5 text-white"
                  strokeWidth={2}
                />
              </div>
            </button>

            <button
              className="flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal
                className="w-5 h-5 text-white"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}