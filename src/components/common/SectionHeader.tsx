import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accentWord?: string;
  alignment?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  decorative?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  accentWord,
  alignment = 'center',
  size = 'medium',
  decorative = true,
  className = '',
}) => {
  // Size mappings
  const titleSizes = {
    small: 'text-3xl md:text-4xl',
    medium: 'text-4xl md:text-5xl lg:text-6xl',
    large: 'text-5xl md:text-6xl lg:text-7xl',
  };

  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Process title to highlight accent word
  const renderTitle = () => {
    if (!accentWord) return title;

    return title.split(' ').map((word, index) => (
      <span key={index} className="inline-block mr-2">
        {word === accentWord ? (
          <span className="text-gradient-warm">{word}</span>
        ) : (
          word
        )}
      </span>
    ));
  };

  return (
    <div className={cn(`mb-8 sm:mb-10 md:mb-12 ${alignmentClasses[alignment]}`, className)}>
      {/* Decorative divider */}
      {decorative && (
        <div className="inline-flex items-center gap-4 mb-6 sm:mb-8">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-warm-400" />
          <span className="text-warm-400 text-sm font-medium tracking-[0.5em] uppercase font-body">
            {subtitle || 'Our Specialty'}
          </span>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-warm-400" />
        </div>
      )}
      
      {/* Main title */}
      <h2 className={`font-display ${titleSizes[size]} text-white mb-6 leading-tight tracking-tight`}>
        {renderTitle()}
      </h2>
      
      {/* Optional subtitle paragraph */}
      {subtitle && !decorative && (
        <p className="text-lg sm:text-xl text-stone-200/80 max-w-3xl mx-auto font-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;