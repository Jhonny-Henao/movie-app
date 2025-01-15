// app/movies/[id]/page.tsx
import Image from 'next/image'; 
import { tmdbApi } from '@/services/tmdb'; // Llamo la API para obtener los detalles de las películas desde TMDB
import { FavoriteButton } from '@/components/FavoriteButton'; 
import type { Genre } from '@/types/movie'; // Importamos el tipo Genre para definir los géneros de la película

// Definimos el tipo de las propiedades que recibe la página
interface MoviePageProps {
  params: {
    id: string; // El ID de la película es una cadena que se usará para obtener los detalles de la película
  };
}

// Función para generar los metadatos dinámicamente en base al ID de la película
export async function generateMetadata({ params }: MoviePageProps) {
  // Obtenemos los detalles de la película usando el ID
  const movie = await tmdbApi.getMovieDetails(Number(params.id));
  
  // Retornamos los metadatos para SEO y Open Graph (compartir en redes sociales)
  return {
    title: `${movie.title} - ABC Movies`, // Título de la página
    description: movie.overview, // Descripción de la película
    openGraph: {
      title: movie.title, // Título para Open Graph
      description: movie.overview, // Descripción para Open Graph
      images: [`https://image.tmdb.org/t/p/w500${movie.poster_path}`], // Imagen para Open Graph (poster de la película)
    },
  };
}

// Componente principal de la página que renderiza los detalles de la película
export default async function MoviePage({ params }: MoviePageProps) {
  // Obtenemos los detalles de la película usando el ID
  const movie = await tmdbApi.getMovieDetails(Number(params.id));

  return (
    <main className="container mx-auto px-4 py-8"> {/* Contenedor principal de la página */}
      <div className="grid md:grid-cols-2 gap-8"> 
        <div className="relative aspect-[2/3]"> 
          {/* Imagen de la película */}
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // URL de la imagen de la película
            alt={movie.title} // Texto alternativo con el título de la película
            fill // La imagen debe llenar todo el contenedor
            className="object-cover rounded-lg" // Estilos CSS para cubrir el contenedor y darle bordes redondeados
            sizes="(max-width: 768px) 100vw, 50vw" // Tiempos de carga responsivos
            priority // Prioriza la carga de la imagen
          />
          {/* Botón para agregar la película a favoritos */}
          <FavoriteButton 
            movieId={movie.id} // ID de la película para manejar el favorito
            className="absolute top-4 right-4" // Estilo para posicionar el botón en la esquina superior derecha
          />
        </div>
        <div>
          {/* Título de la película */}
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          {/* Descripción de la película */}
          <p className="text-gray-400 mb-6">{movie.overview}</p>
          
          <div className="mb-4">
            {/* Fecha de lanzamiento */}
            <h2 className="text-xl font-semibold mb-2">Fecha de lanzamiento</h2>
            <p>{new Date(movie.release_date).toLocaleDateString()}</p> {/* Formateamos la fecha */}
          </div>

          <div className="mb-4">
            {/* Géneros de la película */}
            <h2 className="text-xl font-semibold mb-2">Géneros</h2>
            <div className="flex flex-wrap gap-2">
              {/* Mapeamos los géneros de la película y los mostramos como etiquetas */}
              {movie.genres.map((genre: Genre) => (
                <span
                  key={genre.id} // Cada género tiene una clave única
                  className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm"
                >
                  {genre.name} {/* Nombre del género */}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            {/* Puntuación de la película */}
            <h2 className="text-xl font-semibold mb-2">Puntuación</h2>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full inline-block">
              {movie.vote_average.toFixed(1)} / 10 {/* Puntuación con un decimal */}
            </div>
          </div>

          {/* Si hay un tráiler disponible, lo mostramos */}
          {movie.videos?.results?.[0] && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Tráiler</h2>
              <div className="aspect-video"> {/* Contenedor con relación de aspecto para el vídeo */}
                <iframe
                  width="100%" // Ancho completo
                  height="100%" // Alto completo
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`} // URL del tráiler de YouTube
                  title="Tráiler de la película"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" // Permisos para el vídeo
                  allowFullScreen // Permite pantalla completa
                  className="rounded-lg" // Bordes redondeados
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
