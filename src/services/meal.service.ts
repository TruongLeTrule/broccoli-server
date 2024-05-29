import { MealIngredientRequest } from '../types/meal.type';
import {
  findAllMealsRepository,
  findMealSpecificByIdRepository,
  findMealByNameRepository,
  createMealRepository,
} from '../repositories/meal.repository';
import { flattenIngredients } from '../utils/flattenPrismaResponse.util';

export const findAllMeals = async (
  page: number | null,
  limit: number | null
) => {
  limit = limit ? limit : 12;
  page = page ? (page - 1) * limit : 0;
  return await findAllMealsRepository(page, limit);
};

export const findMealSpecificById = async (id: number) => {
  const meal = await findMealSpecificByIdRepository(id);

  const flatMealIngredients = flattenIngredients(meal?.ingredients);

  return { ...meal, ingredients: flatMealIngredients };
};

export const findMealByName = async (mealName: string) => {
  return await findMealByNameRepository(mealName);
};

export const createMeal = async (
  mealName: string,
  ingredients: Array<MealIngredientRequest>
) => {
  await createMealRepository(mealName, ingredients);
};
