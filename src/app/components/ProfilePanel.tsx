import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfilePanelProps {
  onClose: () => void;
}

export function ProfilePanel({ onClose }: ProfilePanelProps) {
  return (
    <div className="absolute inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-[28px] pb-8 animate-slide-up"
        style={{ maxHeight: '80%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1a1a] rounded-t-[28px] p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-semibold text-[16px]">Profile</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6 text-center">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-white font-bold text-[20px] mb-1">@yourprofile</h2>
          <p className="text-white/70 text-[14px] mb-6">Content creator | Travel enthusiast</p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-6">
            <div>
              <div className="text-white font-bold text-[18px]">1.2M</div>
              <div className="text-white/60 text-[12px]">Following</div>
            </div>
            <div>
              <div className="text-white font-bold text-[18px]">8.5M</div>
              <div className="text-white/60 text-[12px]">Followers</div>
            </div>
            <div>
              <div className="text-white font-bold text-[18px]">142.3M</div>
              <div className="text-white/60 text-[12px]">Likes</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-[#FE2C55] text-white font-semibold py-3 rounded-lg">
              Edit Profile
            </button>
            <button className="flex-1 bg-white/10 text-white font-semibold py-3 rounded-lg">
              Share Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
