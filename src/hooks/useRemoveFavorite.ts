// hooks/useRemoveFavorite.ts
import { useCallback } from 'react';

export const useRemoveFavorite = (updateFavorites: (newFavorites: number[]) => void) => {  // Recibir updateFavorites como argumento
  const removeFavorite = useCallback((movieId: number) => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      const currentFavorites: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];
      
      const updatedFavorites = currentFavorites.filter((id: number) => id !== movieId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      // Llamar a updateFavorites para actualizar el estado global
      updateFavorites(updatedFavorites);  // Aquí actualizas el estado

      return updatedFavorites;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return [];
    }
  }, [updateFavorites]);

  return { removeFavorite };
};
