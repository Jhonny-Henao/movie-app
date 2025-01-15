// components/ClientPagination.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Pagination } from './Pagination';

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

  const handlePageChange = (newPage: number) => {
    if (isHomePage) {
      router.push(`/page?page=${newPage}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(query || '')}&page=${newPage}`);
    }
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}