import express from 'express';
import {
  getAllIngredients,
  getIngredientByName,
  getIngredientById,
  postIngredient,
} from '../controllers/ingredient.controller';

const router = express.Router();

router.route('/').get(getAllIngredients).post(postIngredient);
router.route('/:id').get(getIngredientById);
router.route('/search').post(getIngredientByName);

export default router;
