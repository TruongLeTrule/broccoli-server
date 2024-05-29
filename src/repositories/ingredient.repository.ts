import { PrismaClient, ingredientType } from '@prisma/client';
import { IngredientNutrientRequest } from '../types/ingredient.type';

const prisma = new PrismaClient();

export const findAllIngredientsRepository = async () => {
  return await prisma.ingredient.findMany({
    select: {
      ingredientId: true,
      ingredientName: true,
      ingredientType: true,
    },
  });
};

export const findIngredientByNameRepository = async (
  ingredientName: string
) => {
  const ingredients = await prisma.ingredient.findMany({
    where: {
      ingredientName: {
        contains: ingredientName,
      },
    },
  });
  return ingredients;
};

export const findIngredientSpecificByIdRepository = async (
  ingredientId: number
) => {
  const ingredient = await prisma.ingredient.findFirst({
    where: {
      ingredientId,
    },
    include: {
      nutrients: {
        select: {
          nutrientValueOn100g: true,
          nutrient: true,
        },
      },
    },
  });
  return ingredient;
};

export const createIngredientRepository = async (
  ingredientName: string,
  ingredientType: ingredientType,
  ingredients: Array<IngredientNutrientRequest>
) => {
  await prisma.ingredient.create({
    data: {
      ingredientName,
      ingredientType,
      nutrients: {
        create: ingredients,
      },
    },
  });
};
