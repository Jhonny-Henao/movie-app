// app/layout.tsx
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import './globals.css';
import { Header } from '@/components/Header'; 

export const metadata = {
  title: 'ABC Movies',
  description: 'Tu plataforma de películas favorita',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* componente header para toda la app*/}
        <Header />
        {/* Boton scroll para volver arriba si no quiere hacer scroll manual  */}
        <ScrollToTopButton />
        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
