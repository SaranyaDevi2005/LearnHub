import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Controllers
import {
  registerUser,
  getUserByUsername,
  getUserById
} from "./controllers/userController";
import {
  getAllCourses,
  getCourseById
} from "./controllers/courseController";
import {
  getAssessmentByCourseId,
  submitAssessment
} from "./controllers/assessmentController";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/register", registerUser);
  
  // Course routes
  app.get("/api/courses", getAllCourses);
  app.get("/api/courses/:id", getCourseById);
  
  // Assessment routes
  app.get("/api/assessments/:courseId", getAssessmentByCourseId);
  app.post("/api/submit-assessment", submitAssessment);

  const httpServer = createServer(app);

  return httpServer;
}
