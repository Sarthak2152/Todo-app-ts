import { hash, compare } from "bcrypt";
export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 8);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  const isMatch = await compare(password, hashedPassword);
  return isMatch;
}
