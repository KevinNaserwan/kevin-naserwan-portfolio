"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Code, Zap, GraduationCap, Briefcase } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolioData";

export default function Experience() {
  const getIcon = (company: string) => {
    if (company.includes("Bukit Asam")) return <Building2 className="w-6 h-6 text-cyan-400" />;
    if (company.includes("HashMicro")) return <Code className="w-6 h-6 text-blue-400" />;
    if (company.includes("Meets")) return <Zap className="w-6 h-6 text-purple-400" />;
    if (company.includes("R17")) return <GraduationCap className="w-6 h-6 text-emerald-400" />;
    return <Briefcase className="w-6 h-6 text-amber-400" />;
  };

  return (
    <section id="experience" className="py-24 bg-slate-900/30 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan-400 font-mono text-xs tracking-wider uppercase">Career Progression</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Work Experience</h2>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-slate-800">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex items-start gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 z-10 shadow-lg">
                {getIcon(exp.company)}
              </div>

              <div className="glass-panel p-6 sm:p-8 flex-1 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{exp.role}</h3>
                  <span className={`text-xs font-mono px-3 py-1 rounded-full ${
                    exp.isCurrent
                      ? "text-cyan-400 bg-cyan-950/60 border border-cyan-500/30"
                      : "text-slate-400 bg-slate-800 border border-slate-700"
                  }`}>
                    {exp.period}
                  </span>
                </div>

                <div className="text-sm font-semibold text-slate-300 mb-4">{exp.company} · {exp.location}</div>

                <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside mb-4">
                  {exp.description.map((item, dIdx) => (
                    <li key={dIdx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
