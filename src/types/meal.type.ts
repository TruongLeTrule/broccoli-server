import { ingredientType, ingredientUnit } from '@prisma/client';

export interface MealIngredientRequest {
  ingredientId: number;
  ingredientValue: number;
  ingredientUnit: ingredientUnit;
}

export interface IngredientPrisma {
  ingredientValue: number;
  ingredientUnit: ingredientUnit;
  ingredient: {
    ingredientName: string;
    ingredientType: ingredientType | null;
  };
}
