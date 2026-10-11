"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Trophy, Satellite } from "lucide-react";
import { METRICS } from "@/data/portfolioData";

export default function About() {
  const cards = [
    {
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      title: "Enterprise Systems",
      desc: "Delivering mission-critical microservices, ERP modules, and distributed message pipelines at scale. Proven track record at PT Bukit Asam Tbk, HashMicro, and Meets Indonesia.",
      bg: "bg-cyan-500/10 border-cyan-500/20"
    },
    {
      icon: <Trophy className="w-6 h-6 text-blue-400" />,
      title: "Sports Analytics",
      desc: "Active contender in More Than a Hack 2027 (Barça Innovation Hub & Metrica Sports). Developing planar homography calibrations and William Spearman Pitch Control mathematical models.",
      bg: "bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: <Satellite className="w-6 h-6 text-purple-400" />,
      title: "Geospatial AI & M.Sc Track",
      desc: "Pioneering spatio-temporal deep learning and satellite remote sensing (Sentinel-1/2 SAR) for Indonesian rice harvest forecasting and tropical peatland wildfire (Karhutla) pre-ignition warning.",
      bg: "bg-purple-500/10 border-purple-500/20"
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      {/* Metrics Banner */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="glass-panel p-8 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center border border-white/10">
          {METRICS.map((metric, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">{metric.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan-400 font-mono text-xs tracking-wider uppercase">Background & Focus</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Engineered for Reliability, Built for Impact</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-colors shadow-lg"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${card.bg}`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
