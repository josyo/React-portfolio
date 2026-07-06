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
    id:          1,
    title:       "AtlasPay / ZARCA",
    description: "Enterprise payment gateway platform ...",
    image:       "/projects/atlaspay.png",   // drop screenshots in /public/projects/
    tech:        ["NestJS", "TypeScript", "PostgreSQL", "Redis"],
    liveUrl:     null,       // null hides the Live button
    codeUrl:     "https://github.com/josyo/...",
    status:      "Production",  // "Production" | "Open Source" | "WIP"
  },
  {
    id:          2,
    title:       "Sluice",
    description: "Personal API scenario runner ...",
    image:       "/projects/sluice.png",
    tech:        ["React", "Zustand", "Zod", "Vite"],
    liveUrl:     "https://...",
    codeUrl:     "https://github.com/josyo/...",
    status:      "Open Source",
  },
  // add more...
];