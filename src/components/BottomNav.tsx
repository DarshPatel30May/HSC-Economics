import { LayoutDashboard, BookOpen, BookMarked, PenTool, AlignLeft } from "lucide-react";
import type { AppState } from "../hooks/useAppState";

type PageType = "dashboard" | "study" | "glossary" | "essay-planner" | "paragraph-builder";

interface BottomNavProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  state: AppState;
}

const navItems = [
  { id: "dashboard" as PageType, label: "Dashboard", icon: LayoutDashboard },
  { id: "study" as PageType, label: "Study", icon: BookOpen },
  { id: "glossary" as PageType, label: "Glossary", icon: BookMarked },
  { id: "essay-planner" as PageType, label: "Essays", icon: PenTool },
  { id: "paragraph-builder" as PageType, label: "Builder", icon: AlignLeft },
];

export function BottomNav({ currentPage, setCurrentPage, state }: BottomNavProps) {
  const isDark = state.theme === "dark";
  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t ${
        isDark ? "bg-slate-900/95 border-slate-800" : "bg-white/95 border-slate-200"
      } backdrop-blur-xl`}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-all ${
              isActive ? "text-cyan-400" : isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            <Icon size={18} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
