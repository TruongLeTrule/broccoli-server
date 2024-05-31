import { PrismaClient } from '@prisma/client';
import { CreateOrUpdateMealDto } from '../dtos/meal.dto';

const prisma = new PrismaClient();

const findMealsRepository = async (
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

const findMealByIdRepository = async (mealId: number) => {
  const meal = await prisma.meal.findFirst({
    where: {
      mealId,
    },
    select: {
      mealName: true,
      mealType: true,
      imgURL: true,
      ingredients: {
        select: {
          ingredientValue: true,
          ingredientUnit: true,
          ingredientUnitCovert: {
            select: {
              covertToGrams: true,
            },
          },
          ingredient: {
            select: {
              ingredientId: true,
              ingredientName: true,
              ingredientType: true,
              nutrients: {
                select: {
                  nutrientValueOn100g: true,
                  nutrient: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return meal;
};

const findMealByNameRepository = async (mealName: string) => {
  const meals = await prisma.meal.findMany({
    where: {
      mealName: {
        contains: mealName,
      },
    },
  });
  return meals;
};

const createOrUpdateMealRepository = async (
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

const deleteMealRepository = async (id: number) => {
  return await prisma.meal.delete({
    where: {
      mealId: id,
    },
  });
};

export {
  findMealsRepository,
  findMealByIdRepository,
  findMealByNameRepository,
  createOrUpdateMealRepository,
  deleteMealRepository,
};
