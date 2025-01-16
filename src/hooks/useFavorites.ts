// useFavorites.ts
import { useState, useCallback } from 'react';

export const useFavorites = () => {
  const getFavoritesFromStorage = (): number[] => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  };

  const [favorites, setFavorites] = useState<number[]>(getFavoritesFromStorage);

  // Función para actualizar tanto el estado como localStorage
  const updateFavorites = useCallback((newFavorites: number[]) => {
    try {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
      console.log('Favoritos actualizados:', newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, []);

  const toggleFavorite = useCallback((movieId: number) => {
    // Obtenemos el estado más reciente de localStorage
    const currentFavorites = getFavoritesFromStorage();

    if (currentFavorites.includes(movieId)) {
      // Si ya existe, lo removemos
      const updatedFavorites = currentFavorites.filter(id => id !== movieId);
      updateFavorites(updatedFavorites);
    } else {
      // Si no existe, lo agregamos
      const updatedFavorites = [...currentFavorites, movieId];
      updateFavorites(updatedFavorites);
    }
  }, [updateFavorites]);

  const isFavorite = useCallback((movieId: number) => {
    const currentFavorites = getFavoritesFromStorage();
    return currentFavorites.includes(movieId);
  }, []);

  const getFavorites = useCallback(() => {
    return getFavoritesFromStorage();
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavorites,
    updateFavorites  // Exportamos la función updateFavorites aquí
  };
};
