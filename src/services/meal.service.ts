import {
  HandledCreateMealRequest,
  CreateMealRequest,
} from '../types/meal.type';
import {
  findAllMealsRepository,
  findMealSpecificByIdRepository,
  findMealByNameRepository,
  createMealRepository,
} from '../repositories/meal.repository';
import { flattenMealIngredients } from '../utils/flattenPrismaResponse.util';

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
  return { ...meal, ingredients: flattenMealIngredients(meal?.ingredients) };
};

export const findMealByName = async (mealName: string) => {
  return await findMealByNameRepository(mealName);
};

export const createMeal = async (
  mealName: string,
  ingredients: Array<CreateMealRequest>
) => {
  const handledIngredients: Array<HandledCreateMealRequest> = ingredients.map(
    ({ id, ingredientValue, ingredientUnit }) => ({
      ingredientValue,
      ingredientUnit,
      ingredientId: id,
    })
  );
  await createMealRepository(mealName, handledIngredients);
};
