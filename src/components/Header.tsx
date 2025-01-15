"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    // Usamos motion.div para envolver todo el nav y agregarle una animación
    <motion.nav
      className="bg-gradient-to-r from-blue-600 to-indigo-800 shadow-md"
      initial={{ opacity: 0 }}        // Inicializa con opacidad 0 (invisible)
      animate={{ opacity: 1 }}        // Al animar, la opacidad será 1 (visible)
      transition={{ duration: 0.5 }}  // Duración de la animación (0.5 segundos)
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-extrabold text-3xl text-white hover:text-gray-300 transition-all duration-300">
            Movies
          </Link>
          <div className="flex gap-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="text-white font-semibold text-lg hover:text-blue-300 transition-all duration-300">
                Inicio
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/favorites" className="text-white font-semibold text-lg hover:text-blue-300 transition-all duration-300">
                Favoritos
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
