import { useState, useRef, useEffect } from 'react';
import { StatusBar } from './components/StatusBar';
import { TopNav } from './components/TopNav';
import { RightSidebar } from './components/RightSidebar';
import { VideoDescription } from './components/VideoDescription';
import { BottomNav } from './components/BottomNav';
import { ShopCard } from './components/ShopCard';
import { CommentPanel } from './components/CommentPanel';
import { SharePanel } from './components/SharePanel';
import { ProductDetailPanel } from './components/ProductDetailPanel';
import { LikeAnimation } from './components/LikeAnimation';
import { CheckoutOverlay } from './components/CheckoutOverlay';
import { MessagePanel } from './components/MessagePanel';
import { ProfilePanel } from './components/ProfilePanel';
import { NotificationToast } from './components/NotificationToast';
import { CarouselFrame } from './components/CarouselFrame';

interface VideoFrame {
  id: number;
  type?: 'video' | 'carousel';
  bgImage?: string;
  username?: string;
  description?: string;
  music?: string;
  likes: string;
  comments: string;
  showFollow?: boolean;
  showShopIcon?: boolean;
  sponsored?: boolean;
  promotesProduct?: boolean;
  hasShop?: boolean;
  shopData?: {
    title: string;
    price: string;
    originalPrice?: string;
    rating?: string;
    sold?: string;
    buttonText?: string;
    badge?: string;
    showColors?: boolean;
    freeShipping?: boolean;
    image: string;
  };
  badges?: Array<{ text: string; color: string; position: 'top-left' | 'top-right' }>;
}

const videoFrames: VideoFrame[] = [
  {
    id: 1,
    type: 'video',
    bgImage: 'https://images.unsplash.com/photo-1541904845547-0eaf866de232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    username: '@dance_studio',
    description: 'Choreography by Mia 🔥 #dance #fyp',
    music: 'Original sound - dance_studio 🎵',
    likes: '123.4K',
    comments: '5.2K',
    showFollow: true,
  },
  {
    id: 2,
    type: 'video',
    bgImage: 'https://images.unsplash.com/photo-1566733015703-b89a6389ff18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    username: '@beauty_with_jess',
    description: 'TikTok makes me buy it 😂 #foundationreview #tiktokshop',
    music: 'Original sound - beauty_with_jess',
    likes: '89.2K',
    comments: '3.1K',
    sponsored: true,
    promotesProduct: true,
    hasShop: true,
    shopData: {
      title: 'Luminous HD Foundation - 24H Wear',
      price: '$19.99',
      originalPrice: '$39.99',
      rating: '4.8',
      sold: '23K sold',
      buttonText: 'View Product',
      image: 'https://images.unsplash.com/photo-1566733015703-b89a6389ff18?w=400&h=400&fit=crop',
    },
  },
  {
    id: 3,
    type: 'carousel',
    likes: '0',
    comments: '0',
  },
  {
    id: 4,
    type: 'video',
    bgImage: 'https://images.unsplash.com/flagged/photo-1553802922-5f7e9934e328?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    username: '@streetstyle_claire',
    description: 'Spring outfit inspo 🌸 #fashiontiktok #tiktokshop',
    music: 'Golden Hour - JVKE',
    likes: '156.8K',
    comments: '8.4K',
    showShopIcon: true,
    hasShop: true,
    badges: [
      { text: '✓ TikTok Shop Verified', color: 'bg-blue-500 text-white', position: 'top-left' },
    ],
    shopData: {
      title: 'Oversized Blazer + Wide Leg Pants Set',
      price: '$55.99',
      sold: '1.2K sold',
      buttonText: 'Try on in Virtual Dressing Room',
      showColors: true,
      image: 'https://images.unsplash.com/flagged/photo-1553802922-5f7e9934e328?w=400&h=400&fit=crop',
    },
  },
  {
    id: 5,
    type: 'video',
    bgImage: 'https://images.unsplash.com/photo-1670275558804-c3de1af9af45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    username: '@travelfoodie',
    description: 'The best pizza in Naples 🍕 #foodietravel #naples',
    music: "That's Amore - Dean Martin",
    likes: '234.5K',
    comments: '12.3K',
    showFollow: true,
  },
];

