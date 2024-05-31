import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { oneDay } from '../utils/constants.util';
import { registerService, loginService } from '../services/user.service';
import { BadRequestError } from '../utils/customErrors';

const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new BadRequestError('username or password is required');

  const token = await loginService(username, password);

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay * 30),
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(StatusCodes.OK).json({ msg: 'login successful' });
};

const registerController = async (req: Request, res: Response) => {
  const { username, password, fullName } = req.body;

  if (!username || !password || !fullName)
    throw new BadRequestError('Please fill all required fields');

  const user = await registerService(username, password, fullName);

  res.status(StatusCodes.CREATED).json({ msg: 'register successful', user });
};

export { loginController, registerController };
