import express from 'express';
import {
  findMealsController,
  findMealByNameController,
  createMealController,
  findMealByIdController,
  updateMealController,
  deleteMealController,
} from '../controllers/meal.controller';
import {
  validateCreateOrUpdateMeal,
  validateMealIdParam,
  checkValidation,
} from '../middlewares/validation.middleware';

const router = express.Router();

router
  .route('/')
  .get(findMealsController)
  .post([...validateCreateOrUpdateMeal, checkValidation], createMealController);
router
  .route('/:id')
  .get([validateMealIdParam, checkValidation], findMealByIdController)
  .patch(
    [validateMealIdParam, ...validateCreateOrUpdateMeal, checkValidation],
    updateMealController
  )
  .delete([validateMealIdParam, checkValidation], deleteMealController);
router.route('/search').post(findMealByNameController);

export default router;
