import { findIngredientSpecificByIdRepository } from '../repositories/ingredient.repository';
import { cleanIngredientNutrients } from '../utils/cleanPrismaResponse.util';

export const findIngredientSpecificByIdService = async (id: number) => {
  const ingredient = await findIngredientSpecificByIdRepository(id);

  const flatNutrients = cleanIngredientNutrients(ingredient?.nutrients);

  return { ...ingredient, nutrients: flatNutrients };
};
