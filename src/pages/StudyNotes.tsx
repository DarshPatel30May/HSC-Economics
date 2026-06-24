import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Search,
  StickyNote,
  RotateCcw,
  X,
} from "lucide-react";
import { topic4Sections } from "../data/topic4Content";
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
  existing: SectionProgress;
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
    <div className={`mt-6 p-4 rounded-xl border ${isDark ? "bg-slate-800/40 border-slate-700/50" : "bg-slate-50 border-slate-200"}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-violet-500/20 border border-violet-500/30">
            <HelpCircle size={14} className="text-violet-400" />
          </div>
          <h4 className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>Quick Quiz</h4>
        </div>
        {submitted && (
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${score === quiz.questions.length ? "text-emerald-400" : score >= quiz.questions.length * 0.6 ? "text-amber-400" : "text-red-400"}`}>
              {score}/{quiz.questions.length} correct
            </span>
            <button onClick={reset} className="p-1 rounded hover:bg-slate-700/50 text-slate-400">
              <RotateCcw size={12} />
            </button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {quiz.questions.map((q, qi) => {
          return (
            <div key={q.id}>
              <p className={`text-xs font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                {qi + 1}. {q.question}
              </p>
              <div className="grid gap-1.5">
                {q.options.map((opt, oi) => {
                  const isSelected = answers[q.id] === oi;
                  const isCorrectOption = oi === q.correctIndex;
                  let optClass = isDark ? "border-slate-700 text-slate-400" : "border-slate-200 text-slate-600";
                  if (submitted && isCorrectOption) optClass = "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
                  else if (submitted && isSelected && !isCorrectOption) optClass = "border-red-500/40 bg-red-500/10 text-red-400";
                  else if (isSelected && !submitted) optClass = "border-cyan-500/40 bg-cyan-500/10 text-cyan-400";
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                      className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all ${optClass} ${!submitted ? "hover:border-slate-600" : ""}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className={`text-xs mt-1.5 ${isDark ? "text-slate-400" : "text-slate-500"} leading-relaxed`}>
                  💡 {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {!submitted && Object.keys(answers).length === quiz.questions.length && (
        <button
          onClick={handleSubmit}
          className="mt-4 w-full py-2 px-4 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Submit answers
        </button>
      )}
      {existing.quizAttempted && !submitted && (
        <p className={`text-xs mt-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
          Previous score: {existing.quizScore}%
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
}: StudyNotesProps) {
  const isDark = state.theme === "dark";
  const [search, setSearch] = useState("");
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());
  const [showNotes, setShowNotes] = useState(false);

  const currentSection = topic4Sections.find((s) => s.id === currentSectionId) || topic4Sections[0];
  const progress = state.sectionProgress[currentSectionId];
  const IconComp = (LucideIcons as unknown as Record<string, React.ElementType>)[currentSection.icon] || BookOpen;

  const toggleSub = (id: string) => {
    setExpandedSubs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredSections = search
    ? topic4Sections.filter(
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
        {/* Search */}
        <div className={`mb-6 relative`}>
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes across all sections..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-cyan-500/50 transition-all ${
              isDark
                ? "bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-600"
                : "bg-white border-slate-200 text-slate-800 placeholder-slate-400"
            }`}
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              <X size={14} />
            </button>
          )}
        </div>

        {search && filteredSections ? (
          <div className="space-y-4">
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Found {filteredSections.length} sections matching "{search}"
            </p>
            {filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => { setSearch(""); setCurrentSection(section.id); }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <h3 className={`font-semibold text-sm ${isDark ? "text-slate-200" : "text-slate-800"}`}>{section.title}</h3>
                <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>{section.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {/* Section header */}
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-5 border relative overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${currentSection.color} opacity-5 pointer-events-none`} />
              <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${currentSection.color} shrink-0`}>
                    <IconComp size={20} className="text-white" />
                  </div>
                  <div>
                    <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{currentSection.title}</h1>
                    <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{currentSection.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => markSectionConfused(currentSectionId)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      progress?.confused
                        ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                        : isDark ? "border-slate-700 text-slate-400 hover:border-slate-600" : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <HelpCircle size={12} />
                    {progress?.confused ? "Confused" : "Still confused"}
                  </button>
                  <button
                    onClick={() => toggleSectionComplete(currentSectionId)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      progress?.completed
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                        : isDark ? "border-slate-700 text-slate-400 hover:border-slate-600" : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <CheckCircle2 size={12} />
                    {progress?.completed ? "Completed ✓" : "Mark done"}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Cause & Effect Chain */}
            <div className={`rounded-xl p-4 border ${isDark ? "bg-cyan-500/5 border-cyan-500/20" : "bg-cyan-50 border-cyan-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight size={14} className="text-cyan-400" />
                <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">Cause & Effect Chain</h3>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>{currentSection.causeEffect}</p>
            </div>

            {/* Subsections */}
            <div className="space-y-2">
              {currentSection.subsections.map((sub) => {
                const isExpanded = expandedSubs.has(sub.id);
                return (
                  <motion.div
                    key={sub.id}
                    className={`rounded-xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
                  >
                    <button
                      onClick={() => toggleSub(sub.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors ${
                        isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{sub.title}</span>
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
                          <div className={`px-4 pb-4 ${isDark ? "prose-dark" : "prose-light"}`}>
                            {parseHtml(sub.content)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Exam Link */}
            <div className={`rounded-xl p-4 border ${isDark ? "bg-amber-500/5 border-amber-500/20" : "bg-amber-50 border-amber-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} className="text-amber-400" />
                <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wide">HSC Exam Link</h3>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>{currentSection.examLink}</p>
            </div>

            {/* Quiz */}
            <QuizSection
              sectionId={currentSectionId}
              isDark={isDark}
              saveQuizResult={saveQuizResult}
              existing={progress}
            />

            {/* Notes */}
            <div className={`rounded-xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`w-full flex items-center justify-between px-4 py-3.5 text-left ${isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}
              >
                <div className="flex items-center gap-2">
                  <StickyNote size={14} className={isDark ? "text-slate-400" : "text-slate-500"} />
                  <span className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>My Notes</span>
                  {progress?.notes && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"}`}>
                      Saved
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
                    <div className="px-4 pb-4">
                      <textarea
                        value={progress?.notes || ""}
                        onChange={(e) => updateNotes(currentSectionId, e.target.value)}
                        placeholder="Write your own notes here... They're saved automatically."
                        rows={5}
                        className={`w-full px-3 py-2.5 rounded-xl border text-sm resize-none focus:outline-none focus:border-cyan-500/50 transition-all ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-600"
                            : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
                        }`}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Nav between sections */}
            <div className="flex items-center justify-between pt-2">
              {(() => {
                const idx = topic4Sections.findIndex((s) => s.id === currentSectionId);
                const prev = idx > 0 ? topic4Sections[idx - 1] : null;
                const next = idx < topic4Sections.length - 1 ? topic4Sections[idx + 1] : null;
                return (
                  <>
                    {prev ? (
                      <button
                        onClick={() => setCurrentSection(prev.id)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"}`}
                      >
                        ← {prev.title}
                      </button>
                    ) : <div />}
                    {next ? (
                      <button
                        onClick={() => setCurrentSection(next.id)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-800"}`}
                      >
                        {next.title} →
                      </button>
                    ) : <div />}
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
