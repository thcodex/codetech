'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Play, ChevronLeft, Terminal, CheckCircle, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  initialCode: string;
}

export default function ChallengePage({ params }: { params: Promise<{ id: string, challengeId: string }> }) {
  const router = useRouter();
  const { id: roadmapId, challengeId } = use(params);

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [xpEarned, setXpEarned] = useState<number | null>(null);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchChallenge() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
        const res = await fetch(`${apiUrl}/challenges/${challengeId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch challenge');
        }
        const data = await res.json();
        setChallenge(data);
        setCode(data.initialCode || '// Escreva seu código aqui\n');
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchChallenge();
  }, [challengeId]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    setSuccess(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const res = await fetch(`${apiUrl}/challenges/${challengeId}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: 'javascript' }) // Hardcoded JS for now
      });
      const data = await res.json();
      
      if (data.error) {
        setOutput(data.error + '\n' + (data.details || ''));
        setSuccess(false);
      } else {
        const combinedOutput = (data.output || '') + (data.stderr || '');
        setOutput(combinedOutput || 'Executado com sucesso, mas sem saída no console.');
        setSuccess(data.success);

        // If execution was successful, register progress and award XP
        if (data.success && user?.id && !alreadyCompleted) {
          try {
            const progressRes = await fetch(`${apiUrl}/progress/complete`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: user.id, challengeId }),
            });
            const progressData = await progressRes.json();
            if (progressRes.ok) {
              setXpEarned(progressData.data?.xpGained || challenge?.xpReward || 0);
              setAlreadyCompleted(true);
            }
          } catch (progressError) {
            console.error('Erro ao registrar progresso:', progressError);
          }
        }
      }
    } catch (error: any) {
      setOutput(`Erro ao executar o código: ${error.message}`);
      setSuccess(false);
    } finally {
      setIsRunning(false);
    }
  };

  if (!challenge) {
    return <div className="text-white flex items-center justify-center p-20">Carregando desafio...</div>;
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 h-[calc(100vh-80px)] flex flex-col stagger-children">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => router.push(`/roadmaps/${roadmapId}`)}
          className="flex items-center text-[#8F95B2] hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Voltar ao Roadmap
        </button>
        <div className="flex items-center gap-4 text-sm">
          {xpEarned !== null && (
            <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-bold animate-in fade-in zoom-in duration-500">
              <Zap className="w-3.5 h-3.5" />
              +{xpEarned} XP Conquistado!
            </span>
          )}
          <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20 shadow-[0_0_10px_rgba(139,92,246,0.1)] font-bold">
            +{challenge.xpReward} XP
          </span>
          <button 
            onClick={handleRunCode}
            disabled={isRunning}
            className={`flex items-center px-6 py-2 rounded-xl border border-emerald-500/40 font-bold transition-all shadow-sm active:scale-[0.98] ${isRunning ? 'bg-emerald-500/20 text-emerald-300 cursor-not-allowed' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500'}`}
          >
            {isRunning ? 'Executando...' : <><Play className="w-4 h-4 mr-2" /> Executar Código</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
        {/* Left Side: Instructions */}
        <div className="bg-white/[0.02] backdrop-blur-xl rounded-[24px] border border-white/[0.08] p-8 relative overflow-hidden flex flex-col h-full shadow-2xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-purple-500/5 to-transparent opacity-100 pointer-events-none rounded-tr-[24px]" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 relative z-10 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-200 to-orange-400">{challenge.title}</span>
          </h1>
          <div className="text-[#8F95B2] text-[15px] leading-relaxed flex-1 overflow-y-auto relative z-10 pr-4 styled-scrollbar">
            <p className="mb-6">{challenge.description}</p>
            <div className="bg-white/[0.03] p-6 rounded-xl border border-white/[0.05]">
              <h3 className="font-bold mb-2"><span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-300">Instruções:</span></h3>
              <ul className="list-disc list-inside space-y-2 marker:text-purple-500 text-sm">
                <li>Escreva a solução utilizando JavaScript.</li>
                <li>Utilize <code>console.log()</code> para testar a saída.</li>
                <li>Quando estiver pronto, clique em <strong>Executar Código</strong>.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Editor and Console */}
        <div className="flex flex-col gap-6 h-full">
          {/* Editor */}
          <div className="flex-1 bg-black/40 backdrop-blur-md rounded-[24px] border border-white/[0.08] overflow-hidden shadow-2xl relative flex flex-col group">
             <div className="px-6 py-3 border-b border-white/[0.08] flex items-center bg-white/[0.02]">
               <div className="flex gap-2 mr-4">
                 <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/50"></div>
               </div>
               <span className="text-[#8F95B2] text-xs font-mono">solution.js</span>
             </div>
             <div className="flex-1 pt-4 pb-4 px-6 relative z-10 w-full h-full">
                <textarea 
                  className="w-full h-full bg-transparent text-gray-200 font-mono text-sm resize-none outline-none border-none styled-scrollbar leading-relaxed"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                  placeholder="// Escreva seu código aqui..."
                />
             </div>
          </div>

          {/* Console */}
          <div className="h-[250px] bg-black/60 backdrop-blur-xl rounded-[24px] border border-white/[0.08] overflow-hidden shadow-xl flex flex-col relative w-full">
             <div className="px-6 py-3 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
               <span className="text-[#8F95B2] text-xs font-mono uppercase tracking-widest font-bold flex items-center">
                 <Terminal className="w-3.5 h-3.5 mr-2" /> Console
               </span>
               {success === true && (
                 <span className="flex items-center text-emerald-400 text-xs font-bold uppercase tracking-wider">
                   <CheckCircle className="w-3.5 h-3.5 mr-1" /> Sucesso
                 </span>
               )}
             </div>
             <div className="flex-1 p-6 font-mono text-sm overflow-y-auto w-full relative">
                {!output && !isRunning && (
                  <div className="text-[#8F95B2]/50 italic text-sm text-center flex items-center justify-center h-full">
                    A saída do seu programa aparecerá aqui.
                  </div>
                )}
                {isRunning && (
                  <div className="text-purple-400 flex items-center animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span> Executando...
                  </div>
                )}
                {output && !isRunning && (
                  <pre className={`whitespace-pre-wrap ${success === false ? 'text-red-400' : 'text-gray-200'}`}>
                    {output}
                  </pre>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
