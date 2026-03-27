import { notFound } from 'next/navigation';

interface RoadmapDetail {
  id: string;
  title: string;
  description: string;
  level: string;
  author: { id: string; name: string };
  challenges: {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    progress: any[];
  }[];
}

async function getRoadmap(id: string): Promise<RoadmapDetail | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
    const res = await fetch(`${apiUrl}/roadmaps/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch roadmap details');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    return null;
  }
}

import { ProgressButton } from '@/components/ui/ProgressButton';

export default async function RoadmapDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const roadmap = await getRoadmap(id);

  if (!roadmap) {
    notFound();
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 stagger-children">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Title, Content, and Download Card */}
        <div className="lg:col-span-8 flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-blue-400">{roadmap.title}</span>
            </h1>
            <div className="text-[#8F95B2] text-[15px] leading-[1.8] space-y-6">
              <p>
                {roadmap.description}
              </p>
              <p>
                Este módulo foi criado para fornecer uma base sólida nesses tópicos essenciais, 
                ajudando você a se tornar um profissional completo na área de tecnologia. 
                Aqui você aprenderá todas as propriedades e métodos fundamentais para garantir a escalabilidade 
                das suas aplicações seguindo os padrões do mercado.
              </p>
            </div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-xl rounded-[32px] border border-white/[0.08] p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-tr-[32px]" />
            <h3 className="text-xl font-bold mb-3 relative z-10 tracking-tight"><span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">Baixe o conteúdo do curso</span></h3>
            <p className="text-[#8F95B2] text-[15px] leading-relaxed mb-6 relative z-10 font-medium">
              Para acompanhar, baixe o conteúdo disponibilizado no link abaixo. Nele você encontrará os arquivos necessários para aprender, além do e-book em PDF com todo o conteúdo abordado no curso.
            </p>
            <a href="#" className="inline-flex items-center text-purple-400 hover:text-white font-bold text-sm transition-colors relative z-10 bg-purple-500/10 px-4 py-2 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40 shadow-sm">
              Acessar o PDF do material
            </a>
          </div>
        </div>

        {/* Right Column: Gamification / Extras & Certificate */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-[32px] border border-white/[0.08] p-8 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-tl-[32px]" />
             {/* Gamification Challenges tied to the platform logic */}
             {roadmap.challenges && roadmap.challenges.length > 0 && (
                <div className="relative z-10">
                  <h3 className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-[0.15em] mb-6 flex items-center justify-between">
                    <span>Desafios Gamificados</span>
                    <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded-md uppercase tracking-[0.15em] font-bold border border-purple-500/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]">Novo +XP</span>
                  </h3>
                  <div className="flex flex-col gap-3">
                    {roadmap.challenges.map((challenge) => (
                      <ProgressButton 
                        key={challenge.id} 
                        challengeId={challenge.id} 
                        roadmapId={roadmap.id}
                        userId={roadmap.author.id} 
                        title={`${challenge.title} (+${challenge.xpReward})`} 
                      />
                    ))}
                  </div>
                </div>
             )}
          </div>

          <div className="bg-white/[0.02] backdrop-blur-xl rounded-[32px] border border-white/[0.08] p-8 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-tr-[32px]" />
             <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-3 relative z-10"><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8F95B2] to-emerald-400">Certificado Oficial</span></h3>
             <p className="text-[#8F95B2] text-sm leading-relaxed mb-6 font-medium relative z-10">
               Gere seu certificado de conclusão para comprovar seu aprendizado.
             </p>
             <button className="w-full py-4 px-6 rounded-2xl text-center font-bold text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all shadow-sm active:scale-[0.98] relative z-10">
               Gerar certificado
             </button>
          </div>

        </div>

      </div>
    </div>
  );
}
