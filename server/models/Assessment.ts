import mongoose from 'mongoose';
import { Assessment } from '@shared/schema';

const assessmentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  courseId: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeLimit: { type: Number, required: true }, // in minutes
  passingScore: { type: Number, required: true }, // percentage
  questions: [{
    id: { type: String, required: true },
    questionText: { type: String, required: true },
    options: [{
      id: { type: String, required: true },
      text: { type: String, required: true }
    }]
  }],
  createdAt: { type: Date, default: Date.now }
});

const AssessmentModel = mongoose.model<Assessment & mongoose.Document>('Assessment', assessmentSchema);

export default AssessmentModel;
