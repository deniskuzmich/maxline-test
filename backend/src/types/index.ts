export interface IUser {
  login: string;
  passwordHash: string;
  results: IResult[];
}

export interface IResult {
  date: Date;
  duration: number; // in seconds
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
}