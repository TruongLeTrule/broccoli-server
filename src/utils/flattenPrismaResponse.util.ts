import { MealPrismaRespond } from '../types/meal.type';

export const flattenMealIngredients = (
  ingredients: Array<MealPrismaRespond> | undefined
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

// export const flattenIngredientNutrients = (
//   ingredients: Array<IngredientNutrientPrisma> | undefined
// ) => {
//   return ingredients?.map(
//     ({ ingredientValue, ingredientUnit, ingredient }) => ({
//       ingredientValue,
//       ingredientUnit,
//       ingredientName: ingredient.ingredientName,
//       ingredientType: ingredient.ingredientType,
//     })
//   );
// };
