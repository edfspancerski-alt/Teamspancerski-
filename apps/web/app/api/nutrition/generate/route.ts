import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { verifyToken } from '@repo/auth';
import { generateNutritionPlan } from '@repo/ai';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || !user.weight || !user.height || !user.age || !user.goal) {
      return NextResponse.json({ error: 'User profile incomplete' }, { status: 400 });
    }

    const planData = await generateNutritionPlan({
      weight: user.weight,
      height: user.height,
      age: user.age,
      goal: user.goal,
      dietaryRestrictions: user.dietaryRestrictions || undefined,
      budget: user.budget || undefined,
    });

    const nutritionPlan = await prisma.nutritionPlan.create({
      data: {
        userId: user.id,
        content: planData.mealPlan,
        shoppingList: {
          create: {
            items: planData.shoppingList,
            estimatedTotal: 0, // Should be calculated or provided by IA
          },
        },
      },
      include: { shoppingList: true },
    });

    return NextResponse.json(nutritionPlan);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
