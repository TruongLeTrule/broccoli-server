import express from 'express';
import {
  findAllIngredientsController,
  findIngredientByNameController,
  findIngredientByIdController,
  postIngredientController,
  updateIngredientController,
  deleteIngredientController,
} from '../controllers/ingredient.controller';

const router = express.Router();

router
  .route('/')
  .get(findAllIngredientsController)
  .post(postIngredientController);
router
  .route('/:id')
  .get(findIngredientByIdController)
  .patch(updateIngredientController)
  .delete(deleteIngredientController);
router.route('/search').post(findIngredientByNameController);

export default router;
