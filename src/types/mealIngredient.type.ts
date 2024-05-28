import { ingredientType, ingredientUnit } from '@prisma/client';

export interface MealIngredientRequest {
  id: number;
  ingredientValue: number;
  ingredientUnit: ingredientUnit;
}

export interface MealIngredient {
  ingredientId: number;
  ingredientValue: number;
  ingredientUnit: ingredientUnit;
}

export interface ResponseIngredient {
  ingredientValue: number;
  ingredientUnit: ingredientUnit;
  ingredient: {
    ingredientName: string;
    ingredientType: ingredientType | null;
  };
}
