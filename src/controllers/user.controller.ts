import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createOrUpdateUserTargetRepository,
  updateUserRepository,
  findUserByIdRepository,
  getUserCountRepository,
} from '../repositories/user.repository';
import { findUserTargetService } from '../services/user.service';
import { IGetUserAuthInfoRequest } from '../../custom';

const findUserTargetController = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const nutrients = await findUserTargetService(req.user?.userId as string);

  res.status(StatusCodes.OK).json({ nutrients });
};

const createUserTargetController = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  await createOrUpdateUserTargetRepository(
    req.user?.userId as string,
    req.body
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Create user target nutrient successful' });
};

const updateUserTargetController = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  await createOrUpdateUserTargetRepository(
    req.user?.userId as string,
    req.body
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Update user target nutrient successful' });
};

const getCurrentUserController = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const user = await findUserByIdRepository(req.user?.userId as string);
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

const updateUserController = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const updateReq = { ...req.body };
  delete updateReq.password;

  const user = await updateUserRepository(
    req.user?.userId as string,
    updateReq
  );

  res.status(StatusCodes.OK).json({ msg: 'update user successful', user });
};

const getAppStatsController = async (_: any, res: Response) => {
  const users = await getUserCountRepository();

  res.status(StatusCodes.OK).json({ users });
};

export {
  findUserTargetController,
  createUserTargetController,
  updateUserTargetController,
  getCurrentUserController,
  updateUserController,
  getAppStatsController,
};
