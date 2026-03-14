import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { verifyToken } from '@repo/auth';
import { bodyAnalysisAgent } from '@repo/ai';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    const { photoUrls } = await request.json(); // { front: '...', side: '...', back: '...' }

    // In a real scenario, we'd send these to a CV model or use GPT-4 Vision
    // Here we use our Body Analysis Agent with a mock image description
    const analysis = await bodyAnalysisAgent({
      photoUrls,
      mockObservation: "Ligeiro acúmulo de gordura abdominal, simetria de ombros boa, glúteos precisando de mais volume."
    });

    const bodyAnalysis = await prisma.bodyAnalysis.create({
      data: {
        userId: payload.userId,
        bodyFat: analysis.bodyFat,
        symmetryScore: analysis.symmetryScore,
        weakMuscles: analysis.weakMuscles,
        recommendations: analysis.recommendations,
        photoUrls: photoUrls,
      },
    });

    return NextResponse.json(bodyAnalysis);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
