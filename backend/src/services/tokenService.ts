import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface TokenPayload {
  userId: string;
  role: string;
}

// Пара access (короткий) + refresh (долгий) токенов
export const generateTokens = (payload: TokenPayload) => ({
  accessToken: jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL }),
  refreshToken: jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.REFRESH_TOKEN_TTL }),
});

// Возвращает payload валидного refresh-токена или null, если токен просрочен/подделан
export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};
