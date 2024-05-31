import express from 'express';
import {
  findIngredientsController,
  findIngredientByNameController,
  findIngredientByIdController,
  createIngredientController,
  updateIngredientController,
  deleteIngredientController,
} from '../controllers/ingredient.controller';

const router = express.Router();

router
  .route('/')
  .get(findIngredientsController)
  .post(createIngredientController);
router
  .route('/:id')
  .get(findIngredientByIdController)
  .patch(updateIngredientController)
  .delete(deleteIngredientController);
router.route('/search').post(findIngredientByNameController);

export default router;
