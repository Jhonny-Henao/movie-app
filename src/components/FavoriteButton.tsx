'use client';

import { useFavorites } from '@/hooks/useFavorites';
import { motion } from 'framer-motion';

interface FavoriteButtonProps {
  movieId: number;
  className?: string;
  onToggle?: (movieId: number) => void;
}

export const FavoriteButton = ({
  movieId,
  className = '',
  onToggle,
}: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isMovieFavorite = isFavorite(movieId);

  const handleClick = () => {
    console.log(`Favorito cambiado para la película con ID: ${movieId}`);
    toggleFavorite(movieId);
    if (onToggle) {
      onToggle(movieId);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`p-2 rounded-full bg-white/90 hover:bg-white transition-colors ${className}`}
      aria-label={isMovieFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      initial={{ opacity: 0.6, scale: 0.9 }}  // Inicia con menos opacidad y un poco más pequeño
      animate={{ opacity: 1, scale: 1 }}      // Se anima a opacidad completa y tamaño normal
      exit={{
        opacity: 0,                    // Se desvanece al quitar el favorito
        scale: 0.8,                    // Se hace más pequeño
        transition: { duration: 0.5 },  // Más lenta para que se vea más suave
      }}
      transition={{ duration: 0.3 }}           // Duración de la animación de entrada
    >
      <svg
        className={`w-6 h-6 ${isMovieFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </motion.button>
  );
};
