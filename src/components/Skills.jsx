import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "../data/data";

// ─────────────────────────────────────────────────────────────────────────────
// Full static class strings — required for Tailwind JIT to include them
// ─────────────────────────────────────────────────────────────────────────────
const COLOR = {
  cyan: {
    dot:    "bg-cyan-400",
    label:  "text-cyan-400",
    num:    "text-cyan-400",
    bar:    "from-transparent via-cyan-400/60 to-transparent",
    chip:   "hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-500/30",
    shadow: "hover:shadow-[0_0_60px_rgba(34,211,238,0.07)]",
    rgb:    "34,211,238",
  },
  purple: {
    dot:    "bg-purple-400",
    label:  "text-purple-400",
    num:    "text-purple-400",
    bar:    "from-transparent via-purple-400/60 to-transparent",
    chip:   "hover:bg-purple-500/10 hover:text-purple-300 hover:border-purple-500/30",
    shadow: "hover:shadow-[0_0_60px_rgba(192,132,252,0.07)]",
    rgb:    "192,132,252",
  },
  blue: {
    dot:    "bg-blue-400",
    label:  "text-blue-400",
    num:    "text-blue-400",
    bar:    "from-transparent via-blue-400/60 to-transparent",
    chip:   "hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/30",
    shadow: "hover:shadow-[0_0_60px_rgba(96,165,250,0.07)]",
    rgb:    "96,165,250",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SkillCard — isolated mouse-tracking spotlight per card
// ─────────────────────────────────────────────────────────────────────────────
function SkillCard({ group, index }) {
  const ref  = useRef(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, visible: false });
  const c = COLOR[group.color] ?? COLOR.cyan;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true });
      }}
      onMouseLeave={() => setSpot((s) => ({ ...s, visible: false }))}
      className={`
        group relative rounded-2xl overflow-hidden cursor-default
        transition-all duration-500 ${c.shadow}
      `}
      style={{
        background: "rgba(255,255,255,0.025)",
        border:     "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity:    spot.visible ? 1 : 0,
          transition: "opacity 0.35s ease",
          background: `radial-gradient(340px circle at ${spot.x}px ${spot.y}px,
            rgba(${c.rgb}, 0.10), transparent 68%)`,
        }}
      />

      {/* Top gradient line — fades in on hover */}
      <div
        className={`
          absolute top-0 inset-x-0 h-px
          bg-gradient-to-r ${c.bar}
          opacity-40 group-hover:opacity-100
          transition-opacity duration-300
        `}
      />

      {/* Decorative index number — barely visible, adds depth */}
      <div
        className={`
          absolute -top-2 right-3
          text-9xl font-black font-mono leading-none
          select-none pointer-events-none
          opacity-[0.045] ${c.num}
        `}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 pt-7 flex flex-col gap-5">

        {/* Category label */}
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse ${c.dot}`} />
          <span className={`text-[11px] font-mono font-semibold tracking-[0.18em] uppercase ${c.label}`}>
            {group.title}
          </span>
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill, si) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.78 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay:    index * 0.07 + si * 0.045,
                duration: 0.32,
                ease:     [0.34, 1.56, 0.64, 1], // backOut spring
              }}
              className={`
                px-3 py-1.5 rounded-lg
                text-xs font-mono select-none
                text-slate-400
                bg-white/[0.04] border border-white/[0.08]
                transition-all duration-200
                ${c.chip}
              `}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────────────────────
export default function Skills() {

  // Build ticker items: flatten all skills with their category dot colour
  const allSkills = skillGroups.flatMap((g) =>
    g.skills.map((s) => ({ name: s, dot: COLOR[g.color]?.dot ?? "bg-cyan-400" }))
  );
  // Duplicate for seamless CSS-loop: translate -50% = back to start
  const ticker = [...allSkills, ...allSkills];

  return (
    <section
      id="skills"
      className="relative py-24 px-6 sm:px-10 lg:px-20 bg-slate-950 text-white overflow-hidden"
    >

      {/* ── Background grid ── */}
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

      {/* ── Ambient centre glow ── */}
      <div className="
        absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
        w-[900px] h-[420px]
        rounded-full blur-[130px]
        pointer-events-none
        bg-cyan-500/[0.04]
      " />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-16"
      >
        {/* File-path badge — matches Hero IDE feel */}
        <div className="
          inline-flex items-center gap-2
          px-4 py-1.5 mb-6
          rounded-full
          bg-cyan-500/10 border border-cyan-500/20
          text-cyan-400 text-xs font-mono
        ">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          stack.config.ts
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Technologies I{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            work with
          </span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
          A curated stack focused on scalability, performance, and clean architecture.
        </p>
      </motion.div>

      {/* ── Skill cards ── */}
      <div className="relative z-10 grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {skillGroups.map((group, i) => (
          <SkillCard key={group.title} group={group} index={i} />
        ))}
      </div>

      {/* ── Scrolling ticker ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="relative z-10 mt-16 overflow-hidden py-1"
      >
        {/* Fade masks */}
        <div className="absolute inset-y-0 left-0  w-24 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

        {/* Track */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          className="flex gap-3 items-center flex-nowrap will-change-transform"
        >
          {ticker.map((item, i) => (
            <span
              key={i}
              className="
                inline-flex items-center gap-1.5 flex-shrink-0
                px-3 py-1.5 rounded-lg
                text-xs font-mono
                text-slate-500
                bg-white/[0.025] border border-white/[0.06]
              "
            >
              <span className={`w-1 h-1 rounded-full flex-shrink-0 ${item.dot}`} />
              {item.name}
            </span>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}