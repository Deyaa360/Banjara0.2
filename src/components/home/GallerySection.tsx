"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const galleryImages = [
    {
      src: '/banner1.png',
      alt: 'Authentic Indian Cuisine - Signature Dishes',
      title: 'Signature Dishes',
      description: 'Authentic flavors from across the Indian subcontinent'
    },
    {
      src: '/banner2.png', 
      alt: 'Traditional Banjara Heritage - Cultural Dining',
      title: 'Cultural Heritage',
      description: 'Experience the rich traditions of nomadic cuisine'
    },
    {
      src: '/banner3.png',
      alt: 'Nomadic Culinary Experience - Restaurant Ambiance',
      title: 'Dining Experience',
      description: 'Immerse yourself in our authentic atmosphere'
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <>
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 bg-warm-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-stone-400 rounded-full blur-3xl" />
        </div>

        <div className="container-luxury relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-warm-400" />
              <span className="text-warm-600 text-sm font-medium tracking-[0.3em] uppercase font-body">
                Visual Journey
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-warm-400" />
            </div>
            
            <h2 className="font-display text-display-lg text-charcoal-900 mb-8 leading-tight">
              Discover the
              <br />
              <span className="text-gradient-gold">Banjara Experience</span>
            </h2>
            
            <p className="text-readable text-charcoal-700 max-w-2xl mx-auto font-body">
              From our signature dishes to the authentic atmosphere, explore what makes 
              dining at Banjara a truly unforgettable cultural journey.
            </p>
          </motion.div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-500 group-hover:-translate-y-2">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    quality={95}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display text-xl font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm text-stone-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {image.description}
                    </p>
                  </div>
                  
                  {/* Click Indicator */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200 z-10"
            >
              <X size={24} />
            </button>
            
            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200 z-10"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200 z-10"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
                quality={100}
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-display text-2xl font-semibold mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-stone-200 font-body">
                  {galleryImages[selectedImage].description}
                </p>
              </div>
            </motion.div>
            
            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;