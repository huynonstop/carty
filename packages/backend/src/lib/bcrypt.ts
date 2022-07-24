import { compare, genSalt, hash } from 'bcrypt';
export const hashPassword = async (plainPassword: string) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(plainPassword, salt);
  return [hashedPassword, salt];
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  const isMatched = await compare(plainPassword, hashedPassword);
  return isMatched;
};
