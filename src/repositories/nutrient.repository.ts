import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAllNutrientsRepository = async () => {
  return await prisma.nutrient.findMany();
};
