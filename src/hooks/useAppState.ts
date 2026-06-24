import { useLocalStorage } from "./useLocalStorage";
import { topic4Sections } from "../data/topic4Content";
import { topic1Sections } from "../data/topic1Content";

export interface SectionProgress {
  completed: boolean;
  confused: boolean;
  notes: string;
  quizAttempted: boolean;
  quizScore: number;
}

export type TopicId = "topic1" | "topic4";

export interface AppState {
  studentName: string;
  theme: "dark" | "light";
  sectionProgress: Record<string, SectionProgress>;
  aiHelpCount: number;
  currentSection: string;
  currentTopic: TopicId;
  streak: number;
  lastStudyDate: string;
  examPromptsAttempted: number;
}

function buildDefaultProgress(): Record<string, SectionProgress> {
  const progress: Record<string, SectionProgress> = {};
  const empty = (): SectionProgress => ({ completed: false, confused: false, notes: "", quizAttempted: false, quizScore: 0 });
  topic1Sections.forEach((s) => { progress[`topic1:${s.id}`] = empty(); });
  topic4Sections.forEach((s) => { progress[`topic4:${s.id}`] = empty(); });
  return progress;
}

function migrateState(raw: unknown): AppState {
  const defaultProgress = buildDefaultProgress();
  const defaultState: AppState = {
    studentName: "",
    theme: "dark",
    sectionProgress: defaultProgress,
    aiHelpCount: 0,
    currentSection: topic4Sections[0].id,
    currentTopic: "topic4",
    streak: 0,
    lastStudyDate: "",
    examPromptsAttempted: 0,
  };

  if (!raw || typeof raw !== "object") return defaultState;
  const stored = raw as Record<string, unknown>;

  // Migrate sectionProgress: old flat keys (no "topic1:" or "topic4:" prefix) → "topic4:" keys
  const migratedProgress: Record<string, SectionProgress> = { ...defaultProgress };
  if (stored.sectionProgress && typeof stored.sectionProgress === "object") {
    const oldProgress = stored.sectionProgress as Record<string, unknown>;
    for (const [key, val] of Object.entries(oldProgress)) {
      if (key.startsWith("topic1:") || key.startsWith("topic4:")) {
        // Already in new format
        if (migratedProgress[key] !== undefined) {
          migratedProgress[key] = val as SectionProgress;
        }
      } else {
        // Old flat key — assume Topic 4
        const newKey = `topic4:${key}`;
        if (migratedProgress[newKey] !== undefined) {
          migratedProgress[newKey] = val as SectionProgress;
        }
      }
    }
  }

  return {
    studentName: typeof stored.studentName === "string" ? stored.studentName : "",
    theme: stored.theme === "light" ? "light" : "dark",
    sectionProgress: migratedProgress,
    aiHelpCount: typeof stored.aiHelpCount === "number" ? stored.aiHelpCount : 0,
    currentSection: typeof stored.currentSection === "string" ? stored.currentSection : topic4Sections[0].id,
    currentTopic: stored.currentTopic === "topic1" ? "topic1" : "topic4",
    streak: typeof stored.streak === "number" ? stored.streak : 0,
    lastStudyDate: typeof stored.lastStudyDate === "string" ? stored.lastStudyDate : "",
    examPromptsAttempted: typeof stored.examPromptsAttempted === "number" ? stored.examPromptsAttempted : 0,
  };
}

function getSectionsForTopic(topicId: TopicId) {
  return topicId === "topic1" ? topic1Sections : topic4Sections;
}

