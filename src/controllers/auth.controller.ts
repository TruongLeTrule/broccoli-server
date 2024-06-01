import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { oneDay } from '../utils/constants.util';
import { hashPassword, comparePassword } from '../utils/password.util';
import { createToken } from '../utils/token.util';
import { NotFoundError } from '../utils/customErrors';
import {
  createUserRepository,
  findUserByUsernameRepository,
  getUserCountRepository,
} from '../repositories/user.repository';

const registerController = async (req: Request, res: Response) => {
  const isFirstUser = (await getUserCountRepository()) === 0;

  req.body.role = isFirstUser ? 'admin' : 'user';

  req.body.password = await hashPassword(req.body.password);

  const user = await createUserRepository(req.body);

  res.status(StatusCodes.CREATED).json({ msg: 'register successful', user });
};

const loginController = async (req: Request, res: Response) => {
  const user = await findUserByUsernameRepository(req.body.username);

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new NotFoundError('wrong username or password');

  const token = createToken({
    userId: user.userId,
    role: user.role,
  });

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).json({ msg: 'login successful', user });
};

const logoutController = async (_: any, res: Response) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'logged out successful' });
};

export { loginController, registerController, logoutController };
