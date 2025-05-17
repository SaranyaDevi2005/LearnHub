import mongoose from "mongoose";
import { User, InsertUser } from "@shared/schema";
import { Course, InsertCourse } from "@shared/schema";
import { Assessment, InsertAssessment } from "@shared/schema";
import { AssessmentResult, InsertAssessmentResult } from "@shared/schema";
import { Enrollment, InsertEnrollment } from "@shared/schema";

import UserModel from "./models/User";
import CourseModel from "./models/Course";
import AssessmentModel from "./models/Assessment";
import AssessmentResultModel from "./models/AssessmentResult";
import EnrollmentModel from "./models/Enrollment";
import { connectDB } from "./config/db";

// Storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Course operations
  getAllCourses(): Promise<Course[]>;
  getCourseById(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Assessment operations
  getAssessmentByCourseId(courseId: string): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  
  // Assessment result operations
  submitAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult>;
  getAssessmentResultsForUser(userId: number): Promise<AssessmentResult[]>;
  
  // Enrollment operations
  enrollUserInCourse(enrollment: InsertEnrollment): Promise<Enrollment>;
  getUserEnrollments(userId: number): Promise<Enrollment[]>;
  updateEnrollmentProgress(id: number, progress: number): Promise<Enrollment | undefined>;
}

// MongoDB Storage implementation
export class MongoDBStorage implements IStorage {
  constructor() {
    // Connect to MongoDB when storage is initialized
    connectDB();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ id });
      return user ? user.toObject() : undefined;
    } catch (error) {
      console.error("Error fetching user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username });
      return user ? user.toObject() : undefined;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ email });
      return user ? user.toObject() : undefined;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      // Get the next available ID
      const count = await UserModel.countDocuments();
      const id = count + 1;

      const newUser = new UserModel({
        id,
        ...insertUser,
        createdAt: new Date()
      });

      const savedUser = await newUser.save();
      return savedUser.toObject();
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  // Course operations
  async getAllCourses(): Promise<Course[]> {
    try {
      const courses = await CourseModel.find();
      return courses.map(course => course.toObject());
    } catch (error) {
      console.error("Error fetching all courses:", error);
      return [];
    }
  }

  async getCourseById(id: string): Promise<Course | undefined> {
    try {
      const course = await CourseModel.findOne({ id: parseInt(id) });
      return course ? course.toObject() : undefined;
    } catch (error) {
      console.error(`Error fetching course with id ${id}:`, error);
      return undefined;
    }
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    try {
      // Get the next available ID
      const count = await CourseModel.countDocuments();
      const id = count + 1;

      const newCourse = new CourseModel({
        id,
        ...course,
        createdAt: new Date()
      });

      const savedCourse = await newCourse.save();
      return savedCourse.toObject();
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  }

  // Assessment operations
  async getAssessmentByCourseId(courseId: string): Promise<Assessment | undefined> {
    try {
      const assessment = await AssessmentModel.findOne({ courseId: parseInt(courseId) });
      return assessment ? assessment.toObject() : undefined;
    } catch (error) {
      console.error(`Error fetching assessment for course ${courseId}:`, error);
      return undefined;
    }
  }

  async createAssessment(assessment: InsertAssessment): Promise<Assessment> {
    try {
      // Get the next available ID
      const count = await AssessmentModel.countDocuments();
      const id = count + 1;

      const newAssessment = new AssessmentModel({
        id,
        ...assessment,
        createdAt: new Date()
      });

      const savedAssessment = await newAssessment.save();
      return savedAssessment.toObject();
    } catch (error) {
      console.error("Error creating assessment:", error);
      throw error;
    }
  }

  // Assessment result operations
  async submitAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult> {
    try {
      // Get the next available ID
      const count = await AssessmentResultModel.countDocuments();
      const id = count + 1;

      const newResult = new AssessmentResultModel({
        id,
        ...result,
        completedAt: new Date()
      });

      const savedResult = await newResult.save();
      return savedResult.toObject();
    } catch (error) {
      console.error("Error submitting assessment result:", error);
      throw error;
    }
  }

  async getAssessmentResultsForUser(userId: number): Promise<AssessmentResult[]> {
    try {
      const results = await AssessmentResultModel.find({ userId });
      return results.map(result => result.toObject());
    } catch (error) {
      console.error(`Error fetching assessment results for user ${userId}:`, error);
      return [];
    }
  }

  // Enrollment operations
  async enrollUserInCourse(enrollment: InsertEnrollment): Promise<Enrollment> {
    try {
      // Get the next available ID
      const count = await EnrollmentModel.countDocuments();
      const id = count + 1;

      const newEnrollment = new EnrollmentModel({
        id,
        ...enrollment,
        enrolledAt: new Date(),
        completed: false,
        progress: 0
      });

      const savedEnrollment = await newEnrollment.save();
      return savedEnrollment.toObject();
    } catch (error) {
      console.error("Error enrolling user in course:", error);
      throw error;
    }
  }

  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    try {
      const enrollments = await EnrollmentModel.find({ userId });
      return enrollments.map(enrollment => enrollment.toObject());
    } catch (error) {
      console.error(`Error fetching enrollments for user ${userId}:`, error);
      return [];
    }
  }

  async updateEnrollmentProgress(id: number, progress: number): Promise<Enrollment | undefined> {
    try {
      const enrollment = await EnrollmentModel.findOneAndUpdate(
        { id },
        { progress, completed: progress === 100 },
        { new: true }
      );
      return enrollment ? enrollment.toObject() : undefined;
    } catch (error) {
      console.error(`Error updating enrollment progress for id ${id}:`, error);
      return undefined;
    }
  }
}

