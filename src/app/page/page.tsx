// app/page/page.tsx
import React from 'react';
import { MovieGrid } from '@/components/MovieGrid';
import { SearchBar } from '@/components/SearchBar';
import { tmdbApi } from '@/services/tmdb';
import { ClientPagination } from '@/components/ClientPagination';

export const metadata = {
  title: 'Movies - Películas Populares',
  description: 'Descubre las películas más populares del momento en ABC Movies',
  icons: {
    icon: '/images/movie.png',
    shortcut: '/images/movie.png',
    apple: '/images/movie.png',
  },
};

export default async function PageRoute({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { results: movies, total_pages } = await tmdbApi.getPopularMovies(page);

  return (
    <main className="container mx-auto px-4 py-8 bg-black">
      <h1 className="text-3xl font-bold mb-8 text-center">Películas Populares</h1>
      <SearchBar />
      <MovieGrid movies={movies} />
      <ClientPagination
        currentPage={page}
        totalPages={total_pages}
        isHomePage={true}
      />
    </main>
  );
}