import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const skillGroups = [
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

export default function Skills() {
  return (
    <section 
      id="skills"
      className="relative py-24 px-6 sm:px-10 lg:px-20 bg-slate-950 text-white overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Technologies I work with
        </h2>
        <p className="text-slate-400 mt-3 text-sm sm:text-base">
          A curated stack focused on scalability, performance, and clean architecture.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="relative"
          >
            <Card className="relative p-6 bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">

              {/* Glow accent line */}
              <div
                className={`absolute top-0 left-0 w-full h-[2px] ${
                  group.color === "cyan"
                    ? "bg-cyan-400"
                    : group.color === "purple"
                    ? "bg-purple-400"
                    : "bg-blue-400"
                }`}
              />

              {/* Title */}
              <h3 className="text-lg font-semibold mb-4 text-white">
                {group.title}
              </h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Subtle hover glow overlay */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}