"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const bannerImages = [
    {
      src: '/banner1.png',
      alt: 'Authentic Indian Cuisine - Banner 1'
    },
    {
      src: '/banner2.png', 
      alt: 'Traditional Banjara Dishes - Banner 2'
    },
    {
      src: '/banner3.png',
      alt: 'Nomadic Culinary Experience - Banner 3'
    }
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % bannerImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={bannerImages[currentImageIndex].src}
              alt={bannerImages[currentImageIndex].alt}
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
              quality={95}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Image Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-warm-400 scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Refined Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/95 via-stone-900/90 to-charcoal-800/95" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-warm-400/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-amber-400/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-warm-300/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Elegant Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-warm-400" />
            <span className="text-warm-400 text-sm font-medium tracking-[0.3em] uppercase font-body">
              Nomadic Culinary Journey
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-warm-400" />
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-display-xl text-white mb-8 leading-tight"
          >
            Journey Through
            <br />
            <span className="text-gradient-gold">India's Flavors</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-readable-lg text-stone-200 mb-16 font-body max-w-4xl mx-auto"
          >
            Inspired by the nomadic Banjara tribe, we bring you authentic regional cuisine 
            from across the Indian subcontinent. Every dish tells a story of tradition, movement, and soul.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
          >
            <Button 
              asChild 
              size="lg" 
              className="btn-primary font-body text-lg"
            >
              <Link href="/menu">Explore Menu</Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="btn-secondary font-body text-lg"
            >
              <Link href="/reservations">Reserve Experience</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Modern Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="flex flex-col items-center gap-2 text-white/60 hover:text-gold-400 transition-colors duration-300">
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ChevronDown size={20} />
        </div>
      </motion.div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-gold-400 rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-1/3 right-16 w-1 h-1 bg-gold-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-gold-400 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default HeroSection;