import { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE } from './../common/config';
import { JWT_SECRET, JWT_LIFE } from '@/common/config';
import jwt from 'jsonwebtoken';

export const validRenewTime = (expiredTime: number) => {
  return Date.now() < (expiredTime + JWT_LIFE) * 1000;
};

export const validRefreshTime = (expiredTime: number) => {
  return Date.now() < expiredTime * 1000;
};

export const signToken = (payload: any): [string, number, number] => {
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

export const signRefreshToken = (payload: any) => {
  const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_LIFE,
  });
  const currentTime = Date.now();
  return [token, currentTime, currentTime + REFRESH_TOKEN_LIFE * 1000];
};

export const verifyRefreshToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};
