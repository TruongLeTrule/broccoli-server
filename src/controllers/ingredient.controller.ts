import {
  findAllIngredients,
  findIngredientByName,
  findIngredientSpecificById,
  createIngredient,
} from '../services/ingredient.service';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const getAllIngredients = async (_: any, res: Response) => {
  const ingredients = await findAllIngredients();
  res.status(StatusCodes.OK).json({ ingredients });
};

export const getIngredientByName = async (req: Request, res: Response) => {
  const { ingredientName } = req.body;

  const ingredients = await findIngredientByName(ingredientName);

  res.status(StatusCodes.OK).json({ ingredients });
};

export const getIngredientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const ingredient = await findIngredientSpecificById(parseInt(id));

  res.status(StatusCodes.OK).json({ ingredient });
};

export const postIngredient = async (req: Request, res: Response) => {
  const { ingredientName, ingredientType, nutrients } = req.body;

  await createIngredient(ingredientName, ingredientType, nutrients);

  res.status(StatusCodes.OK).json({ msg: 'Ingredient created' });
};
