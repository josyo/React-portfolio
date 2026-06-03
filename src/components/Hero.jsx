
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { files } from "../data/data"


export default function Hero() {
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const [activeFile, setActiveFile] = useState("about.md");

   useEffect(()=> {
      // Fuction to run
      //Tracks and logs mouse position
      function handleMouseMove(e) {
         setMousePosition({ x: e.clientX, y: e.clientY });
         console.log(e.clientX, e.clientY)
      }
      //Suscribing to an event 
      window.addEventListener("mousemove", handleMouseMove)

      //Unsuscribing to an event
      return () => window.removeEventListener("mousemove", handleMouseMove)
   }, []);


   return (
      <motion.section 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.6}}
         className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
         {/*Movable Hero glow*/}
         <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
               background: `radial-gradient(
                  600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                  rgba(59, 130, 246, 0.15), 
                  transparent 40%
               )`,
            }}
         />

         {/*Fixed Hero glow*/}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top-left glow */}
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl bg-blue-500/15 animate-pulse" />
            {/* Bottom-right glow */}
            <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl bg-purple-500/10 animate-pulse" />  
         </div>

         
         
         <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="grid xl:grid-cols-[1fr_1.2fr] 2xl:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-stretch w-full">

               {/* LEFT CONTENT */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-8 text-center lg:text-left"
               >

                  {/* PROFILE */}
<div className="flex flex-col sm:flex-row items-center lg:items-start gap-5">

   {/* Photo */}
   <div className="relative flex-shrink-0">
      {/* Glow */}
      <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full scale-110" />

      <img
         src="/profile-photo.png"
         alt="Joseph Olakunle"
         className="
            relative
            h-24 w-24
            sm:h-28 sm:w-28
            rounded-3xl
            object-cover
            border border-white/10
            shadow-[0_0_30px_rgba(34,211,238,0.15)]
         "
      />
   </div>

   {/* Text */}
   <div className="space-y-3 text-center sm:text-left">

      <div>
         <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Joseph Olakunle
         </h3>
      </div>

      {/* Role Badge */}
      <div>
         <span
            className="
               inline-flex
               items-center
               gap-2
               px-4
               py-2
               rounded-full
               bg-cyan-500/10
               text-cyan-400
               text-sm
               font-medium
               border
               border-cyan-500/10
            "
         >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Full-Stack Software Engineer
         </span>
      </div>
   </div>
</div>


                  {/* Heading */}
                  <motion.div
                     initial="hidden"
                     animate="show"
                     variants={{
                        hidden: {},
                        show: {
                           transition: {
                              staggerChildren: 0.08,
                           },
                        },
                     }}
                  >
                     <h1 
                        variants={{
                           hidden: { opacity: 0, y: 10 },
                           show: { opacity: 1, y: 0 },
                        }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight space-y-2">
                        Building
                        <span className="block text-cyan-400">
                           scalable systems
                        </span>
                        <span className="text-4xl sm:text-5xl lg:text-6xl ">for the modern web.</span>
                        
                     </h1>

                  </motion.div>

                  

                 <div className="flex justify-center lg:justify-start">
                     <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 backdrop-blur-sm">
                        
                        <a href="#projects">
                           <motion.button
                              onClick={() => {

                              }}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="
                                 px-5 py-2.5
                                 rounded-xl
                                 bg-cyan-500
                                 hover:bg-cyan-400
                                 text-black
                                 font-semibold
                                 transition
                                 shadow-[0_0_25px_rgba(34,211,238,0.25)]
                              "
                           >
                              View Projects
                           </motion.button>
                        </a>

                        <a href="#contact-me">
                           <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="
                                 px-5 py-2.5
                                 rounded-xl
                                 border-white/10
                                 bg-transparent
                                 hover:bg-white/5
                                 transition
                              "
                           >
                              Contact Me
                           </motion.button>
                        </a>
                     </div>
                  </div>

                  {/* Terminal Status */}
               

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 pt-4">
                     <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4">
                        <p className="text-2xl font-bold text-white">10+</p>
                        <p className="text-xs text-slate-400">Projects</p>
                     </div>

                     <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4">
                        <p className="text-lg font-bold text-white">
                           NestJS
                        </p>
                        <p className="text-xs text-slate-400">
                           React • TypeScript
                        </p>
                     </div>

                     <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4">
                        <p className="text-lg font-bold text-white">
                           Available
                        </p>
                        <p className="text-xs text-slate-400">
                           Open to opportunities
                        </p>
                     </div>
                  </div>
               </motion.div>

               {/* RIGHT IDE */}
               <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}
               >
                  <Card className="
                     w-full
                     bg-white/[0.03]
                     border border-white/5
                     backdrop-blur-xl
                     overflow-hidden
                     rounded-xl
                  ">

                     {/* HEADER */}
                     <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-slate-900/40">

                        <div className="flex items-center gap-2 font-mono text-sm">
                           <span className="text-cyan-400">&lt;</span>
                           <span className="font-semibold text-white">CodeByJo</span>
                           <span className="text-purple-400">IDE</span>
                           <span className="text-cyan-400">/&gt;</span>
                        </div>

                        <div className="text-xs text-slate-400">
                           workspace / portfolio v1
                        </div>
                     </div>

                     {/* BODY */}
                     <div className="flex flex-col md:flex-row h-auto md:h-[520px] md:overflow-visible overflow-hidden">

                        {/* SIDEBAR */}
                        <div className="hidden md:block w-1/3 border-r border-white/10 bg-slate-900/20 p-4">
                           <p className="text-[11px] tracking-wider text-slate-500 uppercase mb-3">
                              Explorer
                           </p>

                           <div className="space-y-2">
                              {Object.keys(files).map((file) => (
                                 <button
                                    key={file}
                                    onClick={() => setActiveFile(file)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-mono border transition ${
                                       activeFile === file
                                          ? "bg-white/10 border-white/10 text-white"
                                          : "border-transparent text-slate-400 hover:bg-white/5"
                                    }`}
                                 >
                                    {file}
                                 </button>
                              ))}
                           </div>
                        </div>

                        {/* CONTENT */}
                        <div className="w-full md:w-2/3 p-4 md:p-6">

                           <div className="md:hidden flex gap-2 overflow-x-auto mb-4 border-b border-white/10 pb-3">
                              {Object.keys(files).map((file) => (
                                 <button
                                    key={file}
                                    onClick={() => setActiveFile(file)}
                                    className={`px-3 py-1 text-xs font-mono rounded-md whitespace-nowrap border ${
                                       activeFile === file
                                          ? "bg-white/10 border-white/10 text-white"
                                          : "border-transparent text-slate-400"
                                    }`}
                                 >
                                    {file}
                                 </button>
                              ))}
                           </div>

                           <div className="mb-4">
                              <h2 className="text-lg font-semibold font-mono text-slate-100">
                                 {files[activeFile].title}
                              </h2>

                              <p className="text-xs text-slate-500 mt-1">
                                 {files[activeFile].desc}
                              </p>
                           </div>

                           <Separator className="bg-white/10 mb-4" />

                           <ScrollArea className="h-[240px] md:h-[380px] pr-4">
                              <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                                 {files[activeFile].content}
                              </pre>
                           </ScrollArea>
                        </div>
                     </div>

                     {/* STATUS BAR */}
                     <div className="flex items-center justify-between px-5 py-2 border-t border-white/10 bg-slate-900/30 text-[11px] text-slate-500 font-mono">
                        <span>status: building scalable systems</span>
                        <span>react • nestjs • tailwind</span>
                     </div>
                  </Card>
               </motion.div>
            </div>
         </div>
         
      </motion.section>

      
   )
}