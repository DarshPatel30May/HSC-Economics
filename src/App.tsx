import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { useAppState } from "./hooks/useAppState";
import { Welcome } from "./pages/Welcome";
import { Dashboard } from "./pages/Dashboard";
import { StudyNotes } from "./pages/StudyNotes";
import { Glossary } from "./pages/Glossary";
import { EssayPlanner } from "./pages/EssayPlanner";
import { ParagraphBuilder } from "./pages/ParagraphBuilder";
import { Sidebar } from "./components/Sidebar";
import { BottomNav } from "./components/BottomNav";
import { AIModal } from "./components/AIModal";
import { Toast, useToast } from "./components/Toast";

type PageType = "dashboard" | "study" | "glossary" | "essay-planner" | "paragraph-builder";

export default function App() {
  const {
    state,
    setStudentName,
    toggleTheme,
    toggleSectionComplete,
    markSectionConfused,
    updateNotes,
    saveQuizResult,
    incrementAIHelp,
    setCurrentSection,
    getCompletionPercentage,
    getCompletedCount,
    getNotesCount,
    getWeakestSection,
    getNextIncompleteSection,
    updateStreak,
    resetName,
  } = useAppState();

  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const isDark = state.theme === "dark";

  useEffect(() => {
    if (state.studentName) {
      updateStreak();
    }
  }, [state.studentName]);

  useEffect(() => {
    document.body.style.background = isDark ? "#020617" : "#f8fafc";
  }, [isDark]);

  if (!state.studentName) {
    return (
      <>
        <Welcome onSubmit={setStudentName} />
        <Toast toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  return (
    <div className={`flex min-h-screen ${isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`}>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        state={state}
        toggleTheme={toggleTheme}
        resetName={resetName}
        currentSectionId={state.currentSection}
        setCurrentSection={setCurrentSection}
      />

      <main className="flex-1 min-w-0 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {currentPage === "dashboard" && (
              <Dashboard
                state={state}
                getCompletionPercentage={getCompletionPercentage}
                getCompletedCount={getCompletedCount}
                getNotesCount={getNotesCount}
                getWeakestSection={getWeakestSection}
                getNextIncompleteSection={getNextIncompleteSection}
                setCurrentPage={setCurrentPage}
                setCurrentSection={setCurrentSection}
              />
            )}
            {currentPage === "study" && (
              <StudyNotes
                state={state}
                currentSectionId={state.currentSection}
                setCurrentSection={setCurrentSection}
                toggleSectionComplete={toggleSectionComplete}
                markSectionConfused={markSectionConfused}
                updateNotes={updateNotes}
                saveQuizResult={saveQuizResult}
              />
            )}
            {currentPage === "glossary" && <Glossary state={state} />}
            {currentPage === "essay-planner" && <EssayPlanner state={state} />}
            {currentPage === "paragraph-builder" && (
              <ParagraphBuilder state={state} addToast={addToast} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        state={state}
      />

      {/* Floating AI Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setAiModalOpen(true)}
        className="fixed bottom-20 right-5 lg:bottom-8 lg:right-8 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/30 font-semibold text-sm hover:shadow-violet-500/50 transition-all"
      >
        <Bot size={18} />
        <span className="hidden sm:inline">Ask AI</span>
      </motion.button>

      <AIModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        currentSectionId={state.currentSection}
        onUse={() => {
          incrementAIHelp();
          setAiModalOpen(false);
        }}
        addToast={addToast}
      />

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
