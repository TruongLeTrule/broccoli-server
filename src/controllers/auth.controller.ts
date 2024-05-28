import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { oneDay } from '../utils/constants.util';
import { createToken } from '../utils/token.util';
import { comparePassword } from '../utils/password.util';
import { createUser, findOneUser } from '../services/user.service';
import { BadRequestError, NotFoundError } from '../utils/customErrors';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const foundUser = await findOneUser(username);
  if (!foundUser) throw new NotFoundError('wrong username or password');

  const isPasswordValid = await comparePassword(
    password,
    foundUser.hashedPassword
  );
  if (!isPasswordValid) throw new NotFoundError('wrong username or password');

  const token = createToken({ userId: foundUser.id });

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay * 30),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).json({ msg: 'login successful' });
};

const register = async (req: Request, res: Response) => {
  const foundUser = await findOneUser(req.body.username);
  if (foundUser) throw new BadRequestError('account already exists');

  await createUser(req.body);

  res.status(StatusCodes.CREATED).json({ msg: 'register successful' });
};

export { login, register };
