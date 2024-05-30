import { ingredientType, ingredientUnit, mealType } from '@prisma/client';

export interface CreateOrUpdateMealDto {
  mealName: string;
  mealType: mealType | undefined;
  ingredients: Array<{
    ingredientId: number;
    ingredientValue: number;
    ingredientUnit: ingredientUnit;
  }>;
}

export interface IngredientPrisma {
  ingredientValue: number;
  ingredientUnit: ingredientUnit;
  ingredient: {
    ingredientName: string;
    ingredientType: ingredientType | null;
  };
}
