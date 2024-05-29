import {
  createUserRepository,
  findOneUserRepository,
} from '../repositories/user.repository';
import { RegisterUser } from '../types/user.type';
import { hashPassword } from '../utils/password.util';

export const createUser = async (registerUser: RegisterUser) => {
  const { username, password, fullName } = registerUser;

  const hashedPassword = await hashPassword(password);

  await createUserRepository(username, hashedPassword, fullName);
};

export const findOneUser = async (username: string) => {
  return await findOneUserRepository(username);
};
