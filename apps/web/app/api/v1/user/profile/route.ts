import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { verifyToken } from '@repo/auth';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        subscriptions: true,
        progress: { take: 10, orderBy: { updatedAt: 'desc' } },
        badges: { include: { badge: true } },
        achievements: { include: { achievement: true } }
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
