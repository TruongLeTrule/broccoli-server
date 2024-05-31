import {
  nutrientType,
  nutrientUnit,
  ingredientUnit,
  ingredientType,
} from '@prisma/client';

export interface IngredientPrisma {
  ingredientValue: number;
  ingredientUnit: ingredientUnit;
  ingredient: {
    ingredientId: number;
    ingredientName: string;
    ingredientType: ingredientType | null;
  };
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
