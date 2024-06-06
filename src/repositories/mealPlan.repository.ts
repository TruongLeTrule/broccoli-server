import { PrismaClient } from '@prisma/client';
import { MealPlanDto } from '../dtos/mealPlan.dto';

const prisma = new PrismaClient();

const createDayPlanRepository = async (mealPlan: MealPlanDto) => {
  const { appliedDate, userId, chosenMeals, nutrients } = mealPlan;
  return prisma.mealPlan.create({
    data: {
      appliedDate,
      userId,
      chosenMeals: {
        create: chosenMeals,
      },
      nutrients: {
        create: nutrients,
      },
    },
  });
};

const findAllChosenMealRepository = async (userId: string) => {
  return await prisma.chosenMeal.findMany({});
};

export { createDayPlanRepository, findAllChosenMealRepository };
