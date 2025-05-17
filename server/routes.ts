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
import {
  loginUser,
  enrollUserInCourse
} from "./controllers/authController";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/register", registerUser);
  app.post("/api/login", loginUser);
  
  // User routes
  app.get("/api/users/:username", getUserByUsername);
  app.get("/api/users/id/:id", getUserById);
  
  // Course routes
  app.get("/api/courses", getAllCourses);
  app.get("/api/courses/:id", getCourseById);
  
  // Enrollment routes
  app.post("/api/enroll", enrollUserInCourse);
  app.get("/api/my-enrollments", async (req, res) => {
    // This would normally use authentication to get the user ID
    // For now, we'll return a 501 Not Implemented
    res.status(501).json({ message: "Not implemented yet" });
  });
  
  // Assessment routes
  app.get("/api/assessments/:courseId", getAssessmentByCourseId);
  app.post("/api/submit-assessment", submitAssessment);

  const httpServer = createServer(app);

  return httpServer;
}
