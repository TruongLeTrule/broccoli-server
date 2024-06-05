import {
  nutrientTypeEnum,
  nutrientUnitEnum,
  userRoleEnum,
} from '@prisma/client';

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

export interface UserTargetNutrientPrismaDto {
  targetNutrients: Array<{
    targetNutrientValue: number;
    nutrient: {
      nutrientId: number;
      nutrientName: string;
      nutrientType: nutrientTypeEnum;
      nutrientUnit: nutrientUnitEnum;
    };
  }>;
}
