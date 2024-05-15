import express from 'express';
import { getAllMeals } from '../controllers/meal.controller';

const router = express.Router();

router.route('/').get(getAllMeals);

export default router;
