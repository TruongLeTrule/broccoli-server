import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findAllNutrientsRepository } from '../repositories/nutrient.repository';

export const findAllNutrientsController = async (_: any, res: Response) => {
  const nutrients = await findAllNutrientsRepository();

  res.status(StatusCodes.OK).json({ nutrients });
};
