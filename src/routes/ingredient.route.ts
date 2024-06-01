import express from 'express';
import {
  findIngredientsController,
  findIngredientByNameController,
  findIngredientByIdController,
  createIngredientController,
  updateIngredientController,
  deleteIngredientController,
} from '../controllers/ingredient.controller';
import {
  validateCreateOrUpdateIngredient,
  validateIngredientIdParam,
  checkValidation,
} from '../middlewares/validation.middleware';

const router = express.Router();

router
  .route('/')
  .get(findIngredientsController)
  .post(
    [...validateCreateOrUpdateIngredient, checkValidation],
    createIngredientController
  );
router
  .route('/:id')
  .get(
    [validateIngredientIdParam, checkValidation],
    findIngredientByIdController
  )
  .patch(
    [
      validateIngredientIdParam,
      ...validateCreateOrUpdateIngredient,
      checkValidation,
    ],
    updateIngredientController
  )
  .delete(
    [validateIngredientIdParam, checkValidation],
    deleteIngredientController
  );
router.route('/search').post(findIngredientByNameController);

export default router;
