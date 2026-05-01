import { Home, Users, Plus, MessageSquare, User } from 'lucide-react';

interface BottomNavProps {
  active?: 'home' | 'friends' | 'inbox' | 'profile' | null;
  onNavClick?: (nav: string) => void;
}

export function BottomNav({ active = 'home', onNavClick }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 backdrop-blur-xl bg-black/40 border-t border-white/10 flex items-center justify-around px-4 z-50">
      <button className="flex flex-col items-center gap-0.5" onClick={() => onNavClick?.('home')}>
        <Home className="w-6 h-6" fill={active === 'home' ? 'white' : 'none'} stroke="white" strokeWidth={1.5} />
        <span className={`text-[10px] ${active === 'home' ? 'text-white font-semibold' : 'text-white/70'}`}>Home</span>
      </button>

      <button className="flex flex-col items-center gap-0.5" onClick={() => onNavClick?.('friends')}>
        <Users className="w-6 h-6" fill={active === 'friends' ? 'white' : 'none'} stroke="white" strokeWidth={1.5} />
        <span className={`text-[10px] ${active === 'friends' ? 'text-white font-semibold' : 'text-white/70'}`}>Friends</span>
      </button>

      <button className="relative -mt-6" onClick={() => onNavClick?.('post')}>
        <div className="w-12 h-8 bg-gradient-to-r from-[#00F2EA] via-[#FF0050] to-[#00F2EA] rounded-lg flex items-center justify-center">
          <Plus className="w-6 h-6 text-white" strokeWidth={3} />
        </div>
      </button>

      <button className="flex flex-col items-center gap-0.5" onClick={() => onNavClick?.('inbox')}>
        <MessageSquare className="w-6 h-6" fill={active === 'inbox' ? 'white' : 'none'} stroke="white" strokeWidth={1.5} />
        <span className={`text-[10px] ${active === 'inbox' ? 'text-white font-semibold' : 'text-white/70'}`}>Inbox</span>
      </button>

      <button className="flex flex-col items-center gap-0.5" onClick={() => onNavClick?.('profile')}>
        <User className="w-6 h-6" fill={active === 'profile' ? 'white' : 'none'} stroke="white" strokeWidth={1.5} />
        <span className={`text-[10px] ${active === 'profile' ? 'text-white font-semibold' : 'text-white/70'}`}>Profile</span>
      </button>
    </div>
  );
}
