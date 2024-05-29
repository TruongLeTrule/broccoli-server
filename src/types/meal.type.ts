import { ingredientType, ingredientUnit } from '@prisma/client';

export interface CreateMealRequest {
  id: number;
  ingredientValue: number;
  ingredientUnit: ingredientUnit;
}

export interface HandledCreateMealRequest {
  ingredientId: number;
  ingredientValue: number;
  ingredientUnit: ingredientUnit;
}

export interface MealPrismaRespond {
  ingredientValue: number;
  ingredientUnit: ingredientUnit;
  ingredient: {
    ingredientName: string;
    ingredientType: ingredientType | null;
  };
}
