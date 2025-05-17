export const COURSE_CATEGORIES = [
  { id: "programming", name: "Programming" },
  { id: "business", name: "Business" },
  { id: "design", name: "Design" },
  { id: "marketing", name: "Marketing" },
  { id: "data-science", name: "Data Science" },
  { id: "languages", name: "Languages" }
];

export const DUMMY_COURSES = [
  {
    id: "1",
    title: "Web Development Masterclass",
    description: "Master HTML, CSS, JavaScript, React and Node.js in this comprehensive course.",
    category: "Programming",
    price: 89.99,
    rating: 4.8,
    instructor: {
      name: "John Doe",
      title: "Senior Web Developer & Instructor",
      bio: "Web developer with 15+ years of experience specializing in frontend technologies. I've worked with companies like Google, Amazon, and Microsoft, and now I'm passionate about sharing my knowledge with aspiring developers.",
      rating: 4.9,
      reviews: 1284,
      students: 12756
    },
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
    learningPoints: [
      "HTML5 semantic elements and structure",
      "CSS layouts, Flexbox and Grid",
      "Responsive design principles",
      "JavaScript fundamentals and ES6+",
      "DOM manipulation and event handling",
      "React components and state management",
      "Node.js and Express API development",
      "MongoDB database integration"
    ],
    content: [
      {
        sectionTitle: "Section 1: Introduction to Web Development",
        lectures: 4,
        duration: "45 min"
      },
      {
        sectionTitle: "Section 2: HTML5 Fundamentals",
        lectures: 8,
        duration: "1h 20min"
      },
      {
        sectionTitle: "Section 3: CSS Styling and Layout",
        lectures: 10,
        duration: "2h 15min"
      },
      {
        sectionTitle: "Section 4: JavaScript Essentials",
        lectures: 12,
        duration: "3h 10min"
      },
      {
        sectionTitle: "Section 5: React Framework",
        lectures: 15,
        duration: "4h 30min"
      }
    ],
    totalSections: 18,
    totalLectures: 74,
    totalDuration: "24h 45m",
    features: {
      videoHours: "24 hours",
      articles: 15,
      exercises: 25,
      hasDownloads: true,
      hasCertificate: true,
      hasLifetimeAccess: true
    }
  },
  {
    id: "2",
    title: "Business Management Fundamentals",
    description: "Learn essential business management skills and strategies for the modern workplace.",
    category: "Business",
    price: 74.99,
    rating: 4.6,
    instructor: {
      name: "Sarah Johnson",
      title: "Business Consultant & MBA Professor",
      bio: "Business strategist with MBA from Harvard and 10+ years of consulting experience with Fortune 500 companies. I simplify complex business concepts for practical application.",
      rating: 4.8,
      reviews: 932,
      students: 8450
    },
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    learningPoints: [
      "Business strategy development",
      "Team management and leadership skills",
      "Financial planning and analysis",
      "Marketing and sales fundamentals",
      "Operational efficiency",
      "Project management methodologies",
      "Business communication",
      "Change management"
    ],
    content: [
      {
        sectionTitle: "Section 1: Introduction to Business Management",
        lectures: 5,
        duration: "1h 10min"
      },
      {
        sectionTitle: "Section 2: Leadership and Team Building",
        lectures: 7,
        duration: "1h 45min"
      },
      {
        sectionTitle: "Section 3: Financial Management",
        lectures: 8,
        duration: "2h 10min"
      },
      {
        sectionTitle: "Section 4: Marketing Strategies",
        lectures: 6,
        duration: "1h 30min"
      },
      {
        sectionTitle: "Section 5: Operations Management",
        lectures: 7,
        duration: "1h 50min"
      }
    ],
    totalSections: 15,
    totalLectures: 62,
    totalDuration: "18h 30m",
    features: {
      videoHours: "18 hours",
      articles: 22,
      exercises: 15,
      hasDownloads: true,
      hasCertificate: true,
      hasLifetimeAccess: true
    }
  },
  {
    id: "3",
    title: "Digital Illustration for Beginners",
    description: "Start your journey into digital art with this comprehensive guide to illustration.",
    category: "Design",
    price: 59.99,
    rating: 4.9,
    instructor: {
      name: "Alex Chen",
      title: "Professional Illustrator & Digital Artist",
      bio: "Award-winning illustrator with clients including Adobe, Disney, and Marvel. I've been teaching digital art for over 8 years and love helping beginners discover their creative potential.",
      rating: 4.9,
      reviews: 1058,
      students: 9320
    },
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    learningPoints: [
      "Digital drawing fundamentals",
      "Color theory and composition",
      "Character design principles",
      "Creating texture and depth",
      "Drawing techniques for various styles",
      "Working with layers effectively",
      "Light and shadow fundamentals",
      "Creating professional illustrations"
    ],
    content: [
      {
        sectionTitle: "Section 1: Introduction to Digital Art",
        lectures: 6,
        duration: "1h 20min"
      },
      {
        sectionTitle: "Section 2: Digital Tools and Software",
        lectures: 8,
        duration: "2h 10min"
      },
      {
        sectionTitle: "Section 3: Drawing Fundamentals",
        lectures: 10,
        duration: "3h 15min"
      },
      {
        sectionTitle: "Section 4: Color and Composition",
        lectures: 7,
        duration: "2h 30min"
      },
      {
        sectionTitle: "Section 5: Creating Complete Illustrations",
        lectures: 9,
        duration: "3h 45min"
      }
    ],
    totalSections: 12,
    totalLectures: 58,
    totalDuration: "20h 15m",
    features: {
      videoHours: "20 hours",
      articles: 18,
      exercises: 30,
      hasDownloads: true,
      hasCertificate: true,
      hasLifetimeAccess: true
    }
  },
  {
    id: "4",
    title: "Data Science Fundamentals",
    description: "Learn Python, statistics, and machine learning for data science careers.",
    category: "Data Science",
    price: 94.99,
    rating: 4.7,
    instructor: {
      name: "Dr. Maria Rodriguez",
      title: "Data Scientist & AI Researcher",
      bio: "PhD in Computer Science with specialization in Machine Learning. Former lead data scientist at Netflix and currently researching advanced AI algorithms while teaching the next generation of data scientists.",
      rating: 4.8,
      reviews: 865,
      students: 7230
    },
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    learningPoints: [
      "Python programming for data analysis",
      "Statistical analysis fundamentals",
      "Data visualization techniques",
      "Machine learning algorithms",
      "Data cleaning and preprocessing",
      "Feature engineering methods",
      "Model evaluation and validation",
      "Real-world data science projects"
    ],
    content: [
      {
        sectionTitle: "Section 1: Introduction to Data Science",
        lectures: 5,
        duration: "1h 15min"
      },
      {
        sectionTitle: "Section 2: Python for Data Analysis",
        lectures: 12,
        duration: "3h 40min"
      },
      {
        sectionTitle: "Section 3: Statistics and Mathematics",
        lectures: 10,
        duration: "3h 20min"
      },
      {
        sectionTitle: "Section 4: Data Visualization",
        lectures: 8,
        duration: "2h 45min"
      },
      {
        sectionTitle: "Section 5: Machine Learning",
        lectures: 15,
        duration: "5h 30min"
      }
    ],
    totalSections: 15,
    totalLectures: 65,
    totalDuration: "25h 20m",
    features: {
      videoHours: "25 hours",
      articles: 20,
      exercises: 35,
      hasDownloads: true,
      hasCertificate: true,
      hasLifetimeAccess: true
    }
  },
  {
    id: "5",
    title: "Mobile App Development",
    description: "Build iOS and Android apps using React Native and modern JavaScript.",
    category: "Programming",
    price: 79.99,
    rating: 4.5,
    instructor: {
      name: "Mike Zhang",
      title: "Mobile Developer & Software Architect",
      bio: "Full-stack developer with focus on mobile applications. Created multiple top-rated apps with millions of downloads. I specialize in cross-platform development and love sharing practical coding knowledge.",
      rating: 4.6,
      reviews: 742,
      students: 6120
    },
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    learningPoints: [
      "JavaScript and React fundamentals",
      "React Native core concepts",
      "Cross-platform app development",
      "Native modules integration",
      "State management with Redux",
      "API integration and authentication",
      "App deployment to app stores",
      "Performance optimization techniques"
    ],
    content: [
      {
        sectionTitle: "Section 1: Introduction to Mobile Development",
        lectures: 4,
        duration: "55 min"
      },
      {
        sectionTitle: "Section 2: JavaScript and React Essentials",
        lectures: 10,
        duration: "2h 50min"
      },
      {
        sectionTitle: "Section 3: React Native Fundamentals",
        lectures: 12,
        duration: "3h 25min"
      },
      {
        sectionTitle: "Section 4: Building User Interfaces",
        lectures: 8,
        duration: "2h 15min"
      },
      {
        sectionTitle: "Section 5: App State and Data Management",
        lectures: 9,
        duration: "2h 40min"
      }
    ],
    totalSections: 14,
    totalLectures: 60,
    totalDuration: "21h 30m",
    features: {
      videoHours: "21.5 hours",
      articles: 16,
      exercises: 28,
      hasDownloads: true,
      hasCertificate: true,
      hasLifetimeAccess: true
    }
  },
  {
    id: "6",
    title: "Digital Marketing Strategies",
    description: "Learn SEO, social media marketing, and content strategies for business growth.",
    category: "Marketing",
    price: 69.99,
    rating: 4.7,
    instructor: {
      name: "Emma Taylor",
      title: "Digital Marketing Strategist",
      bio: "Digital marketing expert who has helped over 200 businesses grow their online presence. Former marketing director at major e-commerce companies and now sharing strategies that actually work in today's digital landscape.",
      rating: 4.7,
      reviews: 890,
      students: 7840
    },
    imageUrl: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    learningPoints: [
      "Search engine optimization (SEO)",
      "Content marketing strategies",
      "Social media marketing tactics",
      "Email marketing campaigns",
      "Digital advertising platforms",
      "Marketing analytics and KPIs",
      "Brand development online",
      "Conversion rate optimization"
    ],
    content: [
      {
        sectionTitle: "Section 1: Digital Marketing Overview",
        lectures: 5,
        duration: "1h 10min"
      },
      {
        sectionTitle: "Section 2: SEO Fundamentals",
        lectures: 10,
        duration: "2h 45min"
      },
      {
        sectionTitle: "Section 3: Social Media Marketing",
        lectures: 12,
        duration: "3h 20min"
      },
      {
        sectionTitle: "Section 4: Content Marketing",
        lectures: 8,
        duration: "2h 15min"
      },
      {
        sectionTitle: "Section 5: Digital Advertising",
        lectures: 9,
        duration: "2h 30min"
      }
    ],
    totalSections: 15,
    totalLectures: 65,
    totalDuration: "22h 40m",
    features: {
      videoHours: "22.5 hours",
      articles: 25,
      exercises: 20,
      hasDownloads: true,
      hasCertificate: true,
      hasLifetimeAccess: true
    }
  }
];

