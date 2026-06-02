// Code Example data
export const files = {
  "about.md": {
    title: "About Me",
    desc: "Developer profile & introduction",
    content:
      "Full-stack developer focused on React, NestJS, and scalable systems. Passionate about clean architecture, UI systems, and developer experience.",
  },

  "skills.json": {
    title: "Skills Overview",
    desc: "Technical stack breakdown",
    content:
      "Frontend: React, Tailwind, Next.js\nBackend: Node.js, NestJS\nDatabase: PostgreSQL, MongoDB\nTools: Git, Docker, Vercel",
  },

  "projects.ts": {
    title: "Project Registry",
    desc: "Selected production builds",
    content:
      "1. E-commerce Platform (React + Node)\n2. Profile API (NestJS + JWT)\n3. Application Tracker (Full Stack)\n4. Portfolio IDE (this project)",
  },
};

//Skills data

export const skillGroups = [
  {
    title: "Frontend",
    color: "cyan",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    color: "purple",
    skills: ["Node.js", "NestJS", "Express", "PostgreSQL"],
  },
  {
    title: "Tools & DevOps",
    color: "blue",
    skills: ["Git", "Docker", "Vercel", "REST APIs"],
  },
];

//project data

export const projects = [
  {
    title: "Job Application Tracker",
    description:
      "A full-stack platform for tracking applications, interviews and offers. Built to streamline the job search process with analytics and progress tracking.",

    desktopImages: [
      "/projects/jobtracker/desktop-1.png",
      "/projects/jobtracker/desktop-2.png",
      "/projects/jobtracker/desktop-3.png",
    ],

    mobileImages: [
      "/projects/jobtracker/mobile-1.png",
      "/projects/jobtracker/mobile-2.png",
      "/projects/jobtracker/mobile-3.png",
    ],

    demo: "#",
    github: "#",
    tech: ["Next.js", "Tailwind", "Supabase", "ShadCN"],
  },
  {
    title: "E-Commerce Platform",
    description:
      "Modern storefront experience featuring product discovery, filtering, responsive design and optimized performance.",
    image: "/projects/ecommerce.png",
    demo: "#",
    github: "#",
    tech: ["React", "Tailwind", "Framer Motion"],
  },
  {
    title: "Portfolio Website",
    description:
      "Developer portfolio focused on performance, motion design and modern user experience principles.",
    image: "/projects/portfolio.png",
    demo: "#",
    github: "#",
    tech: ["React", "Tailwind", "Framer Motion"],
  },
];