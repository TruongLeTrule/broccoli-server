import { findAllIngredientsRepository } from '../repositories/ingredient.repository';

const findAllIngredients = async () => {
  return await findAllIngredientsRepository();
};

export { findAllIngredients };
