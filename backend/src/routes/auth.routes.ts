import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { idCard: true },
    });

    if (!user) {
      res.status(401).json({ error: 'Credenciais inválidas.' });
      return;
    }

    // Simple password check (in production, use bcrypt)
    if (user.password !== password) {
      res.status(401).json({ error: 'Credenciais inválidas.' });
      return;
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      idCard: user.idCard,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(400).json({ error: 'Email já cadastrado.' });
      return;
    }

    const user = await prisma.user.create({
      data: { name, email, password, role: 'user' },
    });

    // Create IdCard for the new user
    const idCard = await prisma.idCard.create({
      data: {
        studentName: name,
        matricula: `STD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        level: 1,
        xp: 0,
        userId: user.id,
      },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      idCard,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
