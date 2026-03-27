'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, Flame, Target, Trophy, Zap, 
  ChevronLeft, Calendar, BarChart3, Star
} from 'lucide-react';

interface DashboardData {
  user: {
    name: string;
    level: number;
    totalXp: number;
    xpToNextLevel: number;
    levelProgress: number;
  };
  weekly: {
    totalXp: number;
    totalChallenges: number;
    activeDays: number;
    dailyXp: { day: string; date: string; xp: number; challenges: number }[];
  };
  today: {
    xp: number;
    challenges: number;
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
        // First get users to find the current user
        const usersRes = await fetch(`${apiUrl}/roadmaps`);
        const roadmaps = await usersRes.json();
        
        if (roadmaps && roadmaps.length > 0) {
          const userId = roadmaps[0].authorId;
          const res = await fetch(`${apiUrl}/dashboard/${userId}`);
          if (res.ok) {
            const dashboardData = await res.json();
            setData(dashboardData);
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-20">
        <div className="text-[#8F95B2] text-sm animate-pulse">Carregando dashboard...</div>
      </div>
    );
  }

  // Defaults if no data
  const maxXp = data ? Math.max(...data.weekly.dailyXp.map(d => d.xp), 1) : 1;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 space-y-8 stagger-children">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center text-[#8F95B2] hover:text-white transition-colors text-sm font-medium mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-400">Dashboard de Progresso</span>
          </h1>
          <p className="text-[#8F95B2] text-sm mt-2 font-medium">Acompanhe sua evolução semanal e os XP dos desafios.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-[#8F95B2]">
          <Calendar className="w-4 h-4" />
          Últimos 7 dias
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Stat 1: Total XP */}
        <div className="rounded-[24px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-6 relative overflow-hidden group hover:border-purple-500/30 transition-all">
          <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-[24px]" />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{data?.user.totalXp ?? 0}</p>
          <p className="text-[#8F95B2] text-[11px] uppercase tracking-widest font-bold mt-1">XP Total</p>
        </div>

        {/* Stat 2: Level */}
        <div className="rounded-[24px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-[24px]" />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">Nível {data?.user.level ?? 1}</p>
          <p className="text-[#8F95B2] text-[11px] uppercase tracking-widest font-bold mt-1">{data?.user.xpToNextLevel ?? 100} XP p/ próximo</p>
        </div>

        {/* Stat 3: Weekly XP */}
        <div className="rounded-[24px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-[24px]" />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{data?.weekly.totalXp ?? 0}</p>
          <p className="text-[#8F95B2] text-[11px] uppercase tracking-widest font-bold mt-1">XP Semanal</p>
        </div>

        {/* Stat 4: Today XP */}
        <div className="rounded-[24px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-6 relative overflow-hidden group hover:border-amber-500/30 transition-all">
          <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-[24px]" />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{data?.today.xp ?? 0}</p>
          <p className="text-[#8F95B2] text-[11px] uppercase tracking-widest font-bold mt-1">XP Hoje</p>
        </div>
      </div>

      {/* Main Content: Chart + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Bar Chart */}
        <div className="lg:col-span-2 rounded-[28px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-tl-[28px]" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">Progresso Semanal</span>
              </h2>
              <p className="text-[#8F95B2] text-xs mt-1">{data?.weekly.totalChallenges ?? 0} desafios completados esta semana</p>
            </div>
            <div className="bg-purple-500/10 text-purple-400 text-[10px] px-3 py-1 rounded-lg uppercase tracking-widest font-bold border border-purple-500/20">
              {data?.weekly.activeDays ?? 0}/7 dias ativos
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-3 h-[200px] relative z-10">
            {data?.weekly.dailyXp.map((day, i) => {
              const height = maxXp > 0 ? (day.xp / maxXp) * 100 : 0;
              const isToday = i === (data?.weekly.dailyXp.length ?? 1) - 1;
              return (
                <div key={day.date} className="flex flex-col items-center flex-1 h-full justify-end group/bar">
                  {/* XP Label */}
                  <span className={`text-[10px] font-bold mb-2 transition-colors ${day.xp > 0 ? 'text-purple-400' : 'text-[#8F95B2]/30'}`}>
                    {day.xp > 0 ? `+${day.xp}` : '0'}
                  </span>
                  {/* Bar */}
                  <div 
                    className={`w-full max-w-[60px] rounded-xl transition-all duration-500 relative ${
                      isToday 
                        ? 'bg-gradient-to-t from-purple-600 to-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                        : day.xp > 0 
                          ? 'bg-gradient-to-t from-purple-600/40 to-purple-400/40' 
                          : 'bg-white/[0.03]'
                    }`}
                    style={{ height: `${Math.max(height, 8)}%` }}
                  >
                    {isToday && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    )}
                  </div>
                  {/* Day Label */}
                  <span className={`text-[11px] font-bold mt-3 uppercase tracking-wider ${isToday ? 'text-purple-400' : 'text-[#8F95B2]/60'}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Level Progress + Stats */}
        <div className="flex flex-col gap-6">
          
          {/* Level Progress Card */}
          <div className="rounded-[28px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-tr-[28px]" />
            <h3 className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-[0.15em] mb-4 relative z-10 flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-emerald-400" /> Progresso do Nível
            </h3>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold text-sm">Nível {data?.user.level ?? 1}</span>
                <span className="text-[#8F95B2] text-xs font-medium">{data?.user.levelProgress ?? 0}/100 XP</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-white/[0.05] border border-white/[0.08] overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  style={{ width: `${data?.user.levelProgress ?? 0}%` }}
                />
              </div>
              <p className="text-[#8F95B2] text-[11px] mt-3 font-medium">
                Faltam <span className="text-emerald-400 font-bold">{data?.user.xpToNextLevel ?? 100} XP</span> para o próximo nível
              </p>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="rounded-[28px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-tl-[28px]" />
            <h3 className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-[0.15em] mb-6 relative z-10 flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-blue-400" /> Resumo da Semana
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[#8F95B2] text-sm font-medium">Desafios feitos</span>
                <span className="text-white font-bold">{data?.weekly.totalChallenges ?? 0}</span>
              </div>
              <div className="w-full h-[1px] bg-white/[0.05]" />
              <div className="flex items-center justify-between">
                <span className="text-[#8F95B2] text-sm font-medium">Dias ativos</span>
                <span className="text-white font-bold">{data?.weekly.activeDays ?? 0} de 7</span>
              </div>
              <div className="w-full h-[1px] bg-white/[0.05]" />
              <div className="flex items-center justify-between">
                <span className="text-[#8F95B2] text-sm font-medium">Média diária</span>
                <span className="text-white font-bold">
                  {data?.weekly.activeDays ? Math.round(data.weekly.totalXp / data.weekly.activeDays) : 0} XP
                </span>
              </div>
              <div className="w-full h-[1px] bg-white/[0.05]" />
              <div className="flex items-center justify-between">
                <span className="text-[#8F95B2] text-sm font-medium">XP Hoje</span>
                <span className="text-amber-400 font-bold">{data?.today.xp ?? 0} XP</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
