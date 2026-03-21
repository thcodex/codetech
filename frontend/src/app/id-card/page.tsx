'use client';

import { useState } from 'react';
import { Triangle, QrCode, Fingerprint, Code2, Copy, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function IdCardPage() {
  const [formData, setFormData] = useState({
    nome: 'Thiago Ramos',
    cargo: 'Desenvolvedor Frontend',
    github: 'thcodex',
    linkedin: 'teagga',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const autoDescription = `Estou empolgado em anunciar que sou aluno do CodeTech do @${formData.linkedin || 'codetech'} 🚀\n\nO CodeTech é um ambiente que ensina desenvolvimento full stack seguindo as demandas do mercado 💻\n\nEstou ansioso para explorar mais o universo da programação. Venha fazer parte dessa jornada comigo!\n\n👉 Link da plataforma: https://${formData.github || 'github'}.com/codetech`;

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden items-center p-4 py-12 md:p-12 z-0">

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-purple-400 tracking-widest uppercase shadow-[0_0_20px_rgba(139,92,246,0.1)]">
            <Fingerprint className="w-3.5 h-3.5" />
            Badge de Acesso
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 tracking-tight">
            Seu ID CodeTech.
          </h1>
          <p className="text-[#8F95B2] text-lg max-w-xl mx-auto font-medium">
            Gere o seu crachá oficial de desenvolvedor, personalize seus dados e compartilhe sua jornada nas redes sociais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full animate-in fade-in zoom-in-95 duration-1000 delay-150">

          {/* Left: The Premium Visual Card */}
          <div className="lg:col-span-5 flex items-center justify-center relative group perspective">

            {/* Soft glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 rounded-[40px]" />

            {/* The Actual ID Card */}
            <div className="w-[340px] h-[520px] rounded-[32px] bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] flex flex-col relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transform-gpu transition-transform duration-700 group-hover:scale-[1.02]">

              {/* Top Glass Section (Cover Profile) */}
              <div className="h-64 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-transparent z-0" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#12131C] to-transparent z-10" />

                {/* Micro tech details overlay */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-mono">ID // 8892A-CT</span>
                </div>
                <div className="absolute top-6 right-6 z-20">
                  <QrCode className="w-6 h-6 text-white/40" />
                </div>

                {/* Avatar Hologram */}
                <div className="absolute bottom-6 left-8 z-20 flex items-end gap-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full" />
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/20 shadow-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-md">
                      <Triangle className="w-10 h-10 text-white fill-white/10" />
                      {/* Scanner line animation overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent h-full w-full animate-[scan_3s_ease-in-out_infinite]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="flex-1 px-8 pb-8 pt-4 flex flex-col bg-[#12131C]/60 z-10 relative">

                <h2 className="text-3xl font-bold text-white tracking-tight truncate filter drop-shadow hover:text-purple-300 transition-colors">
                  {formData.nome || 'Seu Nome'}
                </h2>
                <p className="text-[#8F95B2] text-sm font-medium mt-1 truncate">
                  {formData.cargo || 'Cargo'}
                </p>

                <div className="my-8 flex gap-6">
                  <div className="flex-1 space-y-1 group/item">
                    <p className="text-[10px] text-purple-400 font-bold uppercase tracking-[0.15em] mb-1 opacity-70 group-hover/item:opacity-100 transition-opacity">GitHub</p>
                    <div className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-white/50" />
                      <p className="text-sm text-white font-semibold truncate">@{formData.github || 'github'}</p>
                    </div>
                  </div>
                  <div className="w-[1px] h-full bg-white/10" />
                  <div className="flex-1 space-y-1 group/item">
                    <p className="text-[10px] text-purple-400 font-bold uppercase tracking-[0.15em] mb-1 opacity-70 group-hover/item:opacity-100 transition-opacity">LinkedIn</p>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 bg-white/50 rounded-[2px]" />
                      <p className="text-sm text-white font-semibold truncate">{formData.linkedin || 'linkedin'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-xl text-center backdrop-blur-sm">
                  <p className="text-[11px] text-[#A1A5B7] font-mono tracking-widest">{formData.github || 'hub'}.codetech.app</p>
                </div>
              </div>

              {/* Techy Border Glow */}
              <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50" />
              <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />

            </div>
          </div>

          {/* Right: Modern Premium Form (Bento Style) */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            <div className="bg-[#161822]/40 backdrop-blur-xl rounded-[32px] border border-white/[0.05] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Subtle mesh background on form */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-purple-500/5 to-transparent pointer-events-none rounded-bl-full" />

              <form className="space-y-6 relative z-10">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">Nome COMPLETO</label>
                    <Input
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className="bg-white/[0.02] border-white/[0.08] text-white focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 h-12 rounded-2xl placeholder:text-white/20 transition-all hover:bg-white/[0.04]"
                    />
                  </div>

                  {/* Cargo */}
                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">TÍTULO / CARGO</label>
                    <Input
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      className="bg-white/[0.02] border-white/[0.08] text-white focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 h-12 rounded-2xl placeholder:text-white/20 transition-all hover:bg-white/[0.04]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* GitHub */}
                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">Usuário GitHub</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-bold">@</span>
                      <Input
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="pl-9 bg-white/[0.02] border-white/[0.08] text-white focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 h-12 rounded-2xl placeholder:text-white/20 transition-all hover:bg-white/[0.04]"
                      />
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-2 group">
                    <label className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">Usuário LinkedIn</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-bold">in/</span>
                      <Input
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="pl-10 bg-white/[0.02] border-white/[0.08] text-white focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 h-12 rounded-2xl placeholder:text-white/20 transition-all hover:bg-white/[0.04]"
                      />
                    </div>
                  </div>
                </div>

                {/* Textarea */}
                <div className="space-y-2 pt-4 group">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">Texto Sugerido (Postar)</label>
                    <span className="text-xs text-purple-400/50">Auto-gerado</span>
                  </div>
                  <textarea
                    readOnly
                    value={autoDescription}
                    className="w-full h-32 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-sm text-[white] font-medium p-5 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 resize-none leading-relaxed transition-all hover:bg-white/[0.04] scrollbar-thin scrollbar-thumb-white/10"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(autoDescription);
                      // Adicione um toast system se quiser, usando alert por enquanto
                      alert('Descrição copiada para a área de transferência!');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar Capiton
                  </button>

                  <button
                    type="button"
                    onClick={() => alert('Download final requer biblioteca html-to-image/html2canvas!')}
                    className="flex-[1.5] flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-[1.02] active:scale-95 border border-purple-400/20"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Baixar Crachá Premium
                  </button>
                </div>

              </form>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
