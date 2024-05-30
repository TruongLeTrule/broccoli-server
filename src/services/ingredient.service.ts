import {
  findAllIngredientsRepository,
  findIngredientByNameRepository,
  findIngredientSpecificByIdRepository,
  createOrUpdateIngredientRepository,
  deleteIngredientRepository,
} from '../repositories/ingredient.repository';
import { CreateOrUpdateIngredientDto } from '../dtos/ingredient.dto';
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
  createIngredientRequest: CreateOrUpdateIngredientDto
) => {
  return await createOrUpdateIngredientRepository(createIngredientRequest);
};

export const updateIngredientService = async (
  createIngredientRequest: CreateOrUpdateIngredientDto,
  id: number
) => {
  return await createOrUpdateIngredientRepository(createIngredientRequest, id);
};

export const deleteIngredientService = async (id: number) => {
  return await deleteIngredientRepository(id);
};
