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
  const { page, limit } = req.query;

  const meals = await findAllMealsService(
    parseInt(page as string),
    parseInt(limit as string)
  );

  res.status(StatusCodes.OK).json({ meals });
};

export const getMealByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const meal = await findMealSpecificByIdService(parseInt(id));

  res.status(StatusCodes.OK).json({ meal });
};

export const getMealByNameController = async (req: Request, res: Response) => {
  const { mealName } = req.body;

  const meals = await findMealByNameService(mealName);

  res.status(StatusCodes.OK).json({ meals });
};

export const postMealController = async (req: Request, res: Response) => {
  await createMealService(req.body);

  res.status(StatusCodes.CREATED).json({ msg: 'Meal created' });
};

export const deleteMealController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteMealService(parseInt(id));

  res.status(StatusCodes.OK).json({ msg: 'Meal deleted' });
};

export const updateMealController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await updateMealService(parseInt(id), req.body);

  res.status(StatusCodes.OK).json({ msg: 'Meal updated' });
};
