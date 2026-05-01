import { ReactNode } from 'react';

interface TikTokFrameProps {
  children: ReactNode;
  bgImage: string;
  title: string;
}

export function TikTokFrame({ children, bgImage, title }: TikTokFrameProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-white text-sm font-medium">{title}</div>
      <div
        className="relative w-[390px] h-[844px] rounded-[40px] overflow-hidden bg-black"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
