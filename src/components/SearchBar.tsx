// components/SearchBar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mb-8">
      <div className="relative flex items-center">
        <motion.input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar películas..."
          className="w-full px-6 py-3 rounded-xl border border-gray-300 text-lg text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-500 ease-in-out shadow-lg"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />
        <motion.button
          type="submit"
          className="absolute right-4 -translate-y-1/2 px-6 py-2 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Buscar
        </motion.button>
      </div>
    </form>
  );
};
