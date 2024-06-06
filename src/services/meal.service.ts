import { MealPrismaDto } from '../dtos/meal.dto';
import {
  findManyIngredientNutrientRepository,
  findUnitCovertRepository,
} from '../repositories/ingredient.repository';
import { ingredientUnitEnum } from '@prisma/client';

const calculateMealNutrientService = async (
  ingredients: Array<{
    ingredientId: number;
    ingredientUnit: ingredientUnitEnum;
    ingredientValue: number;
  }>
) => {
  let mealNutrients: Array<{
    nutrientId: number;
    nutrientValue: number;
  }> = [];
  const ingredientIds = ingredients.map(({ ingredientId }) => ingredientId);
  const nutrients = await findManyIngredientNutrientRepository(ingredientIds);
  const unitCovert = await findUnitCovertRepository();

  const ingredientsWithNutrients = ingredients.map(
    ({ ingredientValue, ingredientUnit }, index) => {
      return {
        ingredientValue,
        covertToGrams:
          unitCovert.find(
            (unitCovert) => unitCovert.ingredientUnit === ingredientUnit
          )?.covertToGrams || 1,
        nutrients: nutrients[index].nutrients,
      };
    }
  );

  ingredientsWithNutrients.forEach(
    ({ nutrients, ingredientValue, covertToGrams }) => {
      if (!nutrients.length) return;
      // Calculate nutrient base on ingredient value in meal
      const handledNutrients = nutrients.map(
        ({ nutrientValueOn100g, nutrientId }) => {
          return {
            nutrientId,
            nutrientValue:
              (ingredientValue * covertToGrams * nutrientValueOn100g) / 100,
          };
        }
      );
      // Add value to meal nutrient, if no nutrient value yet assign to 0
      mealNutrients = handledNutrients.map(({ nutrientId, nutrientValue }) => {
        const currMealNutrientValue = mealNutrients.find(
          (item) => item.nutrientId === nutrientId
        )?.nutrientValue;
        return {
          nutrientId,
          nutrientValue: (nutrientValue += currMealNutrientValue || 0),
        };
      });
    }
  );

  return mealNutrients;
};

const cleanMealSpecificResponse = (prismaRes: MealPrismaDto) => {
  const { mealTimes, ingredients, nutrients, ...mealProps } = prismaRes;

  return {
    ...mealProps,
    mealTimes: mealTimes.map(({ mealTime }) => mealTime),
    ingredients: ingredients.map(({ ingredient, ...ingredientInfo }) => ({
      ...ingredientInfo,
      ...ingredient,
    })),
    nutrients: nutrients.map(({ nutrientValue, nutrient }) => ({
      nutrientValue,
      ...nutrient,
    })),
  };
};

export { calculateMealNutrientService, cleanMealSpecificResponse };
