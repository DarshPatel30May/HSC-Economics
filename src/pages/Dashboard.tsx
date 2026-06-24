import { motion } from "framer-motion";
import {
  ArrowRight,
  Flame,
  CheckCircle2,
  FileText,
  MessageSquare,
  Zap,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Globe,
  Building2,
  Sparkles,
} from "lucide-react";
import { topic4Sections } from "../data/topic4Content";
import { topic1Sections } from "../data/topic1Content";
import * as LucideIcons from "lucide-react";
import { ProgressRing } from "../components/ProgressRing";
import type { AppState, TopicId } from "../hooks/useAppState";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
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
  state,
  getCompletionPercentage,
  getCompletionPercentageForTopic,
  getCompletedCount,
  getNotesCount,
  getWeakestSection,
  getNextIncompleteSection,
  setCurrentPage,
  setCurrentSection,
  setCurrentTopic,
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

  const chartData = currentSections.map((s) => {
    const key = `${state.currentTopic}:${s.id}`;
    const prog = state.sectionProgress[key];
    return {
      name: s.title.split(" ").slice(0, 2).join(" "),
      value: prog?.completed ? 100 : prog?.quizScore > 0 ? 50 : 0,
      completed: prog?.completed,
    };
  });

  const handleContinue = () => {
    if (nextSection) {
      setCurrentSection(nextSection.id);
      setCurrentPage("study");
    }
  };

  const handleTopicStudy = (topicId: TopicId) => {
    setCurrentTopic(topicId);
    setCurrentPage("study");
  };

  const stats = [
    { label: "Sections Done", value: `${completed}/${total}`, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "glow-emerald" },
    { label: "Notes Written", value: getNotesCount(), icon: FileText, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", glow: "glow-violet" },
    { label: "Quizzes Done", value: state.examPromptsAttempted, icon: MessageSquare, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "glow-amber" },
    { label: "AI Help Used", value: state.aiHelpCount, icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", glow: "glow-cyan" },
  ];

  return (
    <div className={`min-h-screen pb-20 lg:pb-0 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="max-w-5xl mx-auto px-4 py-6 lg:px-8 space-y-5">

        {/* ── Hero header ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 border relative overflow-hidden ${
            isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}
        >
          {/* Aurora blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-cyan-500/12 rounded-full blur-3xl animate-aurora" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl animate-aurora-slow" />
          </div>
          {/* Dot grid */}
          <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <p className={`text-xs font-medium uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {getGreeting()},
              </p>
              <h1 className="text-2xl font-extrabold tracking-tight">
                <span className={isDark ? "text-white" : "text-slate-900"}>{state.studentName}</span>
                <span className="ml-2">👋</span>
              </h1>
              <p className={`text-sm mt-1.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {percentage === 100
                  ? "All sections complete — you're exam-ready!"
                  : `${percentage}% through ${state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"}. Keep the momentum going.`}
              </p>
              {nextSection && (
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleContinue}
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
                <ProgressRing
                  percentage={percentage}
                  size={96}
                  strokeWidth={7}
                  color="#06b6d4"
                  bgColor={isDark ? "#1e293b" : "#e2e8f0"}
                >
                  <div className="text-center">
                    <div className="text-xl font-extrabold text-cyan-400">{percentage}%</div>
                    <div className={`text-[9px] font-medium uppercase tracking-wide ${isDark ? "text-slate-500" : "text-slate-400"}`}>done</div>
                  </div>
                </ProgressRing>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Topic Cards ───────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Topic 1 */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
            onClick={() => setCurrentTopic("topic1")}
            className={`rounded-2xl p-5 border relative overflow-hidden cursor-pointer transition-all duration-200 ${
              state.currentTopic === "topic1"
                ? isDark
                  ? "bg-violet-500/8 border-violet-500/40 glow-violet"
                  : "bg-violet-50 border-violet-300 shadow-violet-100 shadow-lg"
                : isDark
                ? "bg-slate-900 border-slate-800 hover:border-violet-500/30"
                : "bg-white border-slate-200 hover:border-violet-200"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/6 to-cyan-500/4 pointer-events-none" />
            {state.currentTopic === "topic1" && (
              <div className="absolute top-3 right-3">
                <span className="flex items-center gap-1 text-[10px] font-semibold text-violet-400 bg-violet-500/15 border border-violet-500/25 px-2 py-0.5 rounded-full">
                  <Sparkles size={9} /> Active
                </span>
              </div>
            )}
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
                  <Globe size={16} className="text-white" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Topic 1</h3>
                  <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>The Global Economy</p>
                </div>
              </div>
              <div className={`h-2 rounded-full mb-2 overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-700"
                  style={{ width: `${topic1Pct}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  {topic1Sections.filter((s) => state.sectionProgress[`topic1:${s.id}`]?.completed).length}/{topic1Sections.length} sections · <span className="text-violet-400 font-semibold">{topic1Pct}%</span>
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleTopicStudy("topic1"); }}
                  className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 font-semibold transition-colors"
                >
                  Study <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Topic 4 */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 }}
            onClick={() => setCurrentTopic("topic4")}
            className={`rounded-2xl p-5 border relative overflow-hidden cursor-pointer transition-all duration-200 ${
              state.currentTopic === "topic4"
                ? isDark
                  ? "bg-cyan-500/8 border-cyan-500/40 glow-cyan"
                  : "bg-cyan-50 border-cyan-300 shadow-cyan-100 shadow-lg"
                : isDark
                ? "bg-slate-900 border-slate-800 hover:border-cyan-500/30"
                : "bg-white border-slate-200 hover:border-cyan-200"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/6 to-emerald-500/4 pointer-events-none" />
            {state.currentTopic === "topic4" && (
              <div className="absolute top-3 right-3">
                <span className="flex items-center gap-1 text-[10px] font-semibold text-cyan-400 bg-cyan-500/15 border border-cyan-500/25 px-2 py-0.5 rounded-full">
                  <Sparkles size={9} /> Active
                </span>
              </div>
            )}
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
                  <Building2 size={16} className="text-white" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Topic 4</h3>
                  <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>Economic Policies</p>
                </div>
              </div>
              <div className={`h-2 rounded-full mb-2 overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-700"
                  style={{ width: `${topic4Pct}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  {topic4Sections.filter((s) => state.sectionProgress[`topic4:${s.id}`]?.completed).length}/{topic4Sections.length} sections · <span className="text-cyan-400 font-semibold">{topic4Pct}%</span>
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleTopicStudy("topic4"); }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold transition-colors"
                >
                  Study <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Stat cards ────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                className={`rounded-xl p-4 border card-hover ${
                  isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center mb-3 transition-all`}>
                  <Icon size={16} className={stat.color} />
                </div>
                <div className={`text-2xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>{stat.value}</div>
                <div className={`text-xs font-medium mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Alerts row ────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-3">
          {weakest && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-start gap-3 p-4 rounded-xl border ${
                isDark ? "bg-amber-500/5 border-amber-500/20" : "bg-amber-50 border-amber-200"
              }`}
            >
              <div className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/25 shrink-0">
                <AlertCircle size={15} className="text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-400">Focus area</p>
                <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  <strong className={isDark ? "text-slate-300" : "text-slate-700"}>{weakest.title}</strong> needs attention
                </p>
                <button
                  onClick={() => { setCurrentSection(weakest.id); setCurrentPage("study"); }}
                  className="text-xs text-amber-400 hover:text-amber-300 mt-1.5 flex items-center gap-1 font-semibold transition-colors"
                >
                  Study now <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-start gap-3 p-4 rounded-xl border ${
              isDark ? "bg-cyan-500/5 border-cyan-500/20" : "bg-cyan-50 border-cyan-200"
            }`}
          >
            <div className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/25 shrink-0">
              <Flame size={15} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-cyan-400">Study streak</p>
              <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {state.streak > 0 ? (
                  <>You're on a <strong className={`${isDark ? "text-white" : "text-slate-900"} font-bold`}>{state.streak}-day</strong> streak. Keep it up!</>
                ) : (
                  "Study today to start your streak!"
                )}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Section grid ──────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <TrendingUp size={14} className="text-cyan-400" />
            </div>
            <h2 className={`font-bold text-sm ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              {state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"} — Section Progress
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentSections.map((section, i) => {
              const IconComp = (LucideIcons as unknown as Record<string, React.ElementType>)[section.icon] || BookOpen;
              const key = `${state.currentTopic}:${section.id}`;
              const progress = state.sectionProgress[key];
              const isCompleted = progress?.completed;
              const isConfused = progress?.confused;

              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.035 }}
                  whileHover={{ y: -2 }}
                  onClick={() => { setCurrentSection(section.id); setCurrentPage("study"); }}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                    isCompleted
                      ? isDark ? "bg-emerald-500/5 border-emerald-500/25" : "bg-emerald-50 border-emerald-200"
                      : isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2.5">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${section.color} shadow-sm`}>
                      <IconComp size={14} className="text-white" />
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 size={15} className="text-emerald-400" />
                    ) : isConfused ? (
                      <AlertCircle size={15} className="text-amber-400" />
                    ) : null}
                  </div>
                  <h3 className={`text-xs font-bold mb-0.5 leading-snug ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                    {section.title}
                  </h3>
                  <p className={`text-[10px] ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                    {section.subsections.length} subsections
                  </p>
                  <div className={`mt-2.5 h-1 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                    <div
                      className={`h-1 rounded-full transition-all duration-700 ${isCompleted ? "bg-emerald-500" : progress?.quizAttempted ? "bg-amber-500" : "bg-slate-700"}`}
                      style={{ width: isCompleted ? "100%" : progress?.quizAttempted ? "50%" : "0%" }}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Progress chart ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-5 border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <TrendingUp size={13} className="text-violet-400" />
            </div>
            <h3 className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              Completion Overview — {state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"}
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: isDark ? "#64748b" : "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: isDark ? "#0f172a" : "#fff",
                  border: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
                  borderRadius: "10px",
                  fontSize: "12px",
                  color: isDark ? "#e2e8f0" : "#1e293b",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
                formatter={(v) => [`${v}%`, "Progress"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.completed ? "#10b981" : entry.value > 0 ? "#f59e0b" : isDark ? "#1e293b" : "#f1f5f9"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            {[
              { color: "bg-emerald-500", label: "Completed" },
              { color: "bg-amber-500", label: "In progress" },
              { color: isDark ? "bg-slate-800" : "bg-slate-200", label: "Not started" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-sm ${l.color}`} />
                <span className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>{l.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
