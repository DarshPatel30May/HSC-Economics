import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Search,
  StickyNote,
  RotateCcw,
  X,
  Tag,
  Zap,
} from "lucide-react";
import { topic4Sections } from "../data/topic4Content";
import { topic1Sections } from "../data/topic1Content";
import { quizData } from "../data/quizData";
import * as LucideIcons from "lucide-react";
import type { AppState, SectionProgress } from "../hooks/useAppState";

interface StudyNotesProps {
  state: AppState;
  currentSectionId: string;
  setCurrentSection: (id: string) => void;
  toggleSectionComplete: (id: string) => void;
  markSectionConfused: (id: string) => void;
  updateNotes: (id: string, notes: string) => void;
  saveQuizResult: (id: string, score: number) => void;
  getSectionProgress: (sectionId: string) => SectionProgress | undefined;
}

function parseHtml(html: string) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function QuizSection({
  sectionId,
  isDark,
  saveQuizResult,
  existing,
}: {
  sectionId: string;
  isDark: boolean;
  saveQuizResult: (id: string, score: number) => void;
  existing: SectionProgress | undefined;
}) {
  const quiz = quizData.find((q) => q.sectionId === sectionId);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) return null;

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) correct++;
    });
    const score = Math.round((correct / quiz.questions.length) * 100);
    saveQuizResult(sectionId, score);
    setSubmitted(true);
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = submitted
    ? quiz.questions.filter((q) => answers[q.id] === q.correctIndex).length
    : 0;

  return (
    <div className={`mt-6 p-4 rounded-2xl border ${isDark ? "bg-slate-800/40 border-slate-700/50" : "bg-slate-50 border-slate-200"}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-violet-500/20 border border-violet-500/30">
            <HelpCircle size={14} className="text-violet-400" />
          </div>
          <h4 className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>Quick Quiz</h4>
        </div>
        {submitted && (
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              score === quiz.questions.length
                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
                : score >= quiz.questions.length * 0.6
                ? "text-amber-400 bg-amber-500/10 border-amber-500/25"
                : "text-red-400 bg-red-500/10 border-red-500/25"
            }`}>
              {score}/{quiz.questions.length} correct
            </span>
            <button onClick={reset} className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 transition-colors">
              <RotateCcw size={12} />
            </button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {quiz.questions.map((q, qi) => (
          <div key={q.id}>
            <p className={`text-xs font-semibold mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {qi + 1}. {q.question}
            </p>
            <div className="grid gap-1.5">
              {q.options.map((opt, oi) => {
                const isSelected = answers[q.id] === oi;
                const isCorrectOption = oi === q.correctIndex;
                let optClass = isDark
                  ? "border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800/50"
                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50";
                if (submitted && isCorrectOption) optClass = "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
                else if (submitted && isSelected && !isCorrectOption) optClass = "border-red-500/40 bg-red-500/10 text-red-400";
                else if (isSelected && !submitted) optClass = "border-cyan-500/40 bg-cyan-500/10 text-cyan-400";
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all ${optClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div className={`flex items-start gap-1.5 mt-2 p-2.5 rounded-lg ${isDark ? "bg-blue-500/8 border border-blue-500/15" : "bg-blue-50 border border-blue-100"}`}>
                <Lightbulb size={12} className="text-blue-400 shrink-0 mt-0.5" />
                <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{q.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {!submitted && Object.keys(answers).length === quiz.questions.length && (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-violet-500/20"
        >
          Submit answers
        </motion.button>
      )}
      {existing?.quizAttempted && !submitted && (
        <p className={`text-xs mt-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
          Previous score: <span className="font-semibold text-violet-400">{existing.quizScore}%</span>
        </p>
      )}
    </div>
  );
}

export function StudyNotes({
  state,
  currentSectionId,
  setCurrentSection,
  toggleSectionComplete,
  markSectionConfused,
  updateNotes,
  saveQuizResult,
  getSectionProgress,
}: StudyNotesProps) {
  const isDark = state.theme === "dark";
  const [search, setSearch] = useState("");
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());
  const [showNotes, setShowNotes] = useState(false);

  const allSections = state.currentTopic === "topic1" ? topic1Sections : topic4Sections;
  const currentSection = allSections.find((s) => s.id === currentSectionId) || allSections[0];
  const progress = getSectionProgress(currentSectionId);
  const IconComp = (LucideIcons as unknown as Record<string, React.ElementType>)[currentSection.icon] || BookOpen;

  const currentIdx = allSections.findIndex((s) => s.id === currentSectionId);
  const prevSection = currentIdx > 0 ? allSections[currentIdx - 1] : null;
  const nextSection = currentIdx < allSections.length - 1 ? allSections[currentIdx + 1] : null;

  const toggleSub = (id: string) => {
    setExpandedSubs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredSections = search
    ? allSections.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.subsections.some(
            (sub) =>
              sub.title.toLowerCase().includes(search.toLowerCase()) ||
              sub.content.toLowerCase().includes(search.toLowerCase())
          )
      )
    : null;

  return (
    <div className={`min-h-screen pb-20 lg:pb-0 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="max-w-4xl mx-auto px-4 py-6 lg:px-8">

        {/* ── Search ───────────────────────────────────── */}
        <div className="mb-6 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"} notes...`}
            className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
              isDark
                ? "bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-600 focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/10"
                : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/10"
            }`}
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

        {/* ── Section progress rail ─────────────────────── */}
        {!search && (
          <div className={`mb-4 p-3 rounded-xl border ${isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                {state.currentTopic === "topic1" ? "Topic 1" : "Topic 4"} — {currentIdx + 1} of {allSections.length}
              </span>
              <div className="flex items-center gap-3">
                {[
                  { color: "bg-emerald-500", label: "Done" },
                  { color: "bg-amber-500", label: "Review" },
                  { color: "bg-cyan-500/40", label: "Current" },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${l.color}`} />
                    <span className={`text-[9px] ${isDark ? "text-slate-600" : "text-slate-400"}`}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-1 flex-wrap">
              {allSections.map((s) => {
                const p = getSectionProgress(s.id);
                const isCurrent = s.id === currentSectionId;
                return (
                  <button
                    key={s.id}
                    title={s.title}
                    onClick={() => setCurrentSection(s.id)}
                    className={`h-2 flex-1 min-w-[8px] rounded-full transition-all hover:opacity-80 ${
                      isCurrent
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 scale-y-[1.5]"
                        : p?.completed
                        ? "bg-emerald-500"
                        : p?.confused && !p?.completed
                        ? "bg-amber-500"
                        : p?.quizAttempted
                        ? isDark ? "bg-slate-600" : "bg-slate-300"
                        : isDark ? "bg-slate-800" : "bg-slate-100"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* ── Search results ────────────────────────────── */}
        {search && filteredSections ? (
          <div className="space-y-3">
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              <span className="font-semibold text-cyan-400">{filteredSections.length}</span> sections matching "{search}"
            </p>
            {filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => { setSearch(""); setCurrentSection(section.id); }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50" : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <h3 className={`font-bold text-sm ${isDark ? "text-slate-200" : "text-slate-800"}`}>{section.title}</h3>
                <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{section.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-5">

            {/* ── Section header ────────────────────────── */}
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentSection.color} opacity-8 pointer-events-none`} />
              <div className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
                <div className={`w-full h-full bg-gradient-to-br ${currentSection.color} rounded-full blur-3xl translate-x-1/3 -translate-y-1/3`} />
              </div>

              <div className="relative p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Icon + title */}
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${currentSection.color} shadow-lg shrink-0`}>
                      <IconComp size={22} className="text-white" />
                    </div>
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                        {state.currentTopic === "topic1" ? "Topic 1 · Global Economy" : "Topic 4 · Economic Policies"} · {currentIdx + 1} of {allSections.length}
                      </div>
                      <h1 className={`text-xl font-extrabold tracking-tight leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                        {currentSection.title}
                      </h1>
                      <p className={`text-sm mt-1.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{currentSection.description}</p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => markSectionConfused(currentSectionId)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        progress?.confused
                          ? "bg-amber-500/15 border-amber-500/35 text-amber-400"
                          : isDark ? "border-slate-700 text-slate-400 hover:border-amber-500/30 hover:text-amber-400" : "border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-600"
                      }`}
                    >
                      <HelpCircle size={12} />
                      {progress?.confused ? "Confused" : "Confused?"}
                    </button>
                    <button
                      onClick={() => toggleSectionComplete(currentSectionId)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        progress?.completed
                          ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-400"
                          : isDark ? "border-slate-700 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400" : "border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600"
                      }`}
                    >
                      <CheckCircle2 size={12} />
                      {progress?.completed ? "Done ✓" : "Mark done"}
                    </button>
                  </div>
                </div>

                {/* Glossary terms */}
                {currentSection.glossaryTerms && currentSection.glossaryTerms.length > 0 && (
                  <div className="flex items-center flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-800/50">
                    <Tag size={11} className={`${isDark ? "text-slate-600" : "text-slate-400"} shrink-0`} />
                    {currentSection.glossaryTerms.map((term) => (
                      <span
                        key={term}
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                          isDark ? "bg-slate-800 border-slate-700 text-slate-500" : "bg-slate-100 border-slate-200 text-slate-500"
                        }`}
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* ── Cause & Effect chain ──────────────────── */}
            <div className={`rounded-xl border-l-4 border-l-cyan-500 p-4 relative overflow-hidden ${isDark ? "bg-cyan-500/5 border border-cyan-500/15 border-l-cyan-500" : "bg-cyan-50 border border-cyan-200 border-l-cyan-500"}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded-md bg-cyan-500/15 border border-cyan-500/25">
                  <ArrowRight size={12} className="text-cyan-400" />
                </div>
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Cause & Effect Chain</h3>
              </div>
              <p className={`text-xs leading-relaxed font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>{currentSection.causeEffect}</p>
            </div>

            {/* ── Subsections ───────────────────────────── */}
            <div className="space-y-2">
              {currentSection.subsections.map((sub, idx) => {
                const isExpanded = expandedSubs.has(sub.id);
                return (
                  <motion.div
                    key={sub.id}
                    className={`rounded-xl border overflow-hidden transition-colors ${
                      isExpanded
                        ? isDark ? "bg-slate-900 border-slate-700/60" : "bg-white border-slate-300"
                        : isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    }`}
                  >
                    <button
                      onClick={() => toggleSub(sub.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${
                        isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isExpanded
                          ? `bg-gradient-to-br ${currentSection.color} text-white`
                          : isDark ? "bg-slate-800 text-slate-500" : "bg-slate-100 text-slate-400"
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`text-sm font-semibold flex-1 text-left ${isDark ? "text-slate-200" : "text-slate-800"}`}>{sub.title}</span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-500 transition-transform shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className={`px-4 pb-5 pt-1 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                            <div className={isDark ? "prose-dark" : "prose-light"}>
                              {parseHtml(sub.content)}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* ── HSC Exam Link ─────────────────────────── */}
            <div className={`rounded-xl border-l-4 border-l-amber-500 p-4 relative overflow-hidden ${isDark ? "bg-amber-500/5 border border-amber-500/15 border-l-amber-500" : "bg-amber-50 border border-amber-200 border-l-amber-500"}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded-md bg-amber-500/15 border border-amber-500/25">
                  <Lightbulb size={12} className="text-amber-400" />
                </div>
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest">HSC Exam Tip</h3>
              </div>
              <p className={`text-xs leading-relaxed font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>{currentSection.examLink}</p>
            </div>

            {/* ── Quiz ──────────────────────────────────── */}
            <QuizSection
              sectionId={currentSectionId}
              isDark={isDark}
              saveQuizResult={saveQuizResult}
              existing={progress}
            />

            {/* ── Notes ─────────────────────────────────── */}
            <div className={`rounded-xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors ${isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${isDark ? "bg-slate-800 border border-slate-700" : "bg-slate-100 border border-slate-200"}`}>
                    <StickyNote size={13} className={isDark ? "text-slate-400" : "text-slate-500"} />
                  </div>
                  <span className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>My Notes</span>
                  {progress?.notes && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <Zap size={8} /> Saved
                    </span>
                  )}
                </div>
                <ChevronDown size={16} className={`text-slate-500 transition-transform ${showNotes ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showNotes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`px-4 pb-4 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                      <textarea
                        value={progress?.notes || ""}
                        onChange={(e) => updateNotes(currentSectionId, e.target.value)}
                        placeholder="Write your own notes, mnemonics, or summaries here. They're saved automatically."
                        rows={6}
                        className={`w-full mt-3 px-4 py-3 rounded-xl border text-sm resize-none focus:outline-none transition-all ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-600 focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/15"
                            : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-500/10"
                        }`}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Section navigation ────────────────────── */}
            <div className={`flex items-center justify-between pt-2 gap-3 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}>
              {prevSection ? (
                <motion.button
                  whileHover={{ x: -2 }}
                  onClick={() => setCurrentSection(prevSection.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all group ${
                    isDark
                      ? "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 hover:bg-slate-900"
                      : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800 hover:bg-white"
                  }`}
                >
                  <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                  <div className="text-left hidden sm:block">
                    <div className={`text-[9px] uppercase tracking-widest mb-0.5 ${isDark ? "text-slate-600" : "text-slate-400"}`}>Previous</div>
                    <div className="truncate max-w-[120px]">{prevSection.title}</div>
                  </div>
                  <span className="sm:hidden">Previous</span>
                </motion.button>
              ) : <div />}
              <span className={`text-[10px] font-bold tabular-nums ${isDark ? "text-slate-700" : "text-slate-300"}`}>
                {currentIdx + 1} / {allSections.length}
              </span>
              {nextSection ? (
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => setCurrentSection(nextSection.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 group"
                >
                  <div className="text-right hidden sm:block">
                    <div className="text-[9px] uppercase tracking-widest mb-0.5 text-cyan-100/70">Next</div>
                    <div className="truncate max-w-[120px]">{nextSection.title}</div>
                  </div>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              ) : <div />}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
