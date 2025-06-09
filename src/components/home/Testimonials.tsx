"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Critic',
    quote: "Banjara takes you on an authentic journey across India's diverse culinary landscape. Each dish tells the story of the nomadic Banjara tribe with incredible authenticity and soul.",
    rating: 5,
    image: '/images/testimonial-1-placeholder.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Travel Writer',
    quote: "Having traveled extensively across India, I can say that Banjara captures the true essence of regional Indian cuisine. The Galauti Kebab transported me straight to Lucknow's streets.",
    rating: 5,
    image: '/images/testimonial-2-placeholder.jpg'
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'Chef & Food Blogger',
    quote: "Banjara honors the nomadic spirit beautifully. From Kashmir's Burata Haak to Hyderabad's Nalli Biryani, every dish is a masterclass in regional authenticity.",
    rating: 5,
    image: '/images/testimonial-3-placeholder.jpg'
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="section-padding bg-gradient-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-warm-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
      </div>
      
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-warm-400" />
            <span className="text-warm-400 text-sm font-medium tracking-[0.3em] uppercase font-body">
              Guest Experiences
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400" />
          </div>
          
          <h2 className="font-viaoda text-4xl lg:text-5xl text-white mb-6 leading-tight">
            Stories of
            <br />
            <span className="text-gold-400">Culinary Delight</span>
          </h2>
        </motion.div>
        
        {/* Testimonials Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative min-h-[500px] lg:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[current].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 h-full flex flex-col justify-between">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center">
                      <Quote className="w-8 h-8 text-gold-400" />
                    </div>
                  </div>
                  
                  {/* Testimonial Content */}
                  <div className="text-center mb-8">
                    <p className="text-xl lg:text-2xl text-white mb-8 font-light leading-relaxed italic">
                      "{testimonials[current].quote}"
                    </p>
                    
                    {/* Star Rating */}
                    <div className="flex justify-center mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={24}
                          className={`${i < testimonials[current].rating ? 'text-gold-400 fill-current' : 'text-neutral-400'} mx-1`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Author Info */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">
                        {testimonials[current].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {testimonials[current].name}
                    </h3>
                    <p className="text-gold-400 font-medium">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'bg-gold-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20"
          >
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gold-400 mb-2">500+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Five Star Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gold-400 mb-2">15K+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Happy Guests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gold-400 mb-2">4.9</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Average Rating</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;