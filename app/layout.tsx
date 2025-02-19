import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Informações Agrometeorológicas - Triângulo Mineiro Sul',
  description: 'Sistema de vigilância agrometeorológica para o Triângulo Mineiro Sul, fornecendo dados climáticos em tempo real para otimização da produção agrícola.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Footer />
      </body>
    </html>
  );
}