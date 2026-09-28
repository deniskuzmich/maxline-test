import { NextFunction, Request, Response } from 'express';

type AsyncController = (req: any, res: Response, next: NextFunction) => Promise<unknown>;

// Обертка для async-контроллеров: передаёт отклонённые промисы в errorHandler,
// чтобы не дублировать try/catch в каждом обработчике
export const asyncHandler =
  (fn: AsyncController) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
