import express from 'express';
import {
  getAllMeals,
  getMealByName,
  postMeal,
  getMealById,
} from '../controllers/meal.controller';

const router = express.Router();

router.route('/').get(getAllMeals).post(postMeal);
router.route('/:id').get(getMealById);
router.route('/search').post(getMealByName);

export default router;
