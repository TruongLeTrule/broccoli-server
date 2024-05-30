import { ingredientType } from '@prisma/client';
import {
  findAllIngredientsRepository,
  findIngredientByNameRepository,
  findIngredientSpecificByIdRepository,
  createIngredientRepository,
} from '../repositories/ingredient.repository';
import { IngredientNutrientRequest } from '../types/ingredient.type';
import { flattenNutrients } from '../utils/flattenPrismaResponse.util';

export const findAllIngredientsService = async () => {
  return await findAllIngredientsRepository();
};

export const findIngredientByNameService = async (ingredientName: string) => {
  return await findIngredientByNameRepository(ingredientName);
};

export const findIngredientSpecificByIdService = async (id: number) => {
  const ingredient = await findIngredientSpecificByIdRepository(id);

  const flatNutrients = flattenNutrients(ingredient?.nutrients);

  return { ...ingredient, nutrients: flatNutrients };
};

export const createIngredientService = async (
  ingredientName: string,
  ingredientType: ingredientType,
  nutrients: Array<IngredientNutrientRequest>
) => {
  await createIngredientRepository(ingredientName, ingredientType, nutrients);
};
