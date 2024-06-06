import express from 'express';
import { createDayPlanController } from '../controllers/mealPlan.controller';

const router = express.Router();

router.route('/').post(createDayPlanController);

export default router;
