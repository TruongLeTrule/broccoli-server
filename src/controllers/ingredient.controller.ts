import { findIngredientSpecificByIdService } from '../services/ingredient.service';
import {
  findAllIngredientsRepository,
  findIngredientByNameRepository,
  createOrUpdateIngredientRepository,
  deleteIngredientRepository,
} from '../repositories/ingredient.repository';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const findAllIngredientsController = async (_: any, res: Response) => {
  const ingredients = await findAllIngredientsRepository();

  res.status(StatusCodes.OK).json({ ingredients });
};

export const findIngredientByNameController = async (
  req: Request,
  res: Response
) => {
  const { ingredientName } = req.body;

  const ingredients = await findIngredientByNameRepository(ingredientName);

  res.status(StatusCodes.OK).json({ ingredients });
};

export const findIngredientByIdController = async (
  req: Request,
  res: Response
) => {
  const ingredient = await findIngredientSpecificByIdService(
    parseInt(req.params.id)
  );

  res.status(StatusCodes.OK).json({ ingredient });
};

export const postIngredientController = async (req: Request, res: Response) => {
  const ingredient = await createOrUpdateIngredientRepository(req.body);

  res.status(StatusCodes.OK).json({ msg: 'Ingredient created', ingredient });
};

export const updateIngredientController = async (
  req: Request,
  res: Response
) => {
  const ingredient = await createOrUpdateIngredientRepository(
    req.body,
    parseInt(req.params.id)
  );

  res.status(StatusCodes.OK).json({ msg: 'Ingredient updated', ingredient });
};

export const deleteIngredientController = async (
  req: Request,
  res: Response
) => {
  const ingredient = await deleteIngredientRepository(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({ msg: 'Ingredient deleted', ingredient });
};
