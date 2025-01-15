// src/config/tmdb.config.ts
interface TMDBConfig {
    baseUrl: string;
    apiVersion: string;
    accessToken: string;
    imageBaseUrl: string;
  }
  
  class TMDBConfiguration {
    private static instance: TMDBConfiguration;
    private config: TMDBConfig;
  
    private constructor() {
      const accessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
      
      if (!accessToken) {
        throw new Error('TMDB access token is not defined in environment variables');
      }
  
      this.config = {
        baseUrl: 'https://api.themoviedb.org',
        apiVersion: '3',
        accessToken,
        imageBaseUrl: 'https://image.tmdb.org/t/p'
      };
    }
  
    public static getInstance(): TMDBConfiguration {
      if (!TMDBConfiguration.instance) {
        TMDBConfiguration.instance = new TMDBConfiguration();
      }
      return TMDBConfiguration.instance;
    }
  
    public getApiUrl(): string {
      return `${this.config.baseUrl}/${this.config.apiVersion}`;
    }
  
    public getHeaders(): HeadersInit {
      return {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json'
      };
    }
  
    public getImageUrl(path: string, size: string = 'original'): string {
      return `${this.config.imageBaseUrl}/${size}${path}`;
    }
  }
  
  // Crear una instancia del configurador
  const tmdbConfig = TMDBConfiguration.getInstance();
  
  // Funciones helper para la API
  export const createTMDBRequestOptions = (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: object
  ): RequestInit => {
    return {
      method,
      headers: tmdbConfig.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
      next: { revalidate: 3600 } // Cache for 1 hour
    };
  };
  
  export const createTMDBApiUrl = (endpoint: string): string => {
    return `${tmdbConfig.getApiUrl()}${endpoint}`;
  };
  
  // Función para construir URLs de imágenes
  export const getTMDBImageUrl = (path: string | null, size: string = 'original'): string => {
    if (!path) return '/placeholder-image.jpg'; // Asegúrate de tener una imagen placeholder en tu proyecto
    return tmdbConfig.getImageUrl(path, size);
  };
  
  // Exportar constantes útiles
  export const TMDB_IMAGE_SIZES = {
    poster: {
      small: 'w185',
      medium: 'w342',
      large: 'w500',
      original: 'original'
    },
    backdrop: {
      small: 'w300',
      medium: 'w780',
      large: 'w1280',
      original: 'original'
    },
    profile: {
      small: 'w45',
      medium: 'w185',
      large: 'h632',
      original: 'original'
    }
  } as const;
  
  export default tmdbConfig;