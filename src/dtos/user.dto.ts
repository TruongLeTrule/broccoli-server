import { userRole } from '@prisma/client';

export interface CreateUserTargetDto {
  nutrients: Array<{
    nutrientId: number;
    targetNutrientValue: number;
  }>;
}

export interface CreateUserDto {
  username: string;
  password: string;
  fullName: string;
  role: userRole;
}

export interface UpdateUserDto {
  username: string;
  fullName: string;
}
