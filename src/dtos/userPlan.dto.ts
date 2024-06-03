import { mealTimeEnum } from '@prisma/client';

export interface CreateDayPlanDto {
  userId: string;
  calories: number;
  meals: Array<{
    appliedDate: Date;
    mealTime: mealTimeEnum;
    mealId: number;
    quantity: number;
  }>;
}

export interface ChosenMealDto {
  userId: string;
  appliedDate: Date;
  mealTime: mealTimeEnum;
  mealId: number;
  quantity: number;
}
