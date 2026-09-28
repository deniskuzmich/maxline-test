import User, { IUser } from '../models/User';
import { ApiError } from '../utils/ApiError';

// Список всех пользователей с последним результатом теста (для сайдбара)
export const getUsersWithLastResult = async () => {
  const users = await User.find({}, 'login role results').lean();

  return users.map(user => {
    const passedDurations = user.results
      .filter(r => r.passed)
      .map(r => r.duration);

    return {
      _id: user._id,
      login: user.login,
      role: user.role,
      // Минимальное время среди сданных попыток (секунды)
      bestTime: passedDurations.length > 0 ? Math.min(...passedDurations) : null,
      lastResult: user.results.length > 0
        ? {
            date: user.results[user.results.length - 1].date,
            duration: user.results[user.results.length - 1].duration,
            passed: user.results[user.results.length - 1].passed,
            correctCount: user.results[user.results.length - 1].correctCount,
            totalQuestions: user.results[user.results.length - 1].totalQuestions,
          }
        : null,
    };
  });
};

// Бросает 404, если пользователя нет
export const getUserById = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId).select('-passwordHash');
  if (!user) {
    throw new ApiError(404, 'Пользователь не найден');
  }
  return user;
};

// Бросает 403, если userId не админ
const requireAdmin = async (userId: string): Promise<void> => {
  const currentUser = await User.findById(userId);
  if (!currentUser || currentUser.role !== 'admin') {
    throw new ApiError(403, 'Доступ запрещён');
  }
};

export const deleteUser = async (adminId: string, targetId: string): Promise<void> => {
  await requireAdmin(adminId);

  const userToDelete = await User.findById(targetId);
  if (!userToDelete) {
    throw new ApiError(404, 'Пользователь не найден');
  }

  // Не даём удалить самого себя (опционально)
  if (targetId === adminId) {
    throw new ApiError(400, 'Нельзя удалить самого себя');
  }

  await User.findByIdAndDelete(targetId);
};

export const resetUserResults = async (adminId: string, targetId: string): Promise<void> => {
  await requireAdmin(adminId);

  const userToReset = await User.findById(targetId);
  if (!userToReset) {
    throw new ApiError(404, 'Пользователь не найден');
  }

  userToReset.results = [];
  await userToReset.save();
};
