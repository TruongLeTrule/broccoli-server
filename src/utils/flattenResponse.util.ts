import { ResponseIngredient } from '../types/mealIngredient.type';

export const flattenMealIngredients = (
  ingredients: Array<ResponseIngredient> | undefined
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
