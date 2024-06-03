import { userRoleEnum } from '@prisma/client';

export interface CreateUserTargetDto {
  nutrients: Array<{
    nutrientId: number;
    targetNutrientValue: number;
  }>;
}

export interface CreateUserDto {
  username: string;
  password: string;
  role: userRoleEnum;
}

export interface UpdateUserDto {
  username: string;
  fullName: string;
}
