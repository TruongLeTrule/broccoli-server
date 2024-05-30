import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  findAllMealsService,
  findMealByNameService,
  createMealService,
  findMealSpecificByIdService,
  deleteMealService,
  updateMealService,
} from '../services/meal.service';

export const getAllMealsController = async (req: Request, res: Response) => {
  const meals = await findAllMealsService(
    parseInt(req.query.page as string),
    parseInt(req.query.limit as string)
  );

  res.status(StatusCodes.OK).json({ meals });
};

export const getMealByIdController = async (req: Request, res: Response) => {
  const meal = await findMealSpecificByIdService(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({ meal });
};

export const getMealByNameController = async (req: Request, res: Response) => {
  const meals = await findMealByNameService(req.body.mealName);

  res.status(StatusCodes.OK).json({ meals });
};

export const postMealController = async (req: Request, res: Response) => {
  const meal = await createMealService(req.body);

  res.status(StatusCodes.CREATED).json({ msg: 'Meal created', meal });
};

export const deleteMealController = async (req: Request, res: Response) => {
  const meal = await deleteMealService(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({ msg: 'Meal deleted', meal });
};

export const updateMealController = async (req: Request, res: Response) => {
  const meal = await updateMealService(parseInt(req.params.id), req.body);

  res.status(StatusCodes.OK).json({ msg: 'Meal updated', meal });
};
