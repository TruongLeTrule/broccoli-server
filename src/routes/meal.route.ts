import express from 'express';
import {
  getAllMeals,
  getMealByName,
  postMeal,
} from '../controllers/meal.controller';

const router = express.Router();

router.route('/').get(getAllMeals).post(postMeal);
router.route('/:meal').get(getMealByName);

export default router;
