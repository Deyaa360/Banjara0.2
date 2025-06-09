"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, Phone, MapPin, Clock } from 'lucide-react';

const ReservationCTA = () => {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-warm-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
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
                Reserve Your Table
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-warm-400" />
            </div>
            
            <h2 className="font-display text-display-lg text-charcoal-900 mb-8 leading-tight">
              Begin Your
              <br />
              <span className="text-gradient-gold">Culinary Journey</span>
            </h2>
            
            <p className="text-lg text-charcoal-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether celebrating a special occasion or enjoying an intimate dinner, 
              our team is ready to create an unforgettable dining experience tailored just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <Button 
                asChild 
                size="lg" 
                className="bg-gold-400 hover:bg-gold-500 text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Link href="/reservations">
                  <Calendar className="w-5 h-5 mr-2" />
                  Reserve Now
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-2 border-charcoal-300 text-charcoal-700 hover:bg-charcoal-900 hover:text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
              >
                <Link href="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-tan-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-tan-200"
            >
              <div className="w-16 h-16 bg-gold-400/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="font-semibold text-charcoal-900 mb-4 text-lg">Opening Hours</h3>
              <div className="space-y-2 text-charcoal-600">
                <p>Monday - Thursday: 5:00 PM - 10:00 PM</p>
                <p>Friday - Saturday: 5:00 PM - 11:00 PM</p>
                <p>Sunday: 4:00 PM - 9:00 PM</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-tan-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-tan-200"
            >
              <div className="w-16 h-16 bg-gold-400/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="font-semibold text-charcoal-900 mb-4 text-lg">Contact</h3>
              <div className="space-y-2 text-charcoal-600">
                <p>Reservations: (555) 123-4567</p>
                <p>General: (555) 123-4568</p>
                <p>info@banjararestaurant.com</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-tan-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-tan-200"
            >
              <div className="w-16 h-16 bg-gold-400/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="font-semibold text-charcoal-900 mb-4 text-lg">Location</h3>
              <div className="space-y-2 text-charcoal-600">
                <p>123 Culinary Boulevard</p>
                <p>Downtown District</p>
                <p>New York, NY 10001</p>
              </div>
            </motion.div>
          </div>
          
          {/* Special Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-gold-400/10 to-walnut-500/10 rounded-2xl p-8 border border-gold-400/20">
              <p className="text-charcoal-700 text-lg leading-relaxed">
                <span className="font-semibold text-gold-400">Private Dining Available:</span> 
                {" "}Host your special events in our elegant private dining rooms. 
                Contact us to discuss customized menus and arrangements for groups of 8 or more.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReservationCTA;