import { nutrientUnit } from '@prisma/client';

export interface CleanMealNutrient {
  nutrientName: string;
  nutrientUnit: nutrientUnit | null;
  nutrientValue: number;
}
