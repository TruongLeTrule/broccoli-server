import { Request, Response, NextFunction } from 'express';
import { UnauthenticatedError } from '../utils/customErrors';
import { verifyToken } from '../utils/token.util';

export const authenticationUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = verifyToken(req.cookies.token);
  if (!userId) throw new UnauthenticatedError('please log in first');
  req.body.userId = userId;

  next();
};
