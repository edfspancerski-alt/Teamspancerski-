import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { verifyToken, hasRole } from '@repo/auth';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    const programs = await prisma.program.findMany({
      where: { tenantId: payload.tenantId },
      include: { modules: { include: { lessons: true } } },
    });

    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    if (!hasRole(payload.role, ['ADMIN', 'COACH'])) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { title, description, thumbnail, duration, difficulty } = await request.json();

    const program = await prisma.program.create({
      data: {
        title,
        description,
        thumbnail,
        duration,
        difficulty,
        tenantId: payload.tenantId,
      },
    });

    return NextResponse.json(program);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
