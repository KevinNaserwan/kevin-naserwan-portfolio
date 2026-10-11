"use client";

import React, { useState } from "react";
import { Send, Mail, Linkedin, MapPin } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PERSONAL_INFO.email}?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent("Sender Email: " + formData.email + "\n\n" + formData.message)}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-cyan-400 font-mono text-xs tracking-wider uppercase">Let's Connect</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Get in Touch</h2>
          <p className="text-slate-400 text-sm mt-3">
            Whether you want to discuss engineering collaborations, research opportunities, or sports analytics innovation—my inbox is always open.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Message</label>
              <textarea
                rows={4}
                required
                placeholder="Hi Kevin, I'd like to talk about..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message via Email
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-xs font-mono text-slate-500 flex items-center justify-center gap-1.5 mb-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" /> DIRECT EMAIL
              </div>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-semibold text-cyan-400 hover:underline">
                {PERSONAL_INFO.email}
              </a>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-500 flex items-center justify-center gap-1.5 mb-1">
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" /> LINKEDIN
              </div>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-cyan-400 hover:underline">
                Kevin Putrayudha Naserwan
              </a>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-500 flex items-center justify-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> LOCATION
              </div>
              <div className="text-sm font-semibold text-slate-300">{PERSONAL_INFO.location}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
