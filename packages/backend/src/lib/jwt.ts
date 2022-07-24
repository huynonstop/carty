import { JWT_SECRET, JWT_LIFE } from '@/common/config';
import jwt from 'jsonwebtoken';

export const signToken = (payload: any) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_LIFE,
  });
  const currentTime = Date.now();
  return [token, currentTime, currentTime + JWT_LIFE * 1000];
};

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
