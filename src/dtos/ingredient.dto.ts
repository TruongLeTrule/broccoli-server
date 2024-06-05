import {
  ingredientTypeEnum,
  nutrientTypeEnum,
  nutrientUnitEnum,
} from '@prisma/client';

export interface CreateOrUpdateIngredientDto {
  ingredientName: string;
  ingredientType: ingredientTypeEnum;
  nutrients: Array<{
    nutrientValueOn100g: number;
    nutrientId: number;
  }>;
}

export interface IngredientNutrientPrismaDto {
  nutrientValueOn100g: number;
  nutrient: {
    nutrientId: number;
    nutrientType: nutrientTypeEnum;
    nutrientName: string;
    nutrientUnit: nutrientUnitEnum;
  };
}
