// components/MovieGrid.tsx
import { Movie } from '@/types/movie'; // Tipo que define la estructura de una película.
import { MovieCard } from '@/components/MovieCard'; // Componente que muestra la información de una película individual.

interface MovieGridProps {
  movies: Movie[]; // Lista de películas para mostrar en la cuadrícula.
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    // Contenedor de cuadrícula con diseño responsivo.
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Mapeo de la lista de películas, renderizando un MovieCard por cada una. */}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} /> // Cada tarjeta recibe una película como propiedad.
      ))}
    </div>
  );
};
