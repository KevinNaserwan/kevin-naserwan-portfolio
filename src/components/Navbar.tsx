"use client";

import React, { useState } from "react";
import { Github, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            KN
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight block text-white">Kevin Naserwan</span>
            <span className="text-[11px] text-cyan-400 font-mono tracking-wider">SOFTWARE ENGINEER</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/KevinNaserwan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 border border-white/10 text-white transition-all hover:scale-105"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden glass-panel mx-4 mb-4 p-6 space-y-4 rounded-2xl">
          <a href="#about" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-cyan-400">About</a>
          <a href="#experience" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-cyan-400">Experience</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-cyan-400">Projects</a>
          <a href="#skills" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-cyan-400">Skills</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-cyan-400">Contact</a>
          <a
            href="https://github.com/KevinNaserwan"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-cyan-400 font-semibold"
          >
            GitHub Profile →
          </a>
        </div>
      )}
    </header>
  );
}