export const DUMMY_ASSESSMENTS = [
  {
    id: "assessment1",
    courseId: "1",
    title: "Web Development Masterclass Assessment",
    description: "This assessment contains 10 multiple-choice questions to test your understanding of web development concepts.",
    timeLimit: 30, // minutes
    passingScore: 70,
    questions: [
      {
        id: "q1",
        questionText: "Which of the following is NOT a valid way to declare a variable in JavaScript?",
        options: [
          { id: "q1_a", text: "var myVariable = 5;" },
          { id: "q1_b", text: "let myVariable = 5;" },
          { id: "q1_c", text: "const myVariable = 5;" },
          { id: "q1_d", text: "variable myVariable = 5;" }
        ]
      },
      {
        id: "q2",
        questionText: "What does CSS stand for?",
        options: [
          { id: "q2_a", text: "Computer Style Sheets" },
          { id: "q2_b", text: "Creative Style Sheets" },
          { id: "q2_c", text: "Cascading Style Sheets" },
          { id: "q2_d", text: "Colorful Style Sheets" }
        ]
      },
      {
        id: "q3",
        questionText: "Which HTML element is used to define a paragraph?",
        options: [
          { id: "q3_a", text: "<paragraph>" },
          { id: "q3_b", text: "<p>" },
          { id: "q3_c", text: "<para>" },
          { id: "q3_d", text: "<pg>" }
        ]
      },
      {
        id: "q4",
        questionText: "Which property is used to change the background color in CSS?",
        options: [
          { id: "q4_a", text: "bgcolor" },
          { id: "q4_b", text: "background-color" },
          { id: "q4_c", text: "color-background" },
          { id: "q4_d", text: "background" }
        ]
      },
      {
        id: "q5",
        questionText: "What is the correct way to create a function in JavaScript?",
        options: [
          { id: "q5_a", text: "function = myFunction() {}" },
          { id: "q5_b", text: "function:myFunction() {}" },
          { id: "q5_c", text: "function myFunction() {}" },
          { id: "q5_d", text: "create function myFunction() {}" }
        ]
      },
      {
        id: "q6",
        questionText: "Which CSS property is used to control the text size?",
        options: [
          { id: "q6_a", text: "font-size" },
          { id: "q6_b", text: "text-size" },
          { id: "q6_c", text: "text-style" },
          { id: "q6_d", text: "font-style" }
        ]
      },
      {
        id: "q7",
        questionText: "What does HTML stand for?",
        options: [
          { id: "q7_a", text: "Hypertext Markup Language" },
          { id: "q7_b", text: "Hypertext Markdown Language" },
          { id: "q7_c", text: "Hyperloop Machine Language" },
          { id: "q7_d", text: "Helicopters Terminals Motorboats Lamborginis" }
        ]
      },
      {
        id: "q8",
        questionText: "Which method is used to add an element at the end of an array in JavaScript?",
        options: [
          { id: "q8_a", text: "push()" },
          { id: "q8_b", text: "pop()" },
          { id: "q8_c", text: "append()" },
          { id: "q8_d", text: "last()" }
        ]
      },
      {
        id: "q9",
        questionText: "In React, what is used to pass data to a component from outside?",
        options: [
          { id: "q9_a", text: "setState" },
          { id: "q9_b", text: "render with arguments" },
          { id: "q9_c", text: "props" },
          { id: "q9_d", text: "PropTypes" }
        ]
      },
      {
        id: "q10",
        questionText: "Which of the following is a server-side JavaScript runtime environment?",
        options: [
          { id: "q10_a", text: "Java" },
          { id: "q10_b", text: "PHP" },
          { id: "q10_c", text: "Node.js" },
          { id: "q10_d", text: "Python" }
        ]
      }
    ]
  },
  {
    id: "assessment2",
    courseId: "2",
    title: "Business Management Assessment",
    description: "Test your understanding of business management principles with this assessment.",
    timeLimit: 25,
    passingScore: 70,
    questions: [
      {
        id: "q1",
        questionText: "What is the primary function of management?",
        options: [
          { id: "q1_a", text: "Maximizing profits" },
          { id: "q1_b", text: "Planning, organizing, leading, and controlling" },
          { id: "q1_c", text: "Marketing products and services" },
          { id: "q1_d", text: "Hiring and firing employees" }
        ]
      },
      {
        id: "q2",
        questionText: "Which of the following is NOT one of Porter's Five Forces?",
        options: [
          { id: "q2_a", text: "Threat of new entrants" },
          { id: "q2_b", text: "Bargaining power of suppliers" },
          { id: "q2_c", text: "Economic fluctuations" },
          { id: "q2_d", text: "Rivalry among existing competitors" }
        ]
      }
    ]
  }
];
