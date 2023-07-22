import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (userData, exp = '1y') => {
  return JWT.sign(userData, process.env.SECRET_TOKEN, { expiresIn: exp });
};
