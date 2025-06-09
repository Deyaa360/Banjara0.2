"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Reservations", href: "/reservations" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isTransparent, setIsTransparent] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY <= 20) {
            setShowHeader(true);
            setIsTransparent(true);
          } else if (currentScrollY > lastScrollY) {
            setShowHeader(false); // scrolling down
            setIsTransparent(false);
          } else {
            setShowHeader(true); // scrolling up
            setIsTransparent(false);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 will-change-transform border-b border-gold-400/30",
        isTransparent
          ? "bg-transparent border-transparent shadow-none"
          : "bg-charcoal-900/90 backdrop-blur-lg shadow-elegant border-b border-gold-400/30",
        showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      {/* Only show nav bar when mobile menu is closed */}
      {!isOpen && (
        <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative w-20 h-20">
            <Image src="/LOGO.png" alt="Banjara Logo" fill className="object-contain" priority />
          </Link>
          {/* Desktop Navigation (only on lg+) */}
          <div className="hidden lg:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative text-base font-medium tracking-wider transition-colors duration-300 px-2 py-1",
                  pathname === item.href
                    ? "text-gold-400"
                    : "text-white hover:text-gold-400"
                )}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
              </Link>
            ))}
            <Button 
              variant="outline" 
              className="ml-4 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal-900 font-semibold px-6 py-2 rounded-full transition-all duration-300"
              asChild
            >
              <Link href="/reservations">Book a Table</Link>
            </Button>
          </div>
          {/* Mobile: Only logo and hamburger (no nav links, no book button) */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Hamburger menu button */}
            <button
              type="button"
              className="text-gold-400 hover:text-gold-300 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
        </nav>
      )}
      {/* Mobile Menu Overlay - only when open */}
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50 lg:hidden flex flex-col bg-charcoal-900/95 backdrop-blur-lg shadow-elegant px-6 py-6"
          )}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="relative w-16 h-16">
              <Image src="/LOGO.png" alt="Banjara Logo" fill className="object-contain" priority />
            </Link>
            <button
              type="button"
              className="text-gold-400 hover:text-gold-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-8 flow-root flex-1">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group block rounded-lg px-3 py-3 text-lg font-medium transition-colors",
                    pathname === item.href
                      ? "text-gold-400"
                      : "text-white hover:text-gold-400"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-3 w-[calc(100%-1.5rem)] h-0.5 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                </Link>
              ))}
            </div>
            <div className="py-6">
              <Button variant="outline" className="w-full border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal-900 font-semibold px-6 py-3 rounded-full transition-all duration-300" asChild>
                <Link href="/reservations">Book a Table</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;