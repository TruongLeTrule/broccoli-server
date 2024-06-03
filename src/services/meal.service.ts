import { findMealByIdRepository } from '../repositories/meal.repository';
import { MealIngredientPrisma } from '../types/prismaResponse.type';
import { CleanMealNutrient } from '../types/cleanResponse.type';

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
  let mealNutrients: Array<CleanMealNutrient> = [];

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

      mealNutrients = handledNutrients.map(
        ({ nutrientName, nutrientUnit, nutrientValue }) => {
          return {
            // Find and add nutrient value if nutrient name is equal
            nutrientValue: (nutrientValue +=
              mealNutrients.find((item) => item.nutrientName === nutrientName)
                ?.nutrientValue || 0),
            nutrientUnit,
            nutrientName,
          };
        }
      );
    }
  );

  return mealNutrients;
};

const findMealSpecificService = async (id: number) => {
  const meal = await findMealByIdRepository(id);

  const ingredients = cleanMealIngredients(
    meal?.ingredients as Array<MealIngredientPrisma>
  );

  const mealNutrients: Array<CleanMealNutrient> = handleMealNutrients(
    meal?.ingredients as Array<MealIngredientPrisma>
  );

  const availableMealTimes = meal?.availableMealTimes.map(
    ({ mealTime }) => mealTime
  );

  return {
    mealName: meal?.mealName,
    imgURL: meal?.imgURL,
    mealType: meal?.mealType,
    nutrients: mealNutrients,
    availableMealTimes,
    ingredients,
  };
};

export { findMealSpecificService };
