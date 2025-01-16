'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Loader } from 'lucide-react';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import './globals.css';
import { Header } from '@/components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // Detectar la ruta actual

  useEffect(() => {
    // Cuando la ruta cambie, activamos el loader
    setLoading(true);

    // Simulamos un retraso de carga (por ejemplo, 2 segundos) para mostrar el loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 Segundo para que no demore mucho el cargue, solo es para que sepa que cambio de pagina

    return () => clearTimeout(timer);
  }, [pathname]); // El efecto se ejecutará cada vez que cambie la ruta

  return (
    <html lang="es">
      <body className='bg-black'>
        {/* Componente header para toda la app */}
        <Header />

        {/* Botón scroll para volver arriba si no quiere hacer scroll manual */}
        <ScrollToTopButton />

        {/* Si estamos en estado de carga, mostramos el loader */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Loader className="animate-spin text-blue-600" size={48} />
          </div>
        ) : (
          // El contenido principal solo se muestra cuando 'loading' es false despues de su carga
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
