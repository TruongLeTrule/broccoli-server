import jwt, { Secret } from 'jsonwebtoken';
import JwtPayload from '../types/jwtPayload.type';

const createToken = (payload: Object) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
  return token;
};

const verifyToken = (token: string) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret);
  return payload as JwtPayload;
};

const getTokenExp = (token: string) => {
  const { exp } = jwt.decode(token) as JwtPayload;
  return exp;
};

export { createToken, getTokenExp, verifyToken };
