import {
  findAllIngredientsService,
  findIngredientByNameService,
  findIngredientSpecificByIdService,
  createIngredientService,
} from '../services/ingredient.service';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const getAllIngredientsController = async (_: any, res: Response) => {
  const ingredients = await findAllIngredientsService();
  res.status(StatusCodes.OK).json({ ingredients });
};

export const getIngredientByNameController = async (
  req: Request,
  res: Response
) => {
  const { ingredientName } = req.body;

  const ingredients = await findIngredientByNameService(ingredientName);

  res.status(StatusCodes.OK).json({ ingredients });
};

export const getIngredientByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const ingredient = await findIngredientSpecificByIdService(parseInt(id));

  res.status(StatusCodes.OK).json({ ingredient });
};

export const postIngredientController = async (req: Request, res: Response) => {
  const { ingredientName, ingredientType, nutrients } = req.body;

  await createIngredientService(ingredientName, ingredientType, nutrients);

  res.status(StatusCodes.OK).json({ msg: 'Ingredient created' });
};
