import { RoadmapsClient } from './RoadmapsClient';

// Defines the Roadmap type corresponding to the Prisma model
interface Roadmap {
  id: string;
  title: string;
  description: string;
  level: string;
  author: { name: string };
}

// Fetch Roadmaps using React Server Component
async function getRoadmaps(): Promise<Roadmap[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
    const res = await fetch(`${apiUrl}/roadmaps`, {
      cache: 'no-store', // Always dynamic fetch
    });
    if (!res.ok) throw new Error('Failed to fetch roadmaps');
    return await res.json();
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    return [];
  }
}

export default async function RoadmapsPage() {
  const roadmaps = await getRoadmaps();

  return (
    <div className="flex-1 flex flex-col w-full relative">
      <RoadmapsClient initialRoadmaps={roadmaps} />
    </div>
  );
}
