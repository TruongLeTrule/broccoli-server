import { PrismaClient } from '@prisma/client';
import { ChosenMealDto } from '../dtos/userPlan.dto';

const prisma = new PrismaClient();

const createDayPlanRepository = async (meals: Array<ChosenMealDto>) => {
  return await prisma.chosenMeal.createMany({
    data: meals,
  });
};

const findAllChosenMealRepository = async (userId: string) => {
  return await prisma.chosenMeal.findMany({
    where: {
      userId,
    },
  });
};

export { createDayPlanRepository, findAllChosenMealRepository };
