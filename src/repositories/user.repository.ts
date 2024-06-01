import { PrismaClient } from '@prisma/client';
import {
  CreateUserTargetDto,
  CreateUserDto,
  UpdateUserDto,
} from '../dtos/user.dto';

const prisma = new PrismaClient();

const getUserCountRepository = async () => {
  return await prisma.user.count();
};

const createUserRepository = async (user: CreateUserDto) => {
  return await prisma.user.create({
    data: user,
  });
};

const updateUserRepository = async (userId: string, user: UpdateUserDto) => {
  return await prisma.user.update({
    where: {
      userId,
    },
    data: user,
  });
};

const findUserByUsernameRepository = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
};

const findUserByIdRepository = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      userId,
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
      targetNutrients: {
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
      targetNutrients: {
        deleteMany: {},
        create: nutrients,
      },
    },
  });
};

export {
  createUserRepository,
  findUserByUsernameRepository,
  findUserByIdRepository,
  findUserTargetRepository,
  createOrUpdateUserTargetRepository,
  getUserCountRepository,
  updateUserRepository,
};
