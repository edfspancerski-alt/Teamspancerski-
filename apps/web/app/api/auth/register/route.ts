import { NextResponse } from 'next/server';
import { prisma } from '../../../../../packages/database';
import { hashPassword, signToken } from '../../../../../packages/auth';

export async function POST(request: Request) {
  try {
    const { email, password, name, tenantSlug } = await request.json();

    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        tenantId: tenant.id,
      },
    });

    const token = signToken({
      userId: user.id,
      role: user.role,
      tenantId: user.tenantId,
    });

    return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
