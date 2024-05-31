import express from 'express';
import {
  findMealsController,
  findMealByNameController,
  createMealController,
  findMealByIdController,
  updateMealController,
  deleteMealController,
} from '../controllers/meal.controller';

const router = express.Router();

router.route('/').get(findMealsController).post(createMealController);
router
  .route('/:id')
  .get(findMealByIdController)
  .patch(updateMealController)
  .delete(deleteMealController);
router.route('/search').post(findMealByNameController);

export default router;
