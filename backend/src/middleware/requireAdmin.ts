import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';

// Simple admin check middleware
// Expects a header: x-user-id
export async function requireAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      res.status(401).json({ error: 'Autenticação necessária.' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.role !== 'admin') {
      res.status(403).json({ error: 'Acesso restrito a administradores.' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Erro interno de autenticação.' });
  }
}
