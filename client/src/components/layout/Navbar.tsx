import { useState } from "react";
import { Link, useLocation } from "wouter";

const Navbar = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // In a real app, this would come from an auth context
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => location === path;

  // For demo purposes, toggle between logged in/out state
  const handleAuthButton = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-primary font-bold text-xl cursor-pointer">
                  Learn<span className="text-secondary">Hub</span>
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/">
                <a className={`${isActive('/') ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Home
                </a>
              </Link>
              <Link href="/courses">
                <a className={`${isActive('/courses') ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Courses
                </a>
              </Link>
              <Link href="/my-learning">
                <a className={`${isActive('/my-learning') ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  My Learning
                </a>
              </Link>
              <Link href="/resources">
                <a className={`${isActive('/resources') ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Resources
                </a>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button type="button" className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <span className="sr-only">View notifications</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>

            <div className="ml-3 relative">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <button className="bg-gray-200 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      <span className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white">
                        U
                      </span>
                    </button>
                  </div>
                  <button 
                    onClick={handleAuthButton}
                    className="text-sm text-gray-700 hover:text-primary"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link href="/login">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/">
              <a className={`${isActive('/') ? 'bg-primary-50 border-primary text-primary' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Home
              </a>
            </Link>
            <Link href="/courses">
              <a className={`${isActive('/courses') ? 'bg-primary-50 border-primary text-primary' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Courses
              </a>
            </Link>
            <Link href="/my-learning">
              <a className={`${isActive('/my-learning') ? 'bg-primary-50 border-primary text-primary' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                My Learning
              </a>
            </Link>
            <Link href="/resources">
              <a className={`${isActive('/resources') ? 'bg-primary-50 border-primary text-primary' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Resources
              </a>
            </Link>
            
            {isLoggedIn ? (
              <button 
                onClick={handleAuthButton}
                className="border-transparent text-primary font-medium hover:bg-gray-50 hover:border-gray-300 block pl-3 pr-4 py-2 border-l-4 text-base w-full text-left"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/login">
                  <a className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                    Sign In
                  </a>
                </Link>
                <Link href="/register">
                  <a className="border-transparent text-primary font-medium hover:bg-gray-50 hover:border-gray-300 block pl-3 pr-4 py-2 border-l-4 text-base">
                    Sign Up
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
