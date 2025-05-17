import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import CourseList from "@/pages/CourseList";
import CourseDetails from "@/pages/CourseDetails";
import Assessment from "@/pages/Assessment";
import AssessmentResults from "@/pages/AssessmentResults";
import MyLearning from "@/pages/MyLearning";
import Resources from "@/pages/Resources";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/courses">
        {() => <CourseList featured={false} />}
      </Route>
      <Route path="/courses/:id" component={CourseDetails} />
      <Route path="/assessment/:courseId" component={Assessment} />
      <Route path="/assessment-results/:courseId" component={AssessmentResults} />
      <Route path="/my-learning" component={MyLearning} />
      <Route path="/resources" component={Resources} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Router />
            </div>
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
