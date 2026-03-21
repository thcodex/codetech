'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface ProgressButtonProps {
  challengeId: string;
  userId: string;
  title: string;
  isCompletedInitial?: boolean;
}

export function ProgressButton({ challengeId, userId, title, isCompletedInitial = false }: ProgressButtonProps) {
  const [isCompleted, setIsCompleted] = useState(isCompletedInitial);
  const [loading, setLoading] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  const handleComplete = async () => {
    if (isCompleted || loading) return;

    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const res = await fetch(`${apiUrl}/progress/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, challengeId }),
      });

      if (!res.ok) {
        throw new Error('Falha ao registrar progresso');
      }

      const responseData = await res.json();
      setIsCompleted(true);
      
      // If XP or Level Up, trigger celebration animation
      if (responseData.data) {
        setXpGained(responseData.data.xpGained);
        
        if (responseData.data.leveledUp) {
          setShowLevelUp(true);
          setTimeout(() => setShowLevelUp(false), 5000);
        } else {
          setShowLevelUp(true);
          setTimeout(() => setShowLevelUp(false), 2000);
        }
      }

    } catch (error) {
      console.error(error);
      alert('Erro ao completar desafio. Você pode já ter concluído ou o servidor está fora do ar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Celebration Toast/Popover */}
      {showLevelUp && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max animate-in slide-in-from-bottom-2 fade-in duration-300 z-50">
          <div className="bg-[#8b5cf6] text-white rounded-xl shadow-2xl px-4 py-2 flex items-center gap-3 border border-indigo-400/30">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <div>
              <p className="text-sm font-bold">+{xpGained} XP Adquirido!</p>
              {xpGained >= 100 && <p className="text-[10px] uppercase font-black tracking-wider text-indigo-200">Level UP Reaching!</p>}
            </div>
          </div>
          <div className="w-3 h-3 bg-[#8b5cf6] rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      )}

      {/* Button */}
      <button 
        onClick={handleComplete} 
        disabled={isCompleted || loading}
        className={`w-full py-2.5 px-4 rounded-xl text-center font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-offset-2 focus:ring-offset-[#13131A] ${
          isCompleted 
            ? 'bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30 cursor-not-allowed' 
            : 'bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]'
        }`}
      >
        <div className="flex items-center justify-center">
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : isCompleted ? (
            <CheckCircle2 className="w-4 h-4 mr-2" />
          ) : null}
          {title}
        </div>
      </button>
    </div>
  );
}
