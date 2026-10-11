"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Hero() {
  const roles = [
    "Application Developer @ PT Bukit Asam Tbk",
    "Enterprise Microservices Engineer",
    "Sports Analytics Researcher (Barça 2027)",
    "Applied Geospatial AI Researcher"
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.substring(0, displayText.length + 1));
        if (displayText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(current.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 30 : 65);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" class="min-h-screen pt-32 pb-20 flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column (Text & CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Application Developer at PT Bukit Asam (Persero) Tbk
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Architecting Scalable Systems & <span className="gradient-text">Applied AI Solutions</span>
          </h1>

          <div className="h-8 flex items-center text-lg sm:text-xl text-slate-400 font-mono">
            <span>&gt; </span>
            <span className="text-cyan-400 font-semibold ml-2">{displayText}</span>
            <span className="animate-pulse">_</span>
          </div>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Fullstack & Distributed Systems Engineer with expertise in <strong className="text-slate-200">NestJS, Go, .NET 8, and Multi-Modal AI</strong>. Dedicated to building mission-critical enterprise applications, sports telemetry analytics, and geospatial research for national impact.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="px-6 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all inline-flex items-center gap-2"
            >
              Explore Flagship Projects
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="px-6 py-3.5 rounded-xl font-semibold bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-all inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </motion.a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-4 text-slate-400">
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors p-2 hover:bg-white/5 rounded-lg">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors p-2 hover:bg-white/5 rounded-lg">
              <Github className="w-6 h-6" />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-400 transition-colors p-2 hover:bg-white/5 rounded-lg">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        {/* Right Column (Avatar with Floating Motion) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-72 h-72 sm:w-88 sm:h-88">
            {/* Ambient Glow */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 blur-2xl z-0"
            />

            {/* Profile Image */}
            <motion.img
              whileHover={{ scale: 1.03, rotate: 1 }}
              src={PERSONAL_INFO.avatarUrl}
              alt={PERSONAL_INFO.name}
              className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl"
            />

            {/* Live Floating Status Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-2 right-4 glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl z-20 border border-cyan-500/40"
            >
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <div className="text-[10px] text-slate-400 font-mono">STATUS</div>
                <div className="text-xs font-bold text-white">Open to Collaborations</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
