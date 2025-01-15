'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar el botón cuando la página se desplaza hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para volver arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-blue-500 transition-all duration-200 group"
        aria-label="Volver arriba"
      >
        <ChevronUp className="w-6 h-6 text-blue-500 group-hover:text-white" />
      </button>
    )
  );
};
