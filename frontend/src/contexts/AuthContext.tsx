'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  idCard?: {
    id: string;
    studentName: string;
    matricula: string;
    level: number;
    xp: number;
  };
}

interface AuthContextType {
  user: UserData | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
  getAuthHeaders: () => Record<string, string>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Load user and token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('codetech_user');
    const storedToken = localStorage.getItem('codetech_token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('codetech_user');
        localStorage.removeItem('codetech_token');
      }
    }
    setIsLoading(false);
  }, []);

  // Redirect to login if not authenticated (except on public routes)
  useEffect(() => {
    if (isLoading) return;
    const publicRoutes = ['/login', '/register', '/'];
    if (!user && !publicRoutes.includes(pathname)) {
      router.push('/login');
    }
  }, [user, isLoading, pathname, router]);

  // Helper to get auth headers for API calls
  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('codetech_token');
    if (token) {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
    }
    return { 'Content-Type': 'application/json' };
  };

  const refreshUserData = async () => {
    if (!user?.id) return;
    try {
      // Re-fetch user data via dashboard endpoint to get updated XP/Level
      const res = await fetch(`${API_URL}/dashboard/${user.id}`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        // Update user context with new XP and Level
        const updatedUser = {
          ...user,
          idCard: {
            ...user.idCard,
            level: data.user.level,
            xp: data.user.totalXp,
          }
        };
        setUser(updatedUser as UserData);
        localStorage.setItem('codetech_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Erro ao fazer login.' };
      }
      // API now returns { token, user: { ... } }
      const userData = data.user;
      const token = data.token;
      setUser(userData);
      localStorage.setItem('codetech_user', JSON.stringify(userData));
      localStorage.setItem('codetech_token', token);
      return { success: true };
    } catch {
      return { success: false, error: 'Erro de conexão com o servidor.' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Erro ao registrar.' };
      }
      // API now returns { token, user: { ... } }
      const userData = data.user;
      const token = data.token;
      setUser(userData);
      localStorage.setItem('codetech_user', JSON.stringify(userData));
      localStorage.setItem('codetech_token', token);
      return { success: true };
    } catch {
      return { success: false, error: 'Erro de conexão com o servidor.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('codetech_user');
    localStorage.removeItem('codetech_token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, getAuthHeaders, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export { API_URL };
