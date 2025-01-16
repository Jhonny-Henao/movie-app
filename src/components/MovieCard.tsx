// components/MovieCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { FavoriteButton } from '@/components/FavoriteButton';

interface MovieCardProps {
  movie: Movie;
  onToggleFavorite?: (movieId: number) => void; // Nueva prop para manejar favoritos
}

export const MovieCard = ({ movie, onToggleFavorite }: MovieCardProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Enlace a la página de detalles de la película */}
      <Link href={`/movies/${movie.id}`}>
        <div className="aspect-[2/3] relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-lg mb-2 text-white">{movie.title}</h2>
          <p className="text-sm text-gray-600">
            {new Date(movie.release_date).getFullYear()}
          </p>
          <div className="mt-2 flex items-center">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
      {/* Botón de favoritos actualizado con la función de toggle */}
      <FavoriteButton 
        movieId={movie.id} 
        className="absolute top-2 right-2"
        onToggle={onToggleFavorite} // Pasamos la función al FavoriteButton
      />
    </div>
  );
};