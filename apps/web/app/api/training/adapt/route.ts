import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { verifyToken } from '@repo/auth';
import { progressAgent } from '@repo/ai';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    const userHistory = await prisma.progress.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: { lesson: true }
    });

    const adaptation = await progressAgent({
      history: userHistory,
      goal: "hipertrofia"
    });

    // adaptation would return { adjustLoad: +5, adjustReps: 0, reason: "Progressão estável" }

    return NextResponse.json(adaptation);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
