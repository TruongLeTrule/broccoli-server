import express from 'express';
import {
  loginController,
  registerController,
} from '../controllers/auth.controller';

const router = express.Router();

router.route('/login').post(loginController);
router.route('/register').post(registerController);

export default router;
