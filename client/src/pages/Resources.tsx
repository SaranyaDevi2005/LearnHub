import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const resources = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    category: "Guide",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript to start your web development journey.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    url: "#"
  },
  {
    id: 2,
    title: "Modern JavaScript Practices",
    category: "Cheatsheet",
    description: "A comprehensive reference for ES6+ features and best practices in modern JavaScript development.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    url: "#"
  },
  {
    id: 3,
    title: "Business Strategy Template",
    category: "Template",
    description: "A ready-to-use template for developing comprehensive business strategies and plans.",
    imageUrl: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    url: "#"
  },
  {
    id: 4,
    title: "Interview Preparation for Developers",
    category: "Guide",
    description: "Comprehensive guide to technical interviews with common questions and answers.",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    url: "#"
  },
  {
    id: 5,
    title: "Data Visualization Best Practices",
    category: "Cheatsheet",
    description: "Learn how to create effective and impactful data visualizations for any audience.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    url: "#"
  },
  {
    id: 6,
    title: "UI/UX Design Resources",
    category: "Template",
    description: "Collection of design resources, templates, and tools for UI/UX designers.",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    url: "#"
  }
];

const webinars = [
  {
    id: 1,
    title: "Future of Web Development",
    date: "June 15, 2025",
    time: "10:00 AM - 11:30 AM EST",
    presenter: "John Doe",
    description: "Explore the upcoming trends and technologies shaping the future of web development."
  },
  {
    id: 2,
    title: "Mastering Data Science with Python",
    date: "June 22, 2025",
    time: "2:00 PM - 3:30 PM EST",
    presenter: "Dr. Maria Rodriguez",
    description: "A hands-on session covering advanced data science techniques using Python."
  },
  {
    id: 3,
    title: "Digital Marketing Strategies for 2025",
    date: "July 5, 2025",
    time: "11:00 AM - 12:30 PM EST",
    presenter: "Emma Taylor",
    description: "Learn the latest digital marketing strategies and tools to grow your business."
  }
];

export default function Resources() {
  return (
    <div className="fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Resources</h1>
        <p className="text-gray-600">
          Access free guides, templates, and resources to enhance your learning journey.
        </p>
      </div>
      
      <Tabs defaultValue="resources">
        <TabsList className="mb-6">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="webinars">Upcoming Webinars</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={resource.imageUrl}
                    alt={resource.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pt-6 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {resource.category}
                    </span>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 pb-6">
                  <Button asChild variant="outline" className="w-full">
                    <a href={resource.url}>Download Resource</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="webinars">
          <div className="space-y-6">
            {webinars.map((webinar) => (
              <Card key={webinar.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                    <div>
                      <CardTitle className="text-xl">{webinar.title}</CardTitle>
                      <CardDescription className="mt-1">{webinar.description}</CardDescription>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 rounded-md flex flex-col items-center min-w-[160px]">
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium text-center">{webinar.date}</p>
                      <p className="text-sm text-gray-700">{webinar.time}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Presenter: <span className="font-medium">{webinar.presenter}</span>
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Learn More</Button>
                  <Button>Register Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="blog">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 mb-6">Our blog is currently under development. Check back soon for educational articles and insights.</p>
            <Button>Subscribe to Updates</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}