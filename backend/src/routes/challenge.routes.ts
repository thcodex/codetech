import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import vm from 'vm';

const router = Router();
const prisma = new PrismaClient();

// Get challenge details
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const challenge = await prisma.challenge.findUnique({
      where: { id },
    });

    if (!challenge) {
      res.status(404).json({ error: 'Challenge not found' });
      return;
    }

    res.json(challenge);
  } catch (error) {
    console.error('Error fetching challenge:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Execute challenge code locally via Node VM
router.post('/:id/execute', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { code, language } = req.body;

    if (!code || !language) {
      res.status(400).json({ error: 'Code and language are required' });
      return;
    }

    const challenge = await prisma.challenge.findUnique({
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
      log: (...args: any[]) => {
        output += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
      },
      error: (...args: any[]) => {
        stderr += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
      },
      warn: (...args: any[]) => {
        output += '[WARN] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
      }
    };

    // Prepare secure isolated context
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
      Object
    };

    vm.createContext(context);

    try {
      // Execute the user code with a strict timeout to prevent infinite loops
      vm.runInContext(code, context, { timeout: 3000 });
      
      res.json({
        output: output.trim(),
        stderr: stderr.trim(),
        success: !stderr, // Basic success metric
        raw: { executedLocally: true }
      });

    } catch (execError: any) {
      res.json({
        output: output.trim(),
        stderr: (stderr + '\n' + String(execError)).trim(),
        success: false,
        raw: { executedLocally: true }
      });
    }

  } catch (error) {
    console.error('Error in code execution route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
