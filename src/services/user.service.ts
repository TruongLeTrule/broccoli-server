import { PrismaClient } from '@prisma/client';
import { RegisterUser } from '../types/user.types';
import { hashPassword } from '../utils/password.util';

const prisma = new PrismaClient();

const createUser = async (registerUser: RegisterUser) => {
  const { username, password, fullName } = registerUser;

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      username,
      hashedPassword,
      fullName,
    },
  });
};

const findOneUser = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return user;
};

export { createUser, findOneUser };
