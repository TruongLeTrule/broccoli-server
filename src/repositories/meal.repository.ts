import { PrismaClient, mealTimeEnum } from '@prisma/client';
import { CreateOrUpdateMealDto, MealNutrientDto } from '../dtos/meal.dto';

const prisma = new PrismaClient();

const findUniqueMealRepository = (id: string | number) => {
  return prisma.meal.findUnique({
    where: {
      mealId: Number(id),
    },
  });
};

const findMealsPaginationRepository = async (
  page?: number | undefined,
  limit?: number | undefined
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
  return await prisma.meal.findFirst({
    where: {
      mealId: Number(mealId),
    },
    select: {
      mealName: true,
      mealType: true,
      imgURL: true,
      mealTimes: {
        select: {
          mealTime: true,
        },
      },
      nutrients: {
        select: {
          nutrientValue: true,
          nutrient: true,
        },
      },
      ingredients: {
        select: {
          ingredientValue: true,
          ingredientUnit: true,
          ingredient: {
            select: {
              ingredientId: true,
              ingredientName: true,
            },
          },
        },
      },
    },
  });
};

const findManyMealNutrientRepository = async (mealIds: Array<number>) => {
  return await prisma.meal.findMany({
    where: {
      mealId: { in: mealIds },
    },
    select: {
      mealId: true,
      nutrients: {
        select: {
          nutrientValue: true,
          nutrient: true,
        },
      },
    },
  });
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

const findMealIngredients = async (mealIds: Array<number>) => {
  return await prisma.meal.findMany({
    where: {
      mealId: { in: mealIds },
    },
    select: {
      mealId: true,
      ingredients: {
        select: {
          ingredientId: true,
          ingredientUnit: true,
          ingredientValue: true,
        },
      },
    },
  });
};

const createOrUpdateMealRepository = async (
  createMealRequest: CreateOrUpdateMealDto,
  id?: number | string
) => {
  const { mealName, mealType, ingredients, mealTimes, nutrients } =
    createMealRequest;

  if (id)
    return await prisma.meal.update({
      where: {
        mealId: Number(id),
      },
      data: {
        mealName,
        mealType,
        mealTimes: {
          deleteMany: {},
          create: mealTimes,
        },
        ingredients: {
          deleteMany: {},
          create: ingredients,
        },
        nutrients: {
          deleteMany: {},
          create: nutrients,
        },
      },
    });

  return await prisma.meal.create({
    data: {
      mealName,
      mealType,
      mealTimes: {
        create: mealTimes,
      },
      ingredients: {
        create: ingredients,
      },
      nutrients: {
        create: nutrients,
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

const findMealWithMealTimesRepository = async () => {
  return prisma.mealTime.findMany({
    select: {
      mealTime: true,
      meals: {
        select: {
          meal: {
            select: {
              mealId: true,
              mealName: true,
              imgURL: true,
              nutrients: {
                select: {
                  nutrientValue: true,
                  nutrient: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const findMealByMealTimesRepository = async (mealTime: mealTimeEnum) => {
  return prisma.mealTime.findUnique({
    where: {
      mealTime,
    },
    select: {
      mealTime: true,
      meals: {
        select: {
          meal: {
            select: {
              mealId: true,
              mealName: true,
              imgURL: true,
              nutrients: {
                select: {
                  nutrientValue: true,
                  nutrient: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const updateMealNutrient = (
  mealId: number,
  nutrients: Array<MealNutrientDto>
) => {
  return prisma.meal.update({
    where: {
      mealId,
    },
    data: {
      nutrients: {
        deleteMany: {},
        create: nutrients,
      },
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
  findMealWithMealTimesRepository,
  findManyMealNutrientRepository,
  updateMealNutrient,
  findMealIngredients,
  findMealByMealTimesRepository,
};
