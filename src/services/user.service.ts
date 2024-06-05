import { findUserTargetRepository } from '../repositories/user.repository';
import { UserTargetNutrientPrismaDto } from '../dtos/user.dto';

const cleanTargetNutrients = (nutrients: UserTargetNutrientPrismaDto) => {
  return nutrients.targetNutrients.map(({ nutrient, targetNutrientValue }) => {
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

  return cleanTargetNutrients(nutrients as UserTargetNutrientPrismaDto);
};

export { findUserTargetService };
