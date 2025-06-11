'use client';

import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface GoogleMapProps {
  embedUrl: string;
  height?: string;
  className?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  embedUrl,
  height = '200px',
  className = '',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Add window error handler for Google Maps errors
    const handleError = (event: ErrorEvent) => {
      if (
        event.message.includes('browser is not defined') ||
        event.message.includes('Google Maps') ||
        event.filename?.includes('maps.googleapis.com')
      ) {
        setMapError(true);
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (mapError) {
    return (
      <div 
        className={`flex items-center justify-center bg-charcoal-700/50 ${className}`}
        style={{ height }}
      >
        <div className="text-center p-4">
          <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-stone-300">Map could not be loaded</p>
          <a 
            href={embedUrl.replace('embed?', '?')} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 text-sm mt-2 inline-block"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    );
  }

  if (!isMounted) {
    return (
      <div 
        className={`flex items-center justify-center bg-charcoal-700/50 ${className}`}
        style={{ height }}
      >
        <div className="text-center p-4">
          <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-stone-300">Map loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
        onError={() => setMapError(true)}
      />
    </div>
  );
};

export default GoogleMap;