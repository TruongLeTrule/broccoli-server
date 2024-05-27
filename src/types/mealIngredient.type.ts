import { ingredientUnit } from '@prisma/client';

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
