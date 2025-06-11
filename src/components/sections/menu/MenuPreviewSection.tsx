import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection, ResponsiveContainer, SectionHeader, Button } from '@/components/common';
import { MenuCard } from '@/components/ui';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isSignature?: boolean;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

interface MenuPreviewSectionProps {
  categories: MenuCategory[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
}

export const MenuPreviewSection: React.FC<MenuPreviewSectionProps> = ({
  categories,
  title = "Explore Our Menu",
  subtitle = "A curated selection of our most popular dishes",
  viewAllLink = "/menu",
}) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');

  return (
    <section className="py-20 bg-charcoal-900 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-warm-400/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />
      </div>

      <ResponsiveContainer>
        <AnimatedSection className="text-center mb-16">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            accentWord="Menu"
            size="large"
            decorative={false}
          />
        </AnimatedSection>

        {/* Category Tabs */}
        <AnimatedSection className="mb-12" delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-amber-400/20 text-amber-300 border-2 border-amber-400/30'
                    : 'bg-charcoal-800/50 text-stone-300 border-2 border-transparent hover:bg-charcoal-800 hover:text-stone-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Menu Items */}
        <div className="max-w-4xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`transition-opacity duration-500 ${
                activeCategory === category.id ? 'block' : 'hidden'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {category.items.map((item, index) => (
                  <AnimatedSection
                    key={item.id}
                    delay={0.1 + index * 0.1}
                  >
                    <MenuCard
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      isVegetarian={item.isVegetarian}
                      isSpicy={item.isSpicy}
                      isSignature={item.isSignature}
                      spiceLevel={item.isSpicy ? 2 : 0}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Button */}
        <AnimatedSection className="flex justify-center mt-16" delay={0.3}>
          <Link href={viewAllLink}>
            <button className="menu-btn flex items-center gap-3 bg-stone-900/70 hover:bg-stone-800/90 backdrop-blur-md border-2 border-amber-400/30 hover:border-amber-400/60 text-amber-200 hover:text-amber-100 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-medium text-lg sm:text-xl transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl group">
              <span className="tracking-wide font-semibold">View Full Menu</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 menu-btn-arrow" />
            </button>
          </Link>
        </AnimatedSection>
      </ResponsiveContainer>
    </section>
  );
};

export default MenuPreviewSection;