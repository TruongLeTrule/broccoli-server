import {
  MealIngredient,
  MealIngredientRequest,
} from '../types/mealIngredient.type';
import { flattenMealIngredients } from '../utils/flattenResponse.util';
import {
  findAllMealsRepository,
  findMealSpecificByIdRepository,
  findMealByNameRepository,
  createMealRepository,
} from '../repositories/meal.repository';

const findAllMeals = async (page: number | null, limit: number | null) => {
  limit = limit ? limit : 12;
  page = page ? (page - 1) * limit : 0;

  return await findAllMealsRepository(page, limit);
};

const findMealSpecificById = async (id: number) => {
  const meal = await findMealSpecificByIdRepository(id);

  return { ...meal, ingredients: flattenMealIngredients(meal?.ingredients) };
};

const findMealByName = async (mealName: string) => {
  return await findMealByNameRepository(mealName);
};

const createMeal = async (
  mealName: string,
  ingredients: Array<MealIngredientRequest>
) => {
  const handledIngredients: Array<MealIngredient> = ingredients.map(
    ({ id, ingredientValue, ingredientUnit }) => ({
      ingredientValue,
      ingredientUnit,
      ingredientId: id,
    })
  );

  await createMealRepository(mealName, handledIngredients);
};

export { findAllMeals, findMealByName, createMeal, findMealSpecificById };
