import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUserRepository = async (
  username: string,
  hashedPassword: string,
  fullName: string
) => {
  await prisma.user.create({
    data: {
      username,
      hashedPassword,
      fullName,
    },
  });
};

export const findOneUserRepository = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return user;
};
