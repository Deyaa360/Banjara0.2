'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, MapPin, Flame, Leaf, ArrowRight } from 'lucide-react';
import { getImagePath } from '@/lib/imagePath';

const FeaturedDishesSimple = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  
  const featuredDishes = [
    {
      id: "butter-chicken",
      name: "Butter Chicken",
      description: "A royal dish from the kitchens of Punjab, featuring tender chicken in a rich tomato gravy, finished with cream and butter powder.",
      image: getImagePath("/images/menu/BUTTER CHICKEN (PUNJAB).png"),
      region: "Punjab",
      isVegetarian: false,
      isSignature: true,
      spiceLevel: 2
    },
    {
      id: "galauti-kebab",
      name: "Galauti Kebab",
      description: "Minced goat, vetiver, rosewater ghee, fried onion, cardamom, mint chutney",
      image: getImagePath("/images/menu/GALAUTI KEBAB (LUCKNOW).png"),
      region: "Lucknow",
      isVegetarian: false,
      isSignature: true,
      spiceLevel: 3
    },
    {
      id: "nalli-biryani",
      name: "Nalli Biryani",
      description: "Lamb shank, saffron, mint, and yogurt",
      image: getImagePath("/images/menu/NALLI BIRYANI (HYDERABAD).png"),
      region: "Hyderabad",
      isVegetarian: false,
      isSignature: true,
      spiceLevel: 2
    }
  ];

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;
    
    const timer = setInterval(() => {
      handleNextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isTransitioning]);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % featuredDishes.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + featuredDishes.length) % featuredDishes.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNextSlide();
    } else if (isRightSwipe) {
      handlePrevSlide();
    }
  };

  // Get visible dishes (center + sides)
  const getVisibleDishes = () => {
    const dishes = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + featuredDishes.length) % featuredDishes.length;
      dishes.push({
        dish: featuredDishes[index],
        position: i,
        index: index
      });
    }
    return dishes;
  };

  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(3)].map((_, i) => (
          <Flame 
            key={i} 
            size={18} 
            className={`${i < level ? 'text-amber-400 fill-current' : 'text-stone-400/50'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative py-2 sm:py-3 md:py-4 overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-amber-600/3 rounded-full" style={{ filter: 'blur(180px)' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-tl from-amber-300/10 to-transparent rounded-full" style={{ filter: 'blur(170px)' }}></div>
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-gradient-to-tr from-stone-200/4 to-transparent rounded-full" style={{ filter: 'blur(160px)' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-bl from-stone-400/3 to-transparent rounded-full" style={{ filter: 'blur(150px)' }}></div>
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-to-t from-stone-900 to-transparent"></div>
      </div>

      {/* Carousel container */}
      <div 
        className="relative h-[800px] sm:h-[980px] lg:h-[1000px] perspective-1000"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left and right clickable areas with swipe indicators for all screen sizes */}
        <div 
          className="absolute left-0 top-0 w-1/3 h-full z-30 cursor-pointer flex items-center" 
          onClick={handlePrevSlide} 
          aria-label="Previous slide"
        >
          <div className="w-10 h-10 ml-3 sm:ml-5 bg-black/30 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 hover:border-amber-400/30 group">
            <ChevronLeft size={24} className="text-white/70 group-hover:text-amber-300" />
          </div>
        </div>
        <div 
          className="absolute right-0 top-0 w-1/3 h-full z-30 cursor-pointer flex items-center justify-end" 
          onClick={handleNextSlide} 
          aria-label="Next slide"
        >
          <div className="w-10 h-10 mr-3 sm:mr-5 bg-black/30 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 hover:border-amber-400/30 group">
            <ChevronRight size={24} className="text-white/70 group-hover:text-amber-300" />
          </div>
        </div>
        
        <style jsx global>{`
          @keyframes shineEffect {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .shine-effect {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg, 
              transparent 0%, 
              rgba(255, 255, 255, 0.25) 50%, 
              transparent 100%
            );
            transform: translateX(-100%);
            animation: shineEffect 0.5s ease-out forwards;
            animation-delay: 0.2s;
            pointer-events: none;
            z-index: 20;
          }
          
          .card-glow-target:hover {
            box-shadow: 0 20px 70px 30px rgba(230, 192, 122, 0.25), 0 30px 90px 30px rgba(230, 192, 122, 0.15);
            filter: drop-shadow(0 30px 60px rgba(230, 192, 122, 0.2));
            transition: all 0.7s ease;
          }
          
          .menu-btn-arrow {
            transition: transform 0.3s ease;
          }
          
          .menu-btn:hover .menu-btn-arrow {
            transform: translateX(4px);
          }
          
          .perspective-1000 {
            perspective: 1000px;
          }
          
          @keyframes floatUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .active-card, .side-card {
            transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
            will-change: transform, opacity;
          }
          
          .card-enter {
            animation: cardEnter 0.4s forwards cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          @keyframes cardEnter {
            0% { transform: scale(0.95); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
          
          .card-content-enter {
            animation: none;
          }
          
          @keyframes contentEnter {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}</style>

        <div className="w-full h-full flex justify-center items-center card-container relative">
          {getVisibleDishes().map(({ dish, position, index }) => {
            const isActive = position === 0;
            const cardClasses = isActive 
              ? "active-card" 
              : "side-card cursor-pointer hover:opacity-70";
            
            return (
              <div
                key={`${dish.id}-${position}`}
                className={`absolute ${cardClasses} ${isActive ? 'card-enter' : ''}`}
                onClick={() => position !== 0 && goToSlide(index)}
                style={{
                  opacity: isActive ? 1 : 0.4,
                  transform: `translateX(${position * (windowWidth < 640 ? 400 : windowWidth < 1024 ? 550 : 900)}px) translateY(${isActive ? '0' : '0'}) scale(${isActive ? 1 : 0.7}) ${position < 0 ? 'rotateY(5deg)' : position > 0 ? 'rotateY(-5deg)' : ''}`,
                  filter: !isActive ? 'blur(2px)' : 'none',
                  transformStyle: 'preserve-3d',
                  zIndex: isActive ? 10 : 5,
                  transformOrigin: position < 0 ? 'right center' : position > 0 ? 'left center' : 'center center',
                  willChange: 'transform, opacity'
                }}
              >
                <div 
                  className={`w-[380px] sm:w-[520px] lg:w-[850px] h-[650px] sm:h-[850px] lg:h-[800px] rounded-2xl overflow-hidden group
                    ${isActive ? 'card-glow-target' : ''} transition-all duration-700`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                    boxShadow: '0 20px 70px 30px rgba(0, 0, 0, 0.3), 0 30px 80px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.25))',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Image with hover effect */}
                  <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                    <Image 
                      src={dish.image}
                      alt={dish.name}
                      fill
                      priority={isActive}
                      sizes="(max-width: 768px) 90vw, 450px"
                      className="object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                    
                    {/* Shine effect wrapper to prevent layout shifts */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {isActive && (
                        <div className="shine-effect" />
                      )}
                    </div>
                    
                    {/* Indicators with subtle animations */}
                    <div className="absolute top-5 sm:top-7 lg:top-10 right-5 sm:right-7 lg:right-10 flex flex-col gap-2 z-10">
                      {dish.isVegetarian && (
                        <div className="w-8 h-8 bg-stone-900/60 backdrop-blur-md border border-green-400/30 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110">
                          <Leaf className="w-4 h-4 text-green-400/80" />
                        </div>
                      )}
                      {dish.isSignature && (
                        <div className="w-8 h-8 bg-stone-900/60 backdrop-blur-md border border-amber-400/30 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110">
                          <Star className="w-4 h-4 text-amber-400/80" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content with improved transitions */}
                    <div className={`absolute inset-0 flex flex-col justify-end p-7 sm:p-9 lg:p-10 z-10 ${isActive && !isTransitioning ? 'card-content-enter' : ''}`}>
                      {/* Region with animation */}
                      {dish.region && (
                        <div className="flex items-center gap-2 mb-4 sm:mb-5 transform transition-transform duration-500 group-hover:translate-x-1">
                          <MapPin className="w-4 h-4 text-amber-400" />
                          <span className="text-amber-300 text-sm font-semibold uppercase tracking-wider">
                            {dish.region}
                          </span>
                        </div>
                      )}

                      {/* Title with animation */}
                      <h3 className="font-bold text-3xl sm:text-4xl lg:text-6xl text-white mb-2 sm:mb-3 lg:mb-4 leading-tight drop-shadow-lg transform transition-all duration-500 group-hover:text-amber-200">
                        {dish.name}
                      </h3>

                      {/* Description */}
                      <p className="text-stone-200 text-base sm:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-5 lg:mb-5 line-clamp-3 lg:line-clamp-4 drop-shadow-md">
                        {dish.description}
                      </p>

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 transition-opacity duration-500 group-hover:opacity-80">
                          <span className="text-base text-stone-300 font-semibold tracking-wide">Spice Level:</span>
                          {renderSpiceLevel(dish.spiceLevel)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Animated Decorative Corners */}
                    <div className="absolute top-5 sm:top-7 lg:top-10 right-5 sm:right-7 lg:right-10 w-24 sm:w-28 lg:w-36 h-24 sm:h-28 lg:h-36 border-t-2 border-r-2 border-amber-400/30 rounded-tr-[25px] sm:rounded-tr-[30px] lg:rounded-tr-[35px] transition-all duration-700 group-hover:border-amber-400/50 group-hover:w-28 sm:group-hover:w-32 lg:group-hover:w-40 group-hover:h-28 sm:group-hover:h-32 lg:group-hover:h-40" />
                    <div className="absolute bottom-5 sm:bottom-7 lg:bottom-10 left-5 sm:left-7 lg:left-10 w-24 sm:w-28 lg:w-36 h-24 sm:h-28 lg:h-36 border-b-2 border-l-2 border-amber-400/30 rounded-bl-[25px] sm:rounded-bl-[30px] lg:rounded-bl-[35px] transition-all duration-700 group-hover:border-amber-400/50 group-hover:w-28 sm:group-hover:w-32 lg:group-hover:w-40 group-hover:h-28 sm:group-hover:h-32 lg:group-hover:h-40" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No standalone navigation buttons - using the side clickable areas only */}
      </div>
      
      {/* Indicator Dots with improved animations */}
      <div className="flex justify-center gap-3 mt-8">
        {featuredDishes.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className="transition-all duration-500 rounded-full relative"
              style={{
                width: isActive ? '32px' : '12px',
                height: '12px',
                backgroundColor: isActive ? '#e6c07a' : 'rgba(196, 181, 151, 0.3)',
                boxShadow: isActive ? '0 2px 8px rgba(230, 192, 122, 0.4)' : 'none',
                transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full animate-ping bg-amber-400/30" style={{ animationDuration: '1.5s' }}></span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Central View Menu Button */}
      <div className="flex justify-center mt-12 sm:mt-16 md:mt-20">
        <Link href="/menu">
          <button className="menu-btn flex items-center gap-3 bg-stone-900/70 hover:bg-stone-800/90 backdrop-blur-md border-2 border-amber-400/30 hover:border-amber-400/60 text-amber-200 hover:text-amber-100 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-medium text-lg sm:text-xl transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl group">
            <span className="tracking-wide font-semibold">View Full Menu</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 menu-btn-arrow" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedDishesSimple;