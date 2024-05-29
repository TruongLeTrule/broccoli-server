import { PrismaClient } from '@prisma/client';
import { MealIngredientRequest } from '../types/meal.type';

const prisma = new PrismaClient();

export const findAllMealsRepository = async (page: number, limit: number) => {
  const meals = await prisma.meal.findMany({
    skip: page,
    take: limit,
  });
  return meals;
};

export const findMealSpecificByIdRepository = async (mealId: number) => {
  const meal = await prisma.meal.findFirst({
    where: {
      mealId,
    },
    include: {
      ingredients: {
        select: {
          ingredientValue: true,
          ingredientUnit: true,
          ingredient: {
            select: {
              ingredientName: true,
              ingredientType: true,
            },
          },
        },
      },
    },
  });
  return meal;
};

export const findMealByNameRepository = async (mealName: string) => {
  const meals = await prisma.meal.findMany({
    where: {
      mealName: {
        contains: mealName,
      },
    },
  });
  return meals;
};

export const createMealRepository = async (
  mealName: string,
  ingredients: Array<MealIngredientRequest>
) => {
  await prisma.meal.create({
    data: {
      mealName,
      ingredients: {
        create: ingredients,
      },
    },
  });
};
