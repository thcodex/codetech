'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Loader2, Map } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, { message: 'O título deve ter no mínimo 5 caracteres.' }),
  description: z.string().min(15, { message: 'A descrição detalhada é obrigatória (mínimo 15 caracteres).' }),
  level: z.enum(['Iniciante', 'Intermediário', 'Avançado', 'Especialista']),
});

type FormValues = z.infer<typeof formSchema>;

export default function NovoRoadmap() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      level: 'Iniciante',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitError('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const res = await fetch(`${apiUrl}/roadmaps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Falha de conexão com a API ao tentar salvar o Roadmap.');
      }

      router.push('/roadmaps');
      router.refresh(); // Refresh Next.js server components cache
    } catch (err: any) {
      setSubmitError(err.message || 'Ocorreu um erro desconhecido.');
    }
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Top action bar */}
      <div className="flex items-center">
        <Link href="/roadmaps">
          <Button variant="ghost" className="text-[#8F95B2] hover:text-white hover:bg-[#232738]/50 group rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-xl flex items-center justify-center mb-4">
          <Map className="w-6 h-6 text-[#A78BFA]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Criar Novo Roadmap</h1>
        <p className="mt-2 text-[#8F95B2]">Defina as etapas e os detalhes do novo guia de estudo em tecnologia.</p>
      </div>

      <Card className="max-w-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-[32px] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-tr-[32px]" />
        
        <div className="relative z-10">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-2xl font-bold text-white tracking-tight">Detalhes do Roteiro</CardTitle>
            <CardDescription className="text-[#8F95B2] font-medium mt-1">
              Preencha as informações básicas. Certifique-se de que o título e a descrição são claros para os alunos.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
          
          {submitError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-medium">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Title */}
            <div className="space-y-2 group/input">
              <label htmlFor="title" className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-[0.15em] group-focus-within/input:text-purple-400 transition-colors">
                Título da Trilha
              </label>
              <Input
                id="title"
                placeholder="Ex: Formação Frontend Advanced 2026"
                {...register('title')}
                className={`h-12 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-white focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 placeholder:text-white/20 transition-all hover:bg-white/[0.04] ${errors.title ? 'border-red-500/50 focus-visible:ring-red-500' : ''}`}
              />
              {errors.title && (
                <p className="text-sm text-red-400 mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 group/input">
              <label htmlFor="description" className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-[0.15em] group-focus-within/input:text-purple-400 transition-colors">
                Descrição Completa
              </label>
              <textarea
                id="description"
                rows={5}
                {...register('description')}
                className={`flex w-full rounded-2xl border bg-white/[0.02] px-4 py-3 text-sm text-white focus-visible:outline-none focus:ring-1 transition-all resize-none placeholder:text-white/20 min-h-[140px] hover:bg-white/[0.04] scrollbar-thin scrollbar-thumb-white/10 ${
                  errors.description 
                    ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500' 
                    : 'border-white/[0.08] focus:border-purple-500 focus:ring-purple-500'
                }`}
                placeholder="Exiba um resumo das stacks, objetivos e resultados esperados desta trilha selecionada..."
              />
              {errors.description && (
                <p className="text-sm text-red-400 mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Level */}
            <div className="space-y-2 group/input">
              <label htmlFor="level" className="text-[11px] font-bold text-[#8F95B2] uppercase tracking-[0.15em] group-focus-within/input:text-purple-400 transition-colors">
                Nível de Dificuldade
              </label>
              <select
                id="level"
                {...register('level')}
                className="appearance-none flex h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all text-white cursor-pointer hover:bg-white/[0.04]"
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
                <option value="Especialista">Especialista</option>
              </select>
            </div>

            {/* Actions */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-white/[0.08] mt-10">
              <Link href="/roadmaps" className="w-full sm:w-auto">
                <Button type="button" variant="ghost" className="w-full text-[#8F95B2] hover:text-white rounded-2xl hover:bg-white/[0.05]">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto min-w-[180px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl h-12 font-bold shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all active:scale-[0.98] border border-purple-500/20">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar Roadmap'
                )}
              </Button>
            </div>

          </form>
        </CardContent>
        </div>
      </Card>
    </div>
  );
}
