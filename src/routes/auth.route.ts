import express from 'express';
import {
  loginController,
  logoutController,
  registerController,
  loginGuestController,
} from '../controllers/auth.controller';
import {
  validateLogin,
  validateRegister,
  checkValidation,
} from '../middlewares/validation.middleware';

const router = express.Router();

router
  .route('/login')
  .post([...validateLogin, checkValidation], loginController);
router
  .route('/register')
  .post([...validateRegister, checkValidation], registerController);
router.route('/logout').get(logoutController);
router.route('/login-guest').get(loginGuestController);

export default router;
