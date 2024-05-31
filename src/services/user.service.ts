import { findUserTargetRepository } from '../repositories/user.repository';
import { UserTargetNutrientPrisma } from '../types/prismaResponse.type';

const cleanTargetNutrients = (nutrients: UserTargetNutrientPrisma) => {
  return nutrients.nutrients.map(({ nutrient, targetNutrientValue }) => {
    const { nutrientId, nutrientName, nutrientType, nutrientUnit } = nutrient;
    return {
      nutrientId,
      nutrientName,
      nutrientType,
      nutrientUnit,
      targetNutrientValue,
    };
  });
};

const findUserTargetService = async (id: string) => {
  const nutrients = await findUserTargetRepository(id);

  return cleanTargetNutrients(nutrients as UserTargetNutrientPrisma);
};

export { findUserTargetService };
