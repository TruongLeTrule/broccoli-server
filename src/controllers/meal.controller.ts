import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  findAllMeals,
  findMealByName,
  createMeal,
  findMealSpecificById,
} from '../services/meal.service';

export const getAllMeals = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const meals = await findAllMeals(
    parseInt(page as string),
    parseInt(limit as string)
  );

  res.status(StatusCodes.OK).json({ meals });
};

export const getMealById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const meal = await findMealSpecificById(parseInt(id));

  res.status(StatusCodes.OK).json({ meal });
};

export const getMealByName = async (req: Request, res: Response) => {
  const { mealName } = req.body;

  const meals = await findMealByName(mealName);

  res.status(StatusCodes.OK).json({ meals });
};

export const postMeal = async (req: Request, res: Response) => {
  const { mealName, ingredients } = req.body;

  await createMeal(mealName, ingredients);

  res.status(StatusCodes.CREATED).json({ msg: 'Meal created' });
};
