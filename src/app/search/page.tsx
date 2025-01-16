// app/search/page.tsx
import React from 'react';
import { MovieGrid } from '@/components/MovieGrid';
import { SearchBar } from '@/components/SearchBar';
import { ClientPagination } from '@/components/ClientPagination';
import { tmdbApi } from '@/services/tmdb';

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export function generateMetadata({ searchParams }: SearchPageProps) {
  return {
    title: `Búsqueda: ${searchParams.q || ''} - ABC Movies`,
    description: `Resultados de búsqueda para "${searchParams.q || ''}" en ABC Movies`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const page = Number(searchParams.page) || 1;

  const { results: movies = [], total_pages = 1 } = await tmdbApi.searchMovies(query, page);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Resultados para: {query}
      </h1>
      <SearchBar />
      {movies.length > 0 ? (
        <>
          <MovieGrid movies={movies} />
          <ClientPagination
            currentPage={page}
            totalPages={total_pages}
            query={query}
          />
        </>
      ) : (
        <p className="text-center text-gray-600">
          No se encontraron resultados para tu búsqueda.
        </p>
      )}
    </main>
  );
}
