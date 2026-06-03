"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const roadmap_routes_1 = __importDefault(require("./routes/roadmap.routes"));
const progress_routes_1 = __importDefault(require("./routes/progress.routes"));
const challenge_routes_1 = __importDefault(require("./routes/challenge.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
// Rate limiting
const globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { error: 'Muitas requisições. Tente novamente em 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
});
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
});
const executeLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: { error: 'Limite de execuções atingido. Tente novamente em 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', globalLimiter);
app.use('/api/auth', authLimiter);
app.use('/api/challenges', executeLimiter);
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/roadmaps', roadmap_routes_1.default);
app.use('/api/progress', progress_routes_1.default);
app.use('/api/challenges', challenge_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
