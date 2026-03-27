'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle2, Code2 } from 'lucide-react';

interface ProgressButtonProps {
  challengeId: string;
  roadmapId: string;
  userId: string;
  title: string;
  isCompletedInitial?: boolean;
}

export function ProgressButton({ challengeId, roadmapId, userId, title, isCompletedInitial = false }: ProgressButtonProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(isCompletedInitial);

  const handleNavigate = () => {
    router.push(`/roadmaps/${roadmapId}/challenges/${challengeId}`);
  };

  return (
    <div className="relative w-full">
      {/* Button */}
      <button 
        onClick={handleNavigate} 
        className={`w-full py-2.5 px-4 rounded-xl text-center font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-offset-2 focus:ring-offset-[#13131A] ${
          isCompleted 
            ? 'bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/30' 
            : 'bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]'
        }`}
      >
        <div className="flex items-center justify-center">
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4 mr-2" />
          ) : (
            <Code2 className="w-4 h-4 mr-2" />
          )}
          {title}
        </div>
      </button>
    </div>
  );
}
