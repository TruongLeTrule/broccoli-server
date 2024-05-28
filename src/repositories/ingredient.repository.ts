import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const findAllIngredientsRepository = async () => {
  return await prisma.ingredient.findMany({
    select: {
      id: true,
      ingredientName: true,
      ingredientType: true,
    },
  });
};
