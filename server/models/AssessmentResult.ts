import mongoose from 'mongoose';
import { AssessmentResult } from '@shared/schema';

const assessmentResultSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  assessmentId: { type: Number, required: true },
  score: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  answers: [{ 
    questionId: { type: String, required: true },
    optionId: { type: String, required: true }
  }],
  completedAt: { type: Date, default: Date.now }
});

const AssessmentResultModel = mongoose.model<AssessmentResult & mongoose.Document>('AssessmentResult', assessmentResultSchema);

export default AssessmentResultModel;
