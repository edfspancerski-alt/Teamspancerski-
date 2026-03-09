import { NextResponse } from 'next/server';
import { prisma } from '../../../../../packages/database';
import { verifyToken } from '../../../../../packages/auth';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    const { lessonId, completed, percentage } = await request.json();

    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: payload.userId,
          lessonId: lessonId,
        },
      },
      update: {
        completed,
        percentage,
      },
      create: {
        userId: payload.userId,
        lessonId: lessonId,
        completed,
        percentage,
      },
    });

    // Update user XP if completed
    if (completed) {
      await prisma.user.update({
        where: { id: payload.userId },
        data: {
          xp: { increment: 50 },
          lastActive: new Date(),
        },
      });
    }

    return NextResponse.json(progress);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
