import { nutrientUnit } from '@prisma/client';
import { MealPrismaResponse } from '../types/prismaResponse.type';

interface mealNutrient {
  nutrientName: string;
  nutrientUnit: nutrientUnit | null;
  nutrientValue: number;
}

interface NutrientPrismaResponse {
  nutrientValueOn100g: number;
  nutrient: {
    nutrientName: string;
    nutrientUnit: nutrientUnit | null;
  };
}

export const handleMealSpecificResponse = (meal: MealPrismaResponse) => {
  const { ingredients, ...mealProp } = meal;

  var mealNutrients: Array<mealNutrient> = [];

  const mealIngredients = ingredients?.map(
    ({ ingredientValue, ingredientUnit, ingredient, ingredientUnitCovert }) => {
      const { ingredientId, ingredientName, ingredientType, nutrients } =
        ingredient;

      const handledIngredientNutrients = handleIngredientNutrients(
        ingredientValue,
        ingredientUnitCovert.covertToGrams,
        nutrients
      );

      if (!mealNutrients.length) {
        mealNutrients = handledIngredientNutrients;
      } else {
        mealNutrients = mealNutrients.map(
          ({ nutrientName, nutrientUnit, nutrientValue }) => ({
            nutrientValue: (nutrientValue +=
              handledIngredientNutrients.find(
                (item) => item.nutrientName === nutrientName
              )?.nutrientValue || 0),
            nutrientUnit,
            nutrientName,
          })
        );
      }

      return {
        ingredientValue,
        ingredientUnit,
        ingredientId,
        ingredientName,
        ingredientType,
      };
    }
  );

  return {
    ...mealProp,
    ingredients: mealIngredients,
    nutrients: mealNutrients,
  };
};

const handleIngredientNutrients = (
  ingredientValue: number,
  covertToGrams: number,
  nutrients: Array<NutrientPrismaResponse>
) => {
  return nutrients.map(({ nutrientValueOn100g, nutrient }) => {
    const { nutrientName, nutrientUnit } = nutrient;
    return {
      nutrientName,
      nutrientUnit,
      nutrientValue: calculateIngredientNutrientValue(
        ingredientValue,
        covertToGrams,
        nutrientValueOn100g
      ),
    };
  });
};

const calculateIngredientNutrientValue = (
  ingredientValue: number,
  covertToGrams: number,
  nutrientValueOn100g: number
) => {
  return (ingredientValue * covertToGrams * nutrientValueOn100g) / 100;
};
