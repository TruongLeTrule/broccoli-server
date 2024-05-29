import { ingredientType, nutrientUnit } from '@prisma/client';

export interface CreateIngredientRequest {
  nutrientValueOn100g: number;
  id: number;
}

export interface HandledCreateIngredientRequest {
  nutrientValueOn100g: number;
  nutrientId: number;
}

export interface CreateIngredientPrisma {
  ingredientName: string;
  ingredientType: ingredientType;
  nutrient: {
    nutrientName: string;
    nutrientUnit: ingredientType | null;
  };
}
