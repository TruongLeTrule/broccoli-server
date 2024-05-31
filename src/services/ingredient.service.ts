import { findIngredientByIdRepository } from '../repositories/ingredient.repository';
import { IngredientNutrientPrisma } from '../types/prismaResponse.type';

const cleanIngredientNutrients = (
  nutrients: Array<IngredientNutrientPrisma> | undefined
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

export { findIngredientSpecificService };
