import { IngredientPrisma } from '../types/meal.type';
import { NutrientPrisma } from '../types/ingredient.type';

export const flattenIngredients = (
  ingredients: Array<IngredientPrisma> | undefined
) => {
  return ingredients?.map(
    ({ ingredientValue, ingredientUnit, ingredient }) => ({
      ingredientValue,
      ingredientUnit,
      ingredientName: ingredient.ingredientName,
      ingredientType: ingredient.ingredientType,
    })
  );
};

export const flattenNutrients = (
  nutrients: Array<NutrientPrisma> | undefined
) => {
  return nutrients?.map(({ nutrient, nutrientValueOn100g }) => ({
    nutrientValueOn100g,
    nutrientName: nutrient.nutrientName,
    nutrientType: nutrient.nutrientType,
    nutrientUnit: nutrient.nutrientUnit,
  }));
};
