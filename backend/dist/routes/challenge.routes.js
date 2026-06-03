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
const vm_1 = __importDefault(require("vm"));
const router = (0, express_1.Router)();
// Get challenge details
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const challenge = yield prisma_1.default.challenge.findUnique({
            where: { id },
        });
        if (!challenge) {
            res.status(404).json({ error: 'Challenge not found' });
            return;
        }
        res.json(challenge);
    }
    catch (error) {
        console.error('Error fetching challenge:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Execute challenge code locally via Node VM (requires authentication)
router.post('/:id/execute', authMiddleware_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { code, language } = req.body;
        if (!code || !language) {
            res.status(400).json({ error: 'Code and language are required' });
            return;
        }
        const challenge = yield prisma_1.default.challenge.findUnique({
            where: { id },
        });
        if (!challenge) {
            res.status(404).json({ error: 'Challenge not found' });
            return;
        }
        // Apenas JS suportado pelo motor local VM
        if (language.toLowerCase() !== 'javascript' && language.toLowerCase() !== 'js') {
            res.status(400).json({ error: 'O motor interno suporta apenas a linguagem JavaScript.' });
            return;
        }
        let output = '';
        let stderr = '';
        // Sandbox log interceptors
        const customConsole = {
            log: (...args) => {
                output += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
            },
            error: (...args) => {
                stderr += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
            },
            warn: (...args) => {
                output += '[WARN] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
            }
        };
        // Prepare isolated context with restricted globals
        const context = {
            console: customConsole,
            Math,
            Date,
            parseInt,
            parseFloat,
            String,
            Number,
            Boolean,
            Array,
            Object,
            JSON,
            Map,
            Set,
            RegExp,
            Error,
            TypeError,
            RangeError,
            isNaN,
            isFinite,
            undefined,
            NaN,
            Infinity,
        };
        vm_1.default.createContext(context);
        try {
            // Execute the user code with a strict timeout to prevent infinite loops
            vm_1.default.runInContext(code, context, { timeout: 3000 });
            res.json({
                output: output.trim(),
                stderr: stderr.trim(),
                success: !stderr,
                raw: { executedLocally: true }
            });
        }
        catch (execError) {
            res.json({
                output: output.trim(),
                stderr: (stderr + '\n' + String(execError)).trim(),
                success: false,
                raw: { executedLocally: true }
            });
        }
    }
    catch (error) {
        console.error('Error in code execution route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
