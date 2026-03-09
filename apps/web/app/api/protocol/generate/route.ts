import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { verifyToken } from '@repo/auth';
import { generateProfessionalProtocol } from '@repo/ai';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const protocol = await generateProfessionalProtocol({
      age: user.age || 25,
      weight: user.weight || 70,
      height: user.height || 170,
      goal: user.goal || 'hipertrofia',
      experience: 'intermediário', // Should come from user profile or request
      environment: 'academia',
      availability: 5,
      dietaryRestrictions: user.dietaryRestrictions || undefined,
      budget: user.budget || undefined,
    });

    // Save to database if needed, here we just return the generated report
    return NextResponse.json(protocol);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
