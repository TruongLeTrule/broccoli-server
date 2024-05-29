import jwt, { Secret } from 'jsonwebtoken';

interface JwtPayload {
  exp: number;
  userId: string;
}

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

export { createToken, verifyToken };
