import { Forbidden, BadRequest } from '@/utils/customError';
import { ModuleController } from '@/common/type';
import {
  validRenewTime,
  verifyRefreshToken,
  signToken,
} from '@/lib/jwt';
import { asyncHandler } from '@/utils/asyncHandler';
import AuthService from './auth.service';

const AuthController: ModuleController = {
  signupEmailPassword: asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    const userId = await AuthService.signupEmailPassword({
      email,
      password,
      name,
    });
    return res.json({
      userId,
    });
  }),
  loginEmailPassword: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const [accessToken, createdTime, expiredTime, user] =
      await AuthService.loginEmailPassword({
        email,
        password,
      });

    return res.json({
      userId: user.id,
      accessToken,
      createdTime,
      expiredTime,
    });
  }),
  renewAccessToken: asyncHandler(async (req, res) => {
    const { tokenInfo } = res.locals;

    const { exp, userId }: any = tokenInfo;
    if (!exp || !validRenewTime(exp)) {
      throw new Forbidden('INVALID_RENEW_TIME');
    }

    const [accessToken, createdTime, expiredTime] = signToken({
      userId,
    });
    return res.json({
      accessToken,
      createdTime,
      expiredTime,
    });
  }),
  refreshAccessToken: asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    try {
      const { userId } = await verifyRefreshToken(refreshToken);
      const [accessToken, createdTime, expiredTime] = signToken({
        userId,
      });
      return res.json({
        accessToken,
        createdTime,
        expiredTime,
      });
    } catch (err) {
      throw new BadRequest('INVALID_REFRESH_TOKEN');
    }
  }),
};
export default AuthController;
