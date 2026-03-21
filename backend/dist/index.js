"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const roadmap_routes_1 = __importDefault(require("./routes/roadmap.routes"));
const progress_routes_1 = __importDefault(require("./routes/progress.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
// Routes
app.use('/api/roadmaps', roadmap_routes_1.default);
app.use('/api/progress', progress_routes_1.default);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
