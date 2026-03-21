import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const roadmapsData = [
  {
    title: "Trilha Frontend Explorer",
    description: "Domine a interface e crie experiências incríveis para o usuário.",
    level: "Iniciante",
    challenges: [
      { title: "Fase 1: O Esqueleto e a Pintura", description: "Criar uma página semântica com HTML5 e estilizá-la usando Flexbox e CSS Grid.", xpReward: 10 },
      { title: "Fase 2: Dando Vida à Tela", description: "Usar JavaScript para manipular o DOM, criar eventos de clique e consumir uma API pública usando fetch.", xpReward: 20 },
      { title: "Fase 3: O Componente Perfeito", description: "Construir uma interface interativa usando React.js e gerenciar o estado com useState.", xpReward: 30 },
      { title: "Chefão: O Mestre do Next.js", description: "Fazer o deploy de uma aplicação Next.js com Tailwind CSS e Server Components.", xpReward: 50 }
    ]
  },
  {
    title: "Trilha Backend Master",
    description: "Construa o motor, os cofres e a segurança por trás das aplicações.",
    level: "Intermediário",
    challenges: [
      { title: "Fase 1: O Lado do Servidor", description: "Criar o seu primeiro servidor local rodando Node.js puro.", xpReward: 10 },
      { title: "Fase 2: O Entregador de Dados", description: "Construir uma API RESTful completa usando Express.js com rotas de GET, POST, PUT e DELETE.", xpReward: 20 },
      { title: "Fase 3: O Arquiteto de Cofres", description: "Modelar um banco de dados relacional usando PostgreSQL e o Prisma ORM.", xpReward: 30 },
      { title: "Chefão: O Senhor da Nuvem", description: "Fazer o deploy da API e banco de dados usando Railway e variáveis de ambiente.", xpReward: 50 }
    ]
  },
  {
    title: "Trilha UI/UX Designer",
    description: "Projete interfaces que os usuários vão amar usar.",
    level: "Iniciante",
    challenges: [
      { title: "Fase 1: A Psicologia Visual", description: "Criar uma paleta de cores acessível e uma hierarquia tipográfica para um SaaS.", xpReward: 10 },
      { title: "Fase 2: Rabiscando a Ideia", description: "Desenhar o Wireframe de baixa fidelidade de uma tela de login e dashboard.", xpReward: 20 },
      { title: "Fase 3: O Domínio do Figma", description: "Transformar o wireframe em alta fidelidade usando Auto Layout e Componentes.", xpReward: 30 },
      { title: "Chefão: O Protótipo Vivo", description: "Criar um protótipo navegável e interativo, simulando cliques e transições.", xpReward: 50 }
    ]
  }
];

async function main() {
  console.log("🧹 Limpando dados antigos para evitar duplicatas...");
  await prisma.userProgress.deleteMany({});
  await prisma.challenge.deleteMany({});
  await prisma.content.deleteMany({});
  await prisma.roadmap.deleteMany({});

  // Garantir que existe um autor para assinar o Roadmap
  let admin = await prisma.user.findFirst();
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        name: "Instrutor CodeTech",
        email: "instrutor@codetech.dev",
        password: "hashed_dummy_password"
      }
    });
  }

  console.log("🌱 Inserindo Roadmaps e Desafios...");

  for (const roadmap of roadmapsData) {
    // Cria o Roadmap e, aninhado, os Challenges dele
    await prisma.roadmap.create({
      data: {
        title: roadmap.title,
        description: roadmap.description,
        level: roadmap.level,
        authorId: admin.id,
        challenges: {
          create: roadmap.challenges
        }
      }
    });
  }

  console.log("✅ DB Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
