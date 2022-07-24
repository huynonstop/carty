import 'dotenv/config';

export const APP_PORT = process.env.PORT || '3000';

export const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
export const JWT_LIFE = 3600;

export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET';
export const REFRESH_TOKEN_LIFE = 86400;
