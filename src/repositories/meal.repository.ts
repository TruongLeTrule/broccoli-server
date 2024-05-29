import { PrismaClient } from '@prisma/client';
import { HandledCreateMealRequest } from '../types/meal.type';

const prisma = new PrismaClient();

export const findAllMealsRepository = async (page: number, limit: number) => {
  const meals = await prisma.meal.findMany({
    skip: page,
    take: limit,
  });
  return meals;
};

export const findMealSpecificByIdRepository = async (id: number) => {
  const meal = await prisma.meal.findFirst({
    where: {
      id,
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
  ingredients: Array<HandledCreateMealRequest>
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
