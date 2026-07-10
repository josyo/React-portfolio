import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineDocumentText } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const links = [
    {
      label: "GitHub",
      href: "https://github.com/josyo",
      icon: FaGithub,
      color: "hover:bg-neutral-800/50 hover:border-neutral-700 hover:text-white",
      shadow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.07)]",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/josy0",
      icon: FaLinkedin,
      color: "hover:bg-blue-950/30 hover:border-blue-500/30 hover:text-blue-400",
      shadow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
    },
    {
      label: "Email",
      href: "mailto:jolakunle50@gmail.com",
      icon: HiOutlineMail,
      color: "hover:bg-rose-950/30 hover:border-rose-500/30 hover:text-rose-400",
      shadow: "hover:shadow-[0_0_20px_rgba(244,63,94,0.1)]",
    },
    {
      label: "Resume",
      href: "/resume.pdf",
      icon: HiOutlineDocumentText,
      color: "hover:bg-emerald-950/30 hover:border-emerald-500/30 hover:text-emerald-400",
      shadow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animation variants for a staged booting up look
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <footer className="relative px-6 sm:px-10 lg:px-20 py-20 overflow-hidden bg-slate-950 text-slate-100">
      
      {/* Background Radial Glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -left-20 bottom-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute -right-20 top-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-2xl overflow-hidden shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950/60 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
            </div>
            <div className="font-mono text-xs tracking-wider text-slate-500 select-none">
              joseph@portfolio:~$ <span className="animate-pulse">_</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-10 space-y-10">
            
            {/* Command Output Text Lines */}
            <div className="space-y-4 font-mono text-sm sm:text-base leading-relaxed max-w-2xl">
              <motion.p variants={itemVariants} className="text-cyan-400 flex items-start gap-2">
                <span className="text-slate-600 shrink-0">&gt;</span>
                <span>Thanks for visiting.</span>
              </motion.p>
              <motion.p variants={itemVariants} className="text-slate-300 flex items-start gap-2">
                <span className="text-slate-600 shrink-0">&gt;</span>
                <span>Open to internships and junior software engineering roles.</span>
              </motion.p>
              <motion.p variants={itemVariants} className="text-slate-400 flex items-start gap-2">
                <span className="text-slate-600 shrink-0">&gt;</span>
                <span>Building scalable web applications and distributed backend systems.</span>
              </motion.p>
              <motion.p variants={itemVariants} className="text-emerald-400 font-semibold flex items-start gap-2">
                <span className="text-slate-600 shrink-0">&gt;</span>
                <span>Let's build something beautiful together.</span>
              </motion.p>
            </div>

            {/* Status Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5">
              <div className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 relative" />
                Available for Roles
              </div>
              {["React", "NestJS", "TypeScript", "Next.js", "Node.js"].map((tech) => (
                <div 
                  key={tech} 
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-slate-400 text-xs font-medium transition-colors hover:text-slate-200 hover:bg-white/[0.05]"
                >
                  {tech}
                </div>
              ))}
            </motion.div>

            {/* Dynamic Social Links Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex items-center justify-between
                      p-4 rounded-xl
                      border border-white/5 bg-white/[0.02] text-slate-400
                      transition-all duration-300 ease-out
                      group font-medium text-sm
                      ${link.color} ${link.shadow}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                      <span>{link.label}</span>
                    </div>
                    <span className="text-xs opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-mono text-current">
                      -&gt;
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Subtle Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Footer Bottom Metadata */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <p className="text-xs text-slate-500 tracking-wide font-mono text-center sm:text-left">
                © 2026 Joseph Olakunle · Engineered with React & Tailwind.
              </p>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="
                  px-4 py-2 rounded-lg
                  border border-white/5 bg-white/[0.01] hover:bg-white/[0.04]
                  text-xs font-mono tracking-tight text-slate-400 hover:text-slate-200
                  transition-all shadow-md flex items-center gap-2
                "
              >
                <span>./scroll-to-top.sh</span>
                <span className="text-cyan-400">↑</span>
              </motion.button>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </footer>
  );
}