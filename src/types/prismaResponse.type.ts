import {
  nutrientUnit,
  ingredientUnit,
  ingredientType,
  nutrientType,
} from '@prisma/client';

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
    nutrients: Array<{
      nutrientValueOn100g: number;
      nutrient: {
        nutrientName: string;
        nutrientUnit: nutrientUnit;
      };
    }>;
  };
}

export interface IngredientNutrientPrisma {
  nutrientValueOn100g: number;
  nutrient: {
    nutrientId: number;
    nutrientType: nutrientType;
    nutrientName: string;
    nutrientUnit: nutrientUnit;
  };
}

export interface UserTargetNutrientPrisma {
  nutrients: Array<{
    targetNutrientValue: number;
    nutrient: {
      nutrientId: number;
      nutrientName: string;
      nutrientType: nutrientType;
      nutrientUnit: nutrientUnit;
    };
  }>;
}
