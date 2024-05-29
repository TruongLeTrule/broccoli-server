import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findAllIngredients } from '../services/nutrient.service';

export const getAllNutrients = async (_: any, res: Response) => {
  const nutrients = await findAllIngredients();

  res.status(StatusCodes.OK).json({ nutrients });
};
