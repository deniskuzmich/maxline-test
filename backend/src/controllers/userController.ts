import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import {
  deleteUser as deleteUserService,
  getUserById,
  getUsersWithLastResult,
  resetUserResults as resetUserResultsService,
} from '../services/userService';
import { asyncHandler } from '../utils/asyncHandler';

export const getUsers = asyncHandler(async (_req: AuthRequest, res: Response) => {
  res.json(await getUsersWithLastResult());
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.json(await getUserById(req.userId!));
});

// Удаление пользователя (только админ)
export const deleteUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  await deleteUserService(req.userId!, req.params.id);
  res.json({ message: 'Пользователь удалён' });
});

// Сброс результатов пользователя (только админ)
export const resetUserResults = asyncHandler(async (req: AuthRequest, res: Response) => {
  await resetUserResultsService(req.userId!, req.params.id);
  res.json({ message: 'Результаты пользователя сброшены' });
});
