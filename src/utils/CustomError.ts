export class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message);
  }
}
