'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Code2, LogIn, Eye, EyeOff, Shield, User } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Erro ao fazer login.');
    }
  };

  // Quick fill helpers
  const fillAdmin = () => { setEmail('thiago@codetech.dev'); setPassword('admin123'); };
  const fillStudent = () => { setEmail(''); setPassword(''); };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#0A0B14]" />
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)] mb-6 border border-purple-400/20">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">Entrar no CodeTech</span>
          </h1>
          <p className="text-[#8F95B2] text-sm mt-2 font-medium">Acesse sua conta para continuar aprendendo</p>
        </div>

        {/* Login Form Card */}
        <div className="rounded-[28px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-gradient-to-bl from-purple-500/5 to-transparent pointer-events-none rounded-tr-[28px]" />
          
          {/* Quick Access Buttons */}
          <div className="flex gap-3 mb-6 relative z-10">
            <button
              type="button"
              onClick={fillAdmin}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider hover:bg-purple-500/20 transition-all active:scale-95"
            >
              <Shield className="w-3.5 h-3.5" /> Admin
            </button>
            <button
              type="button"
              onClick={fillStudent}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider hover:bg-blue-500/20 transition-all active:scale-95"
            >
              <User className="w-3.5 h-3.5" /> Aluno
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium relative z-10">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-widest">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm font-medium placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all hover:bg-white/[0.05]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-widest">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm font-medium placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all hover:bg-white/[0.05]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F95B2] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] active:scale-[0.98] border border-purple-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Entrar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center relative z-10">
            <p className="text-[#8F95B2] text-sm">
              Não tem conta?{' '}
              <Link href="/register" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
