// components/cast/CastSection.tsx
'use client';

import { Cast } from '@/types/movie';
import { CastCard } from './CastCard';

interface CastSectionProps {
  cast: Cast[];
  maxDisplay?: number;
}

export const CastSection = ({ cast, maxDisplay = 6 }: CastSectionProps) => {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-6">Reparto principal</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {cast.slice(0, maxDisplay).map((actor) => (
          <CastCard key={actor.id} actor={actor} />
        ))}
      </div>
    </section>
  );
};