export default function App() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [likedFrames, setLikedFrames] = useState<Set<number>>(new Set());
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notification, setNotification] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('Black');
  const [likeAnimations, setLikeAnimations] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [mouseStart, setMouseStart] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastTap, setLastTap] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentVideo = videoFrames[currentFrame];
  const isLiked = likedFrames.has(currentFrame);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowUp') {
        setCurrentFrame((prev) => (prev - 1 + videoFrames.length) % videoFrames.length);
      } else if (e.key === 'ArrowDown') {
        setCurrentFrame((prev) => (prev + 1) % videoFrames.length);
      } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && currentVideo.type === 'carousel') {
        // Trigger carousel navigation via custom event
        window.dispatchEvent(new CustomEvent('carousel-navigate', {
          detail: { direction: e.key === 'ArrowLeft' ? 'prev' : 'next' }
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFrame, currentVideo.type]);

  // Touch/Mouse drag handlers
  const handleDragStart = (x: number, y: number) => {
    setMouseStart({ x, y });
    setIsDragging(true);
  };

  const handleDragMove = (x: number, y: number) => {
    if (!isDragging || !mouseStart) return;
    const deltaY = y - mouseStart.y;
    setDragOffset(deltaY);
  };

  const handleDragEnd = (x: number, y: number) => {
    if (!isDragging || !mouseStart) return;

    const deltaY = y - mouseStart.y;
    setDragOffset(0);

    if (Math.abs(deltaY) > 50) {
      if (deltaY < 0) {
        setCurrentFrame((prev) => (prev + 1) % videoFrames.length);
      } else {
        setCurrentFrame((prev) => (prev - 1 + videoFrames.length) % videoFrames.length);
      }
    }

    setMouseStart(null);
    setIsDragging(false);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isDragging) return;

    const now = Date.now();
    const DOUBLE_CLICK_DELAY = 300;

    if (now - lastTap < DOUBLE_CLICK_DELAY) {
      handleLike();

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const animationId = Date.now();
      setLikeAnimations((prev) => [...prev, { id: animationId, x, y }]);

      setTimeout(() => {
        setLikeAnimations((prev) => prev.filter((anim) => anim.id !== animationId));
      }, 300);
    }

    setLastTap(now);
  };

  const handleLike = () => {
    setLikedFrames((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentFrame)) {
        newSet.delete(currentFrame);
      } else {
        newSet.add(currentFrame);
      }
      return newSet;
    });
  };

  const getCurrentLikes = () => {
    if (!currentVideo.likes || currentVideo.likes === '0') return '0';
    const baseCount = parseFloat(currentVideo.likes.replace('K', '')) * 1000;
    const adjustment = isLiked ? 1 : 0;
    const newCount = baseCount + adjustment;
    return newCount >= 1000 ? (newCount / 1000).toFixed(1) + 'K' : newCount.toString();
  };

  const handleCarouselCardClick = () => {
    setNotification('Jump to full video or product page');
    setTimeout(() => setNotification(''), 2000);
  };

  const handleNavClick = (nav: string) => {
    if (nav === 'home') {
      setCurrentFrame(0);
    } else if (nav === 'friends') {
      setNotification('Friends page (not built)');
      setTimeout(() => setNotification(''), 2000);
    } else if (nav === 'post') {
      setNotification('Open camera');
      setTimeout(() => setNotification(''), 2000);
    } else if (nav === 'inbox') {
      setShowMessages(true);
    } else if (nav === 'profile') {
      setShowProfile(true);
    }
  };

  const handleProductClick = () => {
    setShowProductDetail(true);
  };

  const handleBuyNow = () => {
    setShowProductDetail(false);
    setShowCheckout(true);
    setTimeout(() => setShowCheckout(false), 2000);
  };

  const handleMusicClick = () => {
    setNotification('Opening music page...');
    setTimeout(() => setNotification(''), 2000);
  };

  return (
    <div className="size-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-[390px] h-[844px] rounded-[40px] overflow-hidden bg-black cursor-grab active:cursor-grabbing select-none"
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          transform: `translateY(${dragOffset * 0.3}px)`,
          transition: isDragging ? 'none' : 'transform 0.25s ease-out, opacity 0.2s ease-out',
        }}
        onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
        onMouseUp={(e) => handleDragEnd(e.clientX, e.clientY)}
        onMouseLeave={() => {
          setDragOffset(0);
          setIsDragging(false);
          setMouseStart(null);
        }}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
        onClick={handleDoubleClick}
      >
        {/* Video Background or Carousel */}
        {currentVideo.type === 'carousel' ? (
          <CarouselFrame
            onCardClick={handleCarouselCardClick}
            onNavigate={(direction) => {
              if (direction === 'next') {
                setCurrentFrame((prev) => (prev + 1) % videoFrames.length);
              }
            }}
            onNavClick={handleNavClick}
          />
        ) : (
          <div
            className="absolute inset-0 transition-opacity duration-200"
            style={{
              backgroundImage: `url(${currentVideo.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
          {/* Status Bar */}
          <StatusBar />

          {/* Top Navigation */}
          <TopNav isForYou={true} />

          {/* Badges */}
          {currentVideo.badges?.map((badge, idx) => (
            <div
              key={idx}
              className={`absolute ${badge.position === 'top-left' ? 'top-24 left-4' : 'top-24 right-4'} z-30`}
            >
              <div className={`${badge.color} rounded-${badge.position === 'top-left' ? 'full' : 'md'} px-2.5 py-1`}>
                <span className="text-[10px] font-semibold">{badge.text}</span>
              </div>
            </div>
          ))}

          {/* Frame 4 extra badge */}
          {currentFrame === 3 && (
            <div className="absolute top-36 left-4 z-30">
              <div className="bg-green-500/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
                <span className="text-white text-[10px] font-semibold">Buy together saves $10</span>
              </div>
            </div>
          )}

          {/* Sponsored tag */}
          {currentVideo.sponsored && (
            <div className="absolute top-24 left-4 z-30">
              <span className="text-white/50 text-[11px]">Sponsored</span>
            </div>
          )}

          {/* Right Sidebar */}
          <RightSidebar
            showFollow={currentVideo.showFollow}
            showShopIcon={currentVideo.showShopIcon}
            likes={getCurrentLikes()}
            comments={currentVideo.comments}
            isLiked={isLiked}
            onLikeClick={handleLike}
            onCommentClick={() => setShowComments(true)}
            onShareClick={() => setShowShare(true)}
            onMusicClick={handleMusicClick}
          />

          {/* Shop Card */}
          {currentVideo.hasShop && currentVideo.shopData && (
            <div onClick={handleProductClick}>
              <ShopCard
                {...currentVideo.shopData}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
              />
            </div>
          )}

          {/* Video Description */}
          <VideoDescription
            username={currentVideo.username}
            description={currentVideo.description}
            music={currentVideo.music}
            sponsored={currentVideo.sponsored}
            promotesProduct={currentVideo.promotesProduct}
          />

          {/* Bottom Navigation */}
          <BottomNav active={currentFrame === 0 ? 'home' : null} onNavClick={handleNavClick} />

          {/* Playing Indicator */}
          <div className="absolute top-20 left-4 z-10">
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              <span className="text-white text-[10px]">Playing</span>
            </div>
          </div>

          {/* Video Info */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <p className="text-white/80 text-[10px]">
                Video playing: {currentVideo.description.slice(0, 30)}...
              </p>
            </div>
          </div>

          {/* Frame Counter */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <p className="text-white/80 text-[10px]">
                Frame {currentFrame + 1}/{videoFrames.length}
              </p>
              <p className="text-white/60 text-[9px] mt-1">
                Swipe ↑↓
              </p>
            </div>
          </div>

          {/* Like Animations */}
          {likeAnimations.map((anim) => (
            <LikeAnimation key={anim.id} x={anim.x} y={anim.y} />
          ))}
        </div>
        )}

        {/* Panels */}
        {showComments && <CommentPanel onClose={() => setShowComments(false)} />}
        {showShare && <SharePanel onClose={() => setShowShare(false)} />}
        {showMessages && <MessagePanel onClose={() => setShowMessages(false)} />}
        {showProfile && <ProfilePanel onClose={() => setShowProfile(false)} />}
        {showProductDetail && currentVideo.shopData && (
          <ProductDetailPanel
            product={currentVideo.shopData}
            onClose={() => setShowProductDetail(false)}
            onBuyNow={handleBuyNow}
          />
        )}
        {showCheckout && <CheckoutOverlay onClose={() => setShowCheckout(false)} />}
        {notification && <NotificationToast message={notification} />}
      </div>

      {/* Instructions */}
      
    </div>
  );
}
