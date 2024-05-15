import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findAllMeals, findMeals, createMeal } from '../services/meal.service';

const getAllMeals = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const meals = await findAllMeals(
    parseInt(page as string),
    parseInt(limit as string)
  );

  res.status(StatusCodes.OK).json({ data: { meals } });
};

const getMealByName = async (req: Request, res: Response) => {
  const { meal } = req.params;

  const meals = await findMeals(meal);

  res.status(StatusCodes.OK).json({ data: { meals } });
};

const postMeal = async (req: Request, res: Response) => {
  await createMeal(req.body);

  res.status(StatusCodes.CREATED).json({ msg: 'Meal created' });
};

export { getAllMeals, getMealByName, postMeal };
