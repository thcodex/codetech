'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, LogOut, Menu, X, Bell, ChevronDown, Shield, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function TopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  const isAdmin = user?.role === 'admin';
  const initials = user?.name?.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'CT';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Conteúdos', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
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

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 pl-2 pr-2.5 py-1.5 rounded-[20px] border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all group cursor-pointer active:scale-95 shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-inner group-hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all relative overflow-hidden ring-1 ring-white/10 shrink-0">
                <span className="text-white text-[11px] font-bold tracking-wider relative z-10">{initials}</span>
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="flex flex-col items-start">
                <span className="text-white text-xs font-bold leading-tight group-hover:text-purple-200 transition-colors max-w-[120px] truncate">{user?.name || 'Usuário'}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold flex items-center gap-1">
                  {isAdmin ? (
                    <><Shield className="w-2.5 h-2.5 text-amber-400" /><span className="text-amber-400">Admin</span></>
                  ) : (
                    <><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)] animate-pulse shrink-0" /><span className="text-purple-400">Online</span></>
                  )}
                </span>
              </div>
              
              <ChevronDown className={`w-3.5 h-3.5 text-[#8F95B2] group-hover:text-purple-300 transition-all duration-300 shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#161927]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(139,92,246,0.1)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[60]">
                {/* User Info Header */}
                <div className="px-4 py-3.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center ring-2 ring-purple-500/20 shrink-0">
                      <span className="text-white text-xs font-bold tracking-wider">{initials}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-bold truncate">{user?.name || 'Usuário'}</p>
                      <p className="text-[#8F95B2] text-xs truncate">{user?.email || ''}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1.5">
                  <Link
                    href="/id-card"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-[#8F95B2] hover:text-white hover:bg-white/[0.05] transition-all group/item cursor-pointer"
                  >
                    <User className="w-4 h-4 group-hover/item:text-purple-400 transition-colors" />
                    <span className="text-sm font-medium">Meu Perfil</span>
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-white/[0.06] py-1.5">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 w-full text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-all group/item cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 group-hover/item:text-red-300 transition-colors" />
                    <span className="text-sm font-medium">Sair da plataforma</span>
                  </button>
                </div>
              </div>
            )}
          </div>
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
            <button 
              onClick={logout}
              className="flex items-center justify-center gap-3 w-full px-4 py-4 rounded-2xl bg-red-500/[0.08] hover:bg-red-500/[0.15] border border-red-500/20 hover:border-red-500/30 transition-all text-red-400 hover:text-red-300 text-base font-semibold shadow-md"
            >
              <LogOut className="w-5 h-5" />
              Sair da plataforma
            </button>
          </div>
        </div>
      )}
    </>
  );
}
