import express from 'express';
import { createDayPlanController } from '../controllers/planner.controller';

const router = express.Router();

router.route('/').post(createDayPlanController);

export default router;
