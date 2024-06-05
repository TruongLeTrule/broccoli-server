import {
  ingredientTypeEnum,
  ingredientUnitEnum,
  mealTimeEnum,
  mealTypeEnum,
  nutrientTypeEnum,
  nutrientUnitEnum,
} from '@prisma/client';

export interface CreateOrUpdateMealDto {
  mealName: string;
  mealType: mealTypeEnum;
  mealTimes: Array<{
    mealTime: mealTimeEnum;
  }>;
  ingredients: Array<{
    ingredientId: number;
    ingredientValue: number;
    ingredientUnit: ingredientUnitEnum;
  }>;
  nutrients: Array<{
    nutrientId: number;
    nutrientValue: number;
  }>;
}

export interface MealIngredientPrismaDto {
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

export interface MealPrismaDto {
  mealName: string;
  mealType: mealTypeEnum;
  imgURL: string;
  mealTimes: Array<{ mealTime: mealTimeEnum }>;
  ingredients: Array<{
    ingredientValue: number;
    ingredientUnit: ingredientUnitEnum;
    ingredient: {
      ingredientId: number;
      ingredientName: string;
    };
  }>;
  nutrients: Array<{
    nutrientValue: number;
    nutrient: {
      nutrientId: number;
      nutrientName: string;
      nutrientType: nutrientTypeEnum;
      nutrientUnit: nutrientUnitEnum;
    };
  }>;
}
