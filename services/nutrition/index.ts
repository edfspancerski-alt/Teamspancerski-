import { prisma } from '@repo/database';
// import Redis from 'ioredis';

// const redis = new Redis(process.env.REDIS_URL);

export const getCachedPrograms = async (tenantId: string) => {
  const cacheKey = `programs:${tenantId}`;

  // In production:
  // const cached = await redis.get(cacheKey);
  // if (cached) return JSON.parse(cached);

  const programs = await prisma.program.findMany({
    where: { tenantId },
    include: { modules: { include: { lessons: true } } },
  });

  // await redis.set(cacheKey, JSON.stringify(programs), 'EX', 3600);
  return programs;
};
