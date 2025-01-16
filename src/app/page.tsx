'use client';

import { useEffect } from 'react'; 
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Simulamos la redirección sin el loader
    router.push('/page?page=1');
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
    </div>
  );
}
