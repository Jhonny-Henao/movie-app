// components/MovieCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { FavoriteButton } from '@/components/FavoriteButton';

interface MovieCardProps {
  movie: Movie; // Propiedad `movie` que contiene los datos de la película.
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Enlace a la página de detalles de la película */}
      <Link href={`/movies/${movie.id}`}>
        <div className="aspect-[2/3] relative">
          {/* Imagen de la película */}
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // URL del póster usando la API de TMDB.
            alt={movie.title} // Texto alternativo con el título de la película.
            fill // Ocupa todo el contenedor relativo.
            className="object-cover" // Asegura que la imagen cubra todo el contenedor.
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Ajusta la resolución de la imagen según el tamaño de pantalla.
          />
        </div>
        <div className="p-4">
          {/* Título de la película */}
          <h2 className="font-bold text-lg mb-2 text-white">{movie.title}</h2>
          {/* Año de lanzamiento */}
          <p className="text-sm text-gray-600">
            {new Date(movie.release_date).getFullYear()}
          </p>
          {/* Calificación de la película */}
          <div className="mt-2 flex items-center">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              {movie.vote_average.toFixed(1)} {/* Calificación con 1 decimal */}
            </span>
          </div>
        </div>
      </Link>
      {/* Botón de favoritos */}
      <FavoriteButton movieId={movie.id} className="absolute top-2 right-2" />
    </div>
  );
};;