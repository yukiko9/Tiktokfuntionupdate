import { X, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailPanelProps {
  product: {
    title: string;
    price: string;
    originalPrice?: string;
    image: string;
  };
  onClose: () => void;
  onBuyNow: () => void;
}

export function ProductDetailPanel({ product, onClose, onBuyNow }: ProductDetailPanelProps) {
  return (
    <div className="absolute inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-[28px] p-6 pb-8 animate-slide-up"
        style={{ maxHeight: '80%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-[16px]">Product Details</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Product Image */}
        <div className="mb-4 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Product Info */}
        <h2 className="text-white font-semibold text-[18px] mb-3 leading-tight">
          {product.title}
        </h2>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-white font-bold text-[24px]">{product.price}</span>
          {product.originalPrice && (
            <span className="text-white/50 text-[16px] line-through">{product.originalPrice}</span>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-white font-semibold text-[14px] mb-2">Description</h4>
          <p className="text-white/70 text-[13px] leading-relaxed">
            High-quality product with premium materials. Perfect for everyday use.
            Free shipping on orders over $20. 30-day return policy.
          </p>
        </div>

        {/* Buy Button */}
        <button
          onClick={onBuyNow}
          className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FFA800] text-white font-semibold text-[15px] py-4 rounded-xl flex items-center justify-center gap-2"
        >
          <ShoppingBag size={20} />
          Buy Now
        </button>
      </div>
    </div>
  );
}
