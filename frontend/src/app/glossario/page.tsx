'use client';

import { useState } from 'react';
import { Search, BookA, Bookmark } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

const terms: GlossaryTerm[] = [
  { term: "API", definition: "Application Programming Interface. Um conjunto de regras que permite que diferentes softwares se comuniquem entre si.", category: "Backend" },
  { term: "DOM", definition: "Document Object Model. Uma representação estruturada do documento HTML como uma árvore de nós, permitindo manipulação via JavaScript.", category: "Frontend" },
  { term: "JSON", definition: "JavaScript Object Notation. Um formato leve de troca de dados, fácil de ler e escrever para humanos e máquinas.", category: "Dados" },
  { term: "REST", definition: "Representational State Transfer. Um estilo arquitetural para projetar sistemas distribuídos baseados em rede.", category: "Backend" },
  { term: "JWT", definition: "JSON Web Token. Um padrão aberto para transmitir informações de forma segura entre partes como um objeto JSON.", category: "Segurança" },
  { term: "CI/CD", definition: "Integração Contínua e Entrega Contínua. Práticas de desenvolvimento para entregar código com mais rapidez e confiabilidade.", category: "DevOps" },
  { term: "Framework", definition: "Uma estrutura de software estruturada e padronizada que fornece funcionalidades essenciais para agilizar o desenvolvimento de aplicações.", category: "Geral" },
  { term: "Library (Biblioteca)", definition: "Um conjunto de códigos pré-escritos que os desenvolvedores podem usar para realizar tarefas específicas (ex: React).", category: "Geral" },
  { term: "Webhook", definition: "Uma forma de receber dados em tempo real entre duas aplicações da web através de callbacks HTTP.", category: "Backend" },
  { term: "Agile", definition: "Um conjunto de metodologias de desenvolvimento de software baseadas no desenvolvimento iterativo e incremental.", category: "Metodologia" },
  { term: "Middleware", definition: "Software que atua como uma ponte entre o sistema operacional e os aplicativos ou bancos de dados.", category: "Backend" },
  { term: "TypeScript", definition: "Um superconjunto sintático estrito de JavaScript que adiciona tipagem estática opcional à linguagem.", category: "Linguagem" },
  { term: "GraphQL", definition: "Uma linguagem de consulta de dados para APIs que permite ao cliente pedir exatamente o que precisa.", category: "Backend" },
  { term: "Docker", definition: "Uma plataforma de ecossistema aberto para desenvolver, enviar e executar aplicações dentro de contêineres.", category: "DevOps" },
  { term: "React", definition: "Uma biblioteca JavaScript de código aberto para criar interfaces de usuário dinâmicas e baseadas em componentes.", category: "Frontend" }
];

export default function GlossarioPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', ...Array.from(new Set(terms.map(t => t.category))).sort()];

  const filteredTerms = terms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm flex items-center gap-3">
            <BookA className="w-10 h-10 text-purple-400" />
            Glossário Tech
          </h1>
          <p className="mt-4 text-[#8F95B2] font-medium leading-relaxed max-w-2xl">
            Um dicionário completo de termos técnicos e jargões da programação focado em simplificar o seu aprendizado de forma rápida e precisa.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8 items-start sm:items-center">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8F95B2] group-focus-within:text-purple-400 transition-colors" />
          <Input 
            placeholder="Buscar por termo ou conceito..." 
            className="pl-12 h-14 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.08] text-white text-base focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 font-medium placeholder:text-[#8F95B2]/70 transition-all hover:bg-white/[0.04]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Categories Badges */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border uppercase tracking-wider ${
                activeCategory === cat 
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
                  : 'bg-white/[0.02] border-white/[0.05] text-[#8F95B2] hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredTerms.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 md:p-24 text-center bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] border-dashed rounded-[32px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
          <div className="w-16 h-16 bg-white/[0.05] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative z-10">
            <Search className="w-8 h-8 text-[#8F95B2]" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white relative z-10">Termo não encontrado</h3>
          <p className="text-[#8F95B2] max-w-md relative z-10">
            Não encontramos nenhum termo correspondente a &quot;{searchTerm}&quot; nesta categoria. Tente usar palavras-chave diferentes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col justify-between h-full bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] hover:bg-white/[0.04] hover:border-purple-500/30 transition-all shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-[32px] group relative overflow-hidden p-8"
            >
              {/* Subtle mesh hover */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gradient-to-bl from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-tr-[32px]" />
              
              <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold border border-white/10 uppercase tracking-[0.15em] bg-white/[0.03] text-[#8F95B2] backdrop-blur-sm shadow-sm group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors">
                    {item.category}
                  </span>
                  <Bookmark className="w-5 h-5 text-white/10 group-hover:text-purple-400 transition-colors" />
                </div>

                <h3 className="text-2xl font-bold leading-tight text-white group-hover:text-purple-300 transition-colors tracking-tight drop-shadow-sm mb-4">
                  {item.term}
                </h3>
               
                <p className="text-sm text-[#8F95B2] leading-[1.8] font-medium">
                  {item.definition}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
