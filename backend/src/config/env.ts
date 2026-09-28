import dotenv from 'dotenv';

dotenv.config();

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Отсутствует обязательная переменная окружения ${name}`);
  }
  return value;
};

export const env = {
  PORT: process.env.PORT || 5000,
  // Может отсутствовать локально: тогда database.ts поднимет in-memory MongoDB
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: required('JWT_SECRET'),
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'dwheuiy33y78937g663nnfyf6366238934848634fg34uf',
  // Логины, которым при регистрации выдаётся роль admin
  ADMIN_LOGINS: (process.env.ADMIN_LOGINS || 'kuzmichdenis,selivanovamaria')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean),
  ACCESS_TOKEN_TTL: '15m' as const,
  REFRESH_TOKEN_TTL: '7d' as const,
};
