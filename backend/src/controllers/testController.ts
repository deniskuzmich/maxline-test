import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import User from '../models/User';

interface SaveResultBody {
  duration: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
}

export const saveResult = async (req: AuthRequest, res: Response) => {
  try {
    const { duration, correctCount, totalQuestions, passed } = req.body as SaveResultBody;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    user.results.push({
      date: new Date(),
      duration,
      correctCount,
      totalQuestions,
      passed,
    });

    await user.save();
    res.json({ message: 'Результат сохранён' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};