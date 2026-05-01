import { Heart } from 'lucide-react';

interface LikeAnimationProps {
  x: number;
  y: number;
}

export function LikeAnimation({ x, y }: LikeAnimationProps) {
  return (
    <div
      className="absolute pointer-events-none z-[90] animate-like-burst"
      style={{ left: x, top: y }}
    >
      <Heart
        className="text-[#FE2C55]"
        fill="#FE2C55"
        size={80}
      />
    </div>
  );
}
