import { CreateOrUpdateMealDto } from '../types/meal.type';
import {
  findAllMealsRepository,
  findMealSpecificByIdRepository,
  findMealByNameRepository,
  createOrUpdateMealRepository,
  deleteMealRepository,
} from '../repositories/meal.repository';
import { flattenIngredients } from '../utils/flattenPrismaResponse.util';

export const findAllMealsService = async (
  page: number | undefined,
  limit: number | undefined
) => {
  return await findAllMealsRepository(page, limit);
};

export const findMealSpecificByIdService = async (id: number) => {
  const meal = await findMealSpecificByIdRepository(id);

  const flatMealIngredients = flattenIngredients(meal?.ingredients);

  return { ...meal, ingredients: flatMealIngredients };
};

export const findMealByNameService = async (mealName: string) => {
  return await findMealByNameRepository(mealName);
};

export const createMealService = async (
  createMealRequest: CreateOrUpdateMealDto
) => {
  await createOrUpdateMealRepository(createMealRequest);
};

export const updateMealService = async (
  id: number,
  newMeal: CreateOrUpdateMealDto
) => {
  await createOrUpdateMealRepository(newMeal, id);
};

export const deleteMealService = async (id: number) => {
  await deleteMealRepository(id);
};
