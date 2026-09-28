import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

export const registerUser = async (login: string, password: string): Promise<void> => {
  const existing = await User.findOne({ login });
  if (existing) {
    throw new ApiError(400, 'Пользователь с таким логином уже существует');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const role = env.ADMIN_LOGINS.includes(login) ? 'admin' : 'user';

  await new User({ login, passwordHash, role }).save();
};

// Бросает 400 при неверных креденшелах, иначе возвращает пользователя
export const loginUser = async (login: string, password: string): Promise<IUser> => {
  const user = await User.findOne({ login });
  if (!user) {
    throw new ApiError(400, 'Неверный логин или пароль');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError(400, 'Неверный логин или пароль');
  }

  return user;
};
