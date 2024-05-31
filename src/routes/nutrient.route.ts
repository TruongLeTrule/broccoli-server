import express from 'express';
import { findNutrientsController } from '../controllers/nutrient.controller';

const router = express.Router();

router.route('/').get(findNutrientsController);

export default router;
