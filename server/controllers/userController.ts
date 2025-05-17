import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { storage } from '../storage';
import { insertUserSchema } from '@shared/schema';
import { z } from 'zod';

// Register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validatedData = insertUserSchema.extend({
      email: z.string().email(),
      confirmPassword: z.string().optional()
    }).parse(req.body);

    // Check if user already exists
    const existingUser = await storage.getUserByUsername(validatedData.username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await storage.getUserByEmail(validatedData.email);
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    // Create the user
    const user = await storage.createUser({
      username: validatedData.username,
      email: validatedData.email,
      password: hashedPassword
    });

    // Return the user data without the password
    const { password, ...userData } = user;
    res.status(201).json(userData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by username
export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return the user data without the password
    const { password, ...userData } = user;
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await storage.getUser(parseInt(id));
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return the user data without the password
    const { password, ...userData } = user;
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Save a course for a user
export const saveCourseForUser = async (req: Request, res: Response) => {
  try {
    const { userId, courseId } = req.body;
    
    if (!userId || !courseId) {
      return res.status(400).json({ message: 'User ID and Course ID are required' });
    }
    
    // Validate that the user exists
    const user = await storage.getUser(parseInt(userId));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Validate that the course exists
    const course = await storage.getCourseById(courseId.toString());
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Save the course for the user
    const updatedUser = await storage.saveCourseForUser(parseInt(userId), parseInt(courseId));
    if (!updatedUser) {
      return res.status(500).json({ message: 'Failed to save course' });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;
    
    res.status(200).json({ 
      message: 'Course saved successfully', 
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error('Error saving course for user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all saved courses for a user
export const getSavedCoursesForUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    // Validate that the user exists
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get saved courses for the user
    const savedCourses = await storage.getSavedCoursesForUser(userId);
    
    res.status(200).json(savedCourses);
  } catch (error) {
    console.error('Error fetching saved courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
