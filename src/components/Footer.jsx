import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineDocumentText,
} from "react-icons/hi";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  const links = [
    {
      label: "GitHub",
      href: "https://github.com/josyo",
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/josy0",
      icon: FaLinkedin,
    },
    {
      label: "Email",
      href: "mailto:jolakunle50@gmail.com",
      icon: HiOutlineMail,
    },
    {
      label: "Resume",
      href: "/resume.pdf",
      icon: HiOutlineDocumentText,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative px-6 sm:px-10 lg:px-20 py-16 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            overflow-hidden
          "
        >

          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/40">

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            <div className="font-mono text-xs text-slate-400">
              joseph@portfolio:~$
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8">

            <div className="space-y-3 font-mono text-sm sm:text-base">

              <p className="text-cyan-400">
                &gt; Thanks for visiting.
              </p>

              <p className="text-slate-300">
                &gt; Open to internships and junior software engineering roles.
              </p>

              <p className="text-slate-300">
                &gt; Building scalable web applications and backend systems.
              </p>

              <p className="text-slate-300">
                &gt; Let's build something great together.
              </p>
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap gap-3 mt-8">

              <div className="px-3 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Available
              </div>

              <div className="px-3 py-2 rounded-full bg-white/5 text-slate-300 text-sm">
                React
              </div>

              <div className="px-3 py-2 rounded-full bg-white/5 text-slate-300 text-sm">
                NestJS
              </div>

              <div className="px-3 py-2 rounded-full bg-white/5 text-slate-300 text-sm">
                TypeScript
              </div>

            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">

              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={
                      link.href.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel="noreferrer"
                    whileHover={{
                      y: -3,
                    }}
                    className="
                      flex items-center justify-center gap-2
                      p-4
                      rounded-xl
                      border border-white/10
                      bg-white/5
                      hover:bg-white/10
                      transition
                    "
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 my-8" />

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

              <p className="text-sm text-slate-500 text-center sm:text-left">
                © 2026 Joseph Olakunle · Built with React, Tailwind & caffeine.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={scrollToTop}
                className="
                  px-4 py-2
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  hover:bg-white/10
                  text-sm
                  transition
                "
              >
                ↑ Back to Top
              </motion.button>

            </div>

          </div>
        </motion.div>
      </div>
    </footer>
  );
}