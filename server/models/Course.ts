import mongoose from 'mongoose';
import { Course } from '@shared/schema';

const courseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  instructor: {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    students: { type: Number, required: true }
  },
  imageUrl: { type: String, required: true },
  learningPoints: [{ type: String, required: true }],
  content: [{
    sectionTitle: { type: String, required: true },
    lectures: { type: Number, required: true },
    duration: { type: String, required: true }
  }],
  totalSections: { type: Number, required: true },
  totalLectures: { type: Number, required: true },
  totalDuration: { type: String, required: true },
  features: {
    videoHours: { type: String, required: true },
    articles: { type: Number, required: true },
    exercises: { type: Number, required: true },
    hasDownloads: { type: Boolean, required: true },
    hasCertificate: { type: Boolean, required: true },
    hasLifetimeAccess: { type: Boolean, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

const CourseModel = mongoose.model<Course & mongoose.Document>('Course', courseSchema);

export default CourseModel;
