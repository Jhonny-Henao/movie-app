//Components/Pagination.tsx
'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number; // Página actual.
  totalPages: number; // Total de páginas disponibles.
  onPageChange: (page: number) => void; // Función para manejar el cambio de página.
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  // Genera el rango de páginas visibles en la paginación.
  const getPageRange = () => {
    const range = [];
    const showPages = 5; // Número máximo de páginas visibles.
    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);

    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {/* Contenedor para botones de navegación y números de página */}
      <div className="flex items-center gap-2">
        {/* Botón para retroceder de página */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1} // Deshabilitado si está en la primera página.
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
        </button>

        {/* Botones con números de página */}
        <div className="hidden md:flex gap-1">
          {getPageRange().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
                ${pageNum === currentPage
                  ? 'bg-blue-500 text-white font-medium' // Página actual resaltada.
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-500 text-gray-700'
                }`}
            >
              {pageNum} {/* Número de página */}
            </button>
          ))}
        </div>

        {/* Botón para avanzar de página */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages} // Deshabilitado si está en la última página.
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
        </button>
      </div>

      {/* Información de la página actual y el total de páginas */}
      <div className="text-sm font-medium text-gray-500 mt-2">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
};