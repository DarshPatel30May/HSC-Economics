import { useState } from "react";
import { motion } from "framer-motion";
import { Search, X, BookMarked } from "lucide-react";
import { glossaryTerms } from "../data/glossaryData";
import type { AppState } from "../hooks/useAppState";

interface GlossaryProps {
  state: AppState;
}

const categories = ["All", ...Array.from(new Set(glossaryTerms.map((t) => t.category)))];

export function Glossary({ state }: GlossaryProps) {
  const isDark = state.theme === "dark";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = glossaryTerms.filter((t) => {
    const matchSearch =
      !search ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || t.category === category;
    return matchSearch && matchCat;
  });

  const categoryColors: Record<string, string> = {
    Macroeconomics: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    Policy: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    "Fiscal Policy": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Monetary Policy": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Microeconomics: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    "Labour Market": "bg-sky-500/10 text-sky-400 border-sky-500/20",
    "Market Failure": "bg-red-500/10 text-red-400 border-red-500/20",
    "Economic Objectives": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    "External Sector": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  };

  return (
    <div className={`min-h-screen pb-20 lg:pb-0 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="max-w-4xl mx-auto px-4 py-6 lg:px-8 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
            <BookMarked size={20} className="text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Economics Glossary</h1>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {glossaryTerms.length} key terms for Topic 4
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search terms and definitions..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-violet-500/50 transition-all ${
              isDark
                ? "bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-600"
                : "bg-white border-slate-200 text-slate-800 placeholder-slate-400"
            }`}
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                category === cat
                  ? "bg-violet-500/15 border-violet-500/30 text-violet-400"
                  : isDark
                  ? "border-slate-800 text-slate-500 hover:text-slate-300"
                  : "border-slate-200 text-slate-500 hover:text-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Terms */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className={`text-center py-10 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              No terms found for "{search}"
            </div>
          )}
          {filtered.map((term, i) => {
            const catColor = categoryColors[term.category] || "bg-slate-500/10 text-slate-400 border-slate-500/20";
            const isExpanded = expanded === term.term;
            return (
              <motion.div
                key={term.term}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className={`rounded-xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : term.term)}
                  className={`w-full px-4 py-3.5 flex items-start justify-between gap-3 text-left transition-colors ${
                    isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>{term.term}</span>
                    <span className={`hidden sm:inline-flex shrink-0 px-2 py-0.5 rounded-full border text-[10px] font-medium ${catColor}`}>
                      {term.category}
                    </span>
                  </div>
                  <span className={`text-slate-500 text-xs mt-0.5 shrink-0`}>{isExpanded ? "▲" : "▼"}</span>
                </button>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`px-4 pb-4 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}
                  >
                    <p className={`text-sm leading-relaxed mt-3 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      {term.definition}
                    </p>
                    {term.relatedTerms.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>Related:</span>
                        {term.relatedTerms.map((rt) => (
                          <span
                            key={rt}
                            className={`text-xs px-2 py-0.5 rounded-full ${isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"}`}
                          >
                            {rt}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
