// services/tmdb.ts
import type { Movie, MovieDetails, MovieApiResponse } from '@/types/movie';
import { createTMDBRequestOptions, createTMDBApiUrl } from '@/config/tmdb.config';

class TMDBError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'TMDBError';
  }
}

async function fetchTMDB<T>(endpoint: string, options = createTMDBRequestOptions()): Promise<T> {
  try {
    const res = await fetch(createTMDBApiUrl(endpoint), options);
    
    if (!res.ok) {
      throw new TMDBError(
        `TMDB API Error: ${res.statusText}`,
        res.status
      );
    }

    return res.json();
  } catch (error) {
    if (error instanceof TMDBError) {
      throw error;
    }
    throw new TMDBError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}

export const tmdbApi = {
  getPopularMovies: (page: number = 1) => 
    fetchTMDB<MovieApiResponse>(`/movie/popular?page=${page}`),

  searchMovies: (query: string, page: number = 1) => 
    fetchTMDB<MovieApiResponse>(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`),

  getMovieDetails: (id: number) => 
    fetchTMDB<MovieDetails>(`/movie/${id}?append_to_response=videos,credits,images`),

  getTrendingMovies: (timeWindow: 'day' | 'week' = 'week') => 
    fetchTMDB<MovieApiResponse>(`/trending/movie/${timeWindow}`),

  getUpcomingMovies: (page: number = 1) => 
    fetchTMDB<MovieApiResponse>(`/movie/upcoming?page=${page}`),

  getMovieRecommendations: (movieId: number, page: number = 1) =>
    fetchTMDB<MovieApiResponse>(`/movie/${movieId}/recommendations?page=${page}`),

  getSimilarMovies: (movieId: number, page: number = 1) =>
    fetchTMDB<MovieApiResponse>(`/movie/${movieId}/similar?page=${page}`),

  getMoviesByGenre: (genreId: number, page: number = 1) =>
    fetchTMDB<MovieApiResponse>(`/discover/movie?with_genres=${genreId}&page=${page}`),

  getTopRatedMovies: (page: number = 1) =>
    fetchTMDB<MovieApiResponse>(`/movie/top_rated?page=${page}`),

  getNowPlayingMovies: (page: number = 1) =>
    fetchTMDB<MovieApiResponse>(`/movie/now_playing?page=${page}`),

  getMoviesByIds: async (movieIds: number[]): Promise<MovieDetails[]> => {
    const promises = movieIds.map(id => tmdbApi.getMovieDetails(id));
    return Promise.all(promises);
  }
};

export { TMDBError };