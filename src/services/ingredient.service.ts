import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const findAllIngredients = async () => {
  return await prisma.ingredient.findMany({
    select: {
      id: true,
      ingredientName: true,
      ingredientType: true,
    },
  });
};

export { findAllIngredients };
