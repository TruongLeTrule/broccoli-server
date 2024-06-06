import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createDayPlanService } from '../services/mealPlan.service';
import { IGetUserAuthInfoRequest } from '../../custom';

const createDayPlanController = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const plan = await createDayPlanService(
    Number(req.body.calories),
    req.body.existMeals,
    '16929612-9ef7-4547-a662-2d529fc646f1'
  );

  res.status(StatusCodes.OK).json({ plan });
};

export { createDayPlanController };
