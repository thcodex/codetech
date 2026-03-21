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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🧹 Limpando dados antigos para evitar duplicatas...");
        yield prisma.userProgress.deleteMany({});
        yield prisma.challenge.deleteMany({});
        yield prisma.content.deleteMany({});
        yield prisma.roadmap.deleteMany({});
        // Garantir que existe um autor para assinar o Roadmap
        let admin = yield prisma.user.findFirst();
        if (!admin) {
            admin = yield prisma.user.create({
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
            yield prisma.roadmap.create({
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
    });
}
main()
    .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
