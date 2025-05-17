import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { storage } from '../storage';
import { z } from 'zod';

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const loginSchema = z.object({
      username: z.string().min(3),
      password: z.string().min(6),
      rememberMe: z.boolean().optional()
    });
    
    const validatedData = loginSchema.parse(req.body);
    
    // Check if user exists
    const user = await storage.getUserByUsername(validatedData.username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(validatedData.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Return user data without the password
    const { password, ...userData } = user;
    res.status(200).json({ 
      user: userData,
      message: 'Login successful'
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Enroll user in a course
export const enrollUserInCourse = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const enrollSchema = z.object({
      userId: z.number(),
      courseId: z.number()
    });
    
    const validatedData = enrollSchema.parse(req.body);
    
    // Check if user exists
    const user = await storage.getUser(validatedData.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if course exists
    const course = await storage.getCourseById(validatedData.courseId.toString());
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is already enrolled in this course
    const userEnrollments = await storage.getUserEnrollments(validatedData.userId);
    const alreadyEnrolled = userEnrollments.some(
      enrollment => enrollment.courseId === validatedData.courseId
    );
    
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'User is already enrolled in this course' });
    }
    
    // Enroll user in the course
    const enrollment = await storage.enrollUserInCourse({
      userId: validatedData.userId,
      courseId: validatedData.courseId
    });
    
    res.status(201).json({ 
      enrollment,
      message: 'Successfully enrolled in the course' 
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    console.error('Error during enrollment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};