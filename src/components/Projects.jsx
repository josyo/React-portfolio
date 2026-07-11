import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { projects } from "../data/data";

// Data shape is unchanged — same projects array as before.
// First item is still the featured (split-layout) card.

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
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

// ─── Status badge colours ─────────────────────────────────────────────────────
const STATUS = {
  "Production":  "bg-green-500/15 border-green-500/30 text-green-400",
  "Open Source": "bg-blue-500/15  border-blue-500/30  text-blue-400",
  "WIP":         "bg-amber-500/15 border-amber-500/30 text-amber-400",
};

function StatusBadge({ status }) {
  if (!status) return null;
  return (
    <span className={`
      px-2.5 py-1 rounded-md
      text-[10px] font-mono font-semibold tracking-wider uppercase border
      ${STATUS[status] ?? "bg-slate-500/15 border-slate-500/30 text-slate-400"}
    `}>
      {status}
    </span>
  );
}

// Tech stack as a quiet mono line — reads cleaner than a pile of chips
function TechLine({ tech, className = "" }) {
  return (
    <p className={`font-mono text-[11px] text-slate-500 tracking-wide ${className}`}>
      {tech.join("  ·  ")}
    </p>
  );
}

function LinkButton({ href, icon, label, accent }) {
  const hover =
    accent === "purple"
      ? "hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/10"
      : "hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
        text-xs font-mono text-slate-400
        bg-white/[0.05] border border-white/[0.08]
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/60
        transition-all duration-200 ${hover}
      `}
    >
      {icon}
      {label}
    </a>
  );
}

// ─── Shared tilt behaviour ────────────────────────────────────────────────────
// The tilt is this section's one signature interaction. Spotlight lives in
// Skills; it doesn't get repeated here.
function useTilt(maxDeg, disabled) {
  const ref  = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(rawX, { stiffness: 300, damping: 30 });
  const rotY = useSpring(rawY, { stiffness: 300, damping: 30 });

  const onMove = (e) => {
    if (disabled) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const xN = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const yN = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    rawX.set(yN * -maxDeg);
    rawY.set(xN *  maxDeg);
  };

  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, rotX, rotY, onMove, onLeave };
}

// ─── Featured card — horizontal split, structurally distinct ─────────────────
function FeaturedCard({ project }) {
  const reduceMotion = useReducedMotion();
  const { ref, rotX, rotY, onMove, onLeave } = useTilt(2.5, reduceMotion);

  return (
    <motion.article
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
      className="
        group relative rounded-2xl overflow-hidden
        border border-white/[0.08] bg-white/[0.025]
        grid md:grid-cols-2
      "
    >
      {/* Hover accent line */}
      <div className="
        absolute top-0 inset-x-0 h-px z-20 pointer-events-none
        bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      " />

      {/* Screenshot side */}
      <div className="relative overflow-hidden min-h-[240px] md:min-h-[320px]">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="
              absolute inset-0 w-full h-full object-cover object-top
              transition-transform duration-500 ease-out
              group-hover:scale-[1.04]
            "
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-blue-500/10" />
        )}
        {/* Edge fade into the content side on desktop, downward on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/70 via-transparent to-transparent md:from-transparent md:via-transparent md:to-slate-950/60" />
      </div>

      {/* Content side */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="
            px-2.5 py-1 rounded-md
            text-[10px] font-mono font-semibold tracking-wider uppercase
            bg-cyan-500/20 border border-cyan-500/30 text-cyan-400
          ">
            Featured
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          {project.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed line-clamp-4">
          {project.description}
        </p>

        <TechLine tech={project.tech} />

        <div className="flex items-center gap-2 pt-1">
          {project.liveUrl && (
            <LinkButton href={project.liveUrl} icon={<IconExternal />} label="Live" accent="cyan" />
          )}
          {project.codeUrl && (
            <LinkButton href={project.codeUrl} icon={<IconGithub />} label="Code" accent="purple" />
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Grid card — compact, same signature, fewer accessories ─────────────────
function ProjectCard({ project, index }) {
  const reduceMotion = useReducedMotion();
  const { ref, rotX, rotY, onMove, onLeave } = useTilt(7, reduceMotion);

  return (
    <motion.article
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
      className="
        group relative rounded-2xl overflow-hidden
        border border-white/[0.08] bg-white/[0.025]
        flex flex-col
      "
    >
      <div className="
        absolute top-0 inset-x-0 h-px z-20 pointer-events-none
        bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      " />

      {/* Screenshot */}
      <div className="relative overflow-hidden h-[196px]">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="
              absolute inset-0 w-full h-full object-cover object-top
              transition-transform duration-500 ease-out
              group-hover:scale-[1.05]
            "
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-blue-500/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute top-3 left-3 z-20">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-white leading-snug">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
            {project.liveUrl && (
              <LinkButton href={project.liveUrl} icon={<IconExternal />} label="Live" accent="cyan" />
            )}
            {project.codeUrl && (
              <LinkButton href={project.codeUrl} icon={<IconGithub />} label="Code" accent="purple" />
            )}
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <TechLine tech={project.tech} className="mt-auto pt-1" />
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects section
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const reduceMotion = useReducedMotion();
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
          opacity: 0.018,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Single ambient glow */}
      <div className="
        absolute top-1/3 left-1/2 -translate-x-1/2
        w-[900px] h-[500px]
        rounded-full blur-[130px] pointer-events-none
        bg-purple-500/[0.04]
      " />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header — editorial, left-aligned ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-5">
            <p className="font-mono text-xs text-cyan-400 tracking-wider">
              ~/projects
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl">
            Things I&apos;ve built.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed">
            Payment infrastructure, SaaS platforms, and developer tools —
            designed, engineered, and shipped to production.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-2 gap-5">
          {featuredProject && (
            <div className="md:col-span-2">
              <FeaturedCard project={featuredProject} />
            </div>
          )}

          {gridProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}