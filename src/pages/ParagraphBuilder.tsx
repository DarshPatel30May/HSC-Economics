import { useState } from "react";
import { motion } from "framer-motion";
import { AlignLeft, Copy, RotateCcw, Lightbulb, CheckCircle2 } from "lucide-react";
import type { AppState } from "../hooks/useAppState";

interface ParagraphBuilderProps {
  state: AppState;
  addToast: (msg: string, type?: "success" | "info" | "error") => void;
}

const examplePrompts = {
  point: [
    "Monetary policy is an effective tool for achieving price stability in Australia.",
    "Expansionary fiscal policy stimulates aggregate demand during economic downturns.",
    "Microeconomic reform raises the productive capacity of the Australian economy.",
    "Labour market flexibility reduces structural unemployment and supports employment growth.",
  ],
  explain: [
    "When the RBA raises the cash rate, commercial banks increase their lending rates, raising borrowing costs for households and businesses. This reduces consumption and investment spending, lowering aggregate demand.",
    "Government spending on infrastructure directly injects money into the circular flow of income. Through the multiplier effect, this initial injection generates further rounds of spending, raising real GDP beyond the original amount.",
    "By improving allocative and productive efficiency in individual markets, microeconomic reform lowers production costs and raises output. This shifts the long-run aggregate supply curve rightward, expanding the economy's potential GDP.",
  ],
  evidence: [
    "For example, the RBA's 2022–23 tightening cycle raised the cash rate from 0.10% to 4.35%, reducing annual CPI inflation from 7.8% (December 2022) to 3.6% by mid-2024.",
    "For instance, Australia's GFC fiscal stimulus (2008–09) — including $42 billion in direct payments and infrastructure investment — helped maintain positive GDP growth, with unemployment peaking at only 5.9% rather than the projected 8–10%.",
    "Australia's reduction of manufacturing tariffs from the 1980s onwards, combined with competition policy under the ACCC, increased industry efficiency and contributed to productivity gains averaging 2.1% per annum through the 1990s and early 2000s.",
  ],
  link: [
    "This demonstrates that contractionary monetary policy contributes to the economic objective of price stability by reducing inflationary pressure toward the RBA's 2–3% target band.",
    "Therefore, expansionary fiscal policy directly supports the economic objective of full employment by reducing cyclical unemployment and sustaining income and spending during economic downturns.",
    "Consequently, microeconomic reform advances the long-run objectives of economic growth and improved living standards by raising the economy's productive ceiling without generating inflationary pressure.",
  ],
};

