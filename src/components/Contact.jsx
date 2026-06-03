import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("jolakunle50@gmail.com");
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  const links = [
    {
      icon: HiOutlineMail,
      label: "Email",
      value: "jolakunle50@gmail.com",
      href: "mailto:jolakunle50@gmail.com",
      action: "copy",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "github.com/josyo",
      href: "https://github.com/josyo",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/josy0",
      href: "https://linkedin.com/in/josy0",
    },
    {
      icon: HiOutlineDocumentText,
      label: "Resume",
      value: "Download CV",
      href: "/resume.pdf",
    },
  ];

  return (
    <section
      id="contact-me"
      className="relative min-h-screen flex items-center px-6 sm:px-10 lg:px-20 overflow-hidden bg-slate-950 text-white"
    >
      {/* Floating Background Glow (NEW) */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 top-10 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"
      />

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-10 bottom-10 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full"
      />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Availability Badge (UPGRADED) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            Open to internships & junior roles
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Let's Build
            <span className="block text-cyan-400">
              Something Great
            </span>
            Together.
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Whether it's a job opportunity, freelance project, or collaboration,
            I’m always open to building meaningful software.
          </p>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-3xl" />

          {/* Card */}
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">

            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 bg-slate-900/30">
              <h3 className="font-semibold text-lg">
                Contact Information
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Click any link to get in touch
              </p>
            </div>

            {/* Links */}
            <div className="p-4 space-y-2">
              {links.map((link) => {
                const Icon = link.icon;

                const isEmail = link.action === "copy";

                return isEmail ? (
                  <button
                    key={link.label}
                    onClick={copyEmail}
                    className="
                      flex items-center justify-between gap-4
                      p-4 rounded-xl
                      border border-transparent
                      hover:border-white/10
                      hover:bg-white/5
                      transition-all duration-200
                      w-full text-left
                      group
                    "
                  >
                    {/* Left */}
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition">
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className="text-sm text-slate-400">
                          Email
                        </p>
                        <p className="font-medium">
                          {copied ? "Copied!" : link.value}
                        </p>
                      </div>
                    </div>

                    <span className="text-slate-500 group-hover:text-cyan-400 transition">
                      →
                    </span>
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex items-center justify-between gap-4
                      p-4 rounded-xl
                      border border-transparent
                      hover:border-white/10
                      hover:bg-white/5
                      transition-all duration-200
                      group
                    "
                  >
                    {/* Left */}
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition">
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className="text-sm text-slate-400">
                          {link.label}
                        </p>
                        <p className="font-medium">
                          {link.value}
                        </p>
                      </div>
                    </div>

                    <span className="text-slate-500 group-hover:text-cyan-400 transition">
                      →
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}