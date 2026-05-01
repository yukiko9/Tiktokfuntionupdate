import { useState, useEffect, useRef } from "react";
import { CarouselCard } from "./CarouselCard";
import { StatusBar } from "./StatusBar";
import { BottomNav } from "./BottomNav";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselVideos = [
  {
    thumbnail:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=600&fit=crop",
    description:
      "复古风拉满！这件 adidas vintage 卫衣真的太百搭了，日常出门拍照绝绝子📸",
    tags: "#adidas #adidasvintage #复古穿搭 #OOTD",
    username: "@vintage_style_daily",
    likes: "12.4K",
    comments: "845",
    shopData: {
      title: "Adidas Vintage 复古卫衣 经典三叶草",
      price: "$45.99",
      shopName: "Vintage Style Store",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
    },
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=600&fit=crop",
    description:
      "三叶草系列永不过时！这条复古运动裤搭配任何上衣都超好看 🔥",
    tags: "#adidas #三叶草 #运动裤 #streetwear",
    username: "@sporty_vibes_88",
    likes: "18.2K",
    comments: "1.2K",
    shopData: {
      title: "Adidas 三叶草复古运动裤 宽松版型",
      price: "$52.99",
      shopName: "Sporty Vibes",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop",
    },
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1520638023360-722281b2f0a8?w=400&h=600&fit=crop",
    description:
      "找到这件复古夹克真是太幸运了！80年代经典款，状态完美 ✨",
    tags: "#adidasvintage #复古夹克 #thrifted #vintagefashion",
    username: "@thrift_queen_nyc",
    likes: "23.7K",
    comments: "2.1K",
    shopData: {
      title: "Adidas 80年代复古夹克 限量珍藏版",
      price: "$89.99",
      shopName: "Thrift Queen NYC",
      image: "https://images.unsplash.com/photo-1520638023360-722281b2f0a8?w=400&h=400&fit=crop",
    },
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=600&fit=crop",
    description:
      "复古棒球帽配白T，简约又有型！adidas 真的是王者 👑",
    tags: "#adidas #棒球帽 #simpleoutfit #casualstyle",
    username: "@cap_collector_01",
    likes: "9.8K",
    comments: "567",
    shopData: {
      title: "Adidas 复古棒球帽 经典款式",
      price: "$28.99",
      shopName: "Cap Collector",
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop",
    },
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop",
    description:
      "这双 Superstar 复刻版真的绝了！经典永不过时 👟",
    tags: "#adidasSuperstar #sneakerhead #复古球鞋 #adidas",
    username: "@sneaker_fanatic_",
    likes: "34.5K",
    comments: "3.4K",
    shopData: {
      title: "Adidas Superstar 复刻版运动鞋",
      price: "$120.00",
      shopName: "Sneaker Fanatic",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    },
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
    description:
      "全套 adidas vintage 穿搭教程来啦！从头到脚都是复古 🎨",
    tags: "#adidas #fulllook #vintagestyle #fashiontutorial",
    username: "@outfit_guru_pro",
    likes: "28.9K",
    comments: "2.8K",
    shopData: {
      title: "Adidas Vintage 全套穿搭套装",
      price: "$199.99",
      shopName: "Outfit Guru Pro",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
    },
  },
];

interface CarouselFrameProps {
  onCardClick: (cardIndex: number) => void;
  onNavigate?: (direction: "prev" | "next") => void;
  onNavClick?: (nav: string) => void;
}

export function CarouselFrame({
  onCardClick,
  onNavigate,
  onNavClick,
}: CarouselFrameProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [dragStart, setDragStart] = useState<number | null>(
    null,
  );
  const [dragOffset, setDragOffset] = useState(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Hide hint after 3 seconds
  useEffect(() => {
    const hintTimer = setTimeout(
      () => setShowHint(false),
      3000,
    );
    return () => clearTimeout(hintTimer);
  }, []);

  // Auto-play timer - 5 seconds per card
  useEffect(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }

    autoPlayTimerRef.current = setTimeout(() => {
      const isLastCard =
        activeIndex === carouselVideos.length - 1;

      if (isLastCard && onNavigate) {
        // Auto-play on last card: navigate to next video frame
        onNavigate("next");
      } else if (isLastCard) {
        // If no onNavigate, go back to first card
        setActiveIndex(0);
      } else {
        // Move to next card
        setActiveIndex(activeIndex + 1);
      }
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [activeIndex, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleCarouselNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{
        direction: "prev" | "next";
      }>;
      if (customEvent.detail.direction === "prev") {
        handlePrev();
      } else {
        handleNext();
      }
    };

    window.addEventListener(
      "carousel-navigate",
      handleCarouselNavigate,
    );
    return () =>
      window.removeEventListener(
        "carousel-navigate",
        handleCarouselNavigate,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? carouselVideos.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    const currentIndex = activeIndex;
    const isLastCard =
      currentIndex === carouselVideos.length - 1;

    if (isLastCard) {
      // Manual click on last card: go back to first card (don't navigate to next video)
      setActiveIndex(0);
    } else {
      // Move to next card
      setActiveIndex(currentIndex + 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart !== null) {
      setDragOffset(e.clientX - dragStart);
    }
  };

  const handleMouseUp = () => {
    if (dragStart !== null) {
      if (dragOffset < -50) {
        handleNext();
      } else if (dragOffset > 50) {
        handlePrev();
      }
      setDragStart(null);
      setDragOffset(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStart !== null) {
      setDragOffset(e.touches[0].clientX - dragStart);
    }
  };

  const handleTouchEnd = () => {
    if (dragStart !== null) {
      if (dragOffset < -50) {
        handleNext();
      } else if (dragOffset > 50) {
        handlePrev();
      }
      setDragStart(null);
      setDragOffset(0);
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* Blurred Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 scale-110 blur-3xl"
          style={{
            backgroundImage: `url(${carouselVideos[activeIndex].thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(40px)",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <StatusBar />

      {/* Title */}
      <div className="absolute top-14 left-0 right-0 text-center z-10">
        <h2
          className="text-white font-bold text-[14px]"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        >
          你喜欢的 #adidas vintage
        </h2>
      </div>

      {/* Carousel Container */}
      <div
        className="absolute top-[80px] left-0 right-0 flex items-center justify-center overflow-hidden"
        style={{ height: "675px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setDragStart(null);
          setDragOffset(0);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex gap-[10px] transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translateX(calc(50% - ${activeIndex * 330}px - 160px + ${dragOffset}px))`,
            transition:
              dragStart !== null
                ? "none"
                : "transform 0.3s ease-out",
          }}
        >
          {carouselVideos.map((video, idx) => (
            <CarouselCard
              key={idx}
              video={video}
              isActive={idx === activeIndex}
              onCardClick={() => onCardClick(idx)}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center text-white z-20"
        onClick={handlePrev}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center text-white z-20"
        onClick={handleNext}
      >
        <ChevronRight size={24} />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1.5 z-10">
        {carouselVideos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === activeIndex
                ? "w-6 bg-[#25F4EE]"
                : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Swipe Hint */}
      {showHint && (
        <div
          className="absolute bottom-40 left-0 right-0 text-center z-10 transition-opacity duration-1000"
          style={{ opacity: showHint ? 0.6 : 0 }}
        >
          <p className="text-[#A1A3A8] text-[10px]">
            ← 左右滑动浏览更多 →
          </p>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav
        active="home"
        onNavClick={(nav) => {
          if (onNavClick) {
            onNavClick(nav);
          }
        }}
      />
    </div>
  );
}