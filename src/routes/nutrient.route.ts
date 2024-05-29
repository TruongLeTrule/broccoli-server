import express from 'express';
import { getAllNutrients } from '../controllers/nutrient.controller';

const router = express.Router();

router.route('/').get(getAllNutrients);

export default router;
