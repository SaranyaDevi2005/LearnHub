import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { 
  AlertCircle
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface Question {
  id: string;
  questionText: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface Assessment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  questions: Question[];
}

interface SubmitAssessmentData {
  assessmentId: string;
  answers: {
    questionId: string;
    optionId: string;
  }[];
}

export default function Assessment() {
  const { courseId } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
  // Fetch assessment data
  const { data: assessment, isLoading, error } = useQuery<Assessment>({
    queryKey: [`/api/assessments/${courseId}`],
  });
  
  // Start timer when assessment data is loaded
  useEffect(() => {
    if (assessment?.timeLimit && timeLeft === null) {
      setTimeLeft(assessment.timeLimit * 60); // Convert minutes to seconds
    }
  }, [assessment, timeLeft]);
  
  // Timer countdown
  useEffect(() => {
    if (timeLeft === null) return;
    
    if (timeLeft <= 0) {
      handleSubmitAssessment();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev !== null ? prev - 1 : null);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    if (!assessment) return 0;
    return ((currentQuestionIndex + 1) / assessment.questions.length) * 100;
  };
  
  // Handle answer selection
  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  // Navigation between questions
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const goToNextQuestion = () => {
    if (assessment && currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  // Submit assessment mutation
  const submitMutation = useMutation({
    mutationFn: async (data: SubmitAssessmentData) => {
      return apiRequest("POST", "/api/submit-assessment", data);
    },
    onSuccess: async (response) => {
      const results = await response.json();
      navigate(`/assessment-results/${courseId}`, { state: { results } });
    },
    onError: (error) => {
      toast({
        title: "Error submitting assessment",
        description: error.message || "There was an error submitting your assessment. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  // Handle assessment submission
  const handleSubmitAssessment = () => {
    if (!assessment) return;
    
    // Check if all questions have been answered
    const unansweredQuestions = assessment.questions.filter(q => !answers[q.id]);
    
    if (unansweredQuestions.length > 0) {
      toast({
        title: "Incomplete Assessment",
        description: `You have ${unansweredQuestions.length} unanswered questions. Are you sure you want to submit?`,
        variant: "destructive"
      });
      return;
    }
    
    // Format answers for submission
    const formattedAnswers = Object.entries(answers).map(([questionId, optionId]) => ({
      questionId,
      optionId
    }));
    
    // Submit assessment
    submitMutation.mutate({
      assessmentId: assessment.id,
      answers: formattedAnswers
    });
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="fade-in">
        <Card className="mb-10">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-6 w-36" />
            </div>
            
            <Skeleton className="h-24 w-full mb-6" />
            
            <Skeleton className="h-2.5 w-full mb-2" />
            <Skeleton className="h-4 w-32 mb-8" />
            
            <Skeleton className="h-8 w-full mb-4" />
            
            <div className="space-y-3 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-3" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
            
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Error state
  if (error || !assessment) {
    return (
      <div className="text-center py-12">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Assessment not found</AlertTitle>
          <AlertDescription>
            We couldn't load the assessment for this course. Please try again later.
          </AlertDescription>
        </Alert>
        <Button 
          onClick={() => navigate(`/courses/${courseId}`)}
          className="mt-6"
        >
          Return to Course
        </Button>
      </div>
    );
  }
  
  const currentQuestion = assessment.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessment.questions.length - 1;

  return (
    <div className="fade-in">
      <Card className="mb-10">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{assessment.title}</h1>
            <div className="text-gray-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Time Remaining: <span className="ml-1 font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <Alert>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <AlertTitle>Assessment Instructions</AlertTitle>
              <AlertDescription>
                {assessment.description} You need to score at least {assessment.passingScore}% to pass. Good luck!
              </AlertDescription>
            </Alert>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full mb-6">
            <Progress value={calculateProgress()} className="h-2.5" />
          </div>
          <p className="text-sm text-gray-500 mb-8">Question {currentQuestionIndex + 1} of {assessment.questions.length}</p>
          
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQuestionIndex + 1}. {currentQuestion.questionText}
            </h2>
            
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <RadioGroupItem id={option.id} value={option.id} className="h-4 w-4 text-primary" />
                  <Label htmlFor={option.id} className="ml-3 text-gray-700">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous Question
            </Button>
            
            {!isLastQuestion ? (
              <Button 
                onClick={goToNextQuestion}
                disabled={!answers[currentQuestion.id]}
              >
                Next Question
              </Button>
            ) : (
              <Button 
                onClick={handleSubmitAssessment}
                disabled={submitMutation.isPending || Object.keys(answers).length !== assessment.questions.length}
                className="bg-secondary hover:bg-green-600 text-white"
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Assessment"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
