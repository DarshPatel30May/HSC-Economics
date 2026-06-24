import { motion } from "framer-motion";
import {
  ArrowRight, Flame, CheckCircle2, FileText, MessageSquare,
  Zap, AlertCircle, TrendingUp, BookOpen, Globe, Building2, Sparkles,
} from "lucide-react";
import { topic4Sections } from "../data/topic4Content";
import { topic1Sections } from "../data/topic1Content";
import * as LucideIcons from "lucide-react";
import { ProgressRing } from "../components/ProgressRing";
import type { AppState, TopicId } from "../hooks/useAppState";
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell,
  RadialBarChart, RadialBar,
  PieChart, Pie,
} from "recharts";

type PageType = "dashboard" | "study" | "glossary" | "essay-planner" | "paragraph-builder";

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


export function Dashboard({
  state, getCompletionPercentage, getCompletionPercentageForTopic,
  getCompletedCount, getNotesCount, getWeakestSection, getNextIncompleteSection,
  setCurrentPage, setCurrentSection, setCurrentTopic,
}: DashboardProps) {
  const isDark = state.theme === "dark";
  const percentage = getCompletionPercentage();
  const completed = getCompletedCount();
  const currentSections = state.currentTopic === "topic1" ? topic1Sections : topic4Sections;
  const total = currentSections.length;
  const weakest = getWeakestSection();
  const nextSection = getNextIncompleteSection();
  const topic1Pct = getCompletionPercentageForTopic("topic1");
  const topic4Pct = getCompletionPercentageForTopic("topic4");
  const overallPct = Math.round((topic1Pct + topic4Pct) / 2);

  /* ── Chart data ────────────────────────────────── */
  const barData = currentSections.map((s) => {
    const prog = state.sectionProgress[`${state.currentTopic}:${s.id}`];
    return {
      name: s.title.split(" ").slice(0, 2).join(" "),
      value: prog?.completed ? 100 : prog?.quizScore > 0 ? prog.quizScore : 0,
      completed: prog?.completed,
      quiz: prog?.quizAttempted,
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

  /* ── Quiz average ──────────────────────────────── */
  const quizScores = Object.values(state.sectionProgress)
    .filter(p => p?.quizAttempted && (p?.quizScore ?? 0) > 0)
    .map(p => p!.quizScore ?? 0);
  const avgQuiz = quizScores.length ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;

  const stats = [
    { label: "Sections Done",   value: `${completed}/${total}`,  icon: CheckCircle2,  color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "Notes Written",   value: getNotesCount(),           icon: FileText,       color: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20"  },
    { label: "Avg Quiz Score",  value: avgQuiz ? `${avgQuiz}%` : "—", icon: MessageSquare, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { label: "AI Help Used",    value: state.aiHelpCount,         icon: Zap,            color: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/20"    },
  ];

  return (
    <div className={`min-h-screen pb-20 lg:pb-0 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="max-w-5xl mx-auto px-4 py-6 lg:px-8 space-y-5">

        {/* ── Hero ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl animate-aurora" />
            <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-violet-500/8 rounded-full blur-3xl animate-aurora-slow" />
          </div>
          <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

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

              {/* Overall progress bar */}
              <div className="mt-3 max-w-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-semibold uppercase tracking-wide ${isDark ? "text-slate-600" : "text-slate-400"}`}>Overall progress</span>
                  <span className={`text-[10px] font-bold ${isDark ? "text-slate-400" : "text-slate-600"}`}>{overallPct}%</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${overallPct}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="h-2 rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500"
                  />
                </div>
                <div className={`flex justify-between text-[9px] mt-1 ${isDark ? "text-slate-700" : "text-slate-400"}`}>
                  <span>T1 {topic1Pct}%</span><span>T4 {topic4Pct}%</span>
                </div>
              </div>

              {nextSection && (
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6,182,212,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setCurrentSection(nextSection.id); setCurrentPage("study"); }}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
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
                <ProgressRing percentage={percentage} size={96} strokeWidth={7} color="#06b6d4" bgColor={isDark ? "#1e293b" : "#e2e8f0"}>
                  <div className="text-center">
                    <div className="text-xl font-extrabold text-cyan-400">{percentage}%</div>
                    <div className={`text-[9px] font-semibold uppercase tracking-wide ${isDark ? "text-slate-500" : "text-slate-400"}`}>done</div>
                  </div>
                </ProgressRing>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Topic Cards ─────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { id: "topic1" as TopicId, label: "Topic 1", sub: "The Global Economy", icon: Globe, pct: topic1Pct, sections: topic1Sections, gradFrom: "from-violet-500", gradTo: "to-purple-600", accent: "violet", barGrad: "from-violet-500 to-cyan-500", glow: "glow-violet", completedBorder: "border-violet-500/40", bg8: "bg-violet-500/8", badgeText: "text-violet-400", badgeBg: "bg-violet-500/15", badgeBorder: "border-violet-500/25" },
            { id: "topic4" as TopicId, label: "Topic 4", sub: "Economic Policies",  icon: Building2, pct: topic4Pct, sections: topic4Sections, gradFrom: "from-cyan-500", gradTo: "to-blue-600", accent: "cyan", barGrad: "from-cyan-500 to-emerald-500", glow: "glow-cyan", completedBorder: "border-cyan-500/40", bg8: "bg-cyan-500/8", badgeText: "text-cyan-400", badgeBg: "bg-cyan-500/15", badgeBorder: "border-cyan-500/25" },
          ].map((t, i) => {
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

                  {/* Mini section dots */}
                  <div className="flex gap-1 mb-3 flex-wrap">
                    {t.sections.map(s => {
                      const p = state.sectionProgress[`${t.id}:${s.id}`];
                      return (
                        <div
                          key={s.id}
                          title={s.title}
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

        {/* ── Stat cards ──────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                className={`rounded-xl p-4 border card-hover ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
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

        {/* ── Analytics charts ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {/* Radial — Topic Progress */}
          <div className={`rounded-2xl p-5 border col-span-1 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Topic Progress</p>
            <p className={`text-[10px] mb-3 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Both topics combined</p>
            <div className="relative h-36 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%" cy="50%"
                  innerRadius="38%" outerRadius="90%"
                  barSize={14}
                  data={radialData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    background={{ fill: isDark ? "#1e293b" : "#f1f5f9" }}
                    dataKey="value"
                    cornerRadius={7}
                  />
                  <Tooltip
                    contentStyle={{ background: isDark ? "#0f172a" : "#fff", border: "none", borderRadius: 10, fontSize: 11, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                    formatter={(v) => [`${v as number}%`, String(v)]}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-cyan-400">{overallPct}%</span>
                <span className={`text-[9px] font-semibold uppercase tracking-wide ${isDark ? "text-slate-600" : "text-slate-400"}`}>overall</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              {radialData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.fill }} />
                  <span className={`text-[11px] flex-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{d.name}</span>
                  <span className="text-[11px] font-bold" style={{ color: d.fill }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut — Section Status */}
          <div className={`rounded-2xl p-5 border col-span-1 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Section Status</p>
            <p className={`text-[10px] mb-3 ${isDark ? "text-slate-600" : "text-slate-400"}`}>{state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"}</p>
            <div className="relative h-36 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%" cy="50%"
                    innerRadius="52%"
                    outerRadius="80%"
                    paddingAngle={pieData.length > 1 ? 3 : 0}
                    dataKey="value"
                    strokeWidth={0}
                    cornerRadius={4}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: isDark ? "#0f172a" : "#fff", border: "none", borderRadius: 10, fontSize: 11, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                    formatter={(v, name) => [v as number, name as string]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-emerald-400">{completedCount}</span>
                <span className={`text-[9px] font-semibold uppercase tracking-wide ${isDark ? "text-slate-600" : "text-slate-400"}`}>done</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              {[
                { color: "#10b981", label: "Completed",     v: completedCount },
                { color: "#f59e0b", label: "Review needed", v: confusedCount  },
                { color: isDark ? "#1e293b" : "#e2e8f0", label: "Not started", v: notStartedCount, textColor: isDark ? "#475569" : "#94a3b8" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full border border-slate-700/20 shrink-0" style={{ background: l.color }} />
                  <span className={`text-[11px] flex-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{l.label}</span>
                  <span className="text-[11px] font-bold" style={{ color: l.textColor ?? l.color }}>{l.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar — Section scores */}
          <div className={`rounded-2xl p-5 border col-span-1 sm:col-span-1 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Section Scores</p>
            <p className={`text-[10px] mb-3 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Quiz & completion %</p>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
                  <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: isDark ? "#0f172a" : "#fff", border: "none", borderRadius: 10, fontSize: 11, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                    formatter={(v) => [`${v as number}%`, "Score"]}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={entry.completed ? "#10b981" : entry.quiz ? "#f59e0b" : isDark ? "#1e293b" : "#f1f5f9"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* ── Alerts ──────────────────────────────────── */}
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
                <button
                  onClick={() => { setCurrentSection(weakest.id); setCurrentPage("study"); }}
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
                {state.streak > 0 ? (
                  <>On a <strong className={`font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>{state.streak}-day</strong> streak. Keep the momentum!</>
                ) : "Study today to build your streak!"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Section grid ────────────────────────────── */}
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
                      : isConfused  ? <AlertCircle  size={14} className="text-amber-400"  /> : null}
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

      </div>
    </div>
  );
}
