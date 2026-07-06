import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { projects } from "../data/data";

// ─────────────────────────────────────────────────────────────────────────────
// Add this to your data/data.js:
//
// export const projects = [
//   {
//     id:          1,
//     title:       "AtlasPay / ZARCA",
//     description: "Enterprise payment gateway platform built for ...",
//     image:       "/projects/atlaspay.png",
//     tech:        ["NestJS", "TypeScript", "PostgreSQL", "Redis"],
//     liveUrl:     null,                              // null = button hidden
//     codeUrl:     "https://github.com/josyo/...",
//     status:      "Production",                      // "Production" | "Open Source" | "WIP"
//   },
//   { id: 2, title: "EduCore", ... },
//   { id: 3, title: "Sluice",  ... },
// ];
//
// First item is always the featured (full-width) card.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Inline SVG icons — no extra package needed ───────────────────────────────
function IconExternal() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207
        11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416
        -4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083
        -.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807
        1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467
        -1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535
        -1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399
        3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23
        3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235
        3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823
        2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086
        8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ─── Status badge colours ──────────────────────────────────────────────────────
const STATUS = {
  "Production":   "bg-green-500/15  border-green-500/30  text-green-400",
  "Open Source":  "bg-blue-500/15   border-blue-500/30   text-blue-400",
  "WIP":          "bg-amber-500/15  border-amber-500/30  text-amber-400",
};

// ─────────────────────────────────────────────────────────────────────────────
// ProjectCard
// 3D perspective tilt  —  per-card spotlight  —  screenshot scale on hover
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project, index, featured = false }) {
  const ref    = useRef(null);
  const [spot, setSpot]       = useState({ x: 0, y: 0, visible: false });
  const [hovered, setHovered] = useState(false);

  // Spring-based tilt — snappy but smooth
  const rawX   = useMotionValue(0);
  const rawY   = useMotionValue(0);
  const rotX   = useSpring(rawX, { stiffness: 300, damping: 30 });
  const rotY   = useSpring(rawY, { stiffness: 300, damping: 30 });
  const MAX    = featured ? 4 : 8; // featured tilts less — it's larger

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    // spotlight
    setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true });
    // tilt — normalise to [-1, 1] then multiply by max angle
    const xN = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
    const yN = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
    rawX.set(yN * -MAX);
    rawY.set(xN *  MAX);
  };

  const onLeave = () => {
    setSpot(s => ({ ...s, visible: false }));
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX:            rotX,
        rotateY:            rotY,
        transformPerspective: 1000,
        background:         "rgba(255,255,255,0.025)",
        border:             "1px solid rgba(255,255,255,0.08)",
      }}
      className="group relative rounded-2xl overflow-hidden cursor-default"
    >

      {/* Per-card mouse spotlight */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          opacity:    spot.visible ? 1 : 0,
          transition: "opacity 0.35s ease",
          background: `radial-gradient(380px circle at ${spot.x}px ${spot.y}px,
            rgba(34,211,238,0.07), transparent 65%)`,
        }}
      />

      {/* Top accent line — appears on hover */}
      <div className="
        absolute top-0 inset-x-0 h-px z-20 pointer-events-none
        bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      " />

      {/* ── Screenshot ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: featured ? "260px" : "196px" }}
      >
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ) : (
          // Fallback gradient when screenshot isn't ready yet
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-blue-500/10" />
        )}

        {/* Gradient so content below is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        {/* Badges over the screenshot */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
          {featured && (
            <span className="
              px-2.5 py-1 rounded-md
              text-[10px] font-mono font-semibold tracking-wider uppercase
              bg-cyan-500/20 border border-cyan-500/30 text-cyan-400
            ">
              Featured
            </span>
          )}
          {project.status && (
            <span className={`
              px-2.5 py-1 rounded-md
              text-[10px] font-mono font-semibold tracking-wider uppercase border
              ${STATUS[project.status] ?? "bg-slate-500/15 border-slate-500/30 text-slate-400"}
            `}>
              {project.status}
            </span>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 p-5 flex flex-col gap-3">

        {/* Title row + link buttons */}
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-bold text-white leading-snug ${featured ? "text-xl" : "text-base"}`}>
            {project.title}
          </h3>

          <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-1.5
                  px-2.5 py-1.5 rounded-lg
                  text-xs font-mono text-slate-400
                  bg-white/[0.05] border border-white/[0.08]
                  hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10
                  transition-all duration-200
                "
              >
                <IconExternal />
                Live
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-1.5
                  px-2.5 py-1.5 rounded-lg
                  text-xs font-mono text-slate-400
                  bg-white/[0.05] border border-white/[0.08]
                  hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/10
                  transition-all duration-200
                "
              >
                <IconGithub />
                Code
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className={`
          text-slate-400 leading-relaxed
          ${featured ? "text-sm line-clamp-3" : "text-xs line-clamp-2"}
        `}>
          {project.description}
        </p>

        {/* Tech chips — staggered spring entrance */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t, ti) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay:    index * 0.07 + ti * 0.04,
                duration: 0.28,
                ease:     [0.34, 1.56, 0.64, 1],
              }}
              className="
                px-2.5 py-1 rounded-md
                text-[11px] font-mono text-slate-400
                bg-white/[0.04] border border-white/[0.08]
                hover:text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/20
                transition-all duration-200
              "
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects section
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const [featuredProject, ...gridProjects] = projects;

  return (
    <section
      id="projects"
      className="relative py-24 px-6 sm:px-10 lg:px-20 bg-slate-950 text-white overflow-hidden"
    >

      {/* Background grid — same pattern as Skills */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity:         0.018,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Ambient glow — purple to differentiate from Skills (cyan) */}
      <div className="
        absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
        w-[900px] h-[500px]
        rounded-full blur-[130px] pointer-events-none
        bg-purple-500/[0.04]
      " />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-16"
      >
        {/* Badge — purple accent to distinguish from Skills' cyan */}
        <div className="
          inline-flex items-center gap-2
          px-4 py-1.5 mb-6 rounded-full
          bg-purple-500/10 border border-purple-500/20
          text-purple-400 text-xs font-mono
        ">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          projects.config.ts
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Things I&apos;ve{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            built
          </span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
          A selection of projects I&apos;ve designed, engineered, and shipped.
        </p>
      </motion.div>

      {/* ── Card grid ── */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-5">

        {/* Featured card — spans both columns */}
        {featuredProject && (
          <div className="md:col-span-2">
            <ProjectCard project={featuredProject} index={0} featured />
          </div>
        )}

        {/* Regular 2-col grid */}
        {gridProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i + 1}
          />
        ))}
      </div>
    </section>
  );
}