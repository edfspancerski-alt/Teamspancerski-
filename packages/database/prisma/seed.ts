import { PrismaClient } from '@repo/database';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING SYSTEM ---');

  const exercisesData = JSON.parse(fs.readFileSync('exercises.json', 'utf8'));

  console.log(`Carregando ${exercisesData.length} exercícios...`);

  for (const ex of exercisesData) {
    await prisma.exercise.create({
      data: {
        name: ex.name,
        muscles: ex.muscles,
        equipment: ex.equipment,
        difficulty: ex.difficulty,
        demoUrl: ex.demoUrl,
        instructions: ex.instructions,
      }
    });
  }

  console.log('Seed de exercícios finalizado!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
