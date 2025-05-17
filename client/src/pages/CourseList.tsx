import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  instructor: string;
  imageUrl: string;
}

interface CourseListProps {
  featured?: boolean;
}

export default function CourseList({ featured = false }: CourseListProps) {
  const [sort, setSort] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>([]);
  const coursesPerPage = 6;
  const { toast } = useToast();
  
  // In a real app, this would come from auth context
  const userId = 1;

  const { data: courses = [], isLoading, error } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });
  
  // Query to get user's saved courses
  const { data: savedCourses = [] } = useQuery<Course[]>({
    queryKey: ["/api/saved-courses", userId],
    queryFn: async () => {
      try {
        const data = await apiRequest(`/api/saved-courses/${userId}`);
        return data as Course[];
      } catch (err) {
        console.error("Error fetching saved courses:", err);
        return [];
      }
    },
    onSuccess: (data) => {
      if (data && Array.isArray(data)) {
        setSavedCourseIds(data.map(course => course.id.toString()));
      }
    },
  });
  
  // Mutation for saving a course
  const saveMutation = useMutation({
    mutationFn: async (courseId: string) => {
      return await apiRequest('/api/save-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, courseId }),
      });
    },
    onSuccess: () => {
      // Invalidate the saved courses query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['/api/saved-courses', userId] });
      toast({
        title: "Course Saved",
        description: "This course has been added to your saved courses.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save course. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const handleSaveCourse = (courseId: string) => {
    saveMutation.mutate(courseId);
    // Optimistically update UI
    setSavedCourseIds((prev) => [...prev, courseId]);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const getCategoryBgColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "programming":
        return "bg-blue-100 text-primary";
      case "business":
        return "bg-green-100 text-secondary";
      case "design":
        return "bg-purple-100 text-accent";
      case "marketing":
        return "bg-green-100 text-secondary";
      case "data science":
        return "bg-blue-100 text-primary";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  let filteredCourses = courses || [];
  
  // Apply sorting
  if (sort === "popular") {
    filteredCourses = [...filteredCourses].sort((a, b) => b.rating - a.rating);
  } else if (sort === "newest") {
    filteredCourses = [...filteredCourses].sort((a, b) => a.id.localeCompare(b.id));
  } else if (sort === "price-low") {
    filteredCourses = [...filteredCourses].sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    filteredCourses = [...filteredCourses].sort((a, b) => b.price - a.price);
  }

  // If featured is true, just show the first 6 courses
  if (featured) {
    filteredCourses = filteredCourses.slice(0, 6);
  }

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = featured ? filteredCourses : filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Loading state
  if (isLoading) {
    return (
      <div className="pt-6 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{featured ? "Featured Courses" : "All Courses"}</h2>
          <div className="w-40 h-10">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Courses</h2>
        <p className="text-gray-600 mb-6">There was an error loading the course list. Please try again later.</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (!currentCourses.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Courses Found</h2>
        <p className="text-gray-600">We couldn't find any courses matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{featured ? "Featured Courses" : "All Courses"}</h2>
        
        {!featured && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden course-card transition-all duration-300">
            <img className="h-48 w-full object-cover" src={course.imageUrl} alt={course.title} />
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className={`${getCategoryBgColor(course.category)} text-xs px-2 py-1 rounded-full`}>
                  {course.category}
                </span>
                <div className="ml-auto flex items-center">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleSaveCourse(course.id);
                    }}
                    className="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    title={savedCourseIds.includes(course.id) ? "Saved to your list" : "Save to your list"}
                  >
                    {savedCourseIds.includes(course.id) ? (
                      <BookmarkCheck className="h-4 w-4 text-primary" />
                    ) : (
                      <Bookmark className="h-4 w-4 text-gray-500 hover:text-primary" />
                    )}
                  </button>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-600 text-sm ml-1">{course.rating.toFixed(1)}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-semibold">${course.price.toFixed(2)}</span>
                <Link href={`/courses/${course.id}`}>
                  <a className="text-sm font-medium text-primary hover:text-blue-700">View Details</a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {!featured && totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) paginate(currentPage - 1);
                  }}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                
                // Show only current page, first, last, and pages around current page
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink 
                        href="#" 
                        isActive={pageNumber === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          paginate(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                
                // Show ellipsis for skipped pages
                if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return <PaginationItem key={pageNumber}><PaginationEllipsis /></PaginationItem>;
                }
                
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) paginate(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          <div className="mt-2 text-center text-sm text-gray-500">
            Showing {indexOfFirstCourse + 1} to {Math.min(indexOfLastCourse, filteredCourses.length)} of {filteredCourses.length} results
          </div>
        </div>
      )}
    </div>
  );
}
