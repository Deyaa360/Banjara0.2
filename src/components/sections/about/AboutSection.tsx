import React from 'react';
import Image from 'next/image';
import { AnimatedSection, ResponsiveContainer, SafeImage } from '@/components/common';
import { ImageWithOverlay } from '@/components/common';

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  direction?: 'image-left' | 'image-right';
  decorative?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  title = 'Where Tradition Meets Innovation',
  subtitle = 'Our Heritage',
  description = 'In the heart of culinary excellence, we craft an experience where centuries of traditional wisdom intertwine with contemporary artistry. Each dish is a testament to our commitment to preserving the authentic essence of Indian cuisine while embracing the possibilities of modern gastronomy.',
  imageSrc,
  imageAlt = 'About Banjara Restaurant',
  direction = 'image-left',
  decorative = true,
}) => {
  return (
    <section className="relative bg-charcoal-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-warm-400/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />
      </div>

      <ResponsiveContainer className="relative z-10" verticalPadding="xl">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${direction === 'image-right' ? 'lg:grid-flow-dense' : ''}`}>
            {/* Image Column */}
            <AnimatedSection
              direction={direction === 'image-left' ? 'left' : 'right'}
              className="relative aspect-[4/5] w-full max-w-[500px] mx-auto lg:mx-0"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ minHeight: '400px' }}>
                <SafeImage
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                  className="object-cover"
                />
                {/* Add a subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              
              {decorative && (
                <>
                  {/* Decorative Squares */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 border border-warm-400/20 rounded-2xl backdrop-blur-sm" />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-amber-500/20 rounded-2xl backdrop-blur-sm" />
                </>
              )}
            </AnimatedSection>

            {/* Content Column */}
            <AnimatedSection
              direction={direction === 'image-left' ? 'right' : 'left'}
              className="relative px-4 sm:px-6 lg:px-0"
            >
              {subtitle && (
                <div className="inline-flex items-center gap-4 mb-10 sm:mb-14">
                  <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-warm-400" />
                  <span className="text-warm-400 text-sm font-medium tracking-[0.5em] uppercase font-body">
                    {subtitle}
                  </span>
                  <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-warm-400" />
                </div>
              )}
              
              {title && (
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white mb-10 sm:mb-14 leading-[1.05] tracking-tight">
                  {title.split(' ').map((word, index, array) => {
                    // Add line break before the last two words
                    if (index === array.length - 2) {
                      return (
                        <React.Fragment key={index}>
                          {word}
                          <br />
                        </React.Fragment>
                      );
                    }
                    // Apply special styling to the last word
                    if (index === array.length - 1) {
                      return (
                        <span key={index} className="text-gradient-warm font-light tracking-wide">
                          {word}
                        </span>
                      );
                    }
                    // Regular word with space
                    return <span key={index}>{word} </span>;
                  })}
                </h2>
              )}
              
              {description && (
                <p className="text-lg sm:text-xl lg:text-2xl text-stone-200/80 mb-8 font-body leading-relaxed tracking-wide max-w-2xl">
                  {description}
                </p>
              )}
            </AnimatedSection>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
};

export default AboutSection;