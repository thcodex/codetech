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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// POST /api/auth/login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email e senha são obrigatórios.' });
            return;
        }
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
            include: { idCard: true },
        });
        if (!user) {
            res.status(401).json({ error: 'Credenciais inválidas.' });
            return;
        }
        const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Credenciais inválidas.' });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, authMiddleware_1.JWT_SECRET, { expiresIn: '7d' });
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                idCard: user.idCard,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}));
// POST /api/auth/register
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' });
            return;
        }
        const existing = yield prisma_1.default.user.findUnique({ where: { email } });
        if (existing) {
            res.status(400).json({ error: 'Email já cadastrado.' });
            return;
        }
        // Hash password with bcrypt
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = yield prisma_1.default.user.create({
            data: { name, email, password: hashedPassword, role: 'user' },
        });
        // Create IdCard for the new user
        const idCard = yield prisma_1.default.idCard.create({
            data: {
                studentName: name,
                matricula: `STD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
                level: 1,
                xp: 0,
                userId: user.id,
            },
        });
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, authMiddleware_1.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                idCard,
            },
        });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}));
exports.default = router;
