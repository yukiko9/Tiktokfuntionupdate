import { ImageWithFallback } from './figma/ImageWithFallback';
import { Music } from 'lucide-react';

interface VideoDescriptionProps {
  username: string;
  description: string;
  music: string;
  avatar?: string;
  sponsored?: boolean;
  promotesProduct?: boolean;
}

export function VideoDescription({
  username,
  description,
  music,
  avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
  sponsored = false,
  promotesProduct = false
}: VideoDescriptionProps) {
  return (
    <div className="absolute bottom-20 left-4 right-20 z-20">
      <div className="bg-gradient-to-t from-black/60 to-transparent p-4 -mx-4 -mb-4 pb-8">
        {/* User info */}
        <div className="flex items-center gap-2 mb-2">
          <ImageWithFallback
            src={avatar}
            alt={username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-white font-semibold text-[15px]">{username}</span>
          {sponsored && (
            <span className="text-white/60 text-[11px]">· Sponsored</span>
          )}
        </div>

        {promotesProduct && (
          <div className="text-white/70 text-[11px] mb-1">Promotes this product</div>
        )}

        {/* Description */}
        <p className="text-white text-[14px] mb-2 leading-tight">
          {description}
        </p>

        {/* Music */}
        <div className="flex items-center gap-1.5">
          <Music className="w-3 h-3 text-white" />
          <span className="text-white text-[13px]">{music}</span>
        </div>
      </div>
    </div>
  );
}
