import { ingredientType } from '@prisma/client';
import {
  findAllIngredientsRepository,
  findIngredientByNameRepository,
  findIngredientSpecificByIdRepository,
  createIngredientRepository,
} from '../repositories/ingredient.repository';
import {
  CreateIngredientRequest,
  HandledCreateIngredientRequest,
} from '../types/ingredient.type';
// import { flattenIngredientNutrient } from '../utils/flattenResponse.util';

export const findAllIngredients = async () => {
  return await findAllIngredientsRepository();
};

export const findIngredientByName = async (ingredientName: string) => {
  return await findIngredientByNameRepository(ingredientName);
};

export const findIngredientSpecificById = async (id: number) => {
  const ingredient = await findIngredientSpecificByIdRepository(id);
  return ingredient;
};

export const createIngredient = async (
  ingredientName: string,
  ingredientType: ingredientType,
  nutrients: Array<CreateIngredientRequest>
) => {
  const handledNutrients: Array<HandledCreateIngredientRequest> = nutrients.map(
    ({ id, nutrientValueOn100g }) => ({
      nutrientId: id,
      nutrientValueOn100g,
    })
  );
  await createIngredientRepository(
    ingredientName,
    ingredientType,
    handledNutrients
  );
};
