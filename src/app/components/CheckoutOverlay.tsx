interface CheckoutOverlayProps {
  onClose: () => void;
}

export function CheckoutOverlay({ onClose }: CheckoutOverlayProps) {
  return (
    <div
      className="absolute inset-0 bg-white z-[110] flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div className="text-center px-8">
        <div className="mb-4">
          <div className="w-20 h-20 mx-auto bg-[#FFA800] rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-4xl">🛍️</span>
          </div>
        </div>
        <h2 className="text-black text-[24px] font-bold mb-2">Redirecting...</h2>
        <p className="text-gray-600 text-[16px]">Jump to TikTok Shop Checkout</p>
      </div>
    </div>
  );
}
