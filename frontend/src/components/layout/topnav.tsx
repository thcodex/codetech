'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, LogOut, Menu, X, Bell, ChevronDown } from 'lucide-react';

export function TopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Conteúdos', href: '/' },
    { name: 'ID Card', href: '/id-card' },
    { name: 'Roadmap', href: '/roadmaps' },
    { name: 'Glossário', href: '/glossario' },
  ];

  return (
    <>
      <nav className="w-full h-20 bg-[#0F111A]/40 backdrop-blur-2xl border-b border-white/[0.08] flex items-center justify-between px-6 md:px-8 sticky top-0 z-50">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative overflow-hidden" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all duration-300 relative z-10 border border-purple-400/20">
            <Code2 className="w-6 h-6 text-white group-hover:rotate-[15deg] transition-transform duration-500" />
            
            {/* Logo shine effect sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:animate-shine rounded-2xl" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400 tracking-tight group-hover:text-white transition-all">CodeTech</span>
        </Link>

        {/* Desktop Center Links (Pill Style) */}
        <div className="hidden md:flex items-center gap-1.5 bg-white/[0.01] p-1.5 rounded-3xl border border-white/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-5 py-2 text-[13px] uppercase tracking-wider font-bold rounded-2xl transition-all duration-400 group/link overflow-hidden ${
                  isActive ? 'text-white' : 'text-[#8F95B2] hover:text-white'
                }`}
              >
                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-white/[0.08] rounded-2xl border border-white/10 pointer-events-none transition-all duration-500" />
                    <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                  </>
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/[0.04] rounded-2xl opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}
                <span className={`relative z-10 transition-transform duration-300 inline-block ${isActive ? 'scale-105 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'group-hover/link:scale-105'}`}>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-5">
          {/* Notification Bell */}
          <button className="relative p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.08] hover:border-purple-500/30 transition-all group hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] active:scale-95 cursor-pointer">
            <Bell className="w-5 h-5 text-[#8F95B2] group-hover:text-purple-300 transition-colors" />
            <span className="absolute top-2 right-2.5 w-[7px] h-[7px] rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse border-2 border-[#0F111A]" />
          </button>

          {/* User Profile Dropdown Pill */}
          <button className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-[20px] border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all group cursor-pointer active:scale-95 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-inner group-hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all relative overflow-hidden ring-1 ring-white/10">
              <span className="text-white text-[11px] font-bold tracking-wider relative z-10">TH</span>
              {/* Avatar hover animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="flex flex-col items-start pr-1">
              <span className="text-white text-xs font-bold leading-tight group-hover:text-purple-200 transition-colors">Thiago Silva</span>
              <span className="text-purple-400 text-[9px] uppercase tracking-[0.2em] font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)] animate-pulse" />
                Online
              </span>
            </div>
            
            <div className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border group-hover:border-purple-500/30 transition-all">
              <ChevronDown className="w-3.5 h-3.5 text-[#8F95B2] group-hover:text-purple-300 transition-all duration-300 group-hover:rotate-180" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-20 z-40 bg-[#0F111A]/95 backdrop-blur-3xl border-t border-white/[0.08] flex flex-col px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-semibold py-3 border-b border-white/[0.05] transition-colors ${
                    isActive ? 'text-[#A78BFA]' : 'text-[#8F95B2] hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <button className="flex items-center justify-center gap-3 w-full px-4 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-all text-white text-base font-semibold shadow-md">
              <LogOut className="w-5 h-5 opacity-70 rotate-180" />
              Sair da plataforma
            </button>
          </div>
        </div>
      )}
    </>
  );
}
