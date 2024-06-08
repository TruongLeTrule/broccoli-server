import { mealTimeEnum } from '@prisma/client';

export interface MealPlanDto {
  appliedDate: Date;
  userId: string;
  chosenMeals: Array<ChosenMealDto>;
  nutrients: Array<MealPlanNutrientDto>;
}

export interface ChosenMealDto {
  mealId: number | undefined;
  mealName: string | undefined;
  mealTime: mealTimeEnum;
  quantity: number;
  imgURL: string | undefined | null;
}

export interface MealPlanNutrientDto {
  nutrientId: number;
  nutrientValue: number;
}

export interface ExistMealsDto {
  breakfast: Array<number>;
  lunch: Array<number>;
  dinner: Array<number>;
  snack: Array<number>;
}
