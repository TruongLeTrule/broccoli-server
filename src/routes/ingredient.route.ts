import express from 'express';
import {
  getAllIngredientsController,
  getIngredientByNameController,
  getIngredientByIdController,
  postIngredientController,
} from '../controllers/ingredient.controller';

const router = express.Router();

router
  .route('/')
  .get(getAllIngredientsController)
  .post(postIngredientController);
router.route('/:id').get(getIngredientByIdController);
router.route('/search').post(getIngredientByNameController);

export default router;
