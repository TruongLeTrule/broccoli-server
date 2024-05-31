import express from 'express';
import {
  getAllIngredientsController,
  getIngredientByNameController,
  getIngredientByIdController,
  postIngredientController,
  updateIngredientController,
  deleteIngredientController,
} from '../controllers/ingredient.controller';

const router = express.Router();

router
  .route('/')
  .get(getAllIngredientsController)
  .post(postIngredientController);
router
  .route('/:id')
  .get(getIngredientByIdController)
  .patch(updateIngredientController)
  .delete(deleteIngredientController);
router.route('/search').post(getIngredientByNameController);

export default router;
