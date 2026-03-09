import { NextResponse } from 'next/server';
import { prisma } from '../../../../../packages/database';
import { comparePassword, signToken } from '../../../../../packages/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({
      userId: user.id,
      role: user.role,
      tenantId: user.tenantId,
    });

    return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
