import { PrismaClient } from '@prisma/client';
import { CreateUserTargetDto } from '../dtos/user.dto';

const prisma = new PrismaClient();

const createUserRepository = async (
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

const findUniqueUserRepository = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
};

const findUserTargetRepository = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      nutrients: {
        select: {
          targetNutrientValue: true,
          nutrient: true,
        },
      },
    },
  });
};

const createOrUpdateUserTargetRepository = async (
  userId: string,
  createUserTargetRequest: CreateUserTargetDto
) => {
  const { nutrients } = createUserTargetRequest;

  await prisma.user.update({
    where: {
      userId,
    },
    data: {
      nutrients: {
        deleteMany: {},
        create: nutrients,
      },
    },
  });
};

export {
  createUserRepository,
  findUniqueUserRepository,
  findUserTargetRepository,
  createOrUpdateUserTargetRepository,
};
