import { CreateOrUpdateMealDto } from '../dtos/meal.dto';
import {
  findAllMealsRepository,
  findMealSpecificByIdRepository,
  findMealByNameRepository,
  createOrUpdateMealRepository,
  deleteMealRepository,
} from '../repositories/meal.repository';
import {
  CleanedIngredientNutrient,
  MealIngredientPrisma,
} from '../types/prismaResponse.type';
import {
  cleanMealIngredients,
  cleanMealNutrients,
} from '../utils/cleanPrismaResponse.util';

export const findAllMealsService = async (
  page: number | undefined,
  limit: number | undefined
) => {
  return await findAllMealsRepository(page, limit);
};

export const findMealSpecificByIdService = async (id: number) => {
  const meal = await findMealSpecificByIdRepository(id);

  const mealIngredients = cleanMealIngredients(
    meal?.ingredients as Array<MealIngredientPrisma>
  );

  return {
    mealName: meal?.mealName,
    imgURL: meal?.imgURL,
    mealType: meal?.mealType,
    ingredients: mealIngredients,
  };
};

export const findMealByNameService = async (mealName: string) => {
  return await findMealByNameRepository(mealName);
};

export const createMealService = async (
  createMealRequest: CreateOrUpdateMealDto
) => {
  return await createOrUpdateMealRepository(createMealRequest);
};

export const updateMealService = async (
  id: number,
  newMeal: CreateOrUpdateMealDto
) => {
  return await createOrUpdateMealRepository(newMeal, id);
};

export const deleteMealService = async (id: number) => {
  return await deleteMealRepository(id);
};
