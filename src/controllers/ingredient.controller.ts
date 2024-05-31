import {
  findAllIngredientsService,
  findIngredientByNameService,
  findIngredientSpecificByIdService,
  createIngredientService,
  updateIngredientService,
  deleteIngredientService,
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
  const ingredient = await findIngredientSpecificByIdService(
    parseInt(req.params.id)
  );

  res.status(StatusCodes.OK).json({ ingredient });
};

export const postIngredientController = async (req: Request, res: Response) => {
  const ingredient = await createIngredientService(req.body);

  res.status(StatusCodes.OK).json({ msg: 'Ingredient created', ingredient });
};

export const updateIngredientController = async (
  req: Request,
  res: Response
) => {
  const ingredient = await updateIngredientService(
    req.body,
    parseInt(req.params.id)
  );

  res.status(StatusCodes.OK).json({ msg: 'Ingredient updated', ingredient });
};

export const deleteIngredientController = async (
  req: Request,
  res: Response
) => {
  const ingredient = await deleteIngredientService(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({ msg: 'Ingredient deleted', ingredient });
};
