import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findNutrientsRepository = async () => {
  return await prisma.nutrient.findMany();
};
