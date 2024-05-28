import { findAllIngredients } from '../services/ingredient.service';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

const getAllIngredients = async (req: Request, res: Response) => {
  const ingredients = await findAllIngredients();

  res.status(StatusCodes.OK).json({ ingredients });
};

export { getAllIngredients };
