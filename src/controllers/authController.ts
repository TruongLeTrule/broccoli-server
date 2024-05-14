import { Request, Response } from 'express';

const login = (req: Request, res: Response) => {
  res.send('login route');
};

const register = (req: Request, res: Response) => {
  res.send('register route');
};

export { login, register };
