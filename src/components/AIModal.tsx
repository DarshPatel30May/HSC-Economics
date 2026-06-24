import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, Sparkles, Copy, ExternalLink, ChevronDown } from "lucide-react";
import { topic4Sections } from "../data/topic4Content";

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSectionId?: string;
  onUse: () => void;
  addToast: (msg: string, type?: "success" | "info" | "error") => void;
}

const responseTypes = [
  { value: "explain", label: "Explain simply" },
  { value: "hsc-answer", label: "Give HSC exam answer" },
  { value: "essay-para", label: "Give essay paragraph" },
  { value: "examples", label: "Give examples" },
  { value: "quiz", label: "Quiz me" },
  { value: "fix-answer", label: "Fix my answer" },
];

const aiPlatforms = [
  {
    id: "claude",
    name: "Claude",
    url: "https://claude.ai/new",
    color: "from-orange-500 to-amber-500",
    textColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    bgColor: "bg-orange-500/10",
    icon: "🤖",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    color: "from-emerald-500 to-teal-500",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/10",
    icon: "💬",
  },
  {
    id: "gemini",
    name: "Gemini",
    url: "https://gemini.google.com/",
    color: "from-blue-500 to-violet-500",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
    icon: "✨",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    url: "https://www.perplexity.ai/",
    color: "from-cyan-500 to-teal-500",
    textColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/10",
    icon: "🔍",
  },
];

function buildPrompt(question: string, responseType: string): string {
  const rtLabel = responseTypes.find((r) => r.value === responseType)?.label || responseType;
  return `Act as an expert NSW Year 12 HSC Economics teacher. I am studying Topic 4: Economic Policies and Management. Explain this clearly using HSC Economics terminology but in a way that is easy to understand.

The thing I do not understand is:
${question || "[Please fill in your question]"}

Response type I want:
${rtLabel}

Requirements:
- Use NSW HSC Economics language.
- Do not use Wikipedia.
- Explain cause and effect clearly.
- Link the concept to economic objectives such as economic growth, full employment, price stability, external stability, income distribution and environmental sustainability where relevant.
- Include diagrams or diagram descriptions if useful.
- Include a short HSC-style answer or paragraph at the end.
- Keep it simple but not childish.
- Use examples from the Australian economy where relevant.`;
}

export function AIModal({ isOpen, onClose, currentSectionId, onUse, addToast }: AIModalProps) {
  const [question, setQuestion] = useState("");
  const [responseType, setResponseType] = useState("explain");

  const currentSection = topic4Sections.find((s) => s.id === currentSectionId);

  const handleUseCurrent = () => {
    if (currentSection) {
      setQuestion(`I am studying "${currentSection.title}" in Topic 4: Economic Policies and Management. Please help me understand this topic.`);
    }
  };

  const handleAIClick = async (platform: (typeof aiPlatforms)[0]) => {
    const prompt = buildPrompt(question, responseType);
    try {
      await navigator.clipboard.writeText(prompt);
      onUse();
      addToast(`Prompt copied! Paste it into ${platform.name} and press enter.`, "success");
    } catch {
      addToast("Could not copy automatically — please copy manually.", "error");
    }
    window.open(platform.url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-gradient-to-r from-violet-600/20 to-cyan-600/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-500/20 border border-violet-500/30">
                  <Bot size={18} className="text-violet-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-white text-sm">Ask AI</h2>
                  <p className="text-xs text-slate-400">Get help with HSC Economics</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Question input */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">What don't you understand?</label>
                <div className="relative">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g. How does the cash rate transmission mechanism work?"
                    rows={3}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
                {currentSection && (
                  <button
                    onClick={handleUseCurrent}
                    className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Sparkles size={12} />
                    Use current section: {currentSection.title}
                  </button>
                )}
              </div>

              {/* Response type */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Response type</label>
                <div className="relative">
                  <select
                    value={responseType}
                    onChange={(e) => setResponseType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 appearance-none pr-8"
                  >
                    {responseTypes.map((rt) => (
                      <option key={rt.value} value={rt.value}>
                        {rt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* AI Platforms */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Choose AI platform</label>
                <div className="grid grid-cols-2 gap-2">
                  {aiPlatforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => handleAIClick(platform)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${platform.borderColor} ${platform.bgColor} hover:brightness-125 transition-all group`}
                    >
                      <span className="text-lg">{platform.icon}</span>
                      <div className="text-left">
                        <div className={`text-sm font-semibold ${platform.textColor}`}>{platform.name}</div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Copy size={10} />
                          <span>Copy & open</span>
                        </div>
                      </div>
                      <ExternalLink size={12} className="ml-auto text-slate-600 group-hover:text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt preview */}
              {question && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Generated prompt preview</label>
                  <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3">
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-4 font-mono">
                      {buildPrompt(question, responseType)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
