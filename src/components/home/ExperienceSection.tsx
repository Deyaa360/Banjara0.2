"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Camera, Heart, Star, Users } from 'lucide-react';
import { getImagePath } from "@/lib/imagePath";

const ExperienceSection = () => {
  const experiences = [
    {
      icon: Heart,
      title: "Authentic Atmosphere",
      description: "Immerse yourself in the rich cultural heritage of nomadic India"
    },
    {
      icon: Star,
      title: "Signature Experience",
      description: "Every meal is crafted to tell the story of Banjara traditions"
    },
    {
      icon: Users,
      title: "Community Dining",
      description: "Share stories and create memories around our communal tables"
    },
    {
      icon: Camera,
      title: "Instagram Worthy",
      description: "Beautiful presentations that celebrate the art of Indian cuisine"
    }
  ];

  return (
    <section className="section-padding bg-gradient-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-warm-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="container-luxury relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-luxury-lg">
              <Image 
                src={getImagePath("/banner3.png")} 
                alt="Nomadic Culinary Experience at Banjara Restaurant" 
                fill
                className="object-cover"
                quality={95}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-warm-400/20 rounded-2xl backdrop-blur-sm" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-500/20 rounded-2xl backdrop-blur-sm" />
            
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute top-8 left-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-charcoal-900">4.9</div>
                  <div className="text-sm text-charcoal-600">Rating</div>
                </div>
                <div className="w-px h-12 bg-neutral-300" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-charcoal-900">200+</div>
                  <div className="text-sm text-charcoal-600">Reviews</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            {/* Section Badge */}
            <div className="inline-flex items-center gap-3 mb-10">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-warm-400" />
              <span className="text-warm-400 text-sm font-medium tracking-[0.3em] uppercase font-body">
                The Experience
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-warm-400" />
            </div>
            
            <h2 className="font-display text-display-lg text-white mb-10 leading-tight">
              More Than Just
              <br />
              <span className="text-gradient-warm">A Meal</span>
            </h2>
            
            <div className="space-y-6 mb-10">
              <p className="text-readable text-stone-200 font-body">
                Step into our world where every detail has been carefully crafted to transport 
                you to the vibrant camps of the Banjara nomads. From the warm lighting that 
                mimics campfire glow to the authentic artifacts that tell stories of ancient journeys.
              </p>
              
              <p className="text-readable text-stone-200 font-body">
                Our restaurant is more than a dining destination—it's a cultural experience 
                that celebrates the spirit of wanderlust, community, and the timeless art 
                of sharing meals with loved ones.
              </p>
            </div>

            {/* Experience Features */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-start"
                >
                  <div className="w-12 h-12 bg-warm-400/20 rounded-xl flex items-center justify-center mb-3">
                    <experience.icon className="w-6 h-6 text-warm-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{experience.title}</h3>
                  <p className="text-sm text-stone-300">{experience.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                className="btn-primary font-body"
              >
                <Link href="/reservations">Book Your Experience</Link>
              </Button>
              
              <Button 
                asChild 
                className="btn-secondary font-body"
              >
                <Link href="/about">Learn Our Story</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;