import { findAllNutrientsRepository } from '../repositories/nutrient.repository';

export const findAllIngredients = async () => {
  return await findAllNutrientsRepository();
};
