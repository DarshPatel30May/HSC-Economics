import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  PenTool,
  AlignLeft,
  Sun,
  Moon,
  RotateCcw,
  GraduationCap,
  Globe,
  Building2,
  Sparkles,
} from "lucide-react";
import { topic4Sections } from "../data/topic4Content";
import { topic1Sections } from "../data/topic1Content";
import * as LucideIcons from "lucide-react";
import type { AppState, TopicId } from "../hooks/useAppState";

type PageType = "dashboard" | "study" | "glossary" | "essay-planner" | "paragraph-builder";

interface SidebarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  state: AppState;
  toggleTheme: () => void;
  resetName: () => void;
  currentSectionId: string;
  setCurrentSection: (id: string) => void;
  setCurrentTopic: (topic: TopicId) => void;
}

const navItems = [
  { id: "dashboard" as PageType, label: "Dashboard", icon: LayoutDashboard },
  { id: "study" as PageType, label: "Study Notes", icon: BookOpen },
  { id: "glossary" as PageType, label: "Glossary", icon: BookMarked },
  { id: "essay-planner" as PageType, label: "Essay Planner", icon: PenTool },
  { id: "paragraph-builder" as PageType, label: "Paragraph Builder", icon: AlignLeft },
];

const topics: { id: TopicId; label: string; short: string; icon: React.ElementType; gradient: string; glow: string }[] = [
  { id: "topic1", label: "Topic 1: Global Economy", short: "Topic 1", icon: Globe, gradient: "from-violet-500 to-purple-600", glow: "glow-violet" },
  { id: "topic4", label: "Topic 4: Economic Policy", short: "Topic 4", icon: Building2, gradient: "from-cyan-500 to-blue-600", glow: "glow-cyan" },
];

export function Sidebar({
  currentPage,
  setCurrentPage,
  state,
  toggleTheme,
  resetName,
  currentSectionId,
  setCurrentSection,
  setCurrentTopic,
}: SidebarProps) {
  const isDark = state.theme === "dark";
  const currentSections = state.currentTopic === "topic1" ? topic1Sections : topic4Sections;

  return (
    <aside
      className={`hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r overflow-y-auto ${
        isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}
    >
      {/* ── Logo ─────────────────────────────────────── */}
      <div className={`px-5 py-5 border-b ${isDark ? "border-slate-800" : "border-slate-100"}`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 blur-md opacity-40 scale-110" />
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
              <GraduationCap size={18} className="text-white" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-sm gradient-text tracking-tight">EcoPilot HSC</h1>
            <p className={`text-[10px] font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>HSC Economics</p>
          </div>
        </div>
      </div>

      {/* ── Topic Switcher ────────────────────────────── */}
      <div className={`px-3 pt-4 border-b pb-3 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
        <p className={`px-2 text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
          Topic
        </p>
        <div className="space-y-1">
          {topics.map((topic) => {
            const Icon = topic.icon;
            const isActive = state.currentTopic === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => { setCurrentTopic(topic.id); if (currentPage === "study") setCurrentPage("study"); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? isDark
                      ? `bg-gradient-to-r ${topic.gradient} bg-opacity-15 text-white border border-white/10`
                      : `bg-gradient-to-r ${topic.gradient} text-white shadow-sm`
                    : isDark
                    ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
                style={isActive ? { background: `linear-gradient(135deg, var(--tw-gradient-stops))` } : undefined}
              >
                <div className={`p-1 rounded-lg ${isActive ? "bg-white/20" : isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                  <Icon size={12} className={isActive ? "text-white" : ""} />
                </div>
                <span className="truncate text-left">{topic.short}</span>
                {isActive && <Sparkles size={10} className="ml-auto opacity-70 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main nav ──────────────────────────────────── */}
      <nav className="px-3 pt-4 space-y-0.5">
        <p className={`px-2 text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
          Navigate
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-400 border border-cyan-500/20"
                  : isDark
                  ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
              )}
              <Icon size={16} className={isActive ? "text-cyan-400" : ""} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* ── Section list ──────────────────────────────── */}
      {currentPage === "study" && (
        <div className={`mt-4 px-3 border-t pt-4 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
          <p className={`px-2 text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? "text-slate-600" : "text-slate-400"}`}>
            {state.currentTopic === "topic1" ? "Topic 1 Sections" : "Topic 4 Sections"}
          </p>
          <div className="space-y-0.5">
            {currentSections.map((section) => {
              const IconComp = (LucideIcons as unknown as Record<string, React.ElementType>)[section.icon] || BookOpen;
              const progressKey = `${state.currentTopic}:${section.id}`;
              const progress = state.sectionProgress[progressKey];
              const isActive = currentSectionId === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/15 font-semibold"
                      : isDark
                      ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <IconComp size={12} className="shrink-0" />
                  <span className="truncate text-left">{section.title}</span>
                  {progress?.completed && (
                    <span className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                  {progress?.confused && !progress.completed && (
                    <span className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Footer ────────────────────────────────────── */}
      <div className={`mt-auto px-3 pb-4 pt-4 border-t space-y-0.5 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
          {isDark ? "Light mode" : "Dark mode"}
        </button>
        <button
          onClick={resetName}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <RotateCcw size={15} />
          Change name
        </button>
      </div>
    </aside>
  );
}
