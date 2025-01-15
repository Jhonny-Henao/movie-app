// app/movies/[id]/page.tsx
import Image from 'next/image'; 
import { FavoriteButton } from '@/components/FavoriteButton'; 
import { tmdbApi } from '@/services/tmdb';
import { MovieDetails } from '@/types/movie'; // Importamos MovieDetails

interface MoviePageProps {
  movie: MovieDetails;
}

// Ajustamos la función para recibir el parámetro `params` con el tipo adecuado
export async function generateMetadata({ params }: { params: { id: string } }) {
  const movie = await tmdbApi.getMovieDetails(Number(params.id));
  return {
    title: `${movie.title} - ABC Movies`,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [`https://image.tmdb.org/t/p/w500${movie.poster_path}`],
    },
  };
}

export default function MoviePage({ movie }: MoviePageProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <FavoriteButton
            movieId={movie.id}
            className="absolute top-4 right-4"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-400 mb-6">{movie.overview}</p>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Fecha de lanzamiento</h2>
            <p>{new Date(movie.release_date).toLocaleDateString()}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Géneros</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Puntuación</h2>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full inline-block">
              {movie.vote_average.toFixed(1)} / 10
            </div>
          </div>

          {movie.videos?.results?.[0] && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Tráiler</h2>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                  title="Tráiler de la película"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
