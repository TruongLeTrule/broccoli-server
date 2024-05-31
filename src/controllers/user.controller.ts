import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createOrUpdateUserTargetRepository } from '../repositories/user.repository';
import { findUserTargetService } from '../services/user.service';

const findUserTargetController = async (req: Request, res: Response) => {
  const nutrients = await findUserTargetService(req.params.id);

  res.status(StatusCodes.OK).json({ nutrients });
};

const createUserTargetController = async (req: Request, res: Response) => {
  await createOrUpdateUserTargetRepository(req.params.id, req.body);

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Create user target nutrient successful' });
};

const updateUserTargetController = async (req: Request, res: Response) => {
  await createOrUpdateUserTargetRepository(req.params.id, req.body);

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Update user target nutrient successful' });
};

export {
  findUserTargetController,
  createUserTargetController,
  updateUserTargetController,
};
