interface TopNavProps {
  isForYou?: boolean;
}

export function TopNav({ isForYou = true }: TopNavProps) {
  return (
    <div className="absolute top-11 left-0 right-0 h-12 flex items-center justify-center gap-4 z-40">
      <button className={`text-[16px] ${!isForYou ? 'font-semibold text-white' : 'text-white/70'}`}>
        Following
      </button>
      <div className="w-px h-4 bg-white/30"></div>
      <button className={`text-[16px] relative ${isForYou ? 'font-semibold text-white' : 'text-white/70'}`}>
        For You
        {isForYou && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white"></div>}
      </button>
    </div>
  );
}
