"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// GET /api/dashboard/:userId - Returns weekly progress and daily XP
router.get('/:userId', authMiddleware_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const authUser = req.user;
        // Users can only access their own dashboard (admins can access any)
        if (authUser.userId !== userId && authUser.role !== 'admin') {
            res.status(403).json({ error: 'Acesso negado.' });
            return;
        }
        // 1. Get user IdCard for total XP / level
        const idCard = yield prisma_1.default.idCard.findUnique({
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
        const weeklyProgress = yield prisma_1.default.userProgress.findMany({
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
        const dailyXp = [];
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
                xp: (todayData === null || todayData === void 0 ? void 0 : todayData.xp) || 0,
                challenges: (todayData === null || todayData === void 0 ? void 0 : todayData.challenges) || 0,
            },
        });
    }
    catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
