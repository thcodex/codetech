import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const roadmapsData = [
  {
    title: "Trilha Frontend Explorer",
    description: "Domine a interface e crie experiências incríveis para o usuário.",
    level: "Iniciante",
    challenges: [
      { title: "Fase 1: O Esqueleto e a Pintura", description: "Criar uma página semântica com HTML5 e estilizá-la usando Flexbox e CSS Grid.", xpReward: 10, initialCode: "// Crie sua estrutura HTML aqui\nconsole.log('Hello Frontend!');" },
      { title: "Fase 2: Dando Vida à Tela", description: "Usar JavaScript para manipular o DOM, criar eventos de clique e consumir uma API pública usando fetch.", xpReward: 20, initialCode: "// Manipule o DOM aqui\nconst btn = 'click me';\nconsole.log(btn);" },
      { title: "Fase 3: O Componente Perfeito", description: "Construir uma interface interativa usando React.js e gerenciar o estado com useState.", xpReward: 30, initialCode: "// Crie seu componente React\nconsole.log('React Component!');" },
      { title: "Chefão: O Mestre do Next.js", description: "Fazer o deploy de uma aplicação Next.js com Tailwind CSS e Server Components.", xpReward: 50, initialCode: "// Deploy Next.js\nconsole.log('Next.js Master!');" }
    ]
  },
  {
    title: "Trilha Backend Master",
    description: "Construa o motor, os cofres e a segurança por trás das aplicações.",
    level: "Intermediário",
    challenges: [
      { title: "Fase 1: O Lado do Servidor", description: "Criar o seu primeiro servidor local rodando Node.js puro.", xpReward: 10, initialCode: "// Crie um servidor HTTP\nconsole.log('Server running!');" },
      { title: "Fase 2: O Entregador de Dados", description: "Construir uma API RESTful completa usando Express.js com rotas de GET, POST, PUT e DELETE.", xpReward: 20, initialCode: "// Construa sua API REST\nconsole.log('API Ready!');" },
      { title: "Fase 3: O Arquiteto de Cofres", description: "Modelar um banco de dados relacional usando PostgreSQL e o Prisma ORM.", xpReward: 30, initialCode: "// Modele seu banco de dados\nconsole.log('Database Modeled!');" },
      { title: "Chefão: O Senhor da Nuvem", description: "Fazer o deploy da API e banco de dados usando Railway e variáveis de ambiente.", xpReward: 50, initialCode: "// Deploy na nuvem\nconsole.log('Cloud Deployed!');" }
    ]
  },
  {
    title: "Trilha UI/UX Designer",
    description: "Projete interfaces que os usuários vão amar usar.",
    level: "Iniciante",
    challenges: [
      { title: "Fase 1: A Psicologia Visual", description: "Criar uma paleta de cores acessível e uma hierarquia tipográfica para um SaaS.", xpReward: 10, initialCode: "// Defina sua paleta de cores\nconsole.log('Colors defined!');" },
      { title: "Fase 2: Rabiscando a Ideia", description: "Desenhar o Wireframe de baixa fidelidade de uma tela de login e dashboard.", xpReward: 20, initialCode: "// Wireframe criado\nconsole.log('Wireframe ready!');" },
      { title: "Fase 3: O Domínio do Figma", description: "Transformar o wireframe em alta fidelidade usando Auto Layout e Componentes.", xpReward: 30, initialCode: "// Figma components\nconsole.log('High Fidelity!');" },
      { title: "Chefão: O Protótipo Vivo", description: "Criar um protótipo navegável e interativo, simulando cliques e transições.", xpReward: 50, initialCode: "// Protótipo interativo\nconsole.log('Prototype Live!');" }
    ]
  }
];

// 5 Admin profiles
const adminProfiles = [
  { name: "Thiago Ramos",      email: "thiago@codetech.dev",   password: "admin123", role: "admin" },
  { name: "Rafael Pedro",      email: "rafael@codetech.dev",   password: "admin123", role: "admin" },
  { name: "Jean Netto",        email: "jean@codetech.dev",     password: "admin123", role: "admin" },
  { name: "Felipe Gabriel",    email: "felipe@codetech.dev",   password: "admin123", role: "admin" },
  { name: "Michel Tenorio",    email: "michel@codetech.dev",   password: "admin123", role: "admin" },
];

async function main() {
  console.log("🧹 Limpando dados antigos para evitar duplicatas...");
  await prisma.userProgress.deleteMany({});
  await prisma.challenge.deleteMany({});
  await prisma.content.deleteMany({});
  await prisma.roadmap.deleteMany({});
  await prisma.idCard.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("👑 Criando 5 perfis de Admin...");

  const createdAdmins = [];
  for (const admin of adminProfiles) {
    const user = await prisma.user.create({ data: admin });

    // Create IdCard for each admin
    await prisma.idCard.create({
      data: {
        studentName: admin.name,
        matricula: `ADM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        level: 5,
        xp: 450,
        userId: user.id,
      },
    });

    createdAdmins.push(user);
    console.log(`  ✅ Admin criado: ${admin.name} (${admin.email})`);
  }

  // Use the first admin as the roadmap author
  const mainAdmin = createdAdmins[0];

  console.log("🌱 Inserindo Roadmaps e Desafios...");

  for (const roadmap of roadmapsData) {
    await prisma.roadmap.create({
      data: {
        title: roadmap.title,
        description: roadmap.description,
        level: roadmap.level,
        authorId: mainAdmin.id,
        challenges: {
          create: roadmap.challenges
        }
      }
    });
  }

  console.log("✅ DB Seed concluído com sucesso!");
  console.log(`\n📋 Resumo:`);
  console.log(`   👑 ${createdAdmins.length} Admins criados`);
  console.log(`   🗺️  ${roadmapsData.length} Roadmaps criados`);
  console.log(`   🎯 ${roadmapsData.reduce((a, r) => a + r.challenges.length, 0)} Desafios criados`);
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
