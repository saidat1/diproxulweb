import { School, Paperclip, MessageCircle } from "lucide-react";

export const DEFAULT_AVATAR_URL = "https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const COMPANIES = [
    {
        name: "Asana High",
        logo: "/assets/company-01.svg",
    },
    {
        name: "Tidal Collage",
        logo: "/assets/company-02.svg",
    },
    {
        name: "Innovaccer Institute",
        logo: "/assets/company-03.svg",
    },
    {
        name: "Linear High",
        logo: "/assets/company-04.svg",
    },
    {
        name: "Raycast Primary",
        logo: "/assets/company-05.svg",
    },
    {
        name: "Labelbox Middle",
        logo: "/assets/company-06.svg",
    }
] as const;

export const PROCESS = [
    {
        title: "Set Up Your School and Classes",
        description: "Add your school, teachers, and students. Create and assign classes, subjects, and schedules.",
        icon: School,  // Assuming you would have a "SchoolIcon" component imported
    },
    {
        title: "Track Attendance and Grades",
        description: "Easily monitor student attendance and track grades. Set up gradebooks for each class.",
        icon: Paperclip,  // Assuming you would have a "ClipboardListIcon" component imported
    },
    {
        title: "Communicate with Parents and Students",
        description: "Send updates, grades, and reports. Enable communication through the parent portal to keep everyone informed.",
        icon: MessageCircle,  // Assuming you would have a "ChatIcon" component imported
    },
];


export const FEATURES = [
    {
        title: "Student Management",
        description: "Easily add and manage student profiles, including personal details, enrollment history, and academic progress.",
    },
    {
        title: "Attendance Tracking",
        description: "Track student attendance for each class and generate detailed attendance reports.",
    },
    {
        title: "Gradebook Management",
        description: "Create, manage, and track grades for students, with customizable grading scales and assignment management.",
    },
    {
        title: "Parent Portal",
        description: "Allow parents to view their child’s academic progress, attendance, and communicate with teachers.",
    },
    {
        title: "Communication Tools",
        description: "Send announcements, grades, and notifications to students and parents via email or SMS.",
    },
    {
        title: "Reporting & Analytics",
        description: "Generate detailed reports on student performance, attendance trends, and other key metrics to inform decision-making.",
    },
    {
        title: "Timetable Management",
        description: "Create and manage class schedules for teachers and students. Ensure that all classes are properly assigned and coordinated.",
    },
    {
        title: "Fee Management",
        description: "Track student fee payments, generate invoices, and manage financial records related to tuition, extra-curricular activities, and more.",
    },
    {
        title: "Exam & Assessment Management",
        description: "Create and manage exams, quizzes, and assessments. Track student results and calculate final grades automatically.",
    },
    {
        title: "Staff Management",
        description: "Manage staff profiles, including personal details, employment history, and salary records. Assign teaching responsibilities and monitor performance.",
    },
];


export const REVIEWS = [
    {
        name: "James Cooper",
        username: "@jamescooper",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        review: "This system has completely streamlined our school’s administration. The gradebook and attendance tracking features are incredibly helpful. Highly recommend it!"
    },
    {
        name: "Sophia Adams",
        username: "@sophiaadams",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 4,
        review: "A great tool for managing both students and staff. The reporting features are especially useful. I would love to see more customization options in the future."
    },
    {
        name: "Liam Jackson",
        username: "@liamjackson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 3.5,
        review: "As a teacher, this platform has made it so much easier to track student progress and communicate with parents. It’s intuitive and saves me so much time."
    },
    {
        name: "Emily Davis",
        username: "@emilydavis",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4,
        review: "Really useful for keeping track of student grades and attendance. The parent portal feature is also a great addition. Some minor bugs, but overall it’s fantastic."
    },
    {
        name: "Oliver White",
        username: "@oliverwhite",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 4.5,
        review: "I’ve been using this for a few months now, and it has transformed the way we manage our school. The ease of scheduling, grading, and reporting is unmatched."
    },
    {
        name: "Charlotte Brown",
        username: "@charlottebrown",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 4,
        review: "The communication features with parents and staff are great. It’s easy to send updates and track attendance. Looking forward to more updates and new features."
    },
    {
        name: "Benjamin Harris",
        username: "@benjaminharris",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        rating: 5,
        review: "This platform has been a game-changer for our school’s administration. It’s easy to use, and the data analysis features are incredibly powerful for making informed decisions."
    },
    {
        name: "Mia Wilson",
        username: "@miawilson",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        rating: 4,
        review: "I love how user-friendly the interface is. It's been especially helpful for managing multiple classes and keeping track of everything in one place."
    },
    {
        name: "William Lee",
        username: "@williamlee",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        rating: 4,
        review: "As a school administrator, this system has made managing grades, attendance, and reports so much easier. I highly recommend it for any institution."
    },
];

