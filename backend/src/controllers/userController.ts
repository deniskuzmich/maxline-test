import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import User from '../models/User';

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find({}, 'login role results').lean();

    const formattedUsers = users.map(user => ({
      _id: user._id,
      login: user.login,
      role: user.role,
      lastResult: user.results.length > 0 ? {
        date: user.results[user.results.length - 1].date,
        duration: user.results[user.results.length - 1].duration,
        passed: user.results[user.results.length - 1].passed,
        correctCount: user.results[user.results.length - 1].correctCount,
        totalQuestions: user.results[user.results.length - 1].totalQuestions,
      } : null,
    }));

    res.json(formattedUsers);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Удаление пользователя (только админ)
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещён' });
    }

    const { id } = req.params;
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Не даём удалить самого себя (опционально)
    if (id === req.userId) {
      return res.status(400).json({ message: 'Нельзя удалить самого себя' });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: 'Пользователь удалён' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Сброс результатов пользователя (только админ)
export const resetUserResults = async (req: AuthRequest, res: Response) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещён' });
    }

    const { id } = req.params;
    const userToReset = await User.findById(id);
    if (!userToReset) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    userToReset.results = [];
    await userToReset.save();
    res.json({ message: 'Результаты пользователя сброшены' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};