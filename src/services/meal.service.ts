import { PrismaClient } from '@prisma/client';
import {
  MealIngredient,
  MealIngredientRequest,
} from '../types/mealIngredient.type';

const prisma = new PrismaClient();

const findAllMeals = async (page: number | null, limit: number | null) => {
  limit = limit ? limit : 12;
  page = page ? (page - 1) * limit : 1;

  const meals = await prisma.meal.findMany({
    skip: page,
    take: limit,
  });
  return meals;
};

const findMealById = async (id: number) => {
  const meals = await prisma.meal.findFirst({
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
  return meals;
};

const findMealByName = async (mealName: string) => {
  const meals = await prisma.meal.findMany({
    where: {
      mealName: {
        contains: mealName,
      },
    },
  });
  return meals;
};

const createMeal = async (
  mealName: string,
  ingredients: Array<MealIngredientRequest>
) => {
  const handledIngredients: Array<MealIngredient> = ingredients.map(
    ({ id, ingredientValue, ingredientUnit }) => ({
      ingredientValue,
      ingredientUnit,
      ingredientId: id,
    })
  );

  await prisma.meal.create({
    data: {
      mealName,
      ingredients: {
        create: handledIngredients,
      },
    },
  });
};

export { findAllMeals, findMealByName, createMeal, findMealById };
