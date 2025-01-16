// app/favorites/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { MovieGrid } from '@/components/MovieGrid';
import { tmdbApi } from '@/services/tmdb';
import { useFavorites } from '@/hooks/useFavorites';
import type { Movie } from '@/types/movie';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const movieDetails = await Promise.all(
          favorites.map(id => tmdbApi.getMovieDetails(id))
        );
        
        // Convertir MovieDetails a Movie
        const convertedMovies: Movie[] = movieDetails.map(detail => ({
          id: detail.id,
          title: detail.title,
          overview: detail.overview,
          poster_path: detail.poster_path,
          release_date: detail.release_date,
          vote_average: detail.vote_average,
          genre_ids: detail.genres.map(genre => genre.id) // Convertir genres a genre_ids
        }));

        setMovies(convertedMovies);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-white">Cargando favoritos...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Mis Películas Favoritas</h1>
      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <p className="text-center text-gray-600">
          No tienes películas favoritas guardadas.
        </p>
      )}
    </main>
  );
}