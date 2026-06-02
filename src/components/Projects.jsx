import { motion } from "framer-motion";
import { projects } from "../data/data";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-20 md:py-32 px-6 sm:px-10 lg:px-20 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <div className="text-center mb-24">
        <p className="text-cyan-400 text-sm font-medium mb-3">
          FEATURED WORK
        </p>

        <h2 className="text-4xl md:text-5xl font-bold">
          Selected Projects
        </h2>

        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          A collection of applications focused on scalability,
          performance and user experience.
        </p>
      </div>

      <div className="space-y-32">
        {projects.map((project, index) => {
          const reverse = index % 2 !== 0;

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className={`
                grid
                lg:grid-cols-2
                gap-10
                lg:gap-20
                items-center
                min-h-[80vh]
              `}
            >
              {/* IMAGE */}
              <div
                className={`
                  ${reverse ? "lg:order-2" : ""}
                `}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  className="
                    relative
                    rounded-2xl
                    overflow-hidden
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                  "
                >
                  {/* Browser Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-900/50">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>

                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                      w-full
                      h-[250px]
                      sm:h-[350px]
                      lg:h-[450px]
                      object-cover
                    "
                  />

                  {/* Hover Overlay */}
                  <div
                    className="
                      absolute inset-0
                      bg-black/70
                      opacity-0
                      hover:opacity-100
                      transition
                      duration-300
                      flex
                      items-center
                      justify-center
                      gap-4
                    "
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        px-5 py-3
                        rounded-lg
                        bg-cyan-500
                        text-black
                        font-medium
                      "
                    >
                      Live Demo
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        px-5 py-3
                        rounded-lg
                        border
                        border-white/20
                        bg-white/10
                      "
                    >
                      GitHub
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* CONTENT */}
              <div
                className={`
                  ${reverse ? "lg:order-1" : ""}
                  space-y-6
                `}
              >
                <div>
                  <p className="text-cyan-400 text-sm font-medium mb-2">
                    Project {index + 1}
                  </p>

                  <h3 className="text-3xl md:text-4xl font-bold">
                    {project.title}
                  </h3>
                </div>

                <p className="text-slate-400 leading-relaxed text-lg">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="
                        px-3
                        py-1.5
                        rounded-lg
                        border
                        border-white/10
                        bg-white/5
                        text-sm
                        text-slate-300
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      px-5 py-3
                      rounded-lg
                      bg-cyan-500
                      text-black
                      font-medium
                    "
                  >
                    Launch Demo
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      px-5 py-3
                      rounded-lg
                      border
                      border-white/10
                      bg-white/5
                    "
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}