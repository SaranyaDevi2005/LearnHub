import mongoose from 'mongoose';
import { Enrollment } from '@shared/schema';

const enrollmentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  courseId: { type: Number, required: true },
  enrolledAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  progress: { type: Number, default: 0 }
});

const EnrollmentModel = mongoose.model<Enrollment & mongoose.Document>('Enrollment', enrollmentSchema);

export default EnrollmentModel;
