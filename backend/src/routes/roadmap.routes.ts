import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// CREATE: Post a new roadmap
router.post('/', async (req: Request, res: Response) => {
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
      let defaultUser = await prisma.user.findFirst();
      if (!defaultUser) {
        defaultUser = await prisma.user.create({
          data: {
            name: 'Admin',
            email: 'admin@codetech.dev',
            password: 'password123',
          }
        });
      }
      finalAuthorId = defaultUser.id;
    }

    const roadmap = await prisma.roadmap.create({
      data: {
        title,
        description,
        level,
        authorId: finalAuthorId,
      },
    });
    
    return res.status(201).json(roadmap);
  } catch (error: any) {
    console.error('Error creating roadmap:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// READ: Get all roadmaps
router.get('/', async (req: Request, res: Response) => {
  try {
    const roadmaps = await prisma.roadmap.findMany({
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });
    return res.status(200).json(roadmaps);
  } catch (error: any) {
    console.error('Error fetching roadmaps:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// READ: Get a single roadmap by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const roadmap = await prisma.roadmap.findUnique({
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
  } catch (error: any) {
    console.error('Error fetching roadmap:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE: Update a roadmap
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, level } = req.body;
    
    const roadmap = await prisma.roadmap.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(level && { level })
      },
    });
    
    return res.status(200).json(roadmap);
  } catch (error: any) {
    if (error.code === 'P2025') { // Prisma 'Record to update not found.'
      return res.status(404).json({ error: 'Roadmap not found.' });
    }
    console.error('Error updating roadmap:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE: Remove a roadmap
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.roadmap.delete({
      where: { id },
    });
    
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') { // Prisma 'Record to delete not found.'
      return res.status(404).json({ error: 'Roadmap not found.' });
    }
    console.error('Error deleting roadmap:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
