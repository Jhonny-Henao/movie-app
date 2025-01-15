'use client';

import { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react'; 

export default function Home() {
  const [loading, setLoading] = useState(true); // Estado para manejar el cargando
  const router = useRouter();

  useEffect(() => {
    // Simulamos un tiempo de carga de 3 segundos
    const timer = setTimeout(() => {
      setLoading(false); // Dejamos de mostrar el cargando después de 2 segundos
      router.push('/page?page=1'); // Redirigimos a la página después de 2 segundos
    }, 2000);

    // Limpiamos el timeout en caso de que el componente se desmonte
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Si estamos en estado de carga, mostramos el ícono */}
      {loading ? (
        <Loader className="animate-spin text-blue-500" size={48} />
      ) : null}
    </div>
  );
}
