import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Вспомогательная функция для генерации пары токенов
const generateTokens = (payload: { userId: string; role: string }) => {
  // Access токен живет мало (например, 15 минут)
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  );

  // Refresh токен живет долго (например, 7 дней)
  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET || 'dwheuiy33y78937g663nnfyf6366238934848634fg34uf',
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

// Регистрация (остается почти без изменений)
export const register = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const existing = await User.findOne({ login });
    if (existing) {
      return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = (login === 'kuzmichdenis' || login === 'selivanovamaria') ? 'admin' : 'user';

    const user = new User({ login, passwordHash: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Вход
export const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });
    if (!user) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }

    // Генерируем два токена вместо одного.
    // Полезно зашить в payload и userId, и role, чтобы не лезть в базу при проверке прав админа
    const { accessToken, refreshToken } = generateTokens({
      userId: (user._id as string).toString(),
      role: user.role
    });

    // Отдаем токены и данные пользователя
    res.json({
      accessToken,
      refreshToken,
      userId: user._id,
      login: user.login,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// НОВЫЙ КОНТРОЛЛЕР: Обновление токенов
export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token отсутствует' });
    }

    // Проверяем валидность рефреш-токена
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key',
      (err: any, decoded: any) => {
        if (err) {
          // Если токен просрочен или изменен — шлем 403 (Forbidden) или 401
          return res.status(403).json({ message: 'Невалидный или просроченный refresh токен' });
        }

        // Если всё ок, создаем новую пару токенов
        const tokens = generateTokens({
          userId: decoded.userId,
          role: decoded.role
        });

        res.json(tokens);
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};