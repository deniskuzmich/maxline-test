import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async () => {
  try {
    if (!env.MONGO_URI) {
      throw new Error('MONGO_URI не задан');
    }
    await mongoose.connect(env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Не удалось подключиться к MongoDB:', (err as Error).message);

    // Фолбэк для локальной разработки: поднимаем in-memory MongoDB.
    // Данные живут только пока работает процесс сервера.
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mem = await MongoMemoryServer.create();
      await mongoose.connect(mem.getUri());
      console.log('In-memory MongoDB запущен (данные не сохраняются между перезапусками)');
    } catch (memErr) {
      console.error(memErr);
      process.exit(1);
    }
  }
};
