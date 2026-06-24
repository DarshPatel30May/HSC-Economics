import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, BookOpen, Brain, TrendingUp, Globe, Building2 } from "lucide-react";

interface WelcomeProps {
  onSubmit: (name: string) => void;
}

const features = [
  { icon: BookOpen, label: "26 study sections", sub: "Topic 1 + Topic 4", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { icon: Brain, label: "AI-powered help", sub: "Claude · ChatGPT · Gemini", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  { icon: TrendingUp, label: "Progress tracking", sub: "Streaks + quiz scores", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

const topics = [
  { icon: Globe, label: "Topic 1", sub: "The Global Economy", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  { icon: Building2, label: "Topic 4", sub: "Economic Policies", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
];

export function Welcome({ onSubmit }: WelcomeProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* ── Aurora background blobs ──────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/12 rounded-full blur-[100px] animate-aurora" />
        <div className="absolute bottom-[-5%] right-[-8%] w-[600px] h-[600px] bg-violet-600/12 rounded-full blur-[120px] animate-aurora-slow" />
        <div className="absolute top-[40%] left-[55%] w-[350px] h-[350px] bg-blue-500/8 rounded-full blur-[90px] animate-aurora-reverse" />
        <div className="absolute top-[10%] right-[20%] w-[250px] h-[250px] bg-purple-500/8 rounded-full blur-[80px] animate-aurora" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[20%] left-[25%] w-[300px] h-[300px] bg-emerald-500/6 rounded-full blur-[90px] animate-aurora-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* ── Dot grid overlay ─────────────────────────── */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* ── Content ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-7"
        >
          <div className="relative animate-float">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 blur-xl opacity-50 scale-110" />
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl animate-pulse-glow">
              <GraduationCap size={38} className="text-white" />
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            Welcome to{" "}
            <span className="gradient-text-animated">EcoPilot</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your premium HSC Economics study companion
          </p>
          {/* Topic pills */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {topics.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${t.bg} ${t.border} text-xs font-medium ${t.color}`}>
                  <Icon size={11} />
                  <span>{t.label}: {t.sub}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 rounded-2xl blur-xl scale-105" />
          <div className="relative gradient-border-cyan bg-slate-900/80 border border-slate-700/40 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  What should we call you?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Darsh"
                  autoFocus
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/15 transition-all text-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6,182,212,0.4)" }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={!name.trim()}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-35 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/25 text-sm tracking-wide"
              >
                Start studying
                <ArrowRight size={16} />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-5 grid grid-cols-3 gap-2.5"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className={`flex flex-col items-center text-center py-3.5 px-2 rounded-xl border ${f.bg} ${f.border} transition-all hover:brightness-125`}
              >
                <Icon size={18} className={`${f.color} mb-1.5`} />
                <div className={`text-xs font-semibold ${f.color}`}>{f.label}</div>
                <div className="text-[10px] text-slate-600 mt-0.5 leading-tight">{f.sub}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-[11px] text-slate-700 mt-5"
        >
          NSW HSC Economics · Year 12 · 2024–2026
        </motion.p>
      </motion.div>
    </div>
  );
}
