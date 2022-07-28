import { comparePassword, hashPassword } from '@/lib/bcrypt';
import { signRefreshToken, signToken } from '@/lib/jwt';
import prismaClient from '@/lib/prisma';
import { CreateUserDTO } from '@/modules/user/user.dto';
import { BadRequest } from '@/utils/customError';

interface TokenData {
  userId: string;
}

const AuthService = {
  async signupEmailPassword({ email, password, name }: CreateUserDTO) {
    const [hashedPassword] = await hashPassword(password);
    const user = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return user.id;
  },
  async loginEmailPassword({ email, password }: CreateUserDTO) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new BadRequest('NOT_FOUND_USER');
    }

    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
      throw new BadRequest('MISMATCH_PASSWORD');
    }

    const tokenData: TokenData = {
      userId: user.id,
    };
    const [accessToken, createdTime, expiredTime] = signToken(tokenData);
    // check refreshToken, sign refreshToken

    return [accessToken, createdTime, expiredTime];
  },
};
export default AuthService;
