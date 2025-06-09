"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, Flame } from 'lucide-react';

// Featured dishes from Banjara's authentic menu
const featuredDishes = [
  {
    id: 1,
    name: 'Butter Chicken',
    description: 'Tomato gravy, nuts, cream, and butter powder',
    price: 28,
    category: 'Large Plate',
    spiceLevel: 2,
    isVegetarian: false,
    isSignature: true,
    region: 'Punjab',
    image: '/images/menu/BUTTER CHICKEN (PUNJAB).png'
  },
  {
    id: 2,
    name: 'Galauti Kebab',
    description: 'Minced goat, vetiver, rosewater ghee, fried onion, cardamom, mint chutney',
    price: 24,
    category: 'Sharing Plate',
    spiceLevel: 2,
    isVegetarian: false,
    isSignature: true,
    region: 'Lucknow',
    image: '/images/menu/GALAUTI KEBAB (LUCKNOW).png'
  },
  {
    id: 3,
    name: 'Burata Haak',
    description: 'Spinach, dandelion green, garlic confit, and burrata',
    price: 22,
    category: 'Large Plate',
    spiceLevel: 1,
    isVegetarian: true,
    isSignature: true,
    region: 'Kashmir',
    image: '/images/menu/BURATA HAAK (KASHMIR).png'
  },
  {
    id: 4,
    name: 'Nalli Biryani',
    description: 'Lamb shank, saffron, mint, and yogurt',
    price: 32,
    category: 'Large Plate',
    spiceLevel: 2,
    isVegetarian: false,
    isSignature: true,
    region: 'Hyderabad',
    image: '/images/menu/NALLI BIRYANI (HYDERABAD).png'
  }
];

const FeaturedMenu = () => {
  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(3)].map((_, i) => (
          <Flame 
            key={i} 
            size={12} 
            className={`${i < level ? 'text-amber-500 fill-current' : 'text-stone-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-warm-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-stone-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative">
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
            <span className="text-warm-600 text-sm font-medium tracking-[0.3em] uppercase font-body">
              Regional Specialties
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-warm-400" />
          </div>
          
          <h2 className="font-display text-display-lg text-charcoal-900 mb-8 leading-tight">
            Flavors from
            <br />
            <span className="text-gradient-gold">Across India</span>
          </h2>
          
          <p className="text-readable text-charcoal-700 max-w-2xl mx-auto font-body">
            Like the nomadic Banjaras who carried spices across the subcontinent, 
            our menu celebrates the diverse regional cuisines of India.
          </p>
        </motion.div>
        
        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {dish.isSignature && (
                      <div className="bg-gold-400 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <Star size={10} fill="currentColor" />
                        Signature
                      </div>
                    )}
                    {dish.isVegetarian && (
                      <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Vegetarian
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-charcoal-900 font-bold text-lg px-3 py-1 rounded-full">
                    ${dish.price}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-viaoda text-xl text-charcoal-900 leading-tight">
                      {dish.name}
                    </h3>
                  </div>
                  
                  <p className="text-charcoal-600 mb-4 text-sm leading-relaxed">
                    {dish.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gold-400 uppercase tracking-wider">
                      {dish.category}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-charcoal-500">Spice:</span>
                      {renderSpiceLevel(dish.spiceLevel)}
                    </div>
                  </div>
                  
                  <div className="text-xs text-charcoal-500 italic">
                    From {dish.region}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            asChild 
            size="lg" 
            className="bg-gold-400 hover:bg-gold-500 text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Link href="/menu">Explore Full Menu</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedMenu;