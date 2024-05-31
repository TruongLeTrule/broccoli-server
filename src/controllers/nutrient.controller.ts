import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findNutrientsRepository } from '../repositories/nutrient.repository';

export const findNutrientsController = async (_: any, res: Response) => {
  const nutrients = await findNutrientsRepository();

  res.status(StatusCodes.OK).json({ nutrients });
};
