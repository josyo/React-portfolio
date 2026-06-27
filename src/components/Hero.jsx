import { Card } from "@/components/ui/card";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState, useRef } from "react";
import { files } from "../data/data";

// ─────────────────────────────────────────────────────────────────────────────
// Deterministic particles — avoids Math.random() hydration mismatch in Next.js
// ─────────────────────────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 22 }, (_, i) => {
  const h = (i * 2654435761) >>> 0;
  return {
    id:       i,
    x:        (h % 88) + 6,
    y:        ((h >> 8)  % 88) + 6,
    size:     ((h >> 16) % 3)  + 1.5,
    duration: ((h >> 19) % 10) + 14,
    delay:   -((h >> 22) % 12),
    opacity:  0.14 + (h % 3) * 0.07,
    color:    h % 3,
    range:    ((h >> 12) % 22) + 16,
  };
});

function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute rounded-full ${
            p.color === 0 ? "bg-cyan-400" :
            p.color === 1 ? "bg-purple-400" : "bg-blue-400"
          }`}
          style={{
            left:    `${p.x}%`,
            top:     `${p.y}%`,
            width:   p.size,
            height:  p.size,
            opacity: p.opacity,
          }}
          animate={{
            y:       [0, -p.range, 0],
            opacity: [p.opacity, p.opacity * 3.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CountUp — counts from 0 → target once element enters viewport
// ─────────────────────────────────────────────────────────────────────────────
function CountUp({ to, suffix = "", duration = 1.8 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const val    = useMotionValue(0);
  const disp   = useTransform(val, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) {
      const ctrl = animate(val, to, { duration, ease: "easeOut" });
      return ctrl.stop;
    }
  }, [inView, to, duration, val]);

  return <motion.span ref={ref}>{disp}</motion.span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedTitleLine — draws in then runs a plasma orb along it on loop
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedTitleLine() {
  return (
    <div className="relative w-full h-[4px] overflow-visible">
      {/* Base line — draws left → right */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-px
                   bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        style={{ transformOrigin: "left" }}
        transition={{ delay: 0.55, duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
      />
      {/* Traveling plasma orb */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width:      "clamp(36px, 8%, 60px)",
          height:     4,
          background: "radial-gradient(ellipse 60px 4px at center, rgba(34,211,238,0.95) 0%, rgba(34,211,238,0.3) 55%, transparent 100%)",
          filter:     "blur(0.5px)",
        }}
        animate={{ left: ["-8%", "105%"] }}
        transition={{
          delay:       1.5,
          duration:    2.4,
          repeat:      Infinity,
          ease:        "linear",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Heading lines for staggered cinema-style reveal
// ─────────────────────────────────────────────────────────────────────────────
const HEADING_LINES = [
  { text: "Building",            cls: "" },
  { text: "scalable systems",    cls: "text-cyan-400" },
  { text: "for the modern web.", cls: "text-3xl sm:text-4xl lg:text-5xl" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFile, setActiveFile]       = useState("about.md");
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping]           = useState(true);
  const intervalRef = useRef(null);

  /* ── Mouse glow tracking ── */
  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ── Typing effect ── */
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedContent("");
    setIsTyping(true);
    const content = files[activeFile].content;
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setDisplayedContent(content.slice(0, i));
      if (i >= content.length) {
        clearInterval(intervalRef.current);
        setIsTyping(false);
      }
    }, 10);
    return () => clearInterval(intervalRef.current);
  }, [activeFile]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >

      {/* ── Floating particles ── */}
      <Particles />

      {/* ── Movable mouse glow ── */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(59,130,246,0.15), transparent 40%)`,
        }}
      />

      {/* ── Breathing ambient glows ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl bg-blue-500/15"
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl bg-purple-500/10"
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="grid xl:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* ══════════════════════ LEFT CONTENT ══════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 text-center lg:text-left"
          >

            {/* ── Profile ── */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-5">

              {/* Photo with rotating gradient ring + float */}
              <div className="relative flex-shrink-0">

                {/* 1. Rotating conic-gradient ring */}
                <div className="absolute -inset-[2px] rounded-[26px] overflow-hidden">
                  <motion.div
                    className="absolute -left-1/2 -top-1/2 w-[200%] h-[200%]"
                    style={{
                      background:
                        "conic-gradient(from 0deg at 50% 50%, #22d3ee, #a855f7, #3b82f6, #22d3ee)",
                      opacity: 0.55,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                  />
                </div>

                {/* 2. Dark fill — creates visible border between ring and image */}
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{ background: "rgb(2,6,23)", zIndex: 1 }}
                />

                {/* 3. Soft cyan glow bloom */}
                <div
                  className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-125"
                  style={{ zIndex: 2 }}
                />

                {/* 4. Image — floats gently */}
                <motion.img
                  src="/portrait2.png"
                  alt="Joseph Olakunle"
                  className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-3xl object-cover border border-white/10"
                  style={{ zIndex: 3 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
                />
              </div>

              {/* Name, animated line, role badge */}
              <div className="space-y-3 text-center sm:text-left">

                <motion.h3
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                >
                  Joseph Olakunle
                </motion.h3>

                {/* ── Animated title line ── */}
                <AnimatedTitleLine />

                <motion.span
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.52, duration: 0.45 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                             bg-cyan-500/10 text-cyan-400 text-sm font-medium
                             border border-cyan-500/10"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Full-Stack Software Engineer
                </motion.span>
              </div>
            </div>

            {/* ── Main heading — cinema-style per-line reveal ── */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              {HEADING_LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className={`block ${line.cls}`}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      delay:    0.5 + i * 0.14,
                      duration: 0.65,
                      ease:     [0.33, 1, 0.68, 1],
                    }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* ── CTA buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.92, duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 backdrop-blur-sm">

                <a href="#projects">
                  <div className="relative">
                    {/* Expanding pulse ring behind primary CTA */}
                    <motion.span
                      className="absolute inset-0 rounded-xl bg-cyan-400/25 pointer-events-none"
                      animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400
                                 text-black font-semibold transition
                                 shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                    >
                      View Projects
                    </motion.button>
                  </div>
                </a>

                <a href="#contact-me">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 rounded-xl border border-white/10
                               bg-transparent hover:bg-white/5 transition"
                  >
                    Contact Me
                  </motion.button>
                </a>
              </div>
            </motion.div>

            {/* ── Stats ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="grid grid-cols-3 gap-3 pt-4"
            >
              {/* Count-up stat */}
              <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4">
                <p className="text-2xl font-bold text-white">
                  <CountUp to={10} suffix="+" />
                </p>
                <p className="text-xs text-slate-400">Projects</p>
              </div>

              {/* Stack */}
              <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4">
                <p className="text-lg font-bold text-white">NestJS</p>
                <p className="text-xs text-slate-400">React • TypeScript</p>
              </div>

              {/* Availability with live dot */}
              <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  <p className="text-lg font-bold text-white leading-none">Available</p>
                </div>
                <p className="text-xs text-slate-400">Open to opportunities</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ══════════════════════ RIGHT IDE ══════════════════════ */}
          {/* Outer div: entrance slide-in */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {/* Inner div: continuous float — nested so it doesn't fight entrance */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                ease:     "easeInOut",
                repeat:   Infinity,
                delay:    1.2,
              }}
            >
              <Card className="w-full bg-white/[0.03] border border-white/5 backdrop-blur-xl overflow-hidden rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]">

                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-900/50">

                  {/* macOS traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70    hover:bg-red-500    transition" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70  hover:bg-green-500  transition" />
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="text-cyan-400">&lt;</span>
                    <span className="font-semibold text-white">CodeByJo</span>
                    <span className="text-purple-400">IDE</span>
                    <span className="text-cyan-400">/&gt;</span>
                  </div>

                  <div className="text-[11px] text-slate-500 font-mono">portfolio v1</div>
                </div>

                {/* Body */}
                <div className="flex flex-col md:flex-row h-auto md:h-[460px] overflow-hidden">

                  {/* Sidebar */}
                  <div className="hidden md:flex md:flex-col w-36 flex-shrink-0 border-r border-white/10 bg-slate-900/25 p-3 gap-1">
                    <p className="text-[10px] tracking-widest text-slate-500 uppercase mb-2 font-mono px-1">
                      Explorer
                    </p>
                    {Object.keys(files).map((file) => (
                      <button
                        key={file}
                        onClick={() => setActiveFile(file)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-mono border transition-all ${
                          activeFile === file
                            ? "bg-white/10 border-white/10 text-white"
                            : "border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-300"
                        }`}
                      >
                        {activeFile === file && (
                          <span className="text-cyan-400 mr-1">›</span>
                        )}
                        {file}
                      </button>
                    ))}
                  </div>

                  {/* Content pane */}
                  <div className="flex-1 flex flex-col p-4 md:p-5 min-w-0 overflow-hidden">

                    {/* Mobile tab strip */}
                    <div className="md:hidden flex gap-2 overflow-x-auto mb-4 border-b border-white/10 pb-3">
                      {Object.keys(files).map((file) => (
                        <button
                          key={file}
                          onClick={() => setActiveFile(file)}
                          className={`px-3 py-1 text-xs font-mono rounded-md whitespace-nowrap border transition ${
                            activeFile === file
                              ? "bg-white/10 border-white/10 text-white"
                              : "border-transparent text-slate-400"
                          }`}
                        >
                          {file}
                        </button>
                      ))}
                    </div>

                    {/* File meta */}
                    <div className="mb-3 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-cyan-400 text-xs font-mono">//</span>
                        <h2 className="text-sm font-semibold font-mono text-slate-100 truncate">
                          {files[activeFile].title}
                        </h2>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono pl-6 truncate">
                        {files[activeFile].desc}
                      </p>
                    </div>

                    <Separator className="bg-white/10 mb-3" />

                    {/* Typing content */}
                    <ScrollArea className="flex-1 pr-2">
                      <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                        {displayedContent}
                        {isTyping && (
                          <span className="inline-block w-[7px] h-[13px] bg-cyan-400 animate-pulse align-middle ml-px" />
                        )}
                      </pre>
                    </ScrollArea>
                  </div>
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/10 bg-slate-900/40 text-[10px] font-mono">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                        isTyping ? "bg-cyan-400 animate-pulse" : "bg-green-400"
                      }`}
                    />
                    <span>{isTyping ? "typing…" : "building scalable systems"}</span>
                  </div>
                  <span className="text-slate-500">react • nestjs • tailwind</span>
                </div>
              </Card>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}