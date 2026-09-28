import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { saveResult, TestResult } from '../services/testService';
import { asyncHandler } from '../utils/asyncHandler';

export const saveTestResult = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = req.body as TestResult;
  await saveResult(req.userId!, result);
  res.json({ message: 'Результат сохранён' });
});
