import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// Gamification: Complete a challenge and earn XP
router.post('/complete', async (req: Request, res: Response) => {
  try {
    const { userId, challengeId } = req.body;

    if (!userId || !challengeId) {
      return res.status(400).json({ error: 'Parâmetros userId e challengeId são obrigatórios.' });
    }

    // 1. Verify if the challenge exists
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      return res.status(404).json({ error: 'Desafio não encontrado.' });
    }

    // 2. Check if user already completed this challenge to prevent duplicate XP
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_challengeId: {
          userId,
          challengeId,
        },
      },
    });

    if (existingProgress) {
      return res.status(400).json({ error: 'Desafio já concluído por este usuário.' });
    }

    // Use a Prisma transaction to ensure Atomicity
    const result = await prisma.$transaction(async (tx) => {
      // 3. Create UserProgress record
      await tx.userProgress.create({
        data: {
          userId,
          challengeId,
        },
      });

      // 4. Update the user's IdCard XP and Level
      const idCard = await tx.idCard.findUnique({
        where: { userId },
      });

      if (!idCard) {
        throw new Error('IdCard não encontrado para este usuário.');
      }

      const newXp = idCard.xp + challenge.xpReward;
      const levelThreshold = 100; // 100 XP per Level
      
      // Calculate how many levels the user gained
      const additionalLevels = Math.floor(newXp / levelThreshold) - Math.floor(idCard.xp / levelThreshold);
      const newLevel = idCard.level + additionalLevels;

      const updatedIdCard = await tx.idCard.update({
        where: { userId },
        data: {
          xp: newXp,
          level: newLevel,
        },
      });

      return {
        updatedIdCard,
        leveledUp: additionalLevels > 0,
        xpGained: challenge.xpReward,
      };
    });

    return res.status(200).json({
      message: 'Desafio concluído com sucesso!',
      data: result,
    });

  } catch (error: any) {
    console.error('Error completing challenge:', error.message);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

export default router;
