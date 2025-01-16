// components/MovieGrid.tsx
import { Movie } from '@/types/movie';
import { MovieCard } from '@/components/MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onToggleFavorite?: (movieId: number) => void; // Nueva prop para manejar favoritos
}

export const MovieGrid = ({ movies, onToggleFavorite }: MovieGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie}
          onToggleFavorite={onToggleFavorite} // Pasamos la función al MovieCard
        />
      ))}
    </div>
  );
};