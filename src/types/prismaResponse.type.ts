import { nutrientUnit, ingredientUnit, ingredientType } from '@prisma/client';

export interface MealIngredientPrisma {
  ingredientValue: number;
  ingredientUnit: ingredientUnit;
  ingredientUnitCovert: {
    covertToGrams: number;
  };
  ingredient: {
    ingredientId: number;
    ingredientName: string;
    ingredientType: ingredientType | null;
    nutrients: Array<IngredientNutrientPrisma>;
  };
}

export interface IngredientNutrientPrisma {
  nutrientValueOn100g: number;
  nutrient: {
    nutrientName: string;
    nutrientUnit: nutrientUnit;
  };
}
