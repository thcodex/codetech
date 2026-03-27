import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// GET /api/dashboard/:userId - Returns weekly progress and daily XP
router.get('/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // 1. Get user IdCard for total XP / level
    const idCard = await prisma.idCard.findUnique({
      where: { userId },
    });

    if (!idCard) {
      res.status(404).json({ error: 'Usuário não encontrado.' });
      return;
    }

    // 2. Get all progress records for the last 7 days
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const weeklyProgress = await prisma.userProgress.findMany({
      where: {
        userId,
        completedAt: {
          gte: sevenDaysAgo,
        },
      },
      include: {
        challenge: true,
      },
      orderBy: {
        completedAt: 'asc',
      },
    });

    // 3. Aggregate XP per day for the last 7 days
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const dailyXp: { day: string; date: string; xp: number; challenges: number }[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(sevenDaysAgo.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = dayNames[date.getDay()];

      const dayRecords = weeklyProgress.filter((p) => {
        const pDate = new Date(p.completedAt).toISOString().split('T')[0];
        return pDate === dateStr;
      });

      const totalXp = dayRecords.reduce((sum, p) => sum + p.challenge.xpReward, 0);

      dailyXp.push({
        day: dayName,
        date: dateStr,
        xp: totalXp,
        challenges: dayRecords.length,
      });
    }

    // 4. Summary stats
    const totalWeeklyXp = dailyXp.reduce((sum, d) => sum + d.xp, 0);
    const totalWeeklyChallenges = dailyXp.reduce((sum, d) => sum + d.challenges, 0);
    const activeDays = dailyXp.filter((d) => d.challenges > 0).length;

    // 5. Today's XP
    const todayStr = now.toISOString().split('T')[0];
    const todayData = dailyXp.find((d) => d.date === todayStr);

    res.json({
      user: {
        name: idCard.studentName,
        level: idCard.level,
        totalXp: idCard.xp,
        xpToNextLevel: 100 - (idCard.xp % 100),
        levelProgress: idCard.xp % 100,
      },
      weekly: {
        totalXp: totalWeeklyXp,
        totalChallenges: totalWeeklyChallenges,
        activeDays,
        dailyXp,
      },
      today: {
        xp: todayData?.xp || 0,
        challenges: todayData?.challenges || 0,
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
