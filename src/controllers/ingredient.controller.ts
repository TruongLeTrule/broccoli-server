import {
  findIngredientSpecificService,
  updateRelevantMealsOnUpdateService,
} from '../services/ingredient.service';
import {
  findIngredientsRepository,
  findIngredientByNameRepository,
  createOrUpdateIngredientRepository,
  deleteIngredientRepository,
  findRelevantMeals,
} from '../repositories/ingredient.repository';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

const findIngredientsController = async (_: any, res: Response) => {
  const ingredients = await findIngredientsRepository();

  res.status(StatusCodes.OK).json({ ingredients });
};

const findIngredientByNameController = async (req: Request, res: Response) => {
  const { ingredientName } = req.body;

  const ingredients = await findIngredientByNameRepository(ingredientName);

  res.status(StatusCodes.OK).json({ ingredients });
};

const findIngredientByIdController = async (req: Request, res: Response) => {
  const ingredient = await findIngredientSpecificService(
    parseInt(req.params.id)
  );

  res.status(StatusCodes.OK).json({ ingredient });
};

const createIngredientController = async (req: Request, res: Response) => {
  const ingredient = await createOrUpdateIngredientRepository(req.body);

  res.status(StatusCodes.OK).json({ msg: 'Ingredient created', ingredient });
};

const updateIngredientController = async (req: Request, res: Response) => {
  const ingredient = await createOrUpdateIngredientRepository(
    req.body,
    parseInt(req.params.id)
  );

  const relevantMeals = (
    await findRelevantMeals(ingredient.ingredientId)
  )?.meals.map(({ mealId }) => mealId);

  const updatedMeals = await updateRelevantMealsOnUpdateService(relevantMeals);

  res.status(StatusCodes.OK).json({
    msg: 'Ingredient updated',
    ingredient,
    updatedMeals,
  });
};

const deleteIngredientController = async (req: Request, res: Response) => {
  const ingredient = await deleteIngredientRepository(parseInt(req.params.id));

  res.status(StatusCodes.OK).json({ msg: 'Ingredient deleted', ingredient });
};

export {
  findIngredientsController,
  findIngredientByNameController,
  findIngredientByIdController,
  createIngredientController,
  updateIngredientController,
  deleteIngredientController,
};
