
export const PLANS = [
    {
        name: "Basic",
        info: "For small schools or individual educators",
        price: {
            monthly: 0,
            yearly: 0,
        },
        features: [
            { text: "Student & teacher management" },
            { text: "Manage up to 50 students", limit: "50 students" },
            { text: "Track student attendance" },
            { text: "Basic gradebook management" },
            { text: "Email notifications", tooltip: "Send notifications to parents and students" },
            { text: "Community support", tooltip: "Get answers to your questions on community forums" },
        ],
        btn: {
            text: "Get started for free",
            href: "/auth/sign-up?plan=basic",
            variant: "default",
        }
    },
    {
        name: "Advanced",
        info: "For medium-sized schools and departments",
        price: {
            monthly: 19,
            yearly: Math.round(19 * 12 * (1 - 0.12)),
        },
        features: [
            { text: "Student & teacher management" },
            { text: "Manage up to 200 students", limit: "200 students" },
            { text: "Track student attendance" },
            { text: "Gradebook management with custom grading scales" },
            { text: "Classroom communication (Announcements)" },
            { text: "Parent portal", tooltip: "Allow parents to track student progress" },
            { text: "Priority support", tooltip: "Get priority support from our team" },
        ],
        btn: {
            text: "Upgrade to Advanced",
            href: "/auth/sign-up?plan=advanced",
            variant: "blue",
        }
    },
    {
        name: "Enterprise",
        info: "For large schools or educational institutions",
        price: {
            monthly: 99,
            yearly: Math.round(99 * 12 * (1 - 0.12)),
        },
        features: [
            { text: "Student & teacher management" },
            { text: "Manage unlimited students", limit: "Unlimited students" },
            { text: "Track student attendance" },
            { text: "Advanced gradebook management" },
            { text: "Curriculum management" },
            { text: "Full reporting & analytics", tooltip: "Access detailed reports and insights" },
            { text: "Dedicated account manager", tooltip: "Get priority support and consultation from our team" },
        ],
        btn: {
            text: "Contact sales",
            href: "/auth/sign-up?plan=enterprise",
            variant: "green",
        }
    }
];


export const PRICING_FEATURES = [
    {
        text: "Student & teacher management",
        tooltip: "Easily add, manage, and track student and teacher data",
    },
    {
        text: "Track student attendance",
        tooltip: "Monitor and record student attendance for each class or day",
    },
    {
        text: "Gradebook management",
        tooltip: "Create and manage grades, assign assignments, and calculate GPAs",
    },
    {
        text: "Curriculum management",
        tooltip: "Organize and manage lesson plans, schedules, and resources",
    },
    {
        text: "Parent portal",
        tooltip: "Allow parents to track their child’s academic progress and attendance",
    },
    {
        text: "Advanced reporting & analytics",
        tooltip: "Generate detailed reports on student performance and attendance trends",
    },
    {
        text: "Community support",
        tooltip: "Access forums and community groups for support and collaboration",
    },
    {
        text: "Priority support",
        tooltip: "Get faster resolution for your support inquiries with priority access",
    },
];


export const WORKSPACE_LIMIT = 5;