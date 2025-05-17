import { Link } from "wouter";
import CourseList from "./CourseList";

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 px-4 sm:px-6 lg:px-8">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Expand your</span>
                  <span className="block text-primary">knowledge today</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Access hundreds of courses taught by expert instructors. Learn at your own pace and achieve your goals with LearnHub.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/register">
                      <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                        Get started
                      </a>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href="/courses">
                      <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-gray-100 hover:bg-gray-200 md:py-4 md:text-lg md:px-10">
                        Explore courses
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* A student studying on laptop with books around them */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
            alt="Student studying on laptop"
          />
        </div>
      </div>

      {/* Course Categories */}
      <div className="pb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/courses">
            <a className="bg-white shadow-sm rounded-lg px-5 py-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-xl"><path d="M6 5h12"/><path d="M6 9h12"/><path d="m9 5 2 8.5L15 5"/><path d="M4 12h3a3 3 0 1 1 0 6H4"/><path d="M17 13v5"/><path d="M20 13v5"/></svg>
                </div>
                <span className="text-gray-900 font-medium">Programming</span>
              </div>
            </a>
          </Link>
          
          <Link href="/courses">
            <a className="bg-white shadow-sm rounded-lg px-5 py-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary text-xl"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 15h14a2 2 0 1 1 0 4H3"/></svg>
                </div>
                <span className="text-gray-900 font-medium">Business</span>
              </div>
            </a>
          </Link>
          
          <Link href="/courses">
            <a className="bg-white shadow-sm rounded-lg px-5 py-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent text-xl"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m11 13.73-4 6.93"/></svg>
                </div>
                <span className="text-gray-900 font-medium">Design</span>
              </div>
            </a>
          </Link>
          
          <Link href="/courses">
            <a className="bg-white shadow-sm rounded-lg px-5 py-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 text-xl"><path d="M3 20Q3 20 3 20"/><path d="M7 12V4h10v8l-5 8-5-8Z"/></svg>
                </div>
                <span className="text-gray-900 font-medium">Languages</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
      
      {/* Display the course list */}
      <CourseList featured={true} />
    </div>
  );
}
