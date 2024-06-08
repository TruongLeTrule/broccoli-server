import express from 'express';
import {
  createDayPlanController,
  findDayPlanController,
  updateDayPlanController,
  updateChosenMealController,
} from '../controllers/mealPlan.controller';

const router = express.Router();

router.route('/').post(findDayPlanController);
router.route('/create').post(createDayPlanController);
router.route('/update').patch(updateDayPlanController);
router.route('/update-meal').patch(updateChosenMealController);

export default router;
