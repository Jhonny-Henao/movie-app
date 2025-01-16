//Services/tmdb.ts
import type { MovieDetails, MovieApiResponse } from '@/types/movie';
import { createTMDBRequestOptions, createTMDBApiUrl } from '@/config/tmdb.config';

const TMDB_MAX_PAGE = 500; // TMDB limita los resultados a 500 páginas de 48.189 y este es un límite del servidor.

class TMDBError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'TMDBError';
  }
}

// Función para validar el número de página
function validateTMDBPage(page: number): number {
  const validPage = Math.max(1, Math.min(Math.floor(page), TMDB_MAX_PAGE));
  if (page > TMDB_MAX_PAGE) {
    console.warn(`TMDB only supports up to ${TMDB_MAX_PAGE} pages. Requested page ${page} was adjusted to ${TMDB_MAX_PAGE}.`);
  }
  return validPage;
}

async function fetchTMDB<T>(endpoint: string, options = createTMDBRequestOptions()): Promise<T> {
  try {
    const res = await fetch(createTMDBApiUrl(endpoint), {
      ...options,
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new TMDBError(
        `TMDB API Error: ${res.statusText}`,
        res.status
      );
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    console.error('Fetch TMDB Error:', error); // Registrar el error en la consola
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
    fetchTMDB<MovieApiResponse>(`/movie/popular?page=${validateTMDBPage(page)}`),

  searchMovies: (query: string, page: number = 1) => {
    if (!query.trim()) {
      throw new TMDBError('Search query cannot be empty');
    }
    return fetchTMDB<MovieApiResponse>(
      `/search/movie?query=${encodeURIComponent(query)}&page=${validateTMDBPage(page)}`
    );
  },

  getMovieDetails: async (id: number) => {
    if (!Number.isInteger(id) || id <= 0) {
      throw new TMDBError('Invalid movie ID');
    }
    return fetchTMDB<MovieDetails>(`/movie/${id}?append_to_response=videos,credits,images`);
  },

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
    if (!Array.isArray(movieIds) || movieIds.length === 0) {
      throw new TMDBError('Invalid movie IDs array');
    }

    const promises = movieIds.map(id => tmdbApi.getMovieDetails(id));
    
    try {
      return Promise.all(promises);
    } catch (error) {
      console.error('Error fetching multiple movies:', error); // Registrar el error en la consola
      throw new TMDBError('Error fetching multiple movies');
    }
  }
};

export { TMDBError, TMDB_MAX_PAGE };
