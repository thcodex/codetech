'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Map as MapIcon, Calendar, User, Plus, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Roadmap {
  id: string;
  title: string;
  description: string;
  level: string;
  author: { name: string };
  contents?: any[];
}

export function RoadmapsClient({ initialRoadmaps }: { initialRoadmaps: Roadmap[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('Todos');
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const filteredRoadmaps = initialRoadmaps.filter((roadmap) => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          roadmap.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'Todos' || roadmap.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 stagger-children">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm"><span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-blue-400">Roadmaps</span></h1>
          <p className="mt-2 text-[#8F95B2] font-medium">Trilhas de estudos criadas pela comunidade para o seu desenvolvimento.</p>
        </div>
        {isAdmin && (
          <Link href="/roadmaps/novo">
            <Button size="lg" className="gap-2 bg-white/[0.05] hover:bg-white/[0.1] hover:border-purple-500/50 text-white border border-white/10 shadow-lg font-semibold rounded-2xl transition-all">
              <Plus className="w-5 h-5" />
              Create Roadmap
            </Button>
          </Link>
        )}
      </div>

      {/* Toolbar (Search & Filter) */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8F95B2] group-focus-within:text-purple-400 transition-colors" />
          <Input 
            placeholder="Buscar por título ou descrição..." 
            className="pl-11 h-12 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.08] text-white focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 font-medium placeholder:text-[#8F95B2]/70 transition-all hover:bg-white/[0.04]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-56 relative group">
          <select 
            className="appearance-none flex h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all text-white font-medium cursor-pointer hover:bg-white/[0.04]"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="Todos">Todos os Níveis</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
            <option value="Especialista">Especialista</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8F95B2]">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredRoadmaps.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 md:p-24 text-center bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] border-dashed rounded-[32px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
          <div className="w-16 h-16 bg-white/[0.05] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative z-10">
            <MapIcon className="w-8 h-8 text-[#8F95B2]" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white relative z-10">Nenhum Mapa Encontrado</h3>
          <p className="text-[#8F95B2] max-w-md mb-8 relative z-10">
            Não encontramos nenhum roteiro com os filtros atuais. Que tal criar o seu primeiro?
          </p>
          <Link href="/roadmaps/novo" className="relative z-10">
            <Button variant="outline" className="h-12 border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1] hover:border-purple-500/30 rounded-2xl font-semibold transition-all shadow-md">
              Criar meu primeiro roteiro
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap) => {
            // Badge color based on level
            let badgeColors = "bg-gray-500/10 text-gray-400 border-gray-500/20";
            if (roadmap.level === 'Iniciante') badgeColors = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            if (roadmap.level === 'Intermediário') badgeColors = "bg-blue-500/10 text-blue-400 border-blue-500/20";
            if (roadmap.level === 'Avançado') badgeColors = "bg-amber-500/10 text-amber-500 border-amber-500/20";
            if (roadmap.level === 'Especialista') badgeColors = "bg-red-500/10 text-red-500 border-red-500/20";

            // Mock progress for visual prototype
            const progress: number = roadmap.title.length % 2 === 0 ? 45 : roadmap.title.length % 3 === 0 ? 100 : 0; 

            return (
              <Link key={roadmap.id} href={`/roadmaps/${roadmap.id}`} className="block h-full outline-none focus-visible:ring-1 focus-visible:ring-purple-500 rounded-3xl group/card">
                <Card className="flex flex-col justify-between h-full bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] hover:bg-white/[0.04] hover:border-purple-500/30 transition-all shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-[32px] group relative overflow-hidden">
                  
                  {/* Subtle mesh hover */}
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-tr-[32px]" />

                  <div className="relative z-10">
                    {/* Top Progress Bar indicator */}
                    <div className="w-full h-[3px] bg-white/[0.05] rounded-t-[32px] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
                    </div>
                    
                    <CardHeader className="pb-4 pt-6 px-8">
                      <div className="flex justify-between items-start mb-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-[0.15em] ${badgeColors} backdrop-blur-sm`}>
                          {roadmap.level}
                        </span>
                        
                        {/* Status tag */}
                        {progress === 100 ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-[0.15em] backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                            Concluído
                          </span>
                        ) : progress > 0 ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-[0.15em] gap-1.5 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                             <Target className="w-3 h-3" /> Em Andamento
                          </span>
                        ) : null}
                      </div>

                      <h3 className="text-2xl font-bold leading-tight text-white group-hover:text-purple-300 transition-colors line-clamp-2 tracking-tight drop-shadow-sm">
                        {roadmap.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="px-8 flex-1">
                      <p className="text-sm text-[#8F95B2] line-clamp-3 leading-[1.7] font-medium">
                        {roadmap.description}
                      </p>
                    </CardContent>
                  </div>
                  <CardFooter className="px-8 pt-5 pb-6 border-t border-white/[0.05] bg-white/[0.01] flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      {/* Generative Avatar */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#4c1d95] flex items-center justify-center text-white text-xs font-bold uppercase ring-2 ring-[#0F111A]">
                        {roadmap.author.name.substring(0, 2)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white truncate max-w-[120px]">{roadmap.author.name}</span>
                        <span className="text-[10px] text-[#8F95B2] uppercase tracking-wider font-semibold">Criador</span>
                      </div>
                    </div>

                    {/* Doughnut visualization or simple counter */}
                    <div className="flex items-center justify-center relative w-10 h-10 group-hover:scale-110 transition-transform duration-500">
                       <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-white/10"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          <path
                            className="text-purple-400 transition-all duration-1000 ease-out shadow-[0_0_10px_#8b5cf6]"
                            strokeDasharray={`${progress}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#purple_gradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="purple_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span className="absolute text-[9px] font-bold text-white tracking-wider">{progress}%</span>
                    </div>

                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
