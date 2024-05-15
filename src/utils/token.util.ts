import jwt from 'jsonwebtoken';

const createToken = (payload: Object) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
  return token;
};

export { createToken };
