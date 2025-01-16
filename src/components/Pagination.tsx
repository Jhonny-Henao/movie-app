//Components/Pagination.tsx
'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  jumpSize?: number;
  isLoading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  jumpSize = 5,
  isLoading = false
}) => {
  const validatedCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  const validatedTotalPages = Math.max(1, totalPages);

  const getPageRange = () => {
    const range = [];
    const showPages = 5;
    let start = Math.max(1, validatedCurrentPage - Math.floor(showPages / 2));
    const end = Math.min(validatedTotalPages, start + showPages - 1);

    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  const handlePageChange = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, validatedTotalPages));
    if (validPage !== currentPage && !isLoading) {
      onPageChange(validPage);
    }
  };

  const handleJump = (direction: 'forward' | 'backward') => {
    if (isLoading) return;
    
    const newPage = direction === 'forward'
      ? Math.min(validatedTotalPages, validatedCurrentPage + jumpSize)
      : Math.max(1, validatedCurrentPage - jumpSize);
    
    handlePageChange(newPage);
  };

  const buttonBaseClass = "inline-flex text-blue-500 items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group";

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex items-center gap-2">
        {/* Primera página */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={validatedCurrentPage <= 1 || isLoading}
          className={buttonBaseClass}
          title="Primera página"
        >
          <ChevronsLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
        </button>
  
        {/* Saltar hacia atrás */}
        <button
          onClick={() => handleJump('backward')}
          disabled={validatedCurrentPage <= 1 || isLoading}
          className={buttonBaseClass}
          title={`Retroceder ${jumpSize} páginas`}
        >
          <div className="flex items-center">
            <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-blue-500" />
            <span className="text-xs text-gray-600 group-hover:text-blue-500">{jumpSize}</span>
          </div>
        </button>
  
        {/* Página anterior */}
        <button
          onClick={() => handlePageChange(validatedCurrentPage - 1)}
          disabled={validatedCurrentPage <= 1 || isLoading}
          className={buttonBaseClass}
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
        </button>
  
        {/* Números de página */}
        <div className="hidden md:flex gap-1">
          {validatedCurrentPage > 3 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                disabled={isLoading}
                className={buttonBaseClass}
              >
                1
              </button>
              {validatedCurrentPage > 4 && (
                <span className="inline-flex items-center justify-center w-10 h-10">
                  <MoreHorizontal className="w-5 h-5 text-blue-500" />
                </span>
              )}
            </>
          )}
  
          {getPageRange().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              disabled={isLoading}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
                ${pageNum === validatedCurrentPage
                  ? 'bg-blue-500 text-white font-medium'
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-500 text-gray-700'
                }`}
            >
              {pageNum}
            </button>
          ))}
  
          {validatedCurrentPage < validatedTotalPages - 2 && (
            <>
              {validatedCurrentPage < validatedTotalPages - 3 && (
                <span className="inline-flex items-center justify-center w-10 h-10">
                  <MoreHorizontal className="w-5 h-5 text-blue-500" />
                </span>
              )}
              <button
                onClick={() => handlePageChange(validatedTotalPages)}
                disabled={isLoading}
                className={buttonBaseClass}
              >
                {validatedTotalPages}
              </button>
            </>
          )}
        </div>
  
        {/* Página siguiente */}
        <button
          onClick={() => handlePageChange(validatedCurrentPage + 1)}
          disabled={validatedCurrentPage >= validatedTotalPages || isLoading}
          className={buttonBaseClass}
        >
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
        </button>
  
        {/* Saltar hacia adelante */}
        <button
          onClick={() => handleJump('forward')}
          disabled={validatedCurrentPage >= validatedTotalPages || isLoading}
          className={buttonBaseClass}
          title={`Avanzar ${jumpSize} páginas`}
        >
          <div className="flex items-center">
            <span className="text-xs text-gray-600 group-hover:text-blue-500">{jumpSize}</span>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-500" />
          </div>
        </button>
  
        {/* Última página */}
        <button
          onClick={() => handlePageChange(validatedTotalPages)}
          disabled={validatedCurrentPage >= validatedTotalPages || isLoading}
          className={buttonBaseClass}
          title="Última página"
        >
          <ChevronsRight className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
        </button>
      </div>
  
      {/* Información de la página */}
      <div className="text-sm font-medium text-gray-500 mt-2">
        Página {validatedCurrentPage} de {validatedTotalPages}
      </div>
    </div>
  );  
};