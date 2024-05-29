import {
  createUserRepository,
  findUniqueUserRepository,
} from '../repositories/user.repository';
import { createToken } from '../utils/token.util';
import { hashPassword } from '../utils/password.util';
import { comparePassword } from '../utils/password.util';
import { BadRequestError, NotFoundError } from '../utils/customErrors';

export const registerService = async (
  username: string,
  password: string,
  fullName: string
) => {
  const foundUser = await findUniqueUserRepository(username);
  if (foundUser) throw new BadRequestError('account already exists');

  const hashedPassword = await hashPassword(password);

  await createUserRepository(username, hashedPassword, fullName);
};

export const loginService = async (username: string, password: string) => {
  const foundUser = await findUniqueUserRepository(username);
  if (!foundUser) throw new NotFoundError('wrong username or password');

  const isPasswordValid = await comparePassword(
    password,
    foundUser.hashedPassword
  );
  if (!isPasswordValid) throw new NotFoundError('wrong username or password');

  return createToken({ userId: foundUser.userId });
};
