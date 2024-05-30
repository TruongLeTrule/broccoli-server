import express from 'express';
import {
  getAllMealsController,
  getMealByNameController,
  postMealController,
  getMealByIdController,
  updateMealController,
  deleteMealController,
} from '../controllers/meal.controller';

const router = express.Router();

router.route('/').get(getAllMealsController).post(postMealController);
router
  .route('/:id')
  .get(getMealByIdController)
  .patch(updateMealController)
  .delete(deleteMealController);
router.route('/search').post(getMealByNameController);

export default router;
