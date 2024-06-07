import { findIngredientByIdRepository } from '../repositories/ingredient.repository';
import { IngredientNutrientPrismaDto } from '../dtos/ingredient.dto';
import {
  findMealIngredients,
  updateMealNutrient,
} from '../repositories/meal.repository';
import { MealNutrientDto } from '../dtos/meal.dto';
import { calculateMealNutrientService } from './meal.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cleanIngredientNutrients = (
  nutrients: Array<IngredientNutrientPrismaDto> | undefined
) => {
  return nutrients?.map(({ nutrient, nutrientValueOn100g }) => ({
    nutrientValueOn100g,
    ...nutrient,
  }));
};

const findIngredientSpecificService = async (id: number) => {
  const ingredient = await findIngredientByIdRepository(id);

  const flatNutrients = cleanIngredientNutrients(ingredient?.nutrients);

  return { ...ingredient, nutrients: flatNutrients };
};

const updateRelevantMealsOnUpdateService = async (
  mealIds: Array<number> | undefined
) => {
  const updatedMealNutrients: Array<{
    mealId: number;
    nutrients: Array<MealNutrientDto>;
  }> = [];

  if (!mealIds || !mealIds?.length) return;

  // Find relevant meals with its id, ingredients
  const ingredientsGroupedByMeal = await findMealIngredients(mealIds);

  // Calculate relevant meal nutrient with updated ingredient
  for (const mealIngredient of ingredientsGroupedByMeal) {
    console.log(
      '============= meal id:',
      mealIngredient.mealId,
      '==================='
    );
    updatedMealNutrients.push({
      mealId: mealIngredient.mealId,
      nutrients: await calculateMealNutrientService(mealIngredient.ingredients),
    });
  }

  // Update all relevant meals nutrients in db
  const result = await prisma.$transaction(
    updatedMealNutrients.map(({ mealId, nutrients }) =>
      updateMealNutrient(mealId, nutrients)
    )
  );

  console.log('relevant meals: ', mealIds);

  return result;
};

export { findIngredientSpecificService, updateRelevantMealsOnUpdateService };
