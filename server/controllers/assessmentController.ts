import { Request, Response } from 'express';
import { storage } from '../storage';
import { z } from 'zod';
import { DUMMY_ASSESSMENTS } from '@/lib/constants';

// Initialize assessments if none exist
const initializeAssessments = async () => {
  try {
    for (const assessment of DUMMY_ASSESSMENTS) {
      const existingAssessment = await storage.getAssessmentByCourseId(assessment.courseId);
      if (!existingAssessment) {
        await storage.createAssessment({
          courseId: parseInt(assessment.courseId),
          title: assessment.title,
          description: assessment.description,
          timeLimit: assessment.timeLimit,
          passingScore: assessment.passingScore,
          questions: assessment.questions
        });
      }
    }
    console.log('Assessments initialized successfully.');
  } catch (error) {
    console.error('Error initializing assessments:', error);
  }
};

// Initialize assessments when the server starts
(async () => {
  try {
    await initializeAssessments();
  } catch (error) {
    console.error('Error initializing assessments:', error);
  }
})();

// Get assessment by course ID
export const getAssessmentByCourseId = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const assessment = await storage.getAssessmentByCourseId(courseId);
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found for this course' });
    }
    
    res.json(assessment);
  } catch (error) {
    console.error(`Error fetching assessment for course ${req.params.courseId}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Submit assessment and get results
export const submitAssessment = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const submitSchema = z.object({
      assessmentId: z.number(),
      answers: z.array(z.object({
        questionId: z.string(),
        optionId: z.string()
      }))
    });

    const validatedData = submitSchema.parse(req.body);
    
    // In a real system, we would:
    // 1. Get the assessment from the database
    // 2. Compare the answers with the correct answers
    // 3. Calculate the score
    // 4. Save the result
    
    // For now, we'll simulate the scoring process
    const totalQuestions = validatedData.answers.length;
    const correctAnswers = Math.floor(totalQuestions * 0.8); // 80% correct as an example
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passingScore = 70; // Example passing score
    const passing = score >= passingScore;
    
    // Create categories performance
    const categoryPerformance = [
      {
        category: "HTML & CSS",
        score: 90,
        correctAnswers: 9,
        totalQuestions: 10
      },
      {
        category: "JavaScript Fundamentals",
        score: 80,
        correctAnswers: 8,
        totalQuestions: 10
      },
      {
        category: "React Framework",
        score: 70,
        correctAnswers: 7,
        totalQuestions: 10
      },
      {
        category: "Backend Development",
        score: 80,
        correctAnswers: 8,
        totalQuestions: 10
      }
    ];
    
    // Save the result (using a placeholder user ID of 1)
    await storage.submitAssessmentResult({
      userId: 1, // Placeholder - would be the authenticated user's ID
      assessmentId: validatedData.assessmentId,
      score,
      passed: passing,
      answers: validatedData.answers
    });
    
    // Return the results
    res.json({
      score,
      totalQuestions,
      correctAnswers,
      passing,
      passingScore,
      categoryPerformance
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    console.error('Error submitting assessment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
