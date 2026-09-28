import User from '../models/User';
import { ApiError } from '../utils/ApiError';

export interface TestResult {
  duration: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
}

export const saveResult = async (userId: string, result: TestResult): Promise<void> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'Пользователь не найден');
  }

  user.results.push({
    date: new Date(),
    duration: result.duration,
    correctCount: result.correctCount,
    totalQuestions: result.totalQuestions,
    passed: result.passed,
  });

  await user.save();
};
