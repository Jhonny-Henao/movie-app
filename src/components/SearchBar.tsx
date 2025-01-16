// components/SearchBar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.35
      }
    }
  };

  const inputVariants = {
    normal: { 
      scale: 1,
      transition: { duration: 0.2 }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full max-w-lg mx-auto mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="relative flex items-center"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        variants={inputVariants}
        animate={isHovered ? "hover" : "normal"}
      >
        <motion.div
          className="absolute left-4 text-gray-400"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 360 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <Search size={20} />
        </motion.div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar películas..."
          className="w-full pl-12 pr-28 py-3 rounded-xl border border-gray-300 text-lg text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-gray-500/50"
          />
        
        <motion.button
          type="submit"
          className="absolute right-4 px-6 py-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-700 text-white rounded-full shadow-xl hover:bg-gradient-to-r hover:from-blue-400 hover:via-indigo-500 hover:to-blue-600 focus:ring-4 focus:ring-indigo-300"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#4f46e5"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
        >
          Buscar
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default SearchBar;