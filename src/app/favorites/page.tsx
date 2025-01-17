'use client';

import { useEffect, useState, useCallback } from 'react';
import { MovieGrid } from '@/components/MovieGrid';
import { tmdbApi } from '@/services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';
import type { Movie } from '@/types/movie';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/BackButton';

export default function FavoritesPage() {
  const { favorites, updateFavorites } = useFavorites(); 
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        if (favorites.length === 0) {
          setMovies([]);
          return;
        }

        const movieDetails = await Promise.all(
          favorites.map(id => tmdbApi.getMovieDetails(id))
        );
        
        const convertedMovies: Movie[] = movieDetails.map(detail => ({
          id: detail.id,
          title: detail.title,
          overview: detail.overview,
          poster_path: detail.poster_path,
          release_date: detail.release_date,
          vote_average: detail.vote_average,
          genre_ids: detail.genres.map(genre => genre.id)
        }));

        setMovies(convertedMovies);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  const handleRemoveFavorite = useCallback((movieId: number) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
    const updatedFavorites = favorites.filter((id) => id !== movieId);
    updateFavorites(updatedFavorites);
    console.log('Removed movie from favorites:', movieId);
  }, [favorites, updateFavorites]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-white">Cargando favoritos...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-4">
          Mis Películas Favoritas
        </h1>
      <div className="flex items-center mb-8">
        <BackButton />
      </div>

      {movies.length > 0 ? (
        <motion.div 
          className="movie-grid"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          <MovieGrid 
            movies={movies} 
            onToggleFavorite={handleRemoveFavorite} 
          />
        </motion.div>
      ) : (
        <p className="text-center text-gray-600">
          No tienes películas favoritas guardadas.
        </p>
      )}
    </main>
  );
}