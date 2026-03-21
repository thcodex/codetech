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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const roadmaps = yield prisma.roadmap.findMany();
        if (roadmaps.length === 0) {
            console.log("No roadmaps to seed challenges.");
            return;
        }
        const roadmap = roadmaps[0];
        // Create an IdCard for the author if they don't have one
        let idCard = yield prisma.idCard.findUnique({ where: { userId: roadmap.authorId } });
        if (!idCard) {
            idCard = yield prisma.idCard.create({
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
        yield prisma.challenge.create({
            data: {
                title: 'Desafio Prático: React State',
                description: 'Implemente um estado global complexo.',
                xpReward: 50,
                roadmapId: roadmap.id
            }
        });
        yield prisma.challenge.create({
            data: {
                title: 'Desafio Avançado: Server Components',
                description: 'Migre os componentes de tela para SSR garantindo SEO.',
                xpReward: 60,
                roadmapId: roadmap.id
            }
        });
        console.log("Gamification Seed concluded!");
    });
}
main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
