import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import roadmapRoutes from './routes/roadmap.routes';
import progressRoutes from './routes/progress.routes';

const app: Express = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/progress', progressRoutes);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
