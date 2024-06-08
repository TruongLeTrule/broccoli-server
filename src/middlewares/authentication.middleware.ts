import { NextFunction, RequestHandler } from 'express';
import { UnauthenticatedError, UnauthorizedError } from '../utils/customErrors';
import { verifyToken } from '../utils/token.util';
import { IGetUserAuthInfoRequest } from '../../custom';

export const authenticateMiddleware = (
  req: IGetUserAuthInfoRequest,
  _: any,
  next: NextFunction
) => {
  if (!req.cookies.token)
    throw new UnauthenticatedError('authentication invalid');

  try {
    const user = verifyToken(req.cookies.token);

    req.user = {
      userId: user.userId,
      role: user.role,
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const authorizePermission = (...roles: string[]): RequestHandler => {
  return (req: IGetUserAuthInfoRequest, _: any, next: NextFunction) => {
    console.log(roles);
    console.log(req.user?.role);

    if (!roles.includes(req.user?.role as string))
      throw new UnauthorizedError('invalid authorization');

    next();
  };
};
