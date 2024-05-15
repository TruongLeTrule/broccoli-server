import { Request, Response, NextFunction } from 'express';
import { UnauthenticatedError } from '../utils/customErrors';

export const authenticationUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('please log in first');
  next();
};
