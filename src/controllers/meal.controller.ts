import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findMealSpecificByIdService } from '../services/meal.service';

import {
  findAllMealsRepository,
  findMealByNameRepository,
  createOrUpdateMealRepository,
  deleteMealRepository,
} from '../repositories/meal.repository';

export const findAllMealsController = async (req: Request, res: Response) => {
  const meals = await findAllMealsRepository(
    parseInt(req.query.page as string),
    parseInt(req.query.limit as string)
  );

  res.status(StatusCodes.OK).json({ meals });
};

export const findMealByIdController = async (req: Request, res: Response) => {
  const meal = await findMealSpecificByIdService(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({ meal });
};

export const findMealByNameController = async (req: Request, res: Response) => {
  const meals = await findMealByNameRepository(req.body.mealName);

  res.status(StatusCodes.OK).json({ meals });
};

export const postMealController = async (req: Request, res: Response) => {
  const meal = await createOrUpdateMealRepository(req.body);

  res.status(StatusCodes.CREATED).json({ msg: 'Meal created', meal });
};

export const deleteMealController = async (req: Request, res: Response) => {
  const meal = await deleteMealRepository(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({ msg: 'Meal deleted', meal });
};

export const updateMealController = async (req: Request, res: Response) => {
  const meal = await createOrUpdateMealRepository(
    req.body,
    parseInt(req.params.id)
  );

  res.status(StatusCodes.OK).json({ msg: 'Meal updated', meal });
};
