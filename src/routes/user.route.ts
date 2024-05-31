import express from 'express';
import {
  findUserTargetController,
  createUserTargetController,
  updateUserTargetController,
} from '../controllers/user.controller';

const router = express.Router();

router
  .route('/:id/target')
  .get(findUserTargetController)
  .post(createUserTargetController)
  .patch(updateUserTargetController);

export default router;
