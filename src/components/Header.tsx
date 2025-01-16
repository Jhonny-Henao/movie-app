'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Film, Heart, Home } from 'lucide-react';

export const Header = () => {
  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Puedes descomentar diferentes versiones del className en el motion.nav para probar diferentes estilos

  return (
    <motion.nav
      // Versión 2: Azul Real
      className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
      
      // Versión 3: Violeta Moderno
      // className="bg-gradient-to-r from-violet-800 via-purple-800 to-purple-900 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
      
      // Versión 4: Verde Elegante
      // className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-teal-900 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
      
      // Versión 5: Atardecer
      // className="bg-gradient-to-r from-orange-700 via-pink-800 to-rose-900 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"

      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            variants={linkVariants}
            whileHover="hover"
            className="flex items-center gap-2"
          >
            <Link href="/" className="flex items-center gap-2 group">
              <Film className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="font-extrabold text-3xl bg-gradient-to-r from-white via-blue-200 to-sky-200 bg-clip-text text-transparent">
                Movies
              </span>
            </Link>
          </motion.div>

          <div className="flex gap-8">
            <motion.div variants={linkVariants} whileHover="hover">
              <Link 
                href="/" 
                className="flex items-center gap-2 px-4 py-2 rounded-full text-blue-200 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Inicio</span>
              </Link>
            </motion.div>

            <motion.div variants={linkVariants} whileHover="hover">
              <Link 
                href="/favorites" 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 text-white hover:from-blue-400 hover:to-sky-400 transition-all shadow-lg shadow-blue-500/20"
              >
                <Heart className="w-4 h-4" />
                <span className="font-medium">Favoritos</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;