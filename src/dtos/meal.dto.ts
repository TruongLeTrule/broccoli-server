import { ingredientUnit, mealType } from '@prisma/client';

export interface CreateOrUpdateMealDto {
  mealName: string;
  mealType: mealType | undefined;
  ingredients: Array<{
    ingredientId: number;
    ingredientValue: number;
    ingredientUnit: ingredientUnit;
  }>;
}
