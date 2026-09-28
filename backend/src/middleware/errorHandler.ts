import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';

// Последний middleware в app.ts: превращает брошенные ошибки в HTTP-ответы
export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Ошибка сервера' });
};
