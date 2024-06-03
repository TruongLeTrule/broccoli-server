import {
  nutrientUnitEnum,
  ingredientUnitEnum,
  ingredientTypeEnum,
  nutrientTypeEnum,
} from '@prisma/client';

export interface MealIngredientPrisma {
  ingredientValue: number;
  ingredientUnit: ingredientUnitEnum;
  ingredientUnitCovert: {
    covertToGrams: number;
  };
  ingredient: {
    ingredientId: number;
    ingredientName: string;
    ingredientType: ingredientTypeEnum | null;
    nutrients: Array<{
      nutrientValueOn100g: number;
      nutrient: {
        nutrientName: string;
        nutrientUnit: nutrientUnitEnum;
      };
    }>;
  };
}

export interface IngredientNutrientPrisma {
  nutrientValueOn100g: number;
  nutrient: {
    nutrientId: number;
    nutrientType: nutrientTypeEnum;
    nutrientName: string;
    nutrientUnit: nutrientUnitEnum;
  };
}

export interface UserTargetNutrientPrisma {
  targetNutrients: Array<{
    targetNutrientValue: number;
    nutrient: {
      nutrientId: number;
      nutrientName: string;
      nutrientType: nutrientTypeEnum;
      nutrientUnit: nutrientUnitEnum;
    };
  }>;
}
