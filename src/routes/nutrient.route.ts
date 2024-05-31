import express from 'express';
import { findAllNutrientsController } from '../controllers/nutrient.controller';

const router = express.Router();

router.route('/').get(findAllNutrientsController);

export default router;
