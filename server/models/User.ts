import mongoose from 'mongoose';
import { User } from '@shared/schema';

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default UserModel;
