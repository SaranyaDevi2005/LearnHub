import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { CheckIcon, ChevronDown, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  instructor: {
    name: string;
    title: string;
    bio: string;
    rating: number;
    reviews: number;
    students: number;
  };
  imageUrl: string;
  learningPoints: string[];
  content: {
    sectionTitle: string;
    lectures: number;
    duration: string;
  }[];
  totalSections: number;
  totalLectures: number;
  totalDuration: string;
  features: {
    videoHours: string;
    articles: number;
    exercises: number;
    hasDownloads: boolean;
    hasCertificate: boolean;
    hasLifetimeAccess: boolean;
  };
}

export default function CourseDetails() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [isEnrollSuccess, setIsEnrollSuccess] = useState(false);
  
  const { data: course, isLoading, error } = useQuery<Course>({
    queryKey: [`/api/courses/${id}`],
  });

  // In a real app, this would use the authenticated user's ID
  const userId = 1;
  
  const enrollMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/enroll", {
        userId,
        courseId: parseInt(id || "0")
      });
    },
    onSuccess: () => {
      setIsEnrollSuccess(true);
      toast({
        title: "Enrollment Successful!",
        description: "You have been successfully enrolled in this course.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Enrollment Failed",
        description: error.message || "There was an error enrolling in this course. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEnrollNow = () => {
    setIsEnrollDialogOpen(true);
  };
  
  const confirmEnrollment = () => {
    enrollMutation.mutate();
  };

  const handleStartAssessment = () => {
    navigate(`/assessment/${id}`);
  };

  if (isLoading) {
    return (
      <div className="fade-in">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="relative">
            <Skeleton className="w-full h-80" />
          </div>
          
          <div className="p-6">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 lg:pr-8 space-y-8">
                <div>
                  <Skeleton className="h-8 w-2/3 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                
                <div>
                  <Skeleton className="h-6 w-1/3 mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex items-start">
                        <Skeleton className="h-4 w-4 mr-3 mt-1" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/3 mt-8 lg:mt-0">
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <Skeleton className="h-8 w-1/3 mb-4" />
                  <Skeleton className="h-12 w-full mb-3" />
                  <Skeleton className="h-12 w-full mb-6" />
                  
                  <Skeleton className="h-5 w-3/4 mb-3" />
                  <div className="space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 mb-12 flex justify-center">
          <Skeleton className="h-12 w-64" />
        </div>
      </div>
    );
  }
  
  if (error || !course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the course you're looking for.</p>
        <Link href="/courses">
          <Button>Return to Course List</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Enrollment Confirmation Dialog */}
      <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Enrollment</DialogTitle>
            <DialogDescription>
              You are about to enroll in <span className="font-medium">{course?.title}</span> for ${course?.price.toFixed(2)}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="text-sm font-medium mb-2">By enrolling, you will get:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-secondary mr-2" />
                Full lifetime access to the course
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-secondary mr-2" />
                Access to {course?.totalLectures} lectures across {course?.totalSections} sections
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-secondary mr-2" />
                Certificate upon completion
              </li>
            </ul>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-end">
            <Button 
              variant="outline" 
              onClick={() => setIsEnrollDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmEnrollment}
              disabled={enrollMutation.isPending}
              className="ml-2"
            >
              {enrollMutation.isPending ? "Processing..." : "Confirm Enrollment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Course Header */}
        <div className="relative">
          <img 
            className="w-full h-80 object-cover" 
            src={course.imageUrl} 
            alt={course.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <span className={`bg-primary text-white text-xs px-2 py-1 rounded-full`}>
              {course.category}
            </span>
            <h1 className="text-3xl font-bold text-white mt-2">{course.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i}
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : i < course.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-white ml-2">{course.rating.toFixed(1)}</span>
                <span className="text-gray-300 mx-2">|</span>
                <span className="text-white">{course.instructor.students.toLocaleString()} students</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Details */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="lg:w-2/3 lg:pr-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">About This Course</h2>
                <p className="text-gray-600">
                  {course.description}
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.learningPoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="ml-3 text-gray-600">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                <Accordion type="single" collapsible className="border rounded-md divide-y">
                  {course.content.map((section, index) => (
                    <AccordionItem key={index} value={`section-${index}`} className="px-0 border-0">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex items-center text-left">
                          <span className="font-medium">{section.sectionTitle}</span>
                        </div>
                        <span className="text-gray-500 text-sm ml-auto mr-2">{section.lectures} lectures • {section.duration}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pt-0 pb-3">
                        <ul className="space-y-2">
                          <li className="text-gray-600">This section contains {section.lectures} lectures and exercises</li>
                          <li className="text-gray-600">Total section duration: {section.duration}</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="mt-3 text-right">
                  <span className="text-sm text-gray-500">
                    {course.totalSections} sections • {course.totalLectures} lectures • {course.totalDuration} total length
                  </span>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Instructor</h2>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-medium text-lg">
                      {course.instructor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">{course.instructor.name}</h3>
                    <p className="text-gray-500">{course.instructor.title}</p>
                    <div className="flex flex-wrap items-center mt-1">
                      <div className="flex items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-600 text-sm ml-1">{course.instructor.rating.toFixed(1)} Instructor Rating</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        <span className="text-gray-600 text-sm ml-1">{course.instructor.reviews.toLocaleString()} Reviews</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <span className="text-gray-600 text-sm ml-1">{course.instructor.students.toLocaleString()} Students</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-3">
                      {course.instructor.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm sticky top-20">
                <div className="text-3xl font-bold text-gray-900 mb-4">${course.price.toFixed(2)}</div>
                <Button 
                  className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded mb-3"
                  onClick={handleEnrollNow}
                  disabled={isEnrollSuccess || enrollMutation.isPending}
                >
                  {enrollMutation.isPending ? "Processing..." : 
                   isEnrollSuccess ? "Enrolled" : "Enroll Now"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded mb-6"
                >
                  Add to Wishlist
                </Button>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">This course includes:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                      <span>{course.features.videoHours} on-demand video</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                      <span>{course.features.articles} articles & resources</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                      <span>{course.features.exercises} coding exercises</span>
                    </li>
                    {course.features.hasDownloads && (
                      <li className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        <span>Downloadable source code</span>
                      </li>
                    )}
                    {course.features.hasCertificate && (
                      <li className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                        <span>Certificate of completion</span>
                      </li>
                    )}
                    {course.features.hasLifetimeAccess && (
                      <li className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 12h8"/><path d="M12 6v6"/></svg>
                        <span>Full lifetime access</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="flex items-center justify-center border-t border-gray-200 pt-6">
                  <button className="text-primary font-medium hover:text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-share-2 inline-block mr-2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    Share this course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Assessment Button */}
      <div className="mt-8 mb-12 flex justify-center">
        <Button 
          onClick={handleStartAssessment}
          className="bg-secondary hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M9 11V6a3 3 0 0 1 6 0v5"/><path d="M11 11h2"/><path d="M15.54 8.46a5 5 0 1 0-7.08 7.08C8.68 16 9.8 16.12 11 16.12h2c1.2 0 2.32-.12 3.54-.58a5 5 0 0 0-1-7.08Z"/><path d="M21 15c0 1.13-.14 2.18-.39 3.13C19.82 21.23 16.37 22 12 22c-4.37 0-7.82-.77-8.61-3.87A14.66 14.66 0 0 1 3 15c0-6 4-9 9-9s9 3.1 9 9Z"/><path d="M14 19a2 2 0 1 1-4 0"/></svg>
          Take Course Assessment
        </Button>
      </div>
    </div>
  );
}
