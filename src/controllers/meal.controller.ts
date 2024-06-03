import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findMealSpecificService } from '../services/meal.service';
import {
  findMealsPaginationRepository,
  findMealByNameRepository,
  createOrUpdateMealRepository,
  deleteMealRepository,
} from '../repositories/meal.repository';
import { mealTimeEnum } from '@prisma/client';

const findMealsController = async (req: Request, res: Response) => {
  const meals = await findMealsPaginationRepository(
    parseInt(req.query.page as string),
    parseInt(req.query.limit as string)
  );

  res.status(StatusCodes.OK).json({ meals });
};

const findMealByIdController = async (req: Request, res: Response) => {
  const meal = await findMealSpecificService(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({ meal });
};

const findMealByNameController = async (req: Request, res: Response) => {
  const meals = await findMealByNameRepository(req.body.mealName);

  res.status(StatusCodes.OK).json({ meals });
};

const createMealController = async (req: Request, res: Response) => {
  const mealTimes = req.body?.mealTimes.map((mealTime: mealTimeEnum) => ({
    mealTime,
  }));
  const meal = await createOrUpdateMealRepository({ ...req.body, mealTimes });

  res.status(StatusCodes.CREATED).json({ msg: 'Meal created', meal });
};

const deleteMealController = async (req: Request, res: Response) => {
  const meal = await deleteMealRepository(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({ msg: 'Meal deleted', meal });
};

const updateMealController = async (req: Request, res: Response) => {
  const mealTimes = req.body?.mealTimes.map((mealTime: mealTimeEnum) => ({
    mealTime,
  }));
  const meal = await createOrUpdateMealRepository(
    { ...req.body, mealTimes },
    parseInt(req.params.id)
  );

  res.status(StatusCodes.OK).json({ msg: 'Meal updated', meal });
};

export {
  findMealsController,
  deleteMealController,
  createMealController,
  updateMealController,
  findMealByNameController,
  findMealByIdController,
};
