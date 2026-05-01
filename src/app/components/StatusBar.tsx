import { Battery, Signal } from 'lucide-react';

export function StatusBar() {
  return (
    <div className="absolute top-0 left-0 right-0 h-11 flex items-center justify-between px-6 pt-2 text-white text-sm z-50">
      <div className="flex items-center gap-1">
        <span className="font-semibold">9:41</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Signal size={14} strokeWidth={2.5} />
        <Battery size={20} strokeWidth={2} />
      </div>
    </div>
  );
}
