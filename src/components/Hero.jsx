import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState, useRef } from "react";
import { files } from "../data/data";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFile, setActiveFile] = useState("about.md");
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(true);
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
    }, 10); // ~100 chars/sec — feels snappy but readable

    return () => clearInterval(intervalRef.current);
  }, [activeFile]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Movable glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.15), transparent 40%)`,
        }}
      />

      {/* Fixed ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl bg-blue-500/15 animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl bg-purple-500/10 animate-pulse" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Equal two-column grid — prevents IDE from dominating */}
        <div className="grid xl:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* ─── LEFT CONTENT ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Profile */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-5">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-110" />
                <img
                  src="/profile-photo.png"
                  alt="Joseph Olakunle"
                  className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-3xl object-cover border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                />
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Joseph Olakunle
                </h3>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/10">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Full-Stack Software Engineer
                </span>
              </div>
            </div>

            {/* Heading — fixed: was <h1 variants=…> without motion.h1 */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            >
              Building
              <span className="block text-cyan-400">scalable systems</span>
              <span className="text-3xl sm:text-4xl lg:text-5xl">
                for the modern web.
              </span>
            </motion.h1>

            {/* CTA buttons */}
            <div className="flex justify-center lg:justify-start">
              <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 backdrop-blur-sm">
                <a href="#projects">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                  >
                    View Projects
                  </motion.button>
                </a>
                <a href="#contact-me">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 transition"
                  >
                    Contact Me
                  </motion.button>
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4">
                <p className="text-2xl font-bold text-white">10+</p>
                <p className="text-xs text-slate-400">Projects</p>
              </div>
              <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4">
                <p className="text-lg font-bold text-white">NestJS</p>
                <p className="text-xs text-slate-400">React • TypeScript</p>
              </div>
              <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4">
                <p className="text-lg font-bold text-white">Available</p>
                <p className="text-xs text-slate-400">Open to opportunities</p>
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT IDE ─── */}
          {/* Fixed: removed duplicate transition prop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            whileHover={{ y: -4 }}
          >
            <Card className="w-full bg-white/[0.03] border border-white/5 backdrop-blur-xl overflow-hidden rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]">

              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-slate-900/50">
                {/* macOS traffic lights */}
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition" />
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <span className="text-cyan-400">&lt;</span>
                  <span className="font-semibold text-white">CodeByJo</span>
                  <span className="text-purple-400">IDE</span>
                  <span className="text-cyan-400">/&gt;</span>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  portfolio v1
                </div>
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

                  {/* Typing content area */}
                  <ScrollArea className="flex-1 pr-2">
                    <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                      {displayedContent}
                      {/* Block cursor that disappears when done */}
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
                  {/* Live dot — cyan while typing, green when idle */}
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

        </div>
      </div>
    </motion.section>
  );
}