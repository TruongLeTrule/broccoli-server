import { findAllNutrientsRepository } from '../repositories/nutrient.repository';

export const findAllIngredientsService = async () => {
  return await findAllNutrientsRepository();
};
