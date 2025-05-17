import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";

interface AssessmentResults {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passing: boolean;
  passingScore: number;
  categoryPerformance: {
    category: string;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
  }[];
}

export default function AssessmentResults() {
  const { courseId } = useParams();
  const [, navigate] = useLocation();
  
  // In a real application, we would receive the results from the previous page
  // or fetch them from the server using the assessment ID
  const location = useLocation();
  const results: AssessmentResults = location[0]?.state?.results ?? {
    score: 80,
    totalQuestions: 10,
    correctAnswers: 8,
    passing: true,
    passingScore: 70,
    categoryPerformance: [
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
    ]
  };

  // Safeguard against navigating directly to this page without results
  if (!results) {
    navigate(`/courses/${courseId}`);
    return null;
  }

  return (
    <div className="fade-in">
      <Card className="mb-10">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                <path d="M8 10V20M8 10L4 9.99998M8 10L12 10M16 10V20M16 10L12 10M16 10L20 10M4 15H8M12 15H16M4 20H8M12 20H16"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Assessment Completed!</h1>
            <p className="text-gray-600">
              Congratulations on completing the assessment.
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 mb-8">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-primary">{results.score}%</div>
              <p className="text-gray-600 mt-1">Your Score</p>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">0%</span>
              <span className="text-sm text-gray-500">Passing Score: {results.passingScore}%</span>
              <span className="text-sm text-gray-500">100%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${results.score}%` }}></div>
            </div>
            
            <div className={`${results.passing ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'} rounded-md p-3 text-center`}>
              <span className={`${results.passing ? 'text-secondary' : 'text-destructive'} font-medium`}>
                {results.passing ? "You've passed the assessment!" : "You didn't pass the assessment. Try again!"}
              </span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Performance Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.categoryPerformance.map((category, index) => (
                <div key={index} className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{category.category}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{category.correctAnswers}/{category.totalQuestions} correct</span>
                    <span className="text-primary font-medium">{category.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button className="bg-primary hover:bg-blue-700 text-white">
              View Detailed Results
            </Button>
            <Link href={`/courses/${courseId}`}>
              <Button variant="outline" className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50">
                Return to Course
              </Button>
            </Link>
            <Button variant="outline" className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50">
              Download Certificate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
