import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUserRepository = async (
  username: string,
  hashedPassword: string,
  fullName: string
) => {
  return await prisma.user.create({
    data: {
      username,
      hashedPassword,
      fullName,
    },
  });
};

export const findUniqueUserRepository = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
};
