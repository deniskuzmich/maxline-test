import mongoose, { Schema, Document } from 'mongoose';

export interface IResult {
  date: Date;
  duration: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
}

export interface IUser extends Document {
  login: string;
  passwordHash: string;
  role: string; // 'user' или 'admin'
  results: IResult[];
}

const ResultSchema = new Schema<IResult>({
  date: { type: Date, default: Date.now },
  duration: Number,
  correctCount: Number,
  totalQuestions: Number,
  passed: Boolean,
});

const UserSchema = new Schema<IUser>({
  login: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'user' },
  results: [ResultSchema],
});

export default mongoose.model<IUser>('User', UserSchema);