import express from 'express';
import {
  findUserTargetController,
  createUserTargetController,
  updateUserTargetController,
  getCurrentUserController,
  getAppStatsController,
  updateUserController,
} from '../controllers/user.controller';
import {
  validateCreateOrUpdateUserTarget,
  checkValidation,
  validateUpdateUser,
} from '../middlewares/validation.middleware';
import { authorizePermission } from '../middlewares/authentication.middleware';

const router = express.Router();

router
  .route('/target')
  .get(findUserTargetController)
  .post(
    [...validateCreateOrUpdateUserTarget, checkValidation],
    createUserTargetController
  )
  .patch(
    [...validateCreateOrUpdateUserTarget, checkValidation],
    updateUserTargetController
  );
router.route('/current-user').get(getCurrentUserController);
router
  .route('/update-user')
  .patch([...validateUpdateUser, checkValidation], updateUserController);
router
  .route('/admin/app-stats')
  .get([authorizePermission('admin'), getAppStatsController]);

export default router;
