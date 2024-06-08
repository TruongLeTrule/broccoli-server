import { PrismaClient, mealTimeEnum } from '@prisma/client';
import { MealPlanDto } from '../dtos/mealPlan.dto';

const prisma = new PrismaClient();

const createDayPlanRepository = async (mealPlan: MealPlanDto) => {
  const { appliedDate, userId, nutrients } = mealPlan;

  const chosenMeals = mealPlan.chosenMeals.map(
    ({ mealId, mealTime, quantity }) => ({
      mealId: mealId as number,
      mealTime,
      quantity,
    })
  );

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

const updateDayPlanRepository = async (mealPlan: MealPlanDto) => {
  const { appliedDate, userId, nutrients } = mealPlan;

  const chosenMeals = mealPlan.chosenMeals.map(
    ({ mealId, mealTime, quantity }) => ({
      mealId: mealId as number,
      mealTime,
      quantity,
    })
  );

  return prisma.mealPlan.update({
    where: {
      appliedDate,
      userId,
    },
    data: {
      chosenMeals: {
        deleteMany: {},
        create: chosenMeals,
      },
      nutrients: {
        deleteMany: {},
        create: nutrients,
      },
    },
  });
};

const findMealPlanRepository = async (appliedDate: Date, userId: string) => {
  return await prisma.mealPlan.findUnique({
    where: {
      appliedDate,
      userId,
    },
    select: {
      mealPlanId: true,
      chosenMeals: {
        select: {
          mealId: true,
          mealTime: true,
          quantity: true,
          meal: {
            select: {
              mealName: true,
              imgURL: true,
            },
          },
        },
      },
      nutrients: {
        select: {
          nutrientValue: true,
          nutrientId: true,
          nutrient: true,
        },
      },
    },
  });
};

const deleteChosenMealRepository = async (
  mealId: number,
  mealPlanId: string,
  mealTime: mealTimeEnum
) => {
  return await prisma.chosenMeal.delete({
    where: {
      mealTime_mealId_mealPlanId: {
        mealId,
        mealPlanId,
        mealTime,
      },
    },
  });
};

export {
  createDayPlanRepository,
  findMealPlanRepository,
  updateDayPlanRepository,
  deleteChosenMealRepository,
};
