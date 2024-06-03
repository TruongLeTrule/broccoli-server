import { CreateDayPlanDto } from '../dtos/userPlan.dto';
import {
  createDayPlanRepository,
  findAllChosenMealRepository,
} from '../repositories/userPlan.repository';
import { findAllMealWithMealTimeRepository } from '../repositories/meal.repository';

const createDayPlanService = async (requestBody: CreateDayPlanDto) => {
  const { calories, userId, meals } = requestBody;

  // const plan = await createDayPlanRepository(
  //   meals.map((meal) => ({
  //     ...meal,
  //     userId,
  //     appliedDate: new Date(meal.appliedDate),
  //   }))
  // );

  // const chosenMeals = await findAllChosenMealRepository(userId);

  const meal = await findAllMealWithMealTimeRepository();

  return meal;
};

export { createDayPlanService };
