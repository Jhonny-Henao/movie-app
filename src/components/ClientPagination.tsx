//Components/ClientPagination.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Pagination } from './Pagination';
import { TMDB_MAX_PAGE } from '@/services/tmdb';

interface ClientPaginationProps {
  currentPage: number;
  totalPages: number;
  query?: string;
  isHomePage?: boolean;
}

export function ClientPagination({ 
  currentPage, 
  totalPages, 
  query, 
  isHomePage = false 
}: ClientPaginationProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isNavigating, setIsNavigating] = useState(false);

  // Usar el total real de páginas pero limitado a 500
  const effectiveTotalPages = Math.min(totalPages, TMDB_MAX_PAGE);

  const handlePageChange = (newPage: number) => {
    if (isPending || isNavigating || newPage > TMDB_MAX_PAGE) return;
    
    setIsNavigating(true);
    
    const newUrl = isHomePage
      ? `/page?page=${newPage}`
      : `/search?q=${encodeURIComponent(query || '')}&page=${newPage}`;

    startTransition(() => {
      router.push(newUrl);
      setTimeout(() => setIsNavigating(false), 100);
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination
        currentPage={currentPage}
        totalPages={effectiveTotalPages}
        onPageChange={handlePageChange}
        isLoading={isPending || isNavigating}
        jumpSize={5}
      />
    </div>
  );
}