import { emailPasswordBodyValidator } from './auth.validator';
import { Router } from 'express';
import AuthController from './auth.controller';
import { tokenGuard, expiredValidTokenGuard } from './auth.guard';

export const authRoute = Router();
authRoute.post(
  '/signup-email-password',
  emailPasswordBodyValidator,
  AuthController.signupEmailPassword,
);

authRoute.post(
  '/login-email-password',
  emailPasswordBodyValidator,
  AuthController.loginEmailPassword,
);

authRoute.post(
  '/renew-token',
  tokenGuard,
  expiredValidTokenGuard,
  AuthController.renewAccessToken,
);
