import express from 'express';
import { getAllNutrientsController } from '../controllers/nutrient.controller';

const router = express.Router();

router.route('/').get(getAllNutrientsController);

export default router;
