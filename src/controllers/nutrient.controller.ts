import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findAllIngredientsService } from '../services/nutrient.service';

export const getAllNutrientsController = async (_: any, res: Response) => {
  const nutrients = await findAllIngredientsService();

  res.status(StatusCodes.OK).json({ nutrients });
};
