'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, User, MonitorPlay, FolderGit2, Map, BookDashed, MessageSquare, Menu, X, Triangle } from 'lucide-react';

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Conteúdos', href: '/', icon: BookOpen },
    { name: 'ID Card', href: '/id-card', icon: User },
    { name: 'Roadmap', href: '/roadmaps', icon: Map },
    { name: 'Glossário', href: '/glossario', icon: BookDashed },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#07050A]/80 backdrop-blur-2xl border-r border-white/[0.02] pt-8 pb-4 md:w-[260px]">
      <div className="px-8 mb-12 flex items-center justify-between group cursor-pointer">
        <Link href="/" className="flex items-center space-x-3 transition-transform group-hover:scale-[1.02]" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8b5cf6]/20 to-[#6d28d9]/20 flex items-center justify-center border border-[#8b5cf6]/30 shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
             <Triangle className="w-5 h-5 text-[#a78bfa] stroke-[2.5]" />
          </div>
          <span className="text-white font-bold tracking-tight text-lg drop-shadow-sm">CodeTech</span>
        </Link>
        {isOpen && (
          <button className="md:hidden text-gray-500 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-4 py-3 rounded-xl text-[13px] font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-[#8b5cf6]/10 text-[#e9d5ff] shadow-sm ring-1 ring-[#8b5cf6]/30'
                  : 'text-[#a1a1aa] hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon
                className={`w-[18px] h-[18px] mr-3 flex-shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[var(--background)] border-b border-[#1f1f2e] flex items-center justify-between px-4 h-16">
        <Triangle className="w-6 h-6 text-cyan-400 stroke-[2.5]" />
        <button onClick={() => setIsOpen(true)} className="text-[var(--muted)] hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className={className}>
        {content}
      </div>

      {/* Mobile Sidebar overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-[260px] w-full bg-[var(--background)] shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
