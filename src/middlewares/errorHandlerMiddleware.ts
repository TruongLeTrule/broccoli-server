import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/customErrors';

export default (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || 'something went wrong';
  res.status(statusCode).json({ msg });
};
