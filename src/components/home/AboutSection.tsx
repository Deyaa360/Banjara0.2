"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, Leaf, Users, Clock } from 'lucide-react';
import { getImagePath } from "@/lib/imagePath";

const AboutSection = () => {
  const features = [
    {
      icon: Award,
      title: "Regional Authenticity",
      description: "Dishes from across the Indian subcontinent"
    },
    {
      icon: Leaf,
      title: "Traditional Spices",
      description: "Authentic flavors from nomadic trade routes"
    },
    {
      icon: Users,
      title: "Cultural Stories",
      description: "Every dish tells a Banjara tale"
    },
    {
      icon: Clock,
      title: "Timeless Journey",
      description: "Centuries of nomadic culinary tradition"
    }
  ];

  return (
    <section className="section-padding bg-gradient-warm relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23C9A96E%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="container-luxury relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Section Badge */}
            <div className="inline-flex items-center gap-3 mb-10">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-warm-400" />
              <span className="text-warm-600 text-sm font-medium tracking-[0.3em] uppercase font-body">
                Our Story
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-warm-400" />
            </div>
            
            <h2 className="font-display text-display-lg text-charcoal-900 mb-10 leading-tight">
              Inspired by the
              <br />
              <span className="text-gradient-gold">Spirit of Banjaras</span>
            </h2>
            
            <div className="space-y-6 mb-10">
              <p className="text-readable text-charcoal-700 font-body">
                The Banjaras, a proud nomadic tribe of India, roamed the lands for centuries as 
                "Carriers of the Desert." They traveled across mountains, forests, and villages, 
                trading spices and carrying the rich flavors of India wherever they went.
              </p>
              
              <p className="text-readable text-charcoal-700 font-body">
                Their lives were vibrant, filled with music, dance, and stories around campfires. 
                Every stop added new flavors and stories to their cuisine. Banjara Restaurant 
                honors this spirit of movement, tradition, and connection.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-start"
                >
                  <div className="w-12 h-12 bg-warm-400/10 rounded-xl flex items-center justify-center mb-3">
                    <feature.icon className="w-6 h-6 text-warm-500" />
                  </div>
                  <h3 className="font-semibold text-charcoal-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-charcoal-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <Button 
              asChild 
              className="bg-gold-400 hover:bg-gold-500 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <Link href="/about">Discover Our Journey</Link>
            </Button>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={getImagePath("/banner2.png")} 
                alt="Traditional Banjara Dishes and Heritage" 
                fill
                className="object-cover"
                quality={95}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold-400/20 rounded-2xl backdrop-blur-sm" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-walnut-500/20 rounded-2xl backdrop-blur-sm" />
            
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-charcoal-900">28+</div>
                  <div className="text-sm text-charcoal-600">Years</div>
                </div>
                <div className="w-px h-12 bg-neutral-300" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-charcoal-900">50K+</div>
                  <div className="text-sm text-charcoal-600">Happy Guests</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;