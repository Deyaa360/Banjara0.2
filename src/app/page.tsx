'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getImagePath } from "@/lib/imagePath";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const bannerContent = [
    {
      src: getImagePath('/banner1.png'),
      alt: 'Authentic Indian Cuisine - Banner 1',
      title: 'A Journey Through',
      subtitle: 'Authentic Indian Flavors',
      description: 'Experience the rich tapestry of Indian cuisine, where every dish tells a story of tradition, passion, and culinary excellence.'
    },
    {
      src: getImagePath('/banner2.png'), 
      alt: 'Traditional Banjara Dishes - Banner 2',
      title: 'Where Tradition',
      subtitle: 'Meets Innovation',
      description: 'Discover a modern interpretation of age-old recipes, crafted with precision and served in an atmosphere of timeless elegance.'
    },
    {
      src: getImagePath('/banner3.png'),
      alt: 'Nomadic Culinary Experience - Banner 3',
      title: 'An Experience',
      subtitle: 'Beyond Dining',
      description: 'Immerse yourself in a sensory journey where exceptional cuisine meets impeccable service in a setting of refined sophistication.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerContent.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-900">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={bannerContent[currentBanner].src}
                alt={bannerContent[currentBanner].alt}
                fill
                className="object-cover"
                priority={currentBanner === 0}
                quality={95}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/90 via-charcoal-900/85 to-charcoal-900/90" />
        
        {/* Additional Gradient for Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-charcoal-900 to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-warm-400/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-amber-400/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-warm-300/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center px-6">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-warm-400" />
              <span className="text-warm-400 text-sm font-medium tracking-[0.3em] uppercase font-body">
                Welcome to Banjara
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-warm-400" />
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1
              key={`title-${currentBanner}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display text-display-xl text-white mb-8 leading-tight"
            >
              {bannerContent[currentBanner].title}
              <br />
              <span className="text-gradient-gold">{bannerContent[currentBanner].subtitle}</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              key={`description-${currentBanner}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-readable-lg text-stone-200 mb-12 font-body max-w-3xl mx-auto"
            >
              {bannerContent[currentBanner].description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <Button
                variant="default"
                size="lg"
                className="text-lg px-10 py-7 hover:scale-105 transition-all duration-300 hover:shadow-xl"
                asChild
              >
                <Link href="/reservations">Reserve a Table</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-7 text-white border-white hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:shadow-xl"
                asChild
              >
                <Link href="/menu">View Menu</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentBanner((prev) => (prev - 1 + bannerContent.length) % bannerContent.length)}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <div className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </button>

        <button
          onClick={() => setCurrentBanner((prev) => (prev + 1) % bannerContent.length)}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 group"
          aria-label="Next slide"
        >
          <div className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Banner Navigation */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-4">
            {bannerContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentBanner === index
                    ? "bg-white scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
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

      {/* Menu Highlights Section */}
      <section className="relative bg-gradient-to-b from-[#F5F0E6] to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/5 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]" style={{ backgroundImage: `url(${getImagePath("/patterns/indian-pattern.png")})`, backgroundRepeat: 'repeat' }} />
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-charcoal-900/5 to-transparent" />
          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />
          {/* Color Accents */}
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-saffron-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-saffron-500/5" />
        </div>

        <div className="container-luxury relative z-10 py-32">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-400" />
              <span className="text-amber-600 text-sm font-medium tracking-[0.5em] uppercase font-body">
                Signature Collection
              </span>
              <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal-900 mb-8 leading-tight">
              Culinary
              <br />
              <span className="text-gradient-amber">Masterpieces</span>
            </h2>
            <p className="text-charcoal-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Experience the rich tapestry of Indian cuisine through our carefully curated selection of signature dishes, 
              each telling a unique story of tradition and innovation.
            </p>
          </motion.div>

          {/* Elegant Carousel Section */}
          <div className="w-full py-24">
            <div className="container mx-auto px-4">
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {[
                    {
                      name: "Butter Chicken",
                      description: "A royal dish from the kitchens of Punjab, featuring tender chicken in a rich tomato gravy, finished with cream and butter powder.",
                      image: "/images/menu/BUTTER CHICKEN (PUNJAB).png",
                      region: "Punjab"
                    },
                    {
                      name: "Galauti Kebab",
                      description: "Minced goat, vetiver, rosewater ghee, fried onion, cardamom, mint chutney",
                      image: "/images/menu/GALAUTI KEBAB (LUCKNOW).png",
                      region: "Lucknow"
                    },
                    {
                      name: "Nalli Biryani",
                      description: "Lamb shank, saffron, mint, and yogurt",
                      image: "/images/menu/NALLI BIRYANI (HYDERABAD).png",
                      region: "Hyderabad"
                    }
                  ].map((dish, index) => (
                    <CarouselItem key={dish.name} className="pl-4 basis-full md:basis-3/4 lg:basis-2/3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="group relative h-[600px]"
                        style={{
                          opacity: index === 1 ? 1 : 0.3,
                          transform: index === 1 ? 'scale(1)' : 'scale(0.9)',
                          transition: 'all 0.5s ease-in-out'
                        }}
                      >
                        <div className="relative h-full rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500">
                          <Image
                            src={dish.image}
                            alt={dish.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-saffron-500/10" />
                          
                          {/* Content Overlay */}
                          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="h-px w-12 bg-amber-400" />
                              <span className="text-amber-400 text-sm font-medium tracking-wider uppercase">{dish.region}</span>
                              <div className="h-px w-12 bg-amber-400" />
                            </div>
                            <h3 className="text-4xl font-display font-bold text-white mb-4">{dish.name}</h3>
                            <p className="text-white/90 text-base mb-8 max-w-md leading-relaxed">
                              {dish.description}
                            </p>
                            <Button
                              asChild
                              className="bg-transparent hover:bg-amber-400 text-amber-400 hover:text-white font-medium px-8 py-4 rounded-full border-2 border-amber-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                              <Link href="/menu">View Details</Link>
                            </Button>
                          </div>

                          {/* Decorative Corner */}
                          <div className="absolute top-6 right-6 w-24 h-24 border-t-2 border-r-2 border-amber-400/30 rounded-tr-3xl" />
                          <div className="absolute bottom-6 left-6 w-24 h-24 border-b-2 border-l-2 border-amber-400/30 rounded-bl-3xl" />
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Default shadcn Navigation Buttons */}
                <CarouselPrevious className="h-8 w-8" />
                <CarouselNext className="h-8 w-8" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections */}
    </main>
  );
}