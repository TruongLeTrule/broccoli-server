import express from 'express';
import { getAllIngredients } from '../controllers/ingredient.controller';

const router = express.Router();

router.route('/').get(getAllIngredients);

export default router;
