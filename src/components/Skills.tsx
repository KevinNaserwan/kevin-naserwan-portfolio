"use client";

import React from "react";
import { Server, Cpu, Database, Layout } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";

export default function Skills() {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Server className="w-5 h-5 text-cyan-400" />;
      case 1: return <Cpu className="w-5 h-5 text-blue-400" />;
      case 2: return <Database className="w-5 h-5 text-purple-400" />;
      default: return <Layout className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-slate-900/30 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan-400 font-mono text-xs tracking-wider uppercase">Tools & Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Technical Matrix</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all shadow-lg"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                {getIcon(idx)}
                {cat.title}
              </h3>
              <ul className="text-slate-300 text-sm space-y-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
