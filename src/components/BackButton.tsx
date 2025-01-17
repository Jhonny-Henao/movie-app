// components/BackButton.tsx
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200"
    >
      <ArrowLeft size={20} />
      <span>Volver</span>
    </button>
  );
}