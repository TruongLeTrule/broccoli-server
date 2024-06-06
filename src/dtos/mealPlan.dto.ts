import { mealTimeEnum } from '@prisma/client';

export interface MealPlanDto {
  appliedDate: Date;
  userId: string;
  chosenMeals: Array<ChosenMealDto>;
  nutrients: Array<MealPlanNutrientDto>;
}

export interface ChosenMealDto {
  mealTime: mealTimeEnum;
  mealId: number;
  quantity: number;
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
