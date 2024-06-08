import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createDayPlanService,
  updateDayPlanService,
  updateOneMealService,
} from '../services/mealPlan.service';
import { IGetUserAuthInfoRequest } from '../../custom';
import { findUserTargetRepository } from '../repositories/user.repository';
import { findMealPlanRepository } from '../repositories/mealPlan.repository';

const createDayPlanController = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const targetCalories = (
    await findUserTargetRepository(req.user?.userId as string)
  )?.targetNutrients.find(
    ({ nutrient }) => nutrient.nutrientId === 1
  )?.targetNutrientValue;

  const mealPlan = await createDayPlanService(
    targetCalories,
    req.body.existMeals,
    req.body.appliedDate,
    req.user?.userId as string
  );

  res.status(StatusCodes.OK).json({ msg: 'meal plan created', ...mealPlan });
};

const updateDayPlanController = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const targetCalories = (
    await findUserTargetRepository(req.user?.userId as string)
  )?.targetNutrients.find(
    ({ nutrient }) => nutrient.nutrientId === 1
  )?.targetNutrientValue;

  const mealPlan = await updateDayPlanService(
    targetCalories,
    req.body.existMeals,
    req.body.appliedDate,
    req.user?.userId as string
  );

  res.status(StatusCodes.OK).json({ msg: 'meal plan updated', ...mealPlan });
};

const findDayPlanController = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const mealPlan = await findMealPlanRepository(
    req.body.appliedDate,
    req.user?.userId as string
  );

  const chosenMeals = mealPlan?.chosenMeals.map(({ meal, ...mealInfo }) => ({
    ...meal,
    ...mealInfo,
  }));

  const nutrients = mealPlan?.nutrients.map(
    ({ nutrient, ...nutrientInfo }) => ({
      ...nutrient,
      ...nutrientInfo,
    })
  );

  res.status(StatusCodes.OK).json({ chosenMeals, nutrients });
};

const updateChosenMealController = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const newMeal = await updateOneMealService(
    req.body.existMeals,
    req.body.appliedDate,
    req.body.mealId,
    req.body.mealTime,
    req.user?.userId as string
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: 'delete 1 meal and pick new one', ...newMeal });
};

export {
  createDayPlanController,
  updateDayPlanController,
  findDayPlanController,
  updateChosenMealController,
};
