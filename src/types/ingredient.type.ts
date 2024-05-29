import { nutrientType, nutrientUnit } from '@prisma/client';

export interface IngredientNutrientRequest {
  nutrientValueOn100g: number;
  nutrientId: number;
}

export interface NutrientPrisma {
  nutrientValueOn100g: number;
  nutrient: {
    nutrientId: number;
    nutrientName: string;
    nutrientType: nutrientType;
    nutrientUnit: nutrientUnit | null;
  };
}
