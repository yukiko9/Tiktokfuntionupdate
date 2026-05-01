import { ShoppingBag, Star } from 'lucide-react';

interface ShopCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  rating?: string;
  sold?: string;
  buttonText?: string;
  badge?: string;
  showColors?: boolean;
  freeShipping?: boolean;
  selectedColor?: string;
  onColorChange?: (color: string) => void;
}

export function ShopCard({
  title,
  price,
  originalPrice,
  rating,
  sold,
  buttonText = 'Shop Now',
  badge,
  showColors = false,
  freeShipping = false,
  selectedColor = 'Black',
  onColorChange
}: ShopCardProps) {
  const colors = [
    { name: 'Black', bg: 'bg-black' },
    { name: 'Beige', bg: 'bg-[#D4C5B9]' },
    { name: 'Navy', bg: 'bg-blue-900' },
  ];
  return (
    <div className="absolute bottom-32 left-4 right-4 z-25">
      {/* Shop indicator */}
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-[#FFC107] rounded-full px-2.5 py-1 flex items-center gap-1">
          <ShoppingBag className="w-3.5 h-3.5 text-white" />
          <span className="text-white text-[11px] font-semibold">Shop</span>
        </div>
        {badge && (
          <div className="bg-yellow-400 rounded-md px-2 py-0.5">
            <span className="text-black text-[10px] font-bold">{badge}</span>
          </div>
        )}
      </div>

      {/* Product card */}
      <div className="bg-black/80 backdrop-blur-md rounded-2xl p-3 border border-white/10">
        {rating && (
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400" fill={i < 4 ? '#FFC107' : 'none'} strokeWidth={1.5} />
              ))}
            </div>
            <span className="text-white text-[11px]">{rating}</span>
            {sold && <span className="text-white/60 text-[11px]">· {sold}</span>}
          </div>
        )}

        <h3 className="text-white font-semibold text-[14px] mb-2 leading-tight">{title}</h3>

        {showColors && (
          <>
            <div className="flex gap-1.5 mb-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    onColorChange?.(color.name);
                  }}
                  className={`w-5 h-5 rounded-full ${color.bg} border-2 ${
                    selectedColor === color.name ? 'border-white' : 'border-white/30'
                  }`}
                />
              ))}
            </div>
            <div className="text-white/70 text-[11px] mb-2">Color: {selectedColor} selected</div>
          </>
        )}

        <div className="flex items-center gap-2 mb-2">
          <span className="text-white font-bold text-[16px]">{price}</span>
          {originalPrice && (
            <span className="text-white/50 text-[13px] line-through">{originalPrice}</span>
          )}
        </div>

        {freeShipping && (
          <div className="text-[#4ADE80] text-[11px] mb-2">Free shipping on orders $20+</div>
        )}

        <button className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FFA800] text-white font-semibold text-[13px] py-2.5 rounded-lg">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
