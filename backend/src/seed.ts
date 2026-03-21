import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roadmaps = await prisma.roadmap.findMany();
  
  if (roadmaps.length === 0) {
    console.log("No roadmaps to seed challenges.");
    return;
  }

  const roadmap = roadmaps[0];
  
  // Create an IdCard for the author if they don't have one
  let idCard = await prisma.idCard.findUnique({ where: { userId: roadmap.authorId } });
  if (!idCard) {
    idCard = await prisma.idCard.create({
      data: {
        userId: roadmap.authorId,
        studentName: 'Admin Student',
        matricula: '123456789',
        level: 1,
        xp: 0
      }
    });
  }

  // Create a challenge
  await prisma.challenge.create({
    data: {
      title: 'Desafio Prático: React State',
      description: 'Implemente um estado global complexo.',
      xpReward: 50,
      roadmapId: roadmap.id
    }
  });

  await prisma.challenge.create({
    data: {
      title: 'Desafio Avançado: Server Components',
      description: 'Migre os componentes de tela para SSR garantindo SEO.',
      xpReward: 60,
      roadmapId: roadmap.id
    }
  });

  console.log("Gamification Seed concluded!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
