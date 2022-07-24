import { ModuleController } from '@/common/type';
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

    const [accessToken, createdTime, expiredTime] =
      await AuthService.loginEmailPassword({
        email,
        password,
      });

    return res.json({
      accessToken,
      createdTime,
      expiredTime,
    });
  }),
  renewAccessToken: asyncHandler(async (req, res) => {
    const { tokenInfo } = res.locals;
    const [accessToken, createdTime, expiredTime] =
      await AuthService.renewAccessToken(tokenInfo);
    return res.json({
      accessToken,
      createdTime,
      expiredTime,
    });
  }),
};
export default AuthController;
