import { findMealByIdRepository } from '../repositories/meal.repository';
import { MealIngredientPrisma } from '../types/prismaResponse.type';
import { nutrientUnit } from '@prisma/client';

interface MealNutrient {
  nutrientName: string;
  nutrientUnit: nutrientUnit | null;
  nutrientValue: number;
}

const cleanMealIngredients = (ingredients: Array<MealIngredientPrisma>) => {
  return ingredients.map(({ ingredientUnit, ingredientValue, ingredient }) => {
    const { ingredientId, ingredientName, ingredientType } = ingredient;
    return {
      ingredientUnit,
      ingredientValue,
      ingredientId,
      ingredientName,
      ingredientType,
    };
  });
};

const handleMealNutrients = (ingredients: Array<MealIngredientPrisma>) => {
  let mealNutrients: Array<MealNutrient> = [];

  ingredients.forEach(
    ({ ingredient, ingredientValue, ingredientUnitCovert }) => {
      const { nutrients } = ingredient;

      const handledNutrients = nutrients.map(
        ({ nutrientValueOn100g, nutrient }) => {
          const { nutrientName, nutrientUnit } = nutrient;
          return {
            nutrientName,
            nutrientUnit,
            // meal nutrient value base on meal weight in gram
            nutrientValue:
              (ingredientValue *
                ingredientUnitCovert.covertToGrams *
                nutrientValueOn100g) /
              100,
          };
        }
      );

      if (!mealNutrients.length) {
        mealNutrients = handledNutrients;
      } else {
        mealNutrients = mealNutrients.map(
          ({ nutrientName, nutrientUnit, nutrientValue }) => ({
            // Find and add nutrient value if nutrient name is equal
            nutrientValue: (nutrientValue +=
              handledNutrients.find(
                (item) => item.nutrientName === nutrientName
              )?.nutrientValue || 0),
            nutrientUnit,
            nutrientName,
          })
        );
      }
    }
  );

  return mealNutrients;
};

const findMealSpecificService = async (id: number) => {
  const meal = await findMealByIdRepository(id);

  const ingredients = cleanMealIngredients(
    meal?.ingredients as Array<MealIngredientPrisma>
  );

  const mealNutrients: Array<MealNutrient> = handleMealNutrients(
    meal?.ingredients as Array<MealIngredientPrisma>
  );

  return {
    mealName: meal?.mealName,
    imgURL: meal?.imgURL,
    mealType: meal?.mealType,
    nutrients: mealNutrients,
    ingredients,
  };
};

export { findMealSpecificService };
