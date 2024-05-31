import { findMealByIdRepository } from '../repositories/meal.repository';
import {
  CleanedIngredientNutrient,
  MealIngredientPrisma,
} from '../types/prismaResponse.type';
import {
  cleanMealIngredients,
  cleanMealNutrients,
} from '../utils/cleanPrismaResponse.util';

const findMealSpecificService = async (id: number) => {
  const meal = await findMealByIdRepository(id);

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

export { findMealSpecificService };
