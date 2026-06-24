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
} from "lucide-react";
import { topic4Sections } from "../data/topic4Content";
import * as LucideIcons from "lucide-react";
import { ProgressRing } from "../components/ProgressRing";
import type { AppState } from "../hooks/useAppState";
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
  getCompletedCount: () => number;
  getNotesCount: () => number;
  getWeakestSection: () => typeof topic4Sections[0] | null;
  getNextIncompleteSection: () => typeof topic4Sections[0] | null;
  setCurrentPage: (page: PageType) => void;
  setCurrentSection: (id: string) => void;
}

export function Dashboard({
  state,
  getCompletionPercentage,
  getCompletedCount,
  getNotesCount,
  getWeakestSection,
  getNextIncompleteSection,
  setCurrentPage,
  setCurrentSection,
}: DashboardProps) {
  const isDark = state.theme === "dark";
  const percentage = getCompletionPercentage();
  const completed = getCompletedCount();
  const total = topic4Sections.length;
  const weakest = getWeakestSection();
  const nextSection = getNextIncompleteSection();

  const chartData = topic4Sections.map((s) => ({
    name: s.title.split(" ").slice(0, 2).join(" "),
    value: state.sectionProgress[s.id]?.completed ? 100 : state.sectionProgress[s.id]?.quizScore > 0 ? 50 : 0,
    completed: state.sectionProgress[s.id]?.completed,
  }));

  const handleContinue = () => {
    if (nextSection) {
      setCurrentSection(nextSection.id);
      setCurrentPage("study");
    }
  };

  return (
    <div className={`min-h-screen pb-20 lg:pb-0 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="max-w-5xl mx-auto px-4 py-6 lg:px-8 space-y-6">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 border relative overflow-hidden ${
            isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className={`text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>Good study session,</p>
              <h1 className="text-2xl font-bold text-white mt-0.5">
                {isDark ? (
                  <span className="text-white">{state.studentName} 👋</span>
                ) : (
                  <span className="text-slate-900">{state.studentName} 👋</span>
                )}
              </h1>
              <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {percentage === 100
                  ? "You've completed all sections! Review before your exam."
                  : `You're ${percentage}% through Topic 4. Keep going!`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ProgressRing
                percentage={percentage}
                size={90}
                strokeWidth={7}
                color="#06b6d4"
                bgColor={isDark ? "#1e293b" : "#e2e8f0"}
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-400">{percentage}%</div>
                  <div className={`text-[9px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>done</div>
                </div>
              </ProgressRing>
            </div>
          </div>

          {/* Continue button */}
          {nextSection && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
            >
              <BookOpen size={15} />
              Continue: {nextSection.title}
              <ArrowRight size={15} />
            </motion.button>
          )}
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Sections Done", value: `${completed}/${total}`, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { label: "Notes Written", value: getNotesCount(), icon: FileText, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
            { label: "Quizzes Done", value: state.examPromptsAttempted, icon: MessageSquare, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
            { label: "AI Help Used", value: state.aiHelpCount, icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-4 border card-hover ${
                  isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg ${stat.bg} border ${stat.border} flex items-center justify-center mb-2`}>
                  <Icon size={15} className={stat.color} />
                </div>
                <div className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{stat.value}</div>
                <div className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Alerts row */}
        <div className="grid sm:grid-cols-2 gap-3">
          {weakest && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-start gap-3 p-4 rounded-xl border ${
                isDark ? "bg-amber-500/5 border-amber-500/20" : "bg-amber-50 border-amber-200"
              }`}
            >
              <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-400">Focus area</p>
                <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  <strong className={isDark ? "text-slate-300" : "text-slate-700"}>{weakest.title}</strong> hasn't been completed yet
                </p>
                <button
                  onClick={() => { setCurrentSection(weakest.id); setCurrentPage("study"); }}
                  className="text-xs text-amber-400 hover:text-amber-300 mt-1 flex items-center gap-1 transition-colors"
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
            <Flame size={18} className="text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-cyan-400">Study streak</p>
              <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {state.streak > 0 ? (
                  <>You're on a <strong className={isDark ? "text-slate-300" : "text-slate-700"}>{state.streak}-day</strong> streak. Keep it up!</>
                ) : (
                  "Start studying today to build your streak!"
                )}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Progress grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-cyan-400" />
            <h2 className={`font-semibold text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>Section Progress</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topic4Sections.map((section, i) => {
              const IconComp = (LucideIcons as unknown as Record<string, React.ElementType>)[section.icon] || BookOpen;
              const progress = state.sectionProgress[section.id];
              const isCompleted = progress?.completed;
              const isConfused = progress?.confused;

              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setCurrentSection(section.id); setCurrentPage("study"); }}
                  className={`text-left p-4 rounded-xl border card-hover transition-all ${
                    isCompleted
                      ? isDark ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"
                      : isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${section.color} bg-opacity-20`}>
                      <IconComp size={15} className="text-white" />
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : isConfused ? (
                      <AlertCircle size={16} className="text-amber-400" />
                    ) : null}
                  </div>
                  <h3 className={`text-sm font-semibold mb-0.5 ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                    {section.title}
                  </h3>
                  <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {section.subsections.length} subsections
                  </p>
                  <div className="mt-2">
                    <div className={`h-1 rounded-full ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                      <div
                        className={`h-1 rounded-full transition-all ${isCompleted ? "bg-emerald-500" : "bg-slate-700"}`}
                        style={{ width: isCompleted ? "100%" : progress?.quizAttempted ? "50%" : "0%" }}
                      />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Progress chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-5 border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
        >
          <h3 className={`text-sm font-semibold mb-4 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            Completion Overview
          </h3>
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
                  background: isDark ? "#1e293b" : "#fff",
                  border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: isDark ? "#e2e8f0" : "#1e293b",
                }}
                formatter={(v) => [`${v}%`, "Progress"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.completed ? "#10b981" : entry.value > 0 ? "#f59e0b" : isDark ? "#1e293b" : "#e2e8f0"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
