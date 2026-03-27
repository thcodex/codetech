import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeTech Platform',
  description: 'Gerenciador de Roadmaps e Plataforma Educacional',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#0F111A] flex flex-col text-gray-100 overflow-x-hidden selection:bg-[#8b5cf6]/30 selection:text-white relative`}>
        
        {/* Global Premium Glassmorphic Background Elements */}
        <div className="fixed top-[10%] left-[15%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="fixed bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="fixed top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none -z-10" />

        <AppShell>{children}</AppShell>

      </body>
    </html>
  );
}
