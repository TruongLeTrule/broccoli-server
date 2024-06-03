import { nutrientUnitEnum } from '@prisma/client';

export interface CleanMealNutrient {
  nutrientName: string;
  nutrientUnit: nutrientUnitEnum | null;
  nutrientValue: number;
}
