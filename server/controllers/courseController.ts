import { Request, Response } from 'express';
import { storage } from '../storage';
import { DUMMY_COURSES } from '@/lib/constants';

// Initialize courses if none exist
const initializeCourses = async () => {
  const courses = await storage.getAllCourses();
  if (courses.length === 0) {
    console.log('Initializing courses...');
    for (const course of DUMMY_COURSES) {
      try {
        await storage.createCourse({
          title: course.title,
          description: course.description,
          category: course.category,
          price: course.price,
          rating: course.rating,
          instructor: course.instructor,
          imageUrl: course.imageUrl,
          learningPoints: course.learningPoints,
          content: course.content,
          totalSections: course.totalSections,
          totalLectures: course.totalLectures,
          totalDuration: course.totalDuration,
          features: course.features
        });
      } catch (error) {
        console.error(`Error initializing course ${course.title}:`, error);
      }
    }
    console.log('Courses initialized successfully.');
  }
};

// Initialize courses when the server starts
(async () => {
  try {
    await initializeCourses();
  } catch (error) {
    console.error('Error initializing courses:', error);
  }
})();

// Get all courses
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await storage.getAllCourses();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get course by ID
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await storage.getCourseById(id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    console.error(`Error fetching course with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
};
