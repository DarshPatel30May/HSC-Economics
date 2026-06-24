import { useLocalStorage } from "./useLocalStorage";
import { topic4Sections } from "../data/topic4Content";

export interface SectionProgress {
  completed: boolean;
  confused: boolean;
  notes: string;
  quizAttempted: boolean;
  quizScore: number;
}

export interface AppState {
  studentName: string;
  theme: "dark" | "light";
  sectionProgress: Record<string, SectionProgress>;
  aiHelpCount: number;
  currentSection: string;
  streak: number;
  lastStudyDate: string;
  examPromptsAttempted: number;
}

const defaultProgress: Record<string, SectionProgress> = {};
topic4Sections.forEach((s) => {
  defaultProgress[s.id] = {
    completed: false,
    confused: false,
    notes: "",
    quizAttempted: false,
    quizScore: 0,
  };
});

const defaultState: AppState = {
  studentName: "",
  theme: "dark",
  sectionProgress: defaultProgress,
  aiHelpCount: 0,
  currentSection: topic4Sections[0].id,
  streak: 0,
  lastStudyDate: "",
  examPromptsAttempted: 0,
};

export function useAppState() {
  const [state, setState] = useLocalStorage<AppState>("ecopilot-state", defaultState);

  const setStudentName = (name: string) => setState((s) => ({ ...s, studentName: name }));
  const toggleTheme = () => setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));

  const markSectionComplete = (sectionId: string) => {
    setState((s) => ({
      ...s,
      sectionProgress: {
        ...s.sectionProgress,
        [sectionId]: { ...s.sectionProgress[sectionId], completed: true, confused: false },
      },
    }));
  };

  const markSectionConfused = (sectionId: string) => {
    setState((s) => ({
      ...s,
      sectionProgress: {
        ...s.sectionProgress,
        [sectionId]: { ...s.sectionProgress[sectionId], confused: true, completed: false },
      },
    }));
  };

  const toggleSectionComplete = (sectionId: string) => {
    setState((s) => {
      const current = s.sectionProgress[sectionId];
      return {
        ...s,
        sectionProgress: {
          ...s.sectionProgress,
          [sectionId]: { ...current, completed: !current.completed, confused: false },
        },
      };
    });
  };

  const updateNotes = (sectionId: string, notes: string) => {
    setState((s) => ({
      ...s,
      sectionProgress: {
        ...s.sectionProgress,
        [sectionId]: { ...s.sectionProgress[sectionId], notes },
      },
    }));
  };

  const saveQuizResult = (sectionId: string, score: number) => {
    setState((s) => ({
      ...s,
      examPromptsAttempted: s.examPromptsAttempted + 1,
      sectionProgress: {
        ...s.sectionProgress,
        [sectionId]: { ...s.sectionProgress[sectionId], quizAttempted: true, quizScore: score },
      },
    }));
  };

  const incrementAIHelp = () => setState((s) => ({ ...s, aiHelpCount: s.aiHelpCount + 1 }));

  const setCurrentSection = (sectionId: string) => setState((s) => ({ ...s, currentSection: sectionId }));

  const getCompletionPercentage = () => {
    const sections = Object.values(state.sectionProgress);
    const completed = sections.filter((s) => s.completed).length;
    return Math.round((completed / sections.length) * 100);
  };

  const getCompletedCount = () => Object.values(state.sectionProgress).filter((s) => s.completed).length;

  const getNotesCount = () =>
    Object.values(state.sectionProgress).filter((s) => s.notes && s.notes.trim().length > 0).length;

  const getWeakestSection = () => {
    const incomplete = topic4Sections.filter((s) => !state.sectionProgress[s.id]?.completed);
    return incomplete.length > 0 ? incomplete[0] : null;
  };

  const getNextIncompleteSection = () => {
    return topic4Sections.find((s) => !state.sectionProgress[s.id]?.completed) || null;
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    setState((s) => {
      if (s.lastStudyDate === today) return s;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const newStreak = s.lastStudyDate === yesterday.toDateString() ? s.streak + 1 : 1;
      return { ...s, streak: newStreak, lastStudyDate: today };
    });
  };

  const resetProgress = () => {
    setState({ ...defaultState, studentName: state.studentName, theme: state.theme });
  };

  const resetName = () => setState((s) => ({ ...s, studentName: "" }));

  return {
    state,
    setStudentName,
    toggleTheme,
    markSectionComplete,
    markSectionConfused,
    toggleSectionComplete,
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
    resetProgress,
    resetName,
  };
}
