'use client';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/contexts/AuthContext';
import { TopNav } from '@/components/layout/topnav';

const publicRoutes = ['/login', '/register'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <AuthProvider>
      {!isPublicRoute && <TopNav />}
      {isPublicRoute ? (
        children
      ) : (
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col relative z-10 pt-10 px-8">
          {children}
        </main>
      )}
    </AuthProvider>
  );
}
