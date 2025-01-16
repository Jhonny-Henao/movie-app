//Componentes/FavoriteButton.tsx
'use client';

import { useFavorites } from '@/hooks/useFavorites'; 

interface FavoriteButtonProps {
  movieId: number; // ID único de la película para identificar si está en favoritos.
  className?: string;
}

export const FavoriteButton = ({ movieId, className = '' }: FavoriteButtonProps) => {
  const { favorites, toggleFavorite } = useFavorites(); // Se obtiene la lista de favoritos y la función para alternar.
  const isFavorite = favorites.includes(movieId); // Verifica si la película está en favoritos.

  return (
    <button
      onClick={() => toggleFavorite(movieId)} // Alterna el estado de favorito al hacer clic.
      className={`p-2 rounded-full bg-white/90 hover:bg-white transition-colors ${className}`}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'} // Accesibilidad: etiqueta según el estado.
    >
      <svg
        className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} // Cambia el color del ícono según el estado.
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
    </button>
  );
};
