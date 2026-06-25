import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Flame, CheckCircle2, FileText, MessageSquare,
  Zap, AlertCircle, TrendingUp, BookOpen, Globe, Building2, Sparkles,
  LayoutDashboard, BarChart2, Focus, Trophy,
} from "lucide-react";
import { topic4Sections } from "../data/topic4Content";
import { topic1Sections } from "../data/topic1Content";
import * as LucideIcons from "lucide-react";
import { ProgressRing } from "../components/ProgressRing";
import type { AppState, TopicId } from "../hooks/useAppState";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  RadialBarChart, RadialBar, PieChart, Pie,
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

/* ── Count-up animation ──────────────────────────── */
function CountUp({ to, duration = 900, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (to === 0) { setVal(0); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * to));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to, duration]);
  return <>{val}{suffix}</>;
}

/* ── Rank based on total completed sections ──────── */
function getRank(done: number) {
  if (done === 0)  return { label: "Newcomer",    color: "text-slate-400",   bg: "bg-slate-500/10",   border: "border-slate-500/20"   };
  if (done < 5)    return { label: "Apprentice",  color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
  if (done < 10)   return { label: "Analyst",     color: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/20"    };
  if (done < 18)   return { label: "Strategist",  color: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20"  };
  if (done < 25)   return { label: "Economist",   color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20"   };
  return             { label: "HSC Ready 🎓",     color: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/20"    };
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const VIEW_MODES: { id: ViewMode; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "overview",  label: "Overview",  icon: LayoutDashboard, desc: "Summary & progress"  },
  { id: "analytics", label: "Analytics", icon: BarChart2,        desc: "Charts & data"       },
  { id: "focus",     label: "Focus",     icon: Focus,            desc: "Distraction-free"   },
];

const tooltipBase = (isDark: boolean) => ({
  background: isDark ? "#0f172a" : "#fff",
  border: `1px solid ${isDark ? "rgba(51,65,85,0.9)" : "rgba(226,232,240,0.9)"}`,
  borderRadius: 12,
  fontSize: 11,
  boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
  padding: "8px 12px",
});

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
  const notesCount  = getNotesCount();

  /* ── Chart data ──────────────────────────────── */
  const barData = currentSections.map((s) => {
    const prog = state.sectionProgress[`${state.currentTopic}:${s.id}`];
    const raw = prog?.completed ? 100 : (prog?.quizScore ?? 0) > 0 ? prog!.quizScore! : 0;
    return {
      name: s.title.split(" ").slice(0, 2).join(" "),
      value: raw,
      display: Math.max(raw, 6),   // always show a visible sliver
      completed: prog?.completed ?? false,
      quiz: prog?.quizAttempted ?? false,
    };
  });

  const radialData = [
    { name: "Topic 4", value: Math.max(topic4Pct, 0), fill: "#06b6d4" },
    { name: "Topic 1", value: Math.max(topic1Pct, 0), fill: "#8b5cf6" },
  ];

  const completedCount  = currentSections.filter(s => state.sectionProgress[`${state.currentTopic}:${s.id}`]?.completed).length;
  const confusedCount   = currentSections.filter(s => { const p = state.sectionProgress[`${state.currentTopic}:${s.id}`]; return p?.confused && !p?.completed; }).length;
  const notStartedCount = currentSections.length - completedCount - confusedCount;
  const pieData = [
    { name: "Completed",     value: completedCount || 0,   fill: "#10b981" },
    { name: "Review needed", value: confusedCount || 0,    fill: "#f59e0b" },
    { name: "Not started",   value: notStartedCount || total, fill: isDark ? "#334155" : "#cbd5e1" },
  ].filter(d => d.value > 0);

  const quizScores = Object.values(state.sectionProgress)
    .filter(p => p?.quizAttempted && (p?.quizScore ?? 0) > 0)
    .map(p => p!.quizScore ?? 0);
  const avgQuiz = quizScores.length ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;

  /* ── All completed across both topics ─────────── */
  const allCompleted = [...topic1Sections, ...topic4Sections].filter(
    s => state.sectionProgress[`topic1:${s.id}`]?.completed || state.sectionProgress[`topic4:${s.id}`]?.completed
  ).length;
  const rank = getRank(allCompleted);

  /* ── Stat cards ──────────────────────────────── */
  const stats = [
    { label: "Sections Done",  numVal: completed,  display: `${completed}/${total}`, icon: CheckCircle2,  accent: "#10b981", gradient: isDark ? "from-emerald-500/12 to-emerald-500/3" : "from-emerald-500/8 to-emerald-50", border: "border-emerald-500/25", iconBg: "bg-emerald-500/15 border-emerald-500/30", color: "text-emerald-400" },
    { label: "Notes Written",  numVal: notesCount, display: String(notesCount),       icon: FileText,      accent: "#8b5cf6", gradient: isDark ? "from-violet-500/12 to-violet-500/3"  : "from-violet-500/8 to-violet-50",  border: "border-violet-500/25",  iconBg: "bg-violet-500/15 border-violet-500/30",  color: "text-violet-400"  },
    { label: "Avg Quiz Score", numVal: avgQuiz,    display: avgQuiz ? `${avgQuiz}%` : "—", icon: MessageSquare, accent: "#f59e0b", gradient: isDark ? "from-amber-500/12 to-amber-500/3"   : "from-amber-500/8 to-amber-50",   border: "border-amber-500/25",   iconBg: "bg-amber-500/15 border-amber-500/30",   color: "text-amber-400"   },
    { label: "AI Help Used",   numVal: state.aiHelpCount, display: String(state.aiHelpCount), icon: Zap, accent: "#06b6d4", gradient: isDark ? "from-cyan-500/12 to-cyan-500/3" : "from-cyan-500/8 to-cyan-50", border: "border-cyan-500/25", iconBg: "bg-cyan-500/15 border-cyan-500/30", color: "text-cyan-400" },
  ];

  return (
    <div className={`min-h-screen pb-20 lg:pb-0 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="max-w-5xl mx-auto px-4 py-6 lg:px-8 space-y-4">

        {/* ── Hero ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
        >
          {/* Aurora bg */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-cyan-500/12 rounded-full blur-[80px] animate-aurora" />
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-violet-500/10 rounded-full blur-[70px] animate-aurora-slow" />
            <div className="absolute top-1/3 left-1/2 w-56 h-56 bg-emerald-500/6 rounded-full blur-[60px] animate-aurora-reverse" />
          </div>
          <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-slate-600" : "text-slate-400"}`}>{getGreeting()}</p>
                {/* Rank badge */}
                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${rank.color} ${rank.bg} ${rank.border}`}>
                  <Trophy size={9} /> {rank.label}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight mb-1">
                <span className={isDark ? "text-white" : "text-slate-900"}>{state.studentName}</span>
                <span className="ml-2">👋</span>
              </h1>
              <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {percentage === 100
                  ? "🎉 All sections complete — you're exam-ready!"
                  : `${percentage}% through ${state.currentTopic === "topic1" ? "Topic 1: The Global Economy" : "Topic 4: Economic Policies"}.`}
              </p>

              {/* Overall progress bar */}
              <div className="mt-4 max-w-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-semibold uppercase tracking-wide ${isDark ? "text-slate-600" : "text-slate-400"}`}>Overall progress</span>
                  <span className={`text-[10px] font-extrabold gradient-text`}>{overallPct}%</span>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"} p-0.5`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${overallPct}%` }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/30"
                  />
                </div>
                <div className={`flex justify-between text-[9px] mt-1 font-medium ${isDark ? "text-slate-700" : "text-slate-400"}`}>
                  <span>Topic 1 · {topic1Pct}%</span><span>Topic 4 · {topic4Pct}%</span>
                </div>
              </div>

              {nextSection && (
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(6,182,212,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setCurrentSection(nextSection.id); setCurrentPage("study"); }}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-xl shadow-xl shadow-cyan-500/30 transition-all group"
                >
                  <BookOpen size={14} />
                  Continue: {nextSection.title}
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              )}
            </div>

            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/20 blur-xl scale-130 animate-pulse-glow" />
                <ProgressRing percentage={percentage} size={104} strokeWidth={7} color="#06b6d4" bgColor={isDark ? "#1e293b" : "#e2e8f0"}>
                  <div className="text-center">
                    <div className="text-2xl font-black text-cyan-400 leading-none">{percentage}%</div>
                    <div className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>done</div>
                  </div>
                </ProgressRing>
              </div>
              {state.streak > 0 && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25"
                >
                  <Flame size={11} className="text-amber-400" />
                  <span className="text-[10px] font-extrabold text-amber-400">{state.streak} day streak</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Mode Switcher — sliding pill ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className={`rounded-2xl border p-1.5 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
        >
          <div className="grid grid-cols-3 gap-1 relative">
            {VIEW_MODES.map(mode => {
              const Icon = mode.icon;
              const isActive = viewMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className="relative flex items-center gap-2.5 px-4 py-3 rounded-xl text-left"
                >
                  {isActive && (
                    <motion.div
                      layoutId="mode-active-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/10 border border-cyan-500/30"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <div className={`relative z-10 p-1.5 rounded-lg border transition-colors ${isActive ? "bg-cyan-500/25 border-cyan-500/40" : isDark ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200"}`}>
                    <Icon size={13} className={isActive ? "text-cyan-400" : isDark ? "text-slate-500" : "text-slate-400"} />
                  </div>
                  <div className="relative z-10 min-w-0">
                    <div className={`text-xs font-bold truncate transition-colors ${isActive ? "text-cyan-400" : isDark ? "text-slate-300" : "text-slate-700"}`}>{mode.label}</div>
                    <div className={`text-[10px] truncate ${isDark ? "text-slate-600" : "text-slate-400"}`}>{mode.desc}</div>
                  </div>
                  {isActive && (
                    <motion.div layoutId="mode-dot" className="ml-auto relative z-10 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ══ VIEWS ══════════════════════════════════ */}
        <AnimatePresence mode="wait">

          {/* ── OVERVIEW ───────────────────────────── */}
          {viewMode === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="space-y-4">

              {/* Stat cards — glassmorphism */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -5, boxShadow: `0 24px 48px ${s.accent}30` }}
                      className={`rounded-2xl p-5 border bg-gradient-to-br ${s.gradient} ${s.border} cursor-default transition-shadow duration-200`}
                    >
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${s.iconBg}`}>
                        <Icon size={17} className={s.color} />
                      </div>
                      <div className={`text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                        {s.label === "Avg Quiz Score" ? s.display :
                          s.label === "Sections Done" ? s.display :
                          <CountUp to={s.numVal} />}
                      </div>
                      <div className={`text-[11px] font-semibold mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{s.label}</div>
                      <div className="mt-3 h-px rounded-full" style={{ background: `linear-gradient(90deg, ${s.accent}70, transparent)` }} />
                    </motion.div>
                  );
                })}
              </div>

              {/* Topic Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {([
                  { id: "topic1" as TopicId, label: "Topic 1", sub: "The Global Economy", icon: Globe,     pct: topic1Pct, sections: topic1Sections, gradFrom: "from-violet-500", gradTo: "to-purple-600", barGrad: "from-violet-500 to-cyan-500",   bgGrad: "from-violet-500/12 to-violet-500/3", glow: "glow-violet", activeBorder: "border-violet-500/40", badgeText: "text-violet-400", badgeBg: "bg-violet-500/15", badgeBorder: "border-violet-500/25" },
                  { id: "topic4" as TopicId, label: "Topic 4", sub: "Economic Policies",  icon: Building2, pct: topic4Pct, sections: topic4Sections, gradFrom: "from-cyan-500",   gradTo: "to-blue-600",   barGrad: "from-cyan-500 to-emerald-500", bgGrad: "from-cyan-500/12 to-cyan-500/3",   glow: "glow-cyan",   activeBorder: "border-cyan-500/40",   badgeText: "text-cyan-400",   badgeBg: "bg-cyan-500/15",   badgeBorder: "border-cyan-500/25"   },
                ] as const).map((t, i) => {
                  const Icon = t.icon;
                  const isActive = state.currentTopic === t.id;
                  const done = t.sections.filter(s => state.sectionProgress[`${t.id}:${s.id}`]?.completed).length;
                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, x: i === 0 ? -14 : 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.05 }}
                      whileHover={{ y: -3, boxShadow: isActive ? undefined : "0 16px 40px rgba(0,0,0,0.15)" }}
                      onClick={() => setCurrentTopic(t.id)}
                      className={`rounded-2xl p-5 border relative overflow-hidden cursor-pointer transition-all duration-200 ${
                        isActive
                          ? isDark ? `bg-gradient-to-br ${t.bgGrad} ${t.activeBorder} ${t.glow}` : `bg-white ${t.activeBorder} shadow-lg`
                          : isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-3 right-3 z-10">
                          <motion.span
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${t.badgeText} ${t.badgeBg} ${t.badgeBorder}`}
                          >
                            <Sparkles size={9} /> Active
                          </motion.span>
                        </div>
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-br ${t.gradFrom}/5 ${t.gradTo}/2 pointer-events-none`} />
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
                              <motion.div key={s.id} title={s.title} whileHover={{ scaleY: 2 }}
                                className={`h-1.5 flex-1 min-w-[6px] rounded-full cursor-pointer transition-colors ${
                                  p?.completed ? "bg-emerald-500" : p?.confused ? "bg-amber-500" : p?.quizAttempted ? (i === 0 ? "bg-violet-500/50" : "bg-cyan-500/50") : isDark ? "bg-slate-800" : "bg-slate-100"
                                }`}
                              />
                            );
                          })}
                        </div>
                        <div className={`h-2 rounded-full mb-2.5 overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${t.pct}%` }}
                            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                            className={`h-2 rounded-full bg-gradient-to-r ${t.barGrad} shadow-sm`}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                            {done}/{t.sections.length} · <span className={`font-extrabold ${t.badgeText}`}>{t.pct}%</span>
                          </span>
                          <button
                            onClick={e => { e.stopPropagation(); setCurrentTopic(t.id); setCurrentPage("study"); }}
                            className={`text-xs font-bold flex items-center gap-1 transition-all ${t.badgeText} hover:gap-2`}
                          >Study <ArrowRight size={11} /></button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Alerts + Section grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                {weakest && (
                  <motion.div whileHover={{ scale: 1.01 }} className={`flex items-start gap-3 p-4 rounded-2xl border ${isDark ? "bg-amber-500/5 border-amber-500/20" : "bg-amber-50 border-amber-200"}`}>
                    <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/25 shrink-0"><AlertCircle size={14} className="text-amber-400" /></div>
                    <div>
                      <p className="text-sm font-bold text-amber-400">Focus area</p>
                      <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}><strong className="font-semibold">{weakest.title}</strong> needs attention</p>
                      <button onClick={() => { setCurrentSection(weakest.id); setCurrentPage("study"); }}
                        className="text-xs text-amber-400 hover:text-amber-300 mt-1.5 flex items-center gap-1 font-bold transition-colors group"
                      >Study now <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" /></button>
                    </div>
                  </motion.div>
                )}
                <motion.div whileHover={{ scale: 1.01 }} className={`flex items-start gap-3 p-4 rounded-2xl border ${isDark ? "bg-cyan-500/5 border-cyan-500/20" : "bg-cyan-50 border-cyan-200"}`}>
                  <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/25 shrink-0"
                  >
                    <Flame size={14} className="text-cyan-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold text-cyan-400">Study streak</p>
                    <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {state.streak > 0
                        ? <><strong className={`font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>{state.streak}-day</strong> streak — keep it up!</>
                        : "Start studying today to begin a streak!"}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Section grid */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20"><TrendingUp size={13} className="text-cyan-400" /></div>
                  <h2 className={`font-extrabold text-sm tracking-tight ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                    {state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"} — All Sections
                  </h2>
                  <span className={`ml-auto text-xs font-bold ${isDark ? "text-slate-600" : "text-slate-400"}`}>{completed}/{total}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentSections.map((section, i) => {
                    const IconComp = (LucideIcons as unknown as Record<string, React.ElementType>)[section.icon] || BookOpen;
                    const prog = state.sectionProgress[`${state.currentTopic}:${section.id}`];
                    const isCompleted = prog?.completed;
                    const isConfused  = prog?.confused;
                    return (
                      <motion.button
                        key={section.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.025 }}
                        whileHover={{ y: -4, boxShadow: isCompleted ? "0 12px 28px rgba(16,185,129,0.18)" : "0 12px 28px rgba(0,0,0,0.12)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setCurrentSection(section.id); setCurrentPage("study"); }}
                        className={`text-left p-4 rounded-2xl border transition-colors duration-150 ${
                          isCompleted
                            ? isDark ? "bg-emerald-500/8 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"
                            : isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2.5">
                          <div className={`p-2 rounded-xl bg-gradient-to-br ${section.color} shadow-md`}>
                            <IconComp size={13} className="text-white" />
                          </div>
                          {isCompleted ? <CheckCircle2 size={14} className="text-emerald-400" />
                            : isConfused ? <AlertCircle size={14} className="text-amber-400" /> : null}
                        </div>
                        <h3 className={`text-xs font-bold mb-0.5 leading-snug ${isDark ? "text-slate-200" : "text-slate-800"}`}>{section.title}</h3>
                        <p className={`text-[10px] ${isDark ? "text-slate-600" : "text-slate-400"}`}>{section.subsections.length} subsections</p>
                        <div className={`mt-3 h-1 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isCompleted ? "100%" : prog?.quizAttempted ? "55%" : "0%" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.02 }}
                            className={`h-1 rounded-full ${isCompleted ? "bg-emerald-500" : prog?.quizAttempted ? "bg-amber-400" : "bg-transparent"}`}
                          />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── ANALYTICS ──────────────────────────── */}
          {viewMode === "analytics" && (
            <motion.div key="analytics" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="space-y-4">

              {/* Stat row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4, boxShadow: `0 20px 40px ${s.accent}28` }}
                      className={`rounded-2xl p-4 border bg-gradient-to-br ${s.gradient} ${s.border} cursor-default`}
                    >
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center mb-3 ${s.iconBg}`}>
                        <Icon size={15} className={s.color} />
                      </div>
                      <div className={`text-xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>{s.display}</div>
                      <div className={`text-[10px] font-semibold mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{s.label}</div>
                      <div className="mt-2 h-px rounded-full" style={{ background: `linear-gradient(90deg, ${s.accent}70, transparent)` }} />
                    </motion.div>
                  );
                })}
              </div>

              {/* Big charts: Radial + Donut */}
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Radial — Topic Progress */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.06 }}
                  className={`rounded-2xl p-6 border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-violet-500/8 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/6 rounded-full blur-2xl" />
                  </div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Topic Progress</p>
                        <p className={`text-[10px] mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Both topics combined</p>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500/15 to-violet-500/15 border border-cyan-500/20">
                        <span className="text-[11px] font-bold gradient-text">{overallPct}% overall</span>
                      </div>
                    </div>

                    <div className="relative h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart cx="50%" cy="50%" innerRadius="28%" outerRadius="88%" barSize={22} data={radialData} startAngle={90} endAngle={-270}>
                          <defs>
                            <linearGradient id="radCyan" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#06b6d4" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <linearGradient id="radViolet" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                          </defs>
                          <RadialBar
                            background={{ fill: isDark ? "#1e293b" : "#f1f5f9" }}
                            dataKey="value"
                            cornerRadius={11}
                          />
                          <Tooltip contentStyle={tooltipBase(isDark)} formatter={(v) => [`${v as number}%`, ""]} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-black gradient-text"><CountUp to={overallPct} suffix="%" /></span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isDark ? "text-slate-600" : "text-slate-400"}`}>overall</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 mt-3">
                      {[
                        { name: "Topic 1", pct: topic1Pct, color: "#8b5cf6", gradient: "from-violet-500 to-purple-600" },
                        { name: "Topic 4", pct: topic4Pct, color: "#06b6d4", gradient: "from-cyan-500 to-blue-600" },
                      ].map(d => (
                        <div key={d.name} className={`p-3 rounded-xl border ${isDark ? "bg-slate-800/60 border-slate-700/50" : "bg-slate-50 border-slate-200"}`}>
                          <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                            <span className={`text-[11px] font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>{d.name}</span>
                          </div>
                          <div className="text-2xl font-black" style={{ color: d.color }}><CountUp to={d.pct} suffix="%" /></div>
                          <div className={`mt-2 h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
                            <motion.div
                              initial={{ width: 0 }} animate={{ width: `${d.pct}%` }}
                              transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
                              className="h-1.5 rounded-full" style={{ background: d.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Donut — Section Status */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.09 }}
                  className={`rounded-2xl p-6 border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/6 rounded-full blur-3xl" />
                  </div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Section Status</p>
                        <p className={`text-[10px] mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>{state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"}</p>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-[11px] font-bold text-emerald-400"><CountUp to={completedCount} /> done</span>
                      </div>
                    </div>

                    <div className="relative h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <defs>
                            <linearGradient id="pieGradDone" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                            <linearGradient id="pieGradReview" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#f59e0b" />
                              <stop offset="100%" stopColor="#d97706" />
                            </linearGradient>
                          </defs>
                          <Pie
                            data={pieData}
                            cx="50%" cy="50%"
                            innerRadius="46%" outerRadius="78%"
                            paddingAngle={pieData.length > 1 ? 4 : 0}
                            dataKey="value"
                            strokeWidth={0}
                            cornerRadius={8}
                            animationBegin={100}
                            animationDuration={1200}
                          >
                            {pieData.map((entry, i) => (
                              <Cell key={i} fill={
                                entry.name === "Completed" ? "url(#pieGradDone)" :
                                entry.name === "Review needed" ? "url(#pieGradReview)" :
                                isDark ? "#334155" : "#e2e8f0"
                              } />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={tooltipBase(isDark)} formatter={(v, n) => [v as number, n as string]} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-black text-emerald-400"><CountUp to={completedCount} /></span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isDark ? "text-slate-600" : "text-slate-400"}`}>complete</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {[
                        { color: "#10b981", bg: "bg-emerald-500/10 border-emerald-500/25", label: "Done",      v: completedCount,  tc: "text-emerald-400" },
                        { color: "#f59e0b", bg: "bg-amber-500/10 border-amber-500/25",     label: "Review",    v: confusedCount,   tc: "text-amber-400"   },
                        { color: isDark ? "#334155" : "#e2e8f0", bg: isDark ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200", label: "Pending", v: notStartedCount, tc: isDark ? "text-slate-400" : "text-slate-600" },
                      ].map(l => (
                        <div key={l.label} className={`p-3 rounded-xl border text-center ${l.bg}`}>
                          <div className="text-xl font-black" style={{ color: l.color }}><CountUp to={l.v} /></div>
                          <div className={`text-[10px] font-semibold mt-0.5 ${l.tc}`}>{l.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Full-width bar chart */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}
                className={`rounded-2xl p-6 border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
              >
                <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Section Scores</p>
                      <p className={`text-[10px] mt-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Quiz results & completion per section</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {[
                        { color: "url(#gradDone)",  label: "Completed",  hex: "#10b981" },
                        { color: "url(#gradQuiz)",  label: "Quiz done",  hex: "#f59e0b" },
                        { color: isDark ? "#1e293b" : "#f1f5f9", label: "Pending", hex: isDark ? "#334155" : "#cbd5e1" },
                      ].map(l => (
                        <div key={l.label} className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.hex }} />
                          <span className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>{l.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} margin={{ top: 4, right: 8, left: -14, bottom: 28 }}>
                        <defs>
                          <linearGradient id="gradDone" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                            <stop offset="100%" stopColor="#059669" stopOpacity={0.75} />
                          </linearGradient>
                          <linearGradient id="gradQuiz" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                            <stop offset="100%" stopColor="#d97706" stopOpacity={0.75} />
                          </linearGradient>
                          <linearGradient id="gradEmpty" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={isDark ? "#334155" : "#e2e8f0"} stopOpacity={1} />
                            <stop offset="100%" stopColor={isDark ? "#1e293b" : "#cbd5e1"} stopOpacity={1} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{ fontSize: 9, fill: isDark ? "#475569" : "#94a3b8" }} axisLine={false} tickLine={false} angle={-38} textAnchor="end" interval={0} />
                        <YAxis tick={{ fontSize: 9, fill: isDark ? "#475569" : "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[0, 100]} />
                        <Tooltip
                          contentStyle={tooltipBase(isDark)}
                          formatter={(_, __, props) => {
                            const d = props.payload as typeof barData[0];
                            return [`${d.value}%`, "Score"];
                          }}
                          cursor={{ fill: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", radius: 6 }}
                        />
                        <Bar dataKey="display" radius={[6, 6, 2, 2]} maxBarSize={32} animationDuration={1200}>
                          {barData.map((entry, i) => (
                            <Cell key={i} fill={entry.completed ? "url(#gradDone)" : entry.quiz ? "url(#gradQuiz)" : "url(#gradEmpty)"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className={`text-[10px] text-center mt-2 ${isDark ? "text-slate-700" : "text-slate-300"}`}>
                    Bars show minimum height for visibility. Complete sections and quizzes to fill them.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ── FOCUS ──────────────────────────────── */}
          {viewMode === "focus" && (
            <motion.div key="focus" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="space-y-4">
              {nextSection && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-2xl p-10 border relative overflow-hidden text-center ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
                >
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 to-blue-600/5" />
                    <div className="absolute inset-0 dot-grid opacity-20" />
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/12 rounded-full blur-[80px] animate-aurora" />
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-violet-500/10 rounded-full blur-[70px] animate-aurora-slow" />
                  </div>
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/25 mb-5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Up next</span>
                    </motion.div>
                    <h2 className={`text-2xl font-extrabold tracking-tight mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>{nextSection.title}</h2>
                    <p className={`text-sm mb-8 max-w-md mx-auto ${isDark ? "text-slate-400" : "text-slate-500"}`}>{nextSection.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(6,182,212,0.5)" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setCurrentSection(nextSection.id); setCurrentPage("study"); }}
                      className="inline-flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-cyan-500/35 text-sm tracking-wide group"
                    >
                      <BookOpen size={16} />
                      Start studying now
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
              <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                <div className={`px-5 py-4 border-b flex items-center justify-between ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                  <h3 className={`text-sm font-extrabold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                    {state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"} — Sections
                  </h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"}`}>{completed}/{total}</span>
                </div>
                <div className={`divide-y ${isDark ? "divide-slate-800/60" : "divide-slate-100"}`}>
                  {currentSections.map((section, i) => {
                    const IconComp = (LucideIcons as unknown as Record<string, React.ElementType>)[section.icon] || BookOpen;
                    const prog = state.sectionProgress[`${state.currentTopic}:${section.id}`];
                    const isCompleted = prog?.completed;
                    const isConfused  = prog?.confused;
                    return (
                      <motion.button
                        key={section.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.02 }}
                        whileHover={{ x: 4 }}
                        onClick={() => { setCurrentSection(section.id); setCurrentPage("study"); }}
                        className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-all ${isDark ? "hover:bg-slate-800/60" : "hover:bg-slate-50"} group`}
                      >
                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${section.color} shrink-0 shadow-sm`}>
                          <IconComp size={12} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-semibold truncate ${isDark ? "text-slate-200" : "text-slate-800"}`}>{section.title}</div>
                          <div className={`text-[10px] ${isDark ? "text-slate-600" : "text-slate-400"}`}>{section.subsections.length} subsections</div>
                        </div>
                        <ArrowRight size={13} className={`shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? "text-slate-500" : "text-slate-400"}`} />
                        <div className="shrink-0">
                          {isCompleted ? <CheckCircle2 size={16} className="text-emerald-400" />
                            : isConfused ? <AlertCircle size={16} className="text-amber-400" />
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
