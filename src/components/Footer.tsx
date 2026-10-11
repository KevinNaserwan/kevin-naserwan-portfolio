import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-slate-950 text-center text-sm text-slate-500">
      <div className="max-w-7xl mx-auto px-6 space-y-4">
        <div className="flex justify-center gap-6 text-slate-400">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-400 transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <div>
          © 2026 {PERSONAL_INFO.name}. Built with Next.js App Router, TypeScript, Tailwind CSS & Framer Motion.
        </div>
      </div>
    </footer>
  );
}
