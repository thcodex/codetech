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
const router = (0, express_1.Router)();
// Gamification: Complete a challenge and earn XP
router.post('/complete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, challengeId } = req.body;
        if (!userId || !challengeId) {
            return res.status(400).json({ error: 'Parâmetros userId e challengeId são obrigatórios.' });
        }
        // 1. Verify if the challenge exists
        const challenge = yield prisma_1.default.challenge.findUnique({
            where: { id: challengeId },
        });
        if (!challenge) {
            return res.status(404).json({ error: 'Desafio não encontrado.' });
        }
        // 2. Check if user already completed this challenge to prevent duplicate XP
        const existingProgress = yield prisma_1.default.userProgress.findUnique({
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
        const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            // 3. Create UserProgress record
            yield tx.userProgress.create({
                data: {
                    userId,
                    challengeId,
                },
            });
            // 4. Update the user's IdCard XP and Level
            const idCard = yield tx.idCard.findUnique({
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
            const updatedIdCard = yield tx.idCard.update({
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
        }));
        return res.status(200).json({
            message: 'Desafio concluído com sucesso!',
            data: result,
        });
    }
    catch (error) {
        console.error('Error completing challenge:', error.message);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}));
exports.default = router;
