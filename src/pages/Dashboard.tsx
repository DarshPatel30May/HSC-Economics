import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Flame, CheckCircle2, FileText, MessageSquare,
  Zap, AlertCircle, TrendingUp, BookOpen, Globe, Building2, Sparkles,
  LayoutDashboard, BarChart2, Focus,
} from "lucide-react";
import { topic4Sections } from "../data/topic4Content";
import { topic1Sections } from "../data/topic1Content";
import * as LucideIcons from "lucide-react";
import { ProgressRing } from "../components/ProgressRing";
import type { AppState, TopicId } from "../hooks/useAppState";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  RadialBarChart, RadialBar,
  PieChart, Pie,
} from "recharts";

type PageType = "dashboard" | "study" | "glossary" | "essay-planner" | "paragraph-builder";
type ViewMode = "overview" | "analytics" | "focus";

interface DashboardProps {
  state: AppState;
  getCompletionPercentage: () => number;
  getCompletionPercentageForTopic: (topicId: TopicId) => number;
  getCompletedCount: () => number;
  getNotesCount: () => number;
  getWeakestSection: () => typeof topic4Sections[0] | null;
  getNextIncompleteSection: () => typeof topic4Sections[0] | null;
  setCurrentPage: (page: PageType) => void;
  setCurrentSection: (id: string) => void;
  setCurrentTopic: (topic: TopicId) => void;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const VIEW_MODES: { id: ViewMode; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "overview",  label: "Overview",  icon: LayoutDashboard, desc: "Summary & progress"  },
  { id: "analytics", label: "Analytics", icon: BarChart2,        desc: "Charts & breakdowns" },
  { id: "focus",     label: "Focus",     icon: Focus,            desc: "Distraction-free"   },
];

