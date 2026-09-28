// Ошибка API с HTTP-статусом; errorHandler превращает её в ответ { message }
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}