export function ParagraphBuilder({ state, addToast }: ParagraphBuilderProps) {
  const isDark = state.theme === "dark";
  const [point, setPoint] = useState("");
  const [explain, setExplain] = useState("");
  const [evidence, setEvidence] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const paragraph = [point, explain, evidence, link].filter(Boolean).join(" ");

  const handleCopy = async () => {
    if (!paragraph) return;
    try {
      await navigator.clipboard.writeText(paragraph);
      setCopied(true);
      addToast("Paragraph copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast("Could not copy — please select and copy manually.", "error");
    }
  };

  const handleReset = () => {
    setPoint("");
    setExplain("");
    setEvidence("");
    setLink("");
  };

  const sections = [
    {
      key: "point" as keyof typeof examplePrompts,
      label: "Point",
      color: "cyan",
      description: "State your main argument or policy claim in one clear sentence.",
      placeholder: "e.g. Monetary policy is the primary tool for achieving price stability in Australia...",
      value: point,
      setter: setPoint,
    },
    {
      key: "explain" as keyof typeof examplePrompts,
      label: "Explain",
      color: "violet",
      description: "Explain the economic mechanism using a cause-and-effect chain.",
      placeholder: "e.g. When the RBA raises the cash rate → higher borrowing costs → reduced consumption and investment → lower AD...",
      value: explain,
      setter: setExplain,
    },
    {
      key: "evidence" as keyof typeof examplePrompts,
      label: "Evidence / Example",
      color: "emerald",
      description: "Provide a specific Australian example, statistic, or policy decision.",
      placeholder: "e.g. For example, the RBA's 2022–23 tightening cycle raised rates from 0.10% to 4.35%...",
      value: evidence,
      setter: setEvidence,
    },
    {
      key: "link" as keyof typeof examplePrompts,
      label: "Link",
      color: "amber",
      description: "Explicitly link the evidence back to an economic objective.",
      placeholder: "e.g. This demonstrates that contractionary monetary policy contributes to price stability by...",
      value: link,
      setter: setLink,
    },
  ];

  const colorMap: Record<string, { border: string; text: string; bg: string }> = {
    cyan: { border: "border-cyan-500/30", text: "text-cyan-400", bg: "bg-cyan-500/10" },
    violet: { border: "border-violet-500/30", text: "text-violet-400", bg: "bg-violet-500/10" },
    emerald: { border: "border-emerald-500/30", text: "text-emerald-400", bg: "bg-emerald-500/10" },
    amber: { border: "border-amber-500/30", text: "text-amber-400", bg: "bg-amber-500/10" },
  };

  return (
    <div className={`min-h-screen pb-20 lg:pb-0 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="max-w-4xl mx-auto px-4 py-6 lg:px-8 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
              <AlignLeft size={20} className="text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>HSC Paragraph Builder</h1>
              <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Build a PEEL paragraph for your economics essay
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
              isDark ? "border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600" : "border-slate-200 text-slate-500 hover:border-slate-300"
            }`}
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        {/* Tip */}
        <div className={`p-3 rounded-xl border flex items-start gap-2 ${isDark ? "bg-indigo-500/5 border-indigo-500/20" : "bg-indigo-50 border-indigo-200"}`}>
          <Lightbulb size={14} className="text-indigo-400 shrink-0 mt-0.5" />
          <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            A strong HSC paragraph follows the <strong className={isDark ? "text-slate-300" : "text-slate-700"}>PEEL structure</strong>: <strong className="text-cyan-400">Point</strong> → <strong className="text-violet-400">Explain</strong> → <strong className="text-emerald-400">Evidence</strong> → <strong className="text-amber-400">Link</strong>. Click "Use example" below each section to see how it looks.
          </p>
        </div>

        {/* PEEL sections */}
        <div className="space-y-3">
          {sections.map((section) => {
            const colors = colorMap[section.color];
            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={`rounded-xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
              >
                <div className={`px-4 py-3 border-b ${isDark ? "border-slate-800" : "border-slate-100"} flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wide ${colors.text}`}>{section.label}</span>
                    <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>— {section.description}</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <textarea
                    value={section.value}
                    onChange={(e) => section.setter(e.target.value)}
                    placeholder={section.placeholder}
                    rows={3}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm resize-none focus:outline-none transition-all ${
                      isDark
                        ? `bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-600 focus:border-${section.color}-500/40`
                        : `bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-${section.color}-300`
                    }`}
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {examplePrompts[section.key].slice(0, 2).map((ex, i) => (
                      <button
                        key={i}
                        onClick={() => section.setter(ex)}
                        className={`text-[10px] px-2.5 py-1 rounded-full border ${colors.border} ${colors.text} ${colors.bg} hover:brightness-125 transition-all`}
                      >
                        Example {i + 1}
                      </button>
                    ))}
                    {section.value && (
                      <button
                        onClick={() => section.setter("")}
                        className={`text-[10px] px-2.5 py-1 rounded-full border border-slate-700 text-slate-500 hover:text-slate-300 transition-all`}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Preview */}
        {paragraph && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border p-4 ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>Your Paragraph</h3>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${
                  copied
                    ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                    : isDark
                    ? "bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200"
                    : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-800"
                }`}
              >
                {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {point && <span className="text-cyan-400">{point}</span>}
              {point && explain && " "}
              {explain && <span className="text-violet-400">{explain}</span>}
              {explain && evidence && " "}
              {evidence && <span className="text-emerald-400">{evidence}</span>}
              {evidence && link && " "}
              {link && <span className="text-amber-400">{link}</span>}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {point && <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">P</span>}
              {explain && <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">E</span>}
              {evidence && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">E</span>}
              {link && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">L</span>}
              {point && explain && evidence && link && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 ml-2">Complete PEEL ✓</span>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