export function Dashboard({
  state, getCompletionPercentage, getCompletionPercentageForTopic,
  getCompletedCount, getNotesCount, getWeakestSection, getNextIncompleteSection,
  setCurrentPage, setCurrentSection, setCurrentTopic,
}: DashboardProps) {
  const isDark = state.theme === "dark";
  const [viewMode, setViewMode] = useState<ViewMode>("overview");

  const percentage  = getCompletionPercentage();
  const completed   = getCompletedCount();
  const currentSections = state.currentTopic === "topic1" ? topic1Sections : topic4Sections;
  const total       = currentSections.length;
  const weakest     = getWeakestSection();
  const nextSection = getNextIncompleteSection();
  const topic1Pct   = getCompletionPercentageForTopic("topic1");
  const topic4Pct   = getCompletionPercentageForTopic("topic4");
  const overallPct  = Math.round((topic1Pct + topic4Pct) / 2);

  /* ── Chart data ──────────────────────────────── */
  const barData = currentSections.map((s) => {
    const prog = state.sectionProgress[`${state.currentTopic}:${s.id}`];
    return {
      name: s.title.split(" ").slice(0, 3).join(" "),
      value: prog?.completed ? 100 : (prog?.quizScore ?? 0) > 0 ? prog!.quizScore! : 0,
      completed: prog?.completed ?? false,
      quiz: prog?.quizAttempted ?? false,
    };
  });

  const radialData = [
    { name: "Topic 4", value: topic4Pct, fill: "#06b6d4" },
    { name: "Topic 1", value: topic1Pct, fill: "#8b5cf6" },
  ];

  const completedCount  = currentSections.filter(s => state.sectionProgress[`${state.currentTopic}:${s.id}`]?.completed).length;
  const confusedCount   = currentSections.filter(s => { const p = state.sectionProgress[`${state.currentTopic}:${s.id}`]; return p?.confused && !p?.completed; }).length;
  const notStartedCount = currentSections.length - completedCount - confusedCount;
  const pieData = [
    { name: "Completed",     value: completedCount,  fill: "#10b981" },
    { name: "Review needed", value: confusedCount,   fill: "#f59e0b" },
    { name: "Not started",   value: notStartedCount, fill: isDark ? "#1e293b" : "#e2e8f0" },
  ].filter(d => d.value > 0);

  const quizScores = Object.values(state.sectionProgress)
    .filter(p => p?.quizAttempted && (p?.quizScore ?? 0) > 0)
    .map(p => p!.quizScore ?? 0);
  const avgQuiz = quizScores.length ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;

  const stats = [
    { label: "Sections Done",  value: `${completed}/${total}`,       icon: CheckCircle2,  color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "shadow-emerald-500/10" },
    { label: "Notes Written",  value: getNotesCount(),                icon: FileText,      color: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20",  glow: "shadow-violet-500/10"  },
    { label: "Avg Quiz Score", value: avgQuiz ? `${avgQuiz}%` : "—", icon: MessageSquare, color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20",   glow: "shadow-amber-500/10"   },
    { label: "AI Help Used",   value: state.aiHelpCount,              icon: Zap,           color: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/20",    glow: "shadow-cyan-500/10"    },
  ];

  /* ── Shared chart tooltip style ──────────────── */
  const tooltipStyle = {
    background: isDark ? "#0f172a" : "#fff",
    border: `1px solid ${isDark ? "rgba(51,65,85,0.8)" : "rgba(226,232,240,0.8)"}`,
    borderRadius: 12,
    fontSize: 11,
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  };

  return (
    <div className={`min-h-screen pb-20 lg:pb-0 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="max-w-5xl mx-auto px-4 py-6 lg:px-8 space-y-5">

        {/* ── Hero ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-12 -right-12 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-aurora" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-violet-500/8 rounded-full blur-3xl animate-aurora-slow" />
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl animate-aurora-reverse" />
          </div>
          <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex-1 min-w-0">
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? "text-slate-600" : "text-slate-400"}`}>{getGreeting()}</p>
              <h1 className="text-2xl font-extrabold tracking-tight">
                <span className={isDark ? "text-white" : "text-slate-900"}>{state.studentName}</span>
                <span className="ml-2">👋</span>
              </h1>
              <p className={`text-sm mt-1.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {percentage === 100
                  ? "All sections complete — you're exam-ready!"
                  : `${percentage}% through ${state.currentTopic === "topic1" ? "Topic 1: The Global Economy" : "Topic 4: Economic Policies"}. Keep it up.`}
              </p>

              <div className="mt-3 max-w-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-semibold uppercase tracking-wide ${isDark ? "text-slate-600" : "text-slate-400"}`}>Overall progress</span>
                  <span className={`text-[10px] font-bold ${isDark ? "text-slate-400" : "text-slate-600"}`}>{overallPct}%</span>
                </div>
                <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${overallPct}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    className="h-2.5 rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500"
                  />
                </div>
                <div className={`flex justify-between text-[9px] mt-1 ${isDark ? "text-slate-700" : "text-slate-400"}`}>
                  <span>T1 {topic1Pct}%</span><span>T4 {topic4Pct}%</span>
                </div>
              </div>

              {nextSection && (
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(6,182,212,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setCurrentSection(nextSection.id); setCurrentPage("study"); }}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <BookOpen size={14} />
                  Continue: {nextSection.title}
                  <ArrowRight size={13} />
                </motion.button>
              )}
            </div>
            <div className="shrink-0">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl scale-125 animate-pulse-glow" />
                <ProgressRing percentage={percentage} size={100} strokeWidth={7} color="#06b6d4" bgColor={isDark ? "#1e293b" : "#e2e8f0"}>
                  <div className="text-center">
                    <div className="text-2xl font-extrabold text-cyan-400">{percentage}%</div>
                    <div className={`text-[9px] font-semibold uppercase tracking-wide ${isDark ? "text-slate-500" : "text-slate-400"}`}>done</div>
                  </div>
                </ProgressRing>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Mode switcher ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`rounded-2xl border p-1.5 relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
        >
          <div className="grid grid-cols-3 gap-1.5">
            {VIEW_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = viewMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/25"
                      : isDark
                      ? "hover:bg-slate-800 border border-transparent"
                      : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
                    </div>
                  )}
                  <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? "bg-cyan-500/20 border border-cyan-500/30" : isDark ? "bg-slate-800 border border-slate-700" : "bg-slate-100 border border-slate-200"}`}>
                    <Icon size={13} className={isActive ? "text-cyan-400" : isDark ? "text-slate-500" : "text-slate-400"} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs font-bold truncate ${isActive ? "text-cyan-400" : isDark ? "text-slate-300" : "text-slate-700"}`}>{mode.label}</div>
                    <div className={`text-[10px] truncate ${isDark ? "text-slate-600" : "text-slate-400"}`}>{mode.desc}</div>
                  </div>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            OVERVIEW MODE
        ══════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {viewMode === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Topic Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {([
                  { id: "topic1" as TopicId, label: "Topic 1", sub: "The Global Economy", icon: Globe,     pct: topic1Pct, sections: topic1Sections, gradFrom: "from-violet-500", gradTo: "to-purple-600", barGrad: "from-violet-500 to-cyan-500",   glow: "glow-violet", completedBorder: "border-violet-500/40", bg8: "bg-violet-500/8", badgeText: "text-violet-400", badgeBg: "bg-violet-500/15", badgeBorder: "border-violet-500/25" },
                  { id: "topic4" as TopicId, label: "Topic 4", sub: "Economic Policies",  icon: Building2, pct: topic4Pct, sections: topic4Sections, gradFrom: "from-cyan-500",   gradTo: "to-blue-600",   barGrad: "from-cyan-500 to-emerald-500", glow: "glow-cyan",   completedBorder: "border-cyan-500/40",   bg8: "bg-cyan-500/8",   badgeText: "text-cyan-400",   badgeBg: "bg-cyan-500/15",   badgeBorder: "border-cyan-500/25"   },
                ] as const).map((t, i) => {
                  const Icon = t.icon;
                  const isActive = state.currentTopic === t.id;
                  const done = t.sections.filter(s => state.sectionProgress[`${t.id}:${s.id}`]?.completed).length;
                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, x: i === 0 ? -12 : 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                      onClick={() => setCurrentTopic(t.id)}
                      className={`rounded-2xl p-5 border relative overflow-hidden cursor-pointer transition-all duration-200 ${
                        isActive
                          ? isDark ? `${t.bg8} ${t.completedBorder} ${t.glow}` : `bg-white ${t.completedBorder} shadow-lg`
                          : isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${t.badgeText} ${t.badgeBg} ${t.badgeBorder}`}>
                            <Sparkles size={9} /> Active
                          </span>
                        </div>
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-br ${t.gradFrom}/5 ${t.gradTo}/3 pointer-events-none`} />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${t.gradFrom} ${t.gradTo} shadow-lg`}>
                            <Icon size={17} className="text-white" />
                          </div>
                          <div>
                            <h3 className={`text-sm font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>{t.label}</h3>
                            <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>{t.sub}</p>
                          </div>
                        </div>
                        <div className="flex gap-1 mb-3 flex-wrap">
                          {t.sections.map(s => {
                            const p = state.sectionProgress[`${t.id}:${s.id}`];
                            return (
                              <div key={s.id} title={s.title}
                                className={`h-1.5 flex-1 min-w-[6px] rounded-full transition-all ${
                                  p?.completed ? "bg-emerald-500" : p?.confused ? "bg-amber-500" : p?.quizAttempted ? (i === 0 ? "bg-violet-500/40" : "bg-cyan-500/40") : isDark ? "bg-slate-800" : "bg-slate-100"
                                }`}
                              />
                            );
                          })}
                        </div>
                        <div className={`h-2 rounded-full mb-2 overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${t.pct}%` }}
                            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                            className={`h-2 rounded-full bg-gradient-to-r ${t.barGrad}`}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            {done}/{t.sections.length} · <span className={`font-bold ${t.badgeText}`}>{t.pct}%</span>
                          </span>
                          <button
                            onClick={e => { e.stopPropagation(); setCurrentTopic(t.id); setCurrentPage("study"); }}
                            className={`text-xs font-bold flex items-center gap-1 transition-colors ${t.badgeText} hover:opacity-80`}
                          >Study <ArrowRight size={11} /></button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                      className={`rounded-xl p-4 border card-hover shadow-lg ${s.glow} ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
                    >
                      <div className={`w-9 h-9 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center mb-3`}>
                        <Icon size={16} className={s.color} />
                      </div>
                      <div className={`text-2xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>{s.value}</div>
                      <div className={`text-xs font-medium mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{s.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Alerts */}
              <div className="grid sm:grid-cols-2 gap-3">
                {weakest && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-3 p-4 rounded-xl border ${isDark ? "bg-amber-500/5 border-amber-500/20" : "bg-amber-50 border-amber-200"}`}
                  >
                    <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/25 shrink-0">
                      <AlertCircle size={14} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-amber-400">Focus area</p>
                      <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        <strong className={`font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>{weakest.title}</strong> needs attention
                      </p>
                      <button onClick={() => { setCurrentSection(weakest.id); setCurrentPage("study"); }}
                        className="text-xs text-amber-400 hover:text-amber-300 mt-1.5 flex items-center gap-1 font-bold transition-colors"
                      >Study now <ArrowRight size={12} /></button>
                    </div>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${isDark ? "bg-cyan-500/5 border-cyan-500/20" : "bg-cyan-50 border-cyan-200"}`}
                >
                  <div className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/25 shrink-0">
                    <Flame size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-cyan-400">Study streak</p>
                    <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {state.streak > 0
                        ? <><strong className={`font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>{state.streak}-day</strong> streak. Keep the momentum!</>
                        : "Study today to build your streak!"}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Section grid */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <TrendingUp size={13} className="text-cyan-400" />
                  </div>
                  <h2 className={`font-extrabold text-sm tracking-tight ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                    {state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"} — All Sections
                  </h2>
                  <span className={`ml-auto text-xs font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}>{completed}/{total} done</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentSections.map((section, i) => {
                    const IconComp = (LucideIcons as unknown as Record<string, React.ElementType>)[section.icon] || BookOpen;
                    const key = `${state.currentTopic}:${section.id}`;
                    const prog = state.sectionProgress[key];
                    const isCompleted = prog?.completed;
                    const isConfused  = prog?.confused;
                    return (
                      <motion.button
                        key={section.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        whileHover={{ y: -2, transition: { duration: 0.15 } }}
                        onClick={() => { setCurrentSection(section.id); setCurrentPage("study"); }}
                        className={`text-left p-4 rounded-xl border transition-colors duration-150 ${
                          isCompleted
                            ? isDark ? "bg-emerald-500/5 border-emerald-500/25" : "bg-emerald-50 border-emerald-200"
                            : isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2.5">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${section.color} shadow-sm`}>
                            <IconComp size={13} className="text-white" />
                          </div>
                          {isCompleted ? <CheckCircle2 size={14} className="text-emerald-400" />
                            : isConfused ? <AlertCircle size={14} className="text-amber-400" /> : null}
                        </div>
                        <h3 className={`text-xs font-bold mb-0.5 leading-snug ${isDark ? "text-slate-200" : "text-slate-800"}`}>{section.title}</h3>
                        <p className={`text-[10px] ${isDark ? "text-slate-600" : "text-slate-400"}`}>{section.subsections.length} subsections</p>
                        <div className={`mt-2.5 h-1 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                          <div
                            className={`h-1 rounded-full transition-all duration-700 ${isCompleted ? "bg-emerald-500" : prog?.quizAttempted ? "bg-amber-400" : "bg-transparent"}`}
                            style={{ width: isCompleted ? "100%" : prog?.quizAttempted ? "55%" : "0%" }}
                          />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════
              ANALYTICS MODE
          ══════════════════════════════════════════ */}
          {viewMode === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Stat row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className={`rounded-xl p-4 border card-hover shadow-lg ${s.glow} ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
                    >
                      <div className={`w-8 h-8 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center mb-2`}>
                        <Icon size={15} className={s.color} />
                      </div>
                      <div className={`text-xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>{s.value}</div>
                      <div className={`text-[10px] font-medium mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{s.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Big top charts — Radial + Donut side by side */}
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Radial — Topic Progress */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 }}
                  className={`rounded-2xl p-6 border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/6 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Topic Progress</p>
                      <p className={`text-[10px] mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Both topics combined</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      <span className="text-[10px] font-bold text-cyan-400">{overallPct}% overall</span>
                    </div>
                  </div>

                  <div className="relative h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="88%" barSize={20} data={radialData} startAngle={90} endAngle={-270}>
                        <RadialBar background={{ fill: isDark ? "#1e293b" : "#f1f5f9" }} dataKey="value" cornerRadius={10} />
                        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v as number}%`, ""]} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-3xl font-extrabold text-cyan-400">{overallPct}%</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>overall</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {radialData.map(d => (
                      <div key={d.name} className={`p-3 rounded-xl border ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-slate-50 border-slate-200"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.fill }} />
                          <span className={`text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>{d.name}</span>
                        </div>
                        <div className="text-xl font-extrabold" style={{ color: d.fill }}>{d.value}%</div>
                        <div className={`mt-1.5 h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
                          <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${d.value}%`, background: d.fill }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Donut — Section Status */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 }}
                  className={`rounded-2xl p-6 border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
                >
                  <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Section Status</p>
                      <p className={`text-[10px] mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>{state.currentTopic === "topic1" ? "Topic 1 · Global Economy" : "Topic 4 · Economic Policies"}</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-[10px] font-bold text-emerald-400">{completedCount} done</span>
                    </div>
                  </div>

                  <div className="relative h-64 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius="48%" outerRadius="78%" paddingAngle={pieData.length > 1 ? 4 : 0} dataKey="value" strokeWidth={0} cornerRadius={6}>
                          {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                        </Pie>
                        <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [v as number, name as string]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-3xl font-extrabold text-emerald-400">{completedCount}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>complete</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[
                      { color: "#10b981", label: "Done",       v: completedCount,  textColor: "#10b981" },
                      { color: "#f59e0b", label: "Review",     v: confusedCount,   textColor: "#f59e0b" },
                      { color: isDark ? "#334155" : "#e2e8f0", label: "Not started", v: notStartedCount, textColor: isDark ? "#64748b" : "#94a3b8" },
                    ].map(l => (
                      <div key={l.label} className={`p-3 rounded-xl border text-center ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-slate-50 border-slate-200"}`}>
                        <div className="w-2.5 h-2.5 rounded-full mx-auto mb-1.5" style={{ background: l.color }} />
                        <div className="text-xl font-extrabold" style={{ color: l.textColor }}>{l.v}</div>
                        <div className={`text-[10px] mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{l.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Full-width bar chart */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className={`rounded-2xl p-6 border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
              >
                <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
                <div className="flex items-start justify-between mb-5 relative">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Section Scores</p>
                    <p className={`text-[10px] mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Quiz results & completion per section — {state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {[
                      { color: "#10b981", label: "Completed" },
                      { color: "#f59e0b", label: "Quiz done" },
                      { color: isDark ? "#1e293b" : "#f1f5f9", label: "Not started" },
                    ].map(l => (
                      <div key={l.label} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full border border-slate-600/30" style={{ background: l.color }} />
                        <span className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 4, right: 8, left: -16, bottom: 24 }}>
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 9, fill: isDark ? "#475569" : "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                        angle={-40}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis
                        tick={{ fontSize: 9, fill: isDark ? "#475569" : "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}%`}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(v) => [`${v as number}%`, "Score"]}
                        cursor={{ fill: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", radius: 6 }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={28}>
                        {barData.map((entry, i) => (
                          <Cell key={i} fill={entry.completed ? "#10b981" : entry.quiz ? "#f59e0b" : isDark ? "#1e293b" : "#f1f5f9"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════
              FOCUS MODE
          ══════════════════════════════════════════ */}
          {viewMode === "focus" && (
            <motion.div
              key="focus"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Big CTA */}
              {nextSection && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-2xl p-8 border relative overflow-hidden text-center ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 to-blue-500/5" />
                    <div className="absolute inset-0 dot-grid opacity-20" />
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-aurora" />
                  </div>
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Up next</span>
                    </div>
                    <h2 className={`text-xl font-extrabold tracking-tight mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>{nextSection.title}</h2>
                    <p className={`text-sm mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{nextSection.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 0 32px rgba(6,182,212,0.45)" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setCurrentSection(nextSection.id); setCurrentPage("study"); }}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-xl shadow-cyan-500/30 text-sm tracking-wide"
                    >
                      <BookOpen size={16} />
                      Start studying now
                      <ArrowRight size={15} />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Clean section list */}
              <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                <div className={`px-5 py-3.5 border-b flex items-center justify-between ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                  <h3 className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                    {state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"} — Sections
                  </h3>
                  <span className={`text-xs font-medium ${isDark ? "text-slate-600" : "text-slate-400"}`}>{completed}/{total}</span>
                </div>
                <div className="divide-y divide-slate-800/40">
                  {currentSections.map((section, i) => {
                    const IconComp = (LucideIcons as unknown as Record<string, React.ElementType>)[section.icon] || BookOpen;
                    const key = `${state.currentTopic}:${section.id}`;
                    const prog = state.sectionProgress[key];
                    const isCompleted = prog?.completed;
                    const isConfused  = prog?.confused;
                    return (
                      <motion.button
                        key={section.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.02 }}
                        onClick={() => { setCurrentSection(section.id); setCurrentPage("study"); }}
                        className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${isDark ? "hover:bg-slate-800/60" : "hover:bg-slate-50"}`}
                      >
                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${section.color} shrink-0`}>
                          <IconComp size={12} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-semibold truncate ${isDark ? "text-slate-200" : "text-slate-800"}`}>{section.title}</div>
                          <div className={`text-[10px] ${isDark ? "text-slate-600" : "text-slate-400"}`}>{section.subsections.length} subsections</div>
                        </div>
                        <div className="shrink-0">
                          {isCompleted
                            ? <CheckCircle2 size={16} className="text-emerald-400" />
                            : isConfused
                            ? <AlertCircle size={16} className="text-amber-400" />
                            : <div className={`w-4 h-4 rounded-full border-2 ${isDark ? "border-slate-700" : "border-slate-200"}`} />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
