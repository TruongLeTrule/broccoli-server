import { PrismaClient } from '@prisma/client';
import { CreateOrUpdateMealDto } from '../types/meal.type';

const prisma = new PrismaClient();

export const findAllMealsRepository = async (
  page: number | undefined,
  limit: number | undefined
) => {
  if (!page) return await prisma.meal.findMany();

  limit = limit ? limit : 12;
  page = (page - 1) * limit;

  return await prisma.meal.findMany({
    skip: page,
    take: limit,
  });
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

export const createOrUpdateMealRepository = async (
  createMealRequest: CreateOrUpdateMealDto,
  id?: number
) => {
  const { mealName, mealType, ingredients } = createMealRequest;

  if (id)
    return await prisma.meal.update({
      where: {
        mealId: id,
      },
      data: {
        mealName,
        mealType,
        ingredients: {
          deleteMany: {},
          create: ingredients,
        },
      },
    });

  return await prisma.meal.create({
    data: {
      mealName,
      mealType,
      ingredients: {
        create: ingredients,
      },
    },
  });
};

export const deleteMealRepository = async (id: number) => {
  await prisma.meal.delete({
    where: {
      mealId: id,
    },
  });
};
