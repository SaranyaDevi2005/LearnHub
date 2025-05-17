import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Loader2, BookmarkX } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  instructor: string;
  imageUrl: string;
}

export default function SavedCourses() {
  // In a real application, you would get the user ID from authentication context
  // For now, we'll use a hardcoded user ID
  const userId = 1; 

  const { data: savedCourses, isLoading, error } = useQuery({
    queryKey: ['/api/saved-courses', userId],
    queryFn: () => apiRequest<Course[]>(`/api/saved-courses/${userId}`),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your saved courses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <BookmarkX className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Unable to load saved courses</h2>
        <p className="text-muted-foreground mb-4">There was an error retrieving your saved courses.</p>
        <Button asChild>
          <Link href="/courses">Browse All Courses</Link>
        </Button>
      </div>
    );
  }

  if (!savedCourses || savedCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <BookmarkX className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Saved Courses Yet</h2>
        <p className="text-muted-foreground mb-4">You haven't saved any courses. Browse our catalog and save courses for later!</p>
        <Button asChild>
          <Link href="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Saved Courses</h1>
        <p className="text-muted-foreground">Your bookmarked courses for future learning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedCourses.map((course) => (
          <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img 
                src={course.imageUrl} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {course.category}
                </Badge>
                <div className="flex items-center text-amber-500">
                  <span className="mr-1">★</span>
                  <span>{course.rating.toFixed(1)}</span>
                </div>
              </div>
              <CardTitle className="text-xl mt-2">{course.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                By {course.instructor}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-lg font-bold">
                ${course.price.toFixed(2)}
              </div>
              <Button asChild variant="default">
                <Link href={`/courses/${course.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}