import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findMealSpecificService } from '../services/meal.service';
import {
  findMealsRepository,
  findMealByNameRepository,
  createOrUpdateMealRepository,
  deleteMealRepository,
} from '../repositories/meal.repository';

const findMealsController = async (req: Request, res: Response) => {
  const meals = await findMealsRepository(
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
  const meal = await createOrUpdateMealRepository(req.body);

  res.status(StatusCodes.CREATED).json({ msg: 'Meal created', meal });
};

const deleteMealController = async (req: Request, res: Response) => {
  const meal = await deleteMealRepository(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({ msg: 'Meal deleted', meal });
};

const updateMealController = async (req: Request, res: Response) => {
  const meal = await createOrUpdateMealRepository(
    req.body,
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
