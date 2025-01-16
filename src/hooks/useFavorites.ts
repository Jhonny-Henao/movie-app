//Hooks/UseFavorites.ts
import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (movieId: number) => {
    const newFavorites = favorites.includes(movieId)
      ? favorites.filter(id => id !== movieId)
      : [...favorites, movieId];
    
    setFavorites(newFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
  };

  return { favorites, toggleFavorite };
};