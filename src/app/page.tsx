'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getImagePath } from "@/lib/imagePath";
import FeaturedDishesSimple from "@/components/FeaturedDishesSimple";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [targetSlideIndex, setTargetSlideIndex] = useState(0);
  const [transitionPhase, setTransitionPhase] = useState('idle'); // 'idle', 'fadeOut', 'fadeIn'
  
  const bannerContent = [
    {
      src: getImagePath('/banner1.png'),
      alt: 'Authentic Indian Cuisine - Banner 1',
      title: 'Where Heritage Meets Flavor',
      subtitle: 'Every spice tells a story, every dish a masterpiece crafted with generations of wisdom.',
      accent: 'Heritage'
    },
    {
      src: getImagePath('/banner2.png'), 
      alt: 'Traditional Banjara Dishes - Banner 2',
      title: 'Artistry in Every Bite',
      subtitle: 'Our chefs transform fine ingredients into symphonies of taste that awaken your senses.',
      accent: 'Artistry'
    },
    {
      src: getImagePath('/banner3.png'),
      alt: 'Nomadic Culinary Experience - Banner 3',
      title: 'Moments Worth Savoring',
      subtitle: 'Exceptional cuisine meets heartfelt hospitality to create unforgettable memories.',
      accent: 'Moments'
    }
  ];

  // Auto-advance slides with unified rhythm
  useEffect(() => {
    const timer = setInterval(() => {
      if (transitionPhase === 'idle') {
        const target = (currentSlide + 1) % bannerContent.length;
        initiateTransition(target);
      }
    }, 6000); // Elegant 6 second timing
    return () => clearInterval(timer);
  }, [currentSlide, transitionPhase, bannerContent.length]);

  // Simple transition orchestrator
  const initiateTransition = (targetSlide: number) => {
    if (transitionPhase === 'idle' && targetSlide !== currentSlide) {
      setTargetSlideIndex(targetSlide);

      // Phase 1: Quick fade out (0.4s)
      setTransitionPhase('fadeOut');

      setTimeout(() => {
        // Phase 2: Switch content and fade in (0.6s)
        setCurrentSlide(targetSlide);
        setTransitionPhase('fadeIn');

        setTimeout(() => {
          // Phase 3: Return to idle
          setTransitionPhase('idle');
        }, 600);
      }, 400);
    }
  };

  const nextSlide = () => {
    const target = (currentSlide + 1) % bannerContent.length;
    initiateTransition(target);
  };

  const prevSlide = () => {
    const target = (currentSlide - 1 + bannerContent.length) % bannerContent.length;
    initiateTransition(target);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Smooth Crossfade Images with Continuous Zoom */}
        <AnimatePresence mode="wait">
          {bannerContent.map((image, index) => {
            const isActive = index === currentSlide;
            const isNext = index === targetSlideIndex && transitionPhase !== 'idle';

            return (
              <motion.div
                key={`image-${index}`}
                initial={{ opacity: 0, scale: 1 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1.15 : 1,
                  transition: {
                    opacity: { 
                      duration: isActive ? 0.6 : 0.4,
                      ease: "easeInOut"
                    },
                    scale: {
                      duration: isActive ? 6 : 0.4,
                      ease: isActive ? "linear" : "easeOut"
                    }
                  }
                }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${image.src})`,
                  zIndex: isActive ? 2 : 0
                }}
              />
            );
          })}
        </AnimatePresence>

        {/* Much Darker Heritage Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(135deg,
              rgba(28, 28, 28, 0.85) 0%,
              rgba(28, 28, 28, 0.75) 25%,
              rgba(196, 181, 151, 0.1) 50%,
              rgba(28, 28, 28, 0.75) 75%,
              rgba(28, 28, 28, 0.85) 100%)`
          }}
        ></div>
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(to top,
              rgba(28, 28, 28, 0.85) 0%,
              rgba(28, 28, 28, 0.75) 50%,
              rgba(28, 28, 28, 0.85) 100%)`
          }}
        ></div>
        {/* Heavy Edge Darkening */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `radial-gradient(ellipse at center,
              transparent 25%,
              rgba(28, 28, 28, 0.3) 60%,
              rgba(28, 28, 28, 0.6) 90%,
              rgba(28, 28, 28, 0.8) 100%)`
          }}
        ></div>

        {/* Content with Beautiful Text Effects */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container text-center text-white">
            <div className="max-w-5xl mx-auto">
              {/* Title */}
              <h1
                key={`title-${currentSlide}`}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-6 leading-tight tracking-wide"
                style={{
                  color: '#d9c5a0',
                  textShadow: '0 4px 10px rgba(0,0,0,0.8)',
                  fontFamily: 'var(--font-display)',
                  transform: transitionPhase === 'fadeOut' ? 'translateY(-20px)' :
                            transitionPhase === 'fadeIn' ? 'translateY(30px)' :
                            'translateY(0px)',
                  opacity: transitionPhase === 'idle' ? 1 : 0,
                  transition: transitionPhase === 'fadeOut'
                    ? 'all 0.4s cubic-bezier(0.4, 0, 0.6, 1)'
                    : 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  letterSpacing: '0.05em',
                  wordSpacing: '0.2em'
                }}
              >
                {bannerContent[currentSlide].title.split(' ').map((word, index) => (
                  <span
                    key={`${currentSlide}-${index}`}
                    className="inline-block"
                    style={{
                      transform: transitionPhase === 'fadeOut' ? 'translateY(-15px)' :
                                transitionPhase === 'fadeIn' ? 'translateY(20px)' :
                                'translateY(0px)',
                      opacity: transitionPhase === 'idle' ? 1 : 0,
                      transition: transitionPhase === 'fadeOut'
                        ? `all 0.4s cubic-bezier(0.4, 0, 0.6, 1) ${index * 0.05}s`
                        : `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + (index * 0.1)}s`,
                      marginRight: '0.2em'
                    }}
                  >
                    {word === bannerContent[currentSlide].accent ? (
                      <span
                        style={{
                          color: '#e6c07a',
                          textShadow: '0 4px 15px rgba(0,0,0,0.9), 0 0 20px rgba(230, 192, 122, 0.3)'
                        }}
                      >
                        {word}
                      </span>
                    ) : (
                      <span>{word}</span>
                    )}
                  </span>
                ))}
              </h1>

              {/* Enhanced Subtitle with Improved Typography */}
              <p
                key={`subtitle-${currentSlide}`}
                className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4"
                style={{
                  color: '#c4b597',
                  lineHeight: '1.8',
                  fontWeight: 400,
                  fontFamily: 'var(--font-body)',
                  opacity: transitionPhase === 'idle' ? 1 : 0,
                  transform: transitionPhase === 'fadeOut' ? 'translateY(-10px) scale(0.98)' :
                            transitionPhase === 'fadeIn' ? 'translateY(20px) scale(0.98)' :
                            'translateY(0) scale(1)',
                  transition: transitionPhase === 'fadeOut'
                    ? 'all 0.4s cubic-bezier(0.4, 0, 0.6, 1) 0.05s'
                    : 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.65s',
                  textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                }}
              >
                {bannerContent[currentSlide].subtitle.split(' ').map((word, index) => (
                  <span
                    key={`subtitle-word-${currentSlide}-${index}`}
                    className="inline-block"
                    style={{
                      opacity: transitionPhase === 'idle' ? 1 : 0,
                      transform: transitionPhase === 'fadeOut' ? 'translateY(-5px)' :
                                transitionPhase === 'fadeIn' ? 'translateY(10px)' :
                                'translateY(0)',
                      transition: transitionPhase === 'fadeOut'
                        ? `all 0.3s cubic-bezier(0.4, 0, 0.6, 1) ${0.05 + (index * 0.01)}s`
                        : `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.7 + (index * 0.015)}s`,
                      marginRight: '0.25em'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>

              {/* CTA Buttons - Exact Styling from Original */}
              <div 
                className="flex flex-col sm:flex-row justify-center gap-6"
                style={{
                  opacity: transitionPhase === 'idle' ? 1 : 0,
                  transform: transitionPhase === 'fadeOut' ? 'translateY(-5px)' :
                            transitionPhase === 'fadeIn' ? 'translateY(15px)' :
                            'translateY(0)',
                  transition: transitionPhase === 'fadeOut'
                    ? 'opacity 0.3s cubic-bezier(0.4, 0, 0.6, 1) 0.1s, transform 0.3s cubic-bezier(0.4, 0, 0.6, 1) 0.1s'
                    : 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.8s, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
                }}
              >
                <Link href="/reservations">
                  <button
                    className="group px-8 sm:px-10 py-3.5 text-base font-medium rounded-full transition-colors duration-300 border-2 shadow-lg"
                    style={{
                      backgroundColor: '#795939',
                      color: '#e6c07a',
                      borderColor: '#8a6642',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e6c07a';
                      e.currentTarget.style.color = '#4b371f';
                      e.currentTarget.style.borderColor = '#e6c07a';
                      e.currentTarget.style.boxShadow = '0 6px 15px rgba(230, 192, 122, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#795939';
                      e.currentTarget.style.color = '#e6c07a';
                      e.currentTarget.style.borderColor = '#8a6642';
                      e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="tracking-wide">Reserve a Table</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </button>
                </Link>
                <Link href="/menu">
                    <button
                      className="group px-8 sm:px-10 py-4 text-base font-medium rounded-full transition-all duration-300 border-2 isolate overflow-hidden"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        color: '#e6c07a',
                        borderColor: 'rgba(230, 192, 122, 0.4)',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(4px)',
                        // Type-safe way to define vendor prefix
                        WebkitBackdropFilter: 'blur(4px)' as any,
                        transition: 'all 0.3s ease, backdrop-filter 0s, -webkit-backdrop-filter 0s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.borderColor = 'rgba(230, 192, 122, 0.6)';
                        e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
                        e.currentTarget.style.backdropFilter = 'blur(4px)';
                        // Use type assertion to fix TypeScript error with vendor prefix
                        (e.currentTarget.style as any)['-webkit-backdrop-filter'] = 'blur(4px)';
                        e.currentTarget.style.transition = 'all 0.3s ease, backdrop-filter 0s, -webkit-backdrop-filter 0s';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                        e.currentTarget.style.color = '#e6c07a';
                        e.currentTarget.style.borderColor = 'rgba(230, 192, 122, 0.4)';
                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                        e.currentTarget.style.backdropFilter = 'blur(4px)';
                        // Use type assertion to fix TypeScript error with vendor prefix
                        (e.currentTarget.style as any)['-webkit-backdrop-filter'] = 'blur(4px)';
                        e.currentTarget.style.transition = 'all 0.3s ease, backdrop-filter 0s, -webkit-backdrop-filter 0s';
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="tracking-wide">View Menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </button>
                  </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Hidden Until Hover, Full Height Clickable Areas */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-0 bottom-0 w-[15%] flex items-center justify-start pl-4 sm:pl-8 z-20 opacity-0 hover:opacity-100 transition-opacity duration-300 group"
          aria-label="Previous slide"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm border border-white/10 group-hover:bg-black/30 group-hover:border-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-0 bottom-0 w-[15%] flex items-center justify-end pr-4 sm:pr-8 z-20 opacity-0 hover:opacity-100 transition-opacity duration-300 group"
          aria-label="Next slide"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm border border-white/10 group-hover:bg-black/30 group-hover:border-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Banner Navigation - Exact Styling from Original */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex gap-3">
            {bannerContent.map((_, index) => (
              <button
                key={index}
                onClick={() => initiateTransition(index)}
                className={`transition-all duration-300 focus:outline-none`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-amber-400 scale-110"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  style={{
                    boxShadow: currentSlide === index ? '0 0 8px rgba(230, 192, 122, 0.6)' : 'none'
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Transition Section */}
      <section className="relative bg-charcoal-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-warm-400/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />
        </div>

        <div className="container-luxury relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] w-full max-w-[500px] mx-auto lg:mx-0"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={getImagePath("/banner2.png")}
                    alt="Traditional Banjara Cuisine"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                    quality={95}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent" />
                </div>
                
                {/* Decorative Squares */}
                <div className="absolute -top-6 -left-6 w-24 h-24 border border-warm-400/20 rounded-2xl backdrop-blur-sm" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-amber-500/20 rounded-2xl backdrop-blur-sm" />
              </motion.div>

              {/* Right Column - Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative px-4 sm:px-6 lg:px-0"
              >
                <div className="inline-flex items-center gap-4 mb-10 sm:mb-14">
                  <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-warm-400" />
                  <span className="text-warm-400 text-sm font-medium tracking-[0.5em] uppercase font-body">
                    Our Heritage
                  </span>
                  <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-warm-400" />
                </div>
                
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white mb-10 sm:mb-14 leading-[1.05] tracking-tight">
                  Where Tradition
                  <br />
                  <span className="text-gradient-warm font-light tracking-wide">
                    Meets Innovation
                  </span>
                </h2>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-stone-200/80 mb-8 font-body leading-relaxed tracking-wide max-w-2xl">
                  In the heart of culinary excellence, we craft an experience where centuries of 
                  traditional wisdom intertwine with contemporary artistry. Each dish is a testament 
                  to our commitment to preserving the authentic essence of Indian cuisine while 
                  embracing the possibilities of modern gastronomy.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chef's Featured Creations Section */}
      <section className="py-20 bg-charcoal-900 overflow-hidden relative">
        {/* Enhanced ambient background elements with larger, more blurred circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large charcoal circle in center-right - using charcoal-500 */}
          <div 
            className="absolute top-1/2 right-1/3 transform -translate-y-1/2" 
            style={{ 
              width: '800px', 
              height: '800px', 
              background: 'radial-gradient(circle, rgba(109, 109, 109, 0.25) 0%, rgba(109, 109, 109, 0.1) 60%, transparent 100%)',
              filter: 'blur(150px)',
              opacity: 0.9
            }}
          ></div>
          
          {/* Extra large deep charcoal circle in bottom-left - using charcoal-700 */}
          <div 
            className="absolute -bottom-1/4 -left-1/4" 
            style={{ 
              width: '1200px', 
              height: '1200px', 
              background: 'radial-gradient(circle, rgba(79, 79, 79, 0.3) 0%, rgba(79, 79, 79, 0.12) 70%, transparent 100%)',
              filter: 'blur(180px)',
              opacity: 0.8
            }}
          ></div>
          
          {/* Light charcoal circle in top-left - using charcoal-400 */}
          <div 
            className="absolute -top-1/4 -left-1/4" 
            style={{ 
              width: '1000px', 
              height: '1000px', 
              background: 'radial-gradient(circle, rgba(136, 136, 136, 0.18) 0%, rgba(136, 136, 136, 0.08) 60%, transparent 100%)',
              filter: 'blur(160px)',
              opacity: 0.6
            }}
          ></div>
          
          {/* Subtle highlight circle in top-right - using charcoal-300 */}
          <div 
            className="absolute top-0 right-0" 
            style={{ 
              width: '900px', 
              height: '900px', 
              background: 'radial-gradient(circle, rgba(176, 176, 176, 0.1) 0%, rgba(176, 176, 176, 0.04) 60%, transparent 100%)',
              filter: 'blur(170px)',
              opacity: 0.7
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-tight drop-shadow-sm" style={{ color: '#e6c07a' }}>
                Chef's <span style={{ color: '#f3d296', textShadow: '0 0 20px rgba(230, 192, 122, 0.3)' }}>Featured</span> Creations
              </h2>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium tracking-wide" style={{ color: 'rgba(228, 221, 207, 0.85)' }}>
                Discover our most celebrated dishes, each telling a unique story of India's rich culinary heritage
              </p>
            </motion.div>
          </div>

          {/* Simple Featured Dishes */}
          <div className="w-full overflow-hidden">
            <FeaturedDishesSimple />
          </div>
        </div>
      </section>

      {/* Rest of the sections */}
    </main>
  );
}