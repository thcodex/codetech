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
// CREATE: Post a new roadmap
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, level, authorId } = req.body;
        // Validate request body
        if (!title || !description || !level) {
            return res.status(400).json({ error: 'Title, description and level are required.' });
        }
        // For testing/mocking since User auth isn't setup fully:
        // We'll create a default user if authorId is missing to satisfy the foreign key constraint.
        let finalAuthorId = authorId;
        if (!finalAuthorId) {
            let defaultUser = yield prisma_1.default.user.findFirst();
            if (!defaultUser) {
                defaultUser = yield prisma_1.default.user.create({
                    data: {
                        name: 'Admin',
                        email: 'admin@codetech.dev',
                        password: 'password123',
                    }
                });
            }
            finalAuthorId = defaultUser.id;
        }
        const roadmap = yield prisma_1.default.roadmap.create({
            data: {
                title,
                description,
                level,
                authorId: finalAuthorId,
            },
        });
        return res.status(201).json(roadmap);
    }
    catch (error) {
        console.error('Error creating roadmap:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// READ: Get all roadmaps
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roadmaps = yield prisma_1.default.roadmap.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        return res.status(200).json(roadmaps);
    }
    catch (error) {
        console.error('Error fetching roadmaps:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// READ: Get a single roadmap by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const roadmap = yield prisma_1.default.roadmap.findUnique({
            where: { id },
            include: {
                contents: true,
                challenges: true,
                author: {
                    select: { id: true, name: true }
                }
            }
        });
        if (!roadmap) {
            return res.status(404).json({ error: 'Roadmap not found.' });
        }
        return res.status(200).json(roadmap);
    }
    catch (error) {
        console.error('Error fetching roadmap:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// UPDATE: Update a roadmap
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, level } = req.body;
        const roadmap = yield prisma_1.default.roadmap.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign({}, (title && { title })), (description && { description })), (level && { level })),
        });
        return res.status(200).json(roadmap);
    }
    catch (error) {
        if (error.code === 'P2025') { // Prisma 'Record to update not found.'
            return res.status(404).json({ error: 'Roadmap not found.' });
        }
        console.error('Error updating roadmap:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// DELETE: Remove a roadmap
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma_1.default.roadmap.delete({
            where: { id },
        });
        return res.status(204).send();
    }
    catch (error) {
        if (error.code === 'P2025') { // Prisma 'Record to delete not found.'
            return res.status(404).json({ error: 'Roadmap not found.' });
        }
        console.error('Error deleting roadmap:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
