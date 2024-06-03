import { ingredientUnitEnum, mealTimeEnum, mealTypeEnum } from '@prisma/client';

export interface CreateOrUpdateMealDto {
  mealName: string;
  mealType: mealTypeEnum;
  mealTimes: Array<{
    mealTime: mealTimeEnum;
  }>;
  ingredients: Array<{
    ingredientId: number;
    ingredientValue: number;
    ingredientUnit: ingredientUnitEnum;
  }>;
}
