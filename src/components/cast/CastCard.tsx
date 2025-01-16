// components/cast/CastCard.tsx
'use client';

import Image from 'next/image';
import type { Cast } from '@/types/movie';

interface CastCardProps {
  actor: Cast;
}

export const CastCard = ({ actor }: CastCardProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-32 h-32 overflow-hidden rounded-lg">
        <Image
          src={actor.profile_path 
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : '/images/avatar.png'
          }
          alt={actor.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-sm font-medium text-center max-w-[130px] truncate">
        {actor.name}
      </h3>
      <p className="text-xs text-gray-500 text-center max-w-[130px] truncate">
        {actor.character}
      </p>
    </div>
  );
};