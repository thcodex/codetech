import Link from 'next/link';
import { Code, Database, Palette, ArrowRight, ListOrdered, BrainCircuit, BookOpen, FolderOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 stagger-children">
      
      {/* Page Title & Subtitle */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">Conteúdos</span> <span className="text-purple-400/60 font-normal">+</span>
        </h1>
        <p className="text-[#8F95B2] text-[15px] font-medium">Acesse seus conteúdos disponíveis abaixo</p>
      </div>

      {/* 3 Main Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Module 1: Frontend */}
        <div className="rounded-[32px] bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] p-8 flex flex-col hover:bg-white/[0.04] hover:border-purple-500/30 transition-all shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] cursor-pointer group relative overflow-hidden">
          {/* Subtle mesh background on hover */}
          <div className="absolute top-0 right-0 w-full h-[200px] bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-[32px]" />
          
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-8 shadow-inner relative z-10">
            <Code className="w-6 h-6 text-[#A78BFA]" />
          </div>
          <h2 className="text-2xl font-bold mb-3 relative z-10 tracking-tight"><span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">Frontend</span></h2>
          <p className="text-[#8F95B2] text-sm leading-[1.7] mb-8 flex-1 relative z-10 font-medium">
            Aprenda a criar interfaces modernas e responsivas com React, HTML, CSS e JavaScript.
          </p>
          <Link href="/roadmaps" className="flex items-center justify-center w-full py-4 bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] rounded-2xl text-center text-white font-bold text-sm transition-all shadow-md active:scale-95 relative z-10 focus:outline-none focus:ring-1 focus:ring-purple-500 group/btn">
            Acessar módulo 
            <ArrowRight className="w-4 h-4 ml-2 opacity-80 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Module 2: Backend */}
        <div className="rounded-[32px] bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] p-8 flex flex-col hover:bg-white/[0.04] hover:border-blue-500/30 transition-all shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] cursor-pointer group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-[200px] bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-[32px]" />
          
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-8 shadow-inner relative z-10">
            <Database className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3 relative z-10 tracking-tight"><span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">Backend</span></h2>
          <p className="text-[#8F95B2] text-sm leading-[1.7] mb-8 flex-1 relative z-10 font-medium">
            Domine o desenvolvimento server-side com Node.js, APIs REST e bancos de dados.
          </p>
          <Link href="/roadmaps" className="flex items-center justify-center w-full py-4 bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] rounded-2xl text-center text-white font-bold text-sm transition-all shadow-md active:scale-95 relative z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 group/btn">
            Acessar módulo 
            <ArrowRight className="w-4 h-4 ml-2 opacity-80 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Module 3: UI/UX */}
        <div className="rounded-[32px] bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] p-8 flex flex-col hover:bg-white/[0.04] hover:border-pink-500/30 transition-all shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] cursor-pointer group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-[200px] bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-[32px]" />
          
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-8 shadow-inner relative z-10">
            <Palette className="w-6 h-6 text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3 relative z-10 tracking-tight"><span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-300">UI/UX Design</span></h2>
          <p className="text-[#8F95B2] text-sm leading-[1.7] mb-8 flex-1 relative z-10 font-medium">
            Desenvolva habilidades de design de interface e experiência do usuário com ferramentas modernas.
          </p>
          <Link href="/roadmaps" className="flex items-center justify-center w-full py-4 bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] rounded-2xl text-center text-white font-bold text-sm transition-all shadow-md active:scale-95 relative z-10 focus:outline-none focus:ring-1 focus:ring-pink-500 group/btn">
            Acessar módulo 
            <ArrowRight className="w-4 h-4 ml-2 opacity-80 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* 4 Bottom Strip Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        
        {/* Step 1 */}
        <div className="flex items-center justify-between rounded-3xl bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-[14px] bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/50 font-black group-hover:text-purple-400 group-hover:border-purple-500/30 transition-colors">
              1
            </div>
            <span className="text-[#8F95B2] group-hover:text-white font-bold text-[14px] leading-tight transition-colors">Siga a ordem<br/>dos módulos</span>
          </div>
          <ListOrdered className="w-5 h-5 text-white/20 group-hover:text-purple-400 transition-colors" />
        </div>

        {/* Step 2 */}
        <div className="flex items-center justify-between rounded-3xl bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-[14px] bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/50 font-black group-hover:text-purple-400 group-hover:border-purple-500/30 transition-colors">
              2
            </div>
            <span className="text-[#8F95B2] group-hover:text-white font-bold text-[14px] leading-tight transition-colors">Faça o Quizz</span>
          </div>
          <BrainCircuit className="w-5 h-5 text-white/20 group-hover:text-purple-400 transition-colors" />
        </div>

        {/* Step 3 */}
        <div className="flex items-center justify-between rounded-3xl bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-[14px] bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/50 font-black group-hover:text-purple-400 group-hover:border-purple-500/30 transition-colors">
              3
            </div>
            <span className="text-[#8F95B2] group-hover:text-white font-bold text-[14px] leading-tight transition-colors">Use o Glossário</span>
          </div>
          <BookOpen className="w-5 h-5 text-white/20 group-hover:text-purple-400 transition-colors" />
        </div>

        {/* Step 4 */}
        <div className="flex items-center justify-between rounded-3xl bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-[14px] bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/50 font-black group-hover:text-purple-400 group-hover:border-purple-500/30 transition-colors">
              4
            </div>
            <span className="text-[#8F95B2] group-hover:text-white font-bold text-[14px] leading-tight transition-colors">Organize<br/>seus projetos</span>
          </div>
          <FolderOpen className="w-5 h-5 text-white/20 group-hover:text-purple-400 transition-colors" />
        </div>

      </div>

    </div>
  );
}
