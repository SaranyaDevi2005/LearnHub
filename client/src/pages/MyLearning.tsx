import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  enrolledAt: string;
  completed: boolean;
  progress: number;
  course: {
    title: string;
    category: string;
    instructor: {
      name: string;
    };
    imageUrl: string;
  };
}

export default function MyLearning() {
  const [activeTab, setActiveTab] = useState("in-progress");
  
  // In a real app, this would fetch the user's enrolled courses
  const { data: enrollments, isLoading } = useQuery<Enrollment[]>({
    queryKey: ["/api/my-enrollments"],
    enabled: false, // Disabled for now since endpoint doesn't exist yet
  });
  
  // Simulate loading state
  if (isLoading) {
    return (
      <div className="fade-in space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
        </div>
        
        <Tabs defaultValue="in-progress" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          </TabsList>
          
          <TabsContent value="in-progress" className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <Skeleton className="h-48 w-full" />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-6" />
                    <Skeleton className="h-2.5 w-full mb-2" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-10 w-36" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Mock data for demo purposes
  const mockEnrollments: Enrollment[] = [
    {
      id: 1,
      userId: 1,
      courseId: 1,
      enrolledAt: "2023-05-10T00:00:00.000Z",
      completed: false,
      progress: 35,
      course: {
        title: "Web Development Masterclass",
        category: "Programming",
        instructor: {
          name: "John Doe"
        },
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80"
      }
    },
    {
      id: 2,
      userId: 1,
      courseId: 2,
      enrolledAt: "2023-06-15T00:00:00.000Z",
      completed: false,
      progress: 60,
      course: {
        title: "Business Management Fundamentals",
        category: "Business",
        instructor: {
          name: "Sarah Johnson"
        },
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
      }
    },
    {
      id: 3,
      userId: 1,
      courseId: 4,
      enrolledAt: "2023-04-20T00:00:00.000Z",
      completed: true,
      progress: 100,
      course: {
        title: "Data Science Fundamentals",
        category: "Data Science",
        instructor: {
          name: "Dr. Maria Rodriguez"
        },
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
      }
    }
  ];
  
  const inProgressCourses = mockEnrollments.filter(e => !e.completed);
  const completedCourses = mockEnrollments.filter(e => e.completed);
  
  // Empty state for bookmarked courses
  const bookmarkedCourses: Enrollment[] = [];
  
  return (
    <div className="fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
        </TabsList>
        
        <TabsContent value="in-progress" className="space-y-6">
          {inProgressCourses.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses in progress</h3>
              <p className="text-gray-600 mb-6">You haven't started any courses yet.</p>
              <Link href="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          ) : (
            inProgressCourses.map((enrollment) => (
              <Card key={enrollment.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <img 
                      src={enrollment.course.imageUrl} 
                      alt={enrollment.course.title} 
                      className="h-48 w-full object-cover" 
                    />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <h3 className="text-xl font-semibold mb-1">{enrollment.course.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {enrollment.course.category} • {enrollment.course.instructor.name}
                    </p>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span className="font-medium">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>
                    <div className="flex justify-end">
                      <Link href={`/courses/${enrollment.courseId}`}>
                        <Button>Continue Learning</Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          {completedCourses.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No completed courses</h3>
              <p className="text-gray-600 mb-6">You haven't completed any courses yet.</p>
              <Link href="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          ) : (
            completedCourses.map((enrollment) => (
              <Card key={enrollment.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <img 
                      src={enrollment.course.imageUrl} 
                      alt={enrollment.course.title} 
                      className="h-48 w-full object-cover" 
                    />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{enrollment.course.title}</h3>
                        <p className="text-gray-500 text-sm mb-4">
                          {enrollment.course.category} • {enrollment.course.instructor.name}
                        </p>
                      </div>
                      <div className="bg-green-100 text-secondary text-xs px-2 py-1 rounded-full">
                        Completed
                      </div>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-gray-600 text-sm">
                        Completed on {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </p>
                      <div className="flex space-x-3">
                        <Link href={`/courses/${enrollment.courseId}`}>
                          <Button variant="outline">View Course</Button>
                        </Link>
                        <Button>Get Certificate</Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="bookmarked" className="space-y-6">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarked courses</h3>
            <p className="text-gray-600 mb-6">You haven't bookmarked any courses yet.</p>
            <Link href="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}