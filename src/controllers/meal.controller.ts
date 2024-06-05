import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  calculateMealNutrientService,
  cleanMealSpecificResponse,
} from '../services/meal.service';
import {
  findMealsPaginationRepository,
  findMealByNameRepository,
  createOrUpdateMealRepository,
  deleteMealRepository,
  findMealByIdRepository,
} from '../repositories/meal.repository';
import { mealTimeEnum } from '@prisma/client';
import { MealPrismaDto } from '../dtos/meal.dto';

const findMealsController = async (req: Request, res: Response) => {
  const meals = await findMealsPaginationRepository(
    parseInt(req.query.page as string),
    parseInt(req.query.limit as string)
  );

  res.status(StatusCodes.OK).json({ meals });
};

const findMealByIdController = async (req: Request, res: Response) => {
  const meal = await findMealByIdRepository(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({
    meal: {
      ...cleanMealSpecificResponse(meal as MealPrismaDto),
    },
  });
};

const findMealByNameController = async (req: Request, res: Response) => {
  const meals = await findMealByNameRepository(req.body.mealName);

  res.status(StatusCodes.OK).json({ meals });
};

const createMealController = async (req: Request, res: Response) => {
  let { mealTimes, ingredients, ...mealInfo } = req.body;

  const nutrients = await calculateMealNutrientService(ingredients);

  const meal = await createOrUpdateMealRepository({
    nutrients,
    mealTimes: mealTimes.map((mealTime: mealTimeEnum) => ({ mealTime })),
    ingredients,
    ...mealInfo,
  });

  res.status(StatusCodes.CREATED).json({
    msg: 'Meal created',
    meal,
  });
};

const deleteMealController = async (req: Request, res: Response) => {
  const meal = await deleteMealRepository(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({ msg: 'Meal deleted', meal });
};

const updateMealController = async (req: Request, res: Response) => {
  let { mealTimes, ingredients, ...mealInfo } = req.body;

  const nutrients = await calculateMealNutrientService(ingredients);

  const meal = await createOrUpdateMealRepository(
    {
      nutrients,
      mealTimes: mealTimes.map((mealTime: mealTimeEnum) => ({ mealTime })),
      ingredients,
      ...mealInfo,
    },
    req.params.id
  );

  res.status(StatusCodes.CREATED).json({
    msg: 'Meal updated',
    meal,
  });
};

export {
  findMealsController,
  deleteMealController,
  createMealController,
  updateMealController,
  findMealByNameController,
  findMealByIdController,
};
