import { PrismaClient } from '@prisma/client';
import { CreateOrUpdateMealDto } from '../dtos/meal.dto';

const prisma = new PrismaClient();

const findAllMealWithMealTimeRepository = () => {
  return prisma.meal.findMany({
    include: {
      availableMealTimes: {
        select: {
          mealTime: true,
        },
      },
    },
  });
};

const findUniqueMealRepository = (id: string | number) => {
  return prisma.meal.findUnique({
    where: {
      mealId: Number(id),
    },
  });
};

const findMealsPaginationRepository = async (
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

const findMealByIdRepository = async (mealId: number | string) => {
  const meal = await prisma.meal.findFirst({
    where: {
      mealId: Number(mealId),
    },
    select: {
      mealName: true,
      mealType: true,
      imgURL: true,
      availableMealTimes: true,
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
  id?: number | string
) => {
  const { mealName, mealType, ingredients, mealTimes } = createMealRequest;

  if (id)
    return await prisma.meal.update({
      where: {
        mealId: Number(id),
      },
      data: {
        mealName,
        mealType,
        availableMealTimes: {
          deleteMany: {},
          create: mealTimes,
        },
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
      availableMealTimes: {
        create: mealTimes,
      },
      ingredients: {
        create: ingredients,
      },
    },
  });
};

const deleteMealRepository = async (id: number | string) => {
  return await prisma.meal.delete({
    where: {
      mealId: Number(id),
    },
  });
};

export {
  findMealsPaginationRepository,
  findMealByIdRepository,
  findMealByNameRepository,
  createOrUpdateMealRepository,
  deleteMealRepository,
  findUniqueMealRepository,
  findAllMealWithMealTimeRepository,
};
