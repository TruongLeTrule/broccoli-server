import express from 'express';
import {
  findAllMealsController,
  findMealByNameController,
  postMealController,
  findMealByIdController,
  updateMealController,
  deleteMealController,
} from '../controllers/meal.controller';

const router = express.Router();

router.route('/').get(findAllMealsController).post(postMealController);
router
  .route('/:id')
  .get(findMealByIdController)
  .patch(updateMealController)
  .delete(deleteMealController);
router.route('/search').post(findMealByNameController);

export default router;
