# 🚀 CodeTech Platform

**CodeTech** é uma plataforma educacional completa para desenvolvedores, projetada para transformar o aprendizado em uma jornada gamificada, visual e interativa. Com um design premium baseado em *Glassmorphism* e *Bento-box*, a plataforma oferece uma experiência fluida para estudantes e ferramentas robustas para administradores.

---

## ✨ Principais Funcionalidades

### 🗺️ Roadmaps Personalizados
Trilhas de estudos organizadas por níveis (Iniciante ao Especialista), cobrindo Frontend, Backend e UI/UX. Cada roadmap é um guia claro para a maestria tecnológica.

### 🎮 Desafios Gamificados com Console Real
Resolva desafios de codificação diretamente no navegador. Nosso motor de execução interno processa o código e fornece feedback instantâneo, recompensando o progresso com XP.

### 📊 Dashboard de Evolução
Acompanhe seu crescimento com gráficos semanais de XP, barra de nível e estatísticas detalhadas de desafios concluídos. Sua evolução nunca foi tão visual.

### 🪪 ID Card CodeTech
Gere seu crachá oficial de desenvolvedor. Personalize seus dados, mostre seu nível e compartilhe sua jornada nas redes sociais com um visual premium.

### 🔐 Sistema de Gestão (Admin)
Controle total para os instrutores criarem novos conteúdos, editarem roadmaps e gerenciarem a plataforma com permissões de alto nível.

---

## 🛠️ Tecnologias de Ponta

- **Frontend:** [Next.js 14](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
- **Backend:** [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) com [Prisma ORM](https://www.prisma.io/)
- **Segurança:** Sandbox de execução `vm` nativo e RBAC (Role-Based Access Control)
- **Design:** Glassmorphism, Gradient Typography e Staggered Animations

---

## 🚀 Como Começar

### Pré-requisitos
- Node.js (v18+)
- Docker (para o banco de dados)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/thcodex/codetech.git
   cd codetech
   ```

2. **Configure as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o Ambiente de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   *O frontend rodará em `localhost:3000` e o backend em `localhost:8080`.*

4. **Prepare o Banco de Dados:**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma db seed
   ```

---

## 👥 O Time (Admins)

A plataforma é mantida e gerida por:
- **Thiago Ramos** (@thcodex)
- **Rafael Pedro**
- **Jean Netto**
- **Felipe Gabriel**
- **Michel Tenorio**

---
Desenvolvido com ❤️ pelo time CodeTech.
