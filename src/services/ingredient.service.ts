import { findIngredientByIdRepository } from '../repositories/ingredient.repository';
import { cleanIngredientNutrients } from '../utils/cleanPrismaResponse.util';

const findIngredientSpecificService = async (id: number) => {
  const ingredient = await findIngredientByIdRepository(id);

  const flatNutrients = cleanIngredientNutrients(ingredient?.nutrients);

  return { ...ingredient, nutrients: flatNutrients };
};

export { findIngredientSpecificService };
