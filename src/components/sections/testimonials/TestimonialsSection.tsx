import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { AnimatedSection, ResponsiveContainer, SectionHeader, SafeImage } from '@/components/common';
import { useCarousel } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  image?: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  title = "What Our Guests Say",
  subtitle = "Hear from our valued patrons about their dining experiences",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const { 
    currentIndex, 
    isTransitioning, 
    nextSlide, 
    prevSlide, 
    goToSlide,
    setIsPaused,
  } = useCarousel({
    itemCount: testimonials.length,
    autoPlay: true,
    interval: 6000,
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.1 * i,
              ease: "easeOut" 
            }}
          >
            <Star 
              className={`w-5 h-5 ${i < rating ? 'text-gold-400 fill-gold-400' : 'text-charcoal-400 stroke-charcoal-400'}`}
              strokeWidth={i < rating ? 0 : 1.5}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section className="relative py-24 bg-charcoal-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large walnut circle in center-right */}
        <div 
          className="absolute top-1/2 right-1/3 transform -translate-y-1/2" 
          style={{ 
            width: '800px', 
            height: '800px', 
            background: 'radial-gradient(circle, rgba(121, 89, 57, 0.15) 0%, rgba(121, 89, 57, 0.05) 60%, transparent 100%)',
            filter: 'blur(120px)',
            opacity: 0.8
          }}
        ></div>
        
        {/* Extra large gold circle in bottom-left */}
        <div 
          className="absolute bottom-0 left-0 transform translate-y-1/4" 
          style={{ 
            width: '1000px', 
            height: '1000px', 
            background: 'radial-gradient(circle, rgba(230, 192, 122, 0.1) 0%, rgba(230, 192, 122, 0.03) 60%, transparent 100%)',
            filter: 'blur(150px)',
            opacity: 0.7
          }}
        ></div>
        
        {/* Decorative quote marks */}
        <div className="absolute top-20 left-10 opacity-5">
          <Quote size={200} className="text-gold-400" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-5 transform rotate-180">
          <Quote size={200} className="text-gold-400" />
        </div>
      </div>

      <ResponsiveContainer>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <SectionHeader
            title={title}
            subtitle={subtitle}
            accentWord="Guests"
            size="large"
            decorative={true}
          />
        </motion.div>

        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial Carousel */}
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="sync">
              <motion.div 
                key={`testimonial-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id} 
                    className={`${index === currentIndex ? 'block' : 'hidden'}`}
                  >
                    <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-3xl p-10 sm:p-12 md:p-16 border border-walnut-700/20 shadow-heritage-lg relative overflow-hidden">
                      {/* Background decorative elements */}
                      <div className="absolute top-0 left-0 w-60 h-60 bg-gradient-to-br from-gold-400/5 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-walnut-500/5 to-transparent rounded-full translate-x-1/3 translate-y-1/3"></div>
                      
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative">
                        {/* Author Image - Left side on desktop */}
                        <div className="md:order-1 flex-shrink-0">
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                          >
                            {testimonial.image ? (
                              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gold-400/30 shadow-xl">
                                <SafeImage 
                                  src={testimonial.image} 
                                  alt={testimonial.name}
                                  width={128}
                                  height={128}
                                  className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 rounded-full border-2 border-gold-400/10 bg-gradient-to-br from-gold-400/10 to-transparent opacity-60"></div>
                              </div>
                            ) : (
                              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gold-400/30 bg-gradient-to-br from-walnut-500/20 to-walnut-700/20 flex items-center justify-center shadow-xl">
                                <Quote className="w-12 h-12 text-gold-400/70" />
                              </div>
                            )}
                            
                            {/* Quote Icon - Positioned on the image */}
                            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center shadow-lg">
                              <Quote size={18} className="text-charcoal-900" />
                            </div>
                          </motion.div>
                          
                          {/* Author info on mobile */}
                          <div className="text-center md:hidden mt-4">
                            <h4 className="font-display text-gold-400 font-semibold text-xl">{testimonial.name}</h4>
                            {testimonial.role && (
                              <p className="text-tan-400 text-sm font-serif italic">{testimonial.role}</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Content - Right side on desktop */}
                        <div className="md:order-2 flex-1">
                          {/* Testimonial Text */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                          >
                            <p className="text-xl md:text-2xl text-tan-100 font-serif italic mb-6 leading-relaxed">
                              "{testimonial.quote}"
                            </p>
                          </motion.div>
                          
                          {/* Rating */}
                          <div className="mb-6">
                            {renderStars(testimonial.rating)}
                          </div>
                          
                          {/* Author info on desktop */}
                          <div className="hidden md:block">
                            <h4 className="font-display text-gold-400 font-semibold text-xl">{testimonial.name}</h4>
                            {testimonial.role && (
                              <p className="text-tan-400 text-sm font-serif italic">{testimonial.role}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-14 h-14 rounded-full bg-charcoal-800 border border-gold-400/20 flex items-center justify-center text-gold-400 hover:text-gold-300 hover:bg-charcoal-700 hover:border-gold-400/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-heritage"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-14 h-14 rounded-full bg-charcoal-800 border border-gold-400/20 flex items-center justify-center text-gold-400 hover:text-gold-300 hover:bg-charcoal-700 hover:border-gold-400/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-heritage"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Indicator Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`transition-all duration-300 rounded-full relative ${
                  isActive 
                    ? 'w-10 h-3 bg-gold-400 shadow-[0_2px_8px_rgba(230,192,122,0.4)]' 
                    : 'w-3 h-3 bg-walnut-400/30 hover:bg-walnut-400/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-gold-400/30" style={{ animationDuration: '1.5s' }}></span>
                )}
              </button>
            );
          })}
        </div>
      </ResponsiveContainer>
    </section>
  );
};

export default TestimonialsSection;