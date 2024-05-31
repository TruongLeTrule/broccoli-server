import {
  IngredientNutrientPrisma,
  MealIngredientPrisma,
  CleanedIngredientNutrient,
} from '../types/prismaResponse.type';

export const cleanMealIngredients = (
  ingredients: Array<MealIngredientPrisma>
) => {
  return ingredients.map(
    ({ ingredient, ingredientUnitCovert, ...ingredientProps }) => {
      const { nutrients, ...ingredientSpecific } = ingredient;
      return {
        ...ingredientProps,
        ...ingredientSpecific,
      };
    }
  );
};

export const cleanIngredientNutrients = (
  nutrients: Array<IngredientNutrientPrisma> | undefined
) => {
  return nutrients?.map(({ nutrient, nutrientValueOn100g }) => ({
    nutrientValueOn100g,
    ...nutrient,
  }));
};

export const cleanMealNutrients = (
  nutrients: Array<CleanedIngredientNutrient>
) => {
  console.log(nutrients);
};
