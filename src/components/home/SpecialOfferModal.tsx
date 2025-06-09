'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Sparkles } from 'lucide-react';

export default function SpecialOfferModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Show the modal after 3 seconds when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-pepper-800 border border-gold-500/30 rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-basmati-300 hover:text-gold-500"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-4">
              <h2 className="text-2xl font-serif text-gold-500 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-gold-500" />
                Special Offer
              </h2>
              <p className="text-basmati-200">
                Limited time promotion for our valued customers.
              </p>
            </div>
            
            <div className="p-4 bg-pepper-900 rounded-md border border-gold-500/20 my-4">
              <h3 className="text-xl font-medium text-gold-400 mb-2">20% Off Your First Visit</h3>
              <p className="text-basmati-300 mb-4">
                Use promo code <span className="font-bold text-gold-500">SPICE20</span> when making a reservation 
                to receive 20% off your entire bill. Valid for dine-in only.
              </p>
              <div className="text-sm text-basmati-400">
                Offer valid until June 30, 2024. Cannot be combined with other promotions.
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="border-gold-500/30 text-basmati-200 hover:bg-pepper-700"
              >
                Maybe Later
              </Button>
              <Button 
                onClick={() => {
                  window.location.href = '/reservations';
                }}
                className="bg-gold-500 text-pepper-900 hover:bg-gold-600"
              >
                Make Reservation
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}