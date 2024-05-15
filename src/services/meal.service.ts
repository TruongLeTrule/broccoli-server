import { PrismaClient } from '@prisma/client';
import { Meal } from '../types/meal.type';

const prisma = new PrismaClient();

const findAllMeals = async (page: number | null, limit: number | null) => {
  limit = limit ? limit : 10;
  page = page ? (page - 1) * limit : 1;

  const meals = await prisma.meal.findMany({
    skip: page,
    take: limit,
  });
  return meals;
};

const findMeals = async (meal: string) => {
  const meals = await prisma.meal.findMany({
    where: {
      mealName: meal,
    },
  });
  return meals;
};

const createMeal = async (meal: Meal) => {
  const { mealName, caloriesPerServing } = meal;
  const meals = await prisma.meal.create({
    data: {
      mealName,
      caloriesPerServing,
    },
  });
  return meals;
};

export { findAllMeals, findMeals, createMeal };
