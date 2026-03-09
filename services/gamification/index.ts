import { prisma } from '@repo/database';

export const awardXP = async (userId: string, amount: number) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      xp: { increment: amount },
      lastActive: new Date(),
    },
  });
};

export const checkAndAwardBadges = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { progress: true, badges: true },
  });

  if (!user) return;

  const completedWorkouts = user.progress.filter(p => p.completed).length;

  const badgeRules = [
    { name: 'Primeiro Passo', requirement: 1, icon: '🏆' },
    { name: 'Guerreiro Semanal', requirement: 7, icon: '🔥' },
    { name: 'Mestre da Constância', requirement: 30, icon: '⭐' },
  ];

  for (const rule of badgeRules) {
    if (completedWorkouts >= rule.requirement) {
      const alreadyHas = user.badges.some(b => b.badgeId === rule.name); // Using name as ID for mock
      if (!alreadyHas) {
        // Award badge logic
        console.log(`Awarding badge ${rule.name} to user ${userId}`);
      }
    }
  }
};