// Memory Storage implementation for fallback
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private assessments: Map<number, Assessment>;
  private assessmentResults: Map<number, AssessmentResult>;
  private enrollments: Map<number, Enrollment>;
  private userIdCounter: number;
  private courseIdCounter: number;
  private assessmentIdCounter: number;
  private resultIdCounter: number;
  private enrollmentIdCounter: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.assessments = new Map();
    this.assessmentResults = new Map();
    this.enrollments = new Map();
    this.userIdCounter = 1;
    this.courseIdCounter = 1;
    this.assessmentIdCounter = 1;
    this.resultIdCounter = 1;
    this.enrollmentIdCounter = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user = {
      ...insertUser,
      id,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }

  // Course operations
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourseById(id: string): Promise<Course | undefined> {
    return this.courses.get(parseInt(id));
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const id = this.courseIdCounter++;
    const now = new Date();
    const newCourse = {
      ...course,
      id,
      createdAt: now
    };
    this.courses.set(id, newCourse);
    return newCourse;
  }

  // Assessment operations
  async getAssessmentByCourseId(courseId: string): Promise<Assessment | undefined> {
    return Array.from(this.assessments.values()).find(
      (assessment) => assessment.courseId === parseInt(courseId)
    );
  }

  async createAssessment(assessment: InsertAssessment): Promise<Assessment> {
    const id = this.assessmentIdCounter++;
    const now = new Date();
    const newAssessment = {
      ...assessment,
      id,
      createdAt: now
    };
    this.assessments.set(id, newAssessment);
    return newAssessment;
  }

  // Assessment result operations
  async submitAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult> {
    const id = this.resultIdCounter++;
    const now = new Date();
    const newResult = {
      ...result,
      id,
      completedAt: now
    };
    this.assessmentResults.set(id, newResult);
    return newResult;
  }

  async getAssessmentResultsForUser(userId: number): Promise<AssessmentResult[]> {
    return Array.from(this.assessmentResults.values()).filter(
      (result) => result.userId === userId
    );
  }

  // Enrollment operations
  async enrollUserInCourse(enrollment: InsertEnrollment): Promise<Enrollment> {
    const id = this.enrollmentIdCounter++;
    const now = new Date();
    const newEnrollment = {
      ...enrollment,
      id,
      enrolledAt: now,
      completed: false,
      progress: 0
    };
    this.enrollments.set(id, newEnrollment);
    return newEnrollment;
  }

  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter(
      (enrollment) => enrollment.userId === userId
    );
  }

  async updateEnrollmentProgress(id: number, progress: number): Promise<Enrollment | undefined> {
    const enrollment = this.enrollments.get(id);
    if (!enrollment) return undefined;
    
    const updatedEnrollment = {
      ...enrollment,
      progress,
      completed: progress === 100
    };
    this.enrollments.set(id, updatedEnrollment);
    return updatedEnrollment;
  }
}

// Use in-memory storage by default to avoid connection issues
// In a production environment, you would use MongoDB
export const storage = new MemStorage();
