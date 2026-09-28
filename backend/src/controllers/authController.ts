import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { registerUser, loginUser } from '../services/authService';
import { generateTokens, verifyRefreshToken } from '../services/tokenService';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { login, password } = req.body;
  await registerUser(login, password);
  res.status(201).json({ message: 'Пользователь зарегистрирован' });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { login, password } = req.body;

  const user = await loginUser(login, password);

  // Полезно зашить в payload и userId, и role, чтобы не лезть в базу при проверке прав админа
  const tokens = generateTokens({
    userId: (user._id as Types.ObjectId).toString(),
    role: user.role,
  });

  res.json({
    ...tokens,
    userId: user._id,
    login: user.login,
    role: user.role,
  });
});

// Обновление пары токенов по refresh-токену
export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token отсутствует');
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    throw new ApiError(403, 'Невалидный или просроченный refresh токен');
  }

  res.json(generateTokens({ userId: decoded.userId, role: decoded.role }));
});