export function useAppState() {
  const [state, setState] = useLocalStorage<AppState>("ecopilot-state", migrateState(null), migrateState);

  const setStudentName = (name: string) => setState((s) => ({ ...s, studentName: name }));
  const toggleTheme = () => setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
  const setCurrentTopic = (topicId: TopicId) => setState((s) => ({
    ...s,
    currentTopic: topicId,
    currentSection: getSectionsForTopic(topicId)[0].id,
  }));

  const progressKey = (sectionId: string, topicId?: TopicId) => {
    const tid = topicId ?? state.currentTopic;
    // If the key already has a topic prefix, use it as-is
    if (sectionId.startsWith("topic1:") || sectionId.startsWith("topic4:")) return sectionId;
    return `${tid}:${sectionId}`;
  };

  const markSectionComplete = (sectionId: string) => {
    const key = progressKey(sectionId);
    setState((s) => ({
      ...s,
      sectionProgress: {
        ...s.sectionProgress,
        [key]: { ...s.sectionProgress[key], completed: true, confused: false },
      },
    }));
  };

  const markSectionConfused = (sectionId: string) => {
    const key = progressKey(sectionId);
    setState((s) => ({
      ...s,
      sectionProgress: {
        ...s.sectionProgress,
        [key]: { ...s.sectionProgress[key], confused: true, completed: false },
      },
    }));
  };

  const toggleSectionComplete = (sectionId: string) => {
    const key = progressKey(sectionId);
    setState((s) => {
      const current = s.sectionProgress[key];
      return {
        ...s,
        sectionProgress: {
          ...s.sectionProgress,
          [key]: { ...current, completed: !current.completed, confused: false },
        },
      };
    });
  };

  const updateNotes = (sectionId: string, notes: string) => {
    const key = progressKey(sectionId);
    setState((s) => ({
      ...s,
      sectionProgress: {
        ...s.sectionProgress,
        [key]: { ...s.sectionProgress[key], notes },
      },
    }));
  };

  const saveQuizResult = (sectionId: string, score: number) => {
    const key = progressKey(sectionId);
    setState((s) => ({
      ...s,
      examPromptsAttempted: s.examPromptsAttempted + 1,
      sectionProgress: {
        ...s.sectionProgress,
        [key]: { ...s.sectionProgress[key], quizAttempted: true, quizScore: score },
      },
    }));
  };

  const incrementAIHelp = () => setState((s) => ({ ...s, aiHelpCount: s.aiHelpCount + 1 }));

  const setCurrentSection = (sectionId: string) => setState((s) => ({ ...s, currentSection: sectionId }));

  // Get progress for a given section under the current topic
  const getSectionProgress = (sectionId: string, topicId?: TopicId) => {
    const key = progressKey(sectionId, topicId);
    return state.sectionProgress[key];
  };

  const getCompletionPercentageForTopic = (topicId: TopicId) => {
    const sections = getSectionsForTopic(topicId);
    const completed = sections.filter((s) => state.sectionProgress[`${topicId}:${s.id}`]?.completed).length;
    return Math.round((completed / sections.length) * 100);
  };

  const getCompletionPercentage = () => getCompletionPercentageForTopic(state.currentTopic);

  const getCompletedCount = () => {
    const sections = getSectionsForTopic(state.currentTopic);
    return sections.filter((s) => state.sectionProgress[`${state.currentTopic}:${s.id}`]?.completed).length;
  };

  const getNotesCount = () =>
    Object.values(state.sectionProgress).filter((s) => s.notes && s.notes.trim().length > 0).length;

  const getWeakestSection = () => {
    const sections = getSectionsForTopic(state.currentTopic);
    const incomplete = sections.filter((s) => !state.sectionProgress[`${state.currentTopic}:${s.id}`]?.completed);
    return incomplete.length > 0 ? incomplete[0] : null;
  };

  const getNextIncompleteSection = () => {
    const sections = getSectionsForTopic(state.currentTopic);
    return sections.find((s) => !state.sectionProgress[`${state.currentTopic}:${s.id}`]?.completed) || null;
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
    setState((s) => ({
      ...buildDefaultProgress(),
      studentName: s.studentName,
      theme: s.theme,
      sectionProgress: buildDefaultProgress(),
      aiHelpCount: 0,
      currentSection: topic4Sections[0].id,
      currentTopic: "topic4" as TopicId,
      streak: 0,
      lastStudyDate: "",
      examPromptsAttempted: 0,
    }));
  };

  const resetName = () => setState((s) => ({ ...s, studentName: "" }));

  return {
    state,
    setStudentName,
    toggleTheme,
    setCurrentTopic,
    markSectionComplete,
    markSectionConfused,
    toggleSectionComplete,
    updateNotes,
    saveQuizResult,
    incrementAIHelp,
    setCurrentSection,
    getSectionProgress,
    getCompletionPercentage,
    getCompletionPercentageForTopic,
    getCompletedCount,
    getNotesCount,
    getWeakestSection,
    getNextIncompleteSection,
    updateStreak,
    resetProgress,
    resetName,
  };
}
