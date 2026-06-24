import { useState } from "react";
import { motion } from "framer-motion";
import { PenTool, ChevronDown, Lightbulb, AlertTriangle, RotateCcw } from "lucide-react";
import type { AppState } from "../hooks/useAppState";

interface EssayPlannerProps {
  state: AppState;
}

const essayQuestions = [
  {
    id: "q1",
    question: "Discuss the effectiveness of macroeconomic policies in achieving Australia's economic objectives.",
    category: "Macroeconomic Policy",
  },
  {
    id: "q2",
    question: "Analyse the role of fiscal and monetary policy in managing aggregate demand in the Australian economy.",
    category: "Fiscal & Monetary",
  },
  {
    id: "q3",
    question: "Evaluate the contribution of microeconomic reform to Australia's long-run economic performance.",
    category: "Microeconomic Reform",
  },
  {
    id: "q4",
    question: "Discuss how conflicts between economic objectives create challenges for economic policymakers.",
    category: "Policy Conflicts",
  },
  {
    id: "q5",
    question: "Explain how fiscal policy can be used to achieve the economic objective of full employment.",
    category: "Fiscal Policy",
  },
  {
    id: "q6",
    question: "Assess the effectiveness of monetary policy in achieving Australia's inflation target.",
    category: "Monetary Policy",
  },
  {
    id: "q7",
    question: "Discuss the limitations of macroeconomic policy in managing the Australian economy.",
    category: "Limitations",
  },
  {
    id: "q8",
    question: "Explain how labour market policies can reduce unemployment while maintaining price stability.",
    category: "Labour Market",
  },
];

interface Scaffold {
  thesis: string;
  policy1: { title: string; content: string };
  policy2: { title: string; content: string };
  limitation: string;
  judgement: string;
  commonMistakes: string[];
  band6Tip: string;
}

function generateScaffold(questionId: string): Scaffold {
  const scaffolds: Record<string, Scaffold> = {
    q1: {
      thesis:
        "Macroeconomic policies — fiscal and monetary — are the primary tools used by the Australian government and the RBA to manage aggregate demand and achieve the nation's key economic objectives. While both instruments are broadly effective at stabilising the business cycle, their long-run impact is constrained by time lags, global influences, and inherent trade-offs between objectives.",
      policy1: {
        title: "Fiscal Policy",
        content:
          "The federal government uses its annual Budget to expand or contract aggregate demand. During recessions, expansionary fiscal policy (deficit spending, automatic stabilisers) injects purchasing power into the economy, raising output and employment. During the GFC, Australia's fiscal stimulus — including direct household payments and the Building the Education Revolution — helped avoid recession. However, time lags and public debt accumulation limit its effectiveness.",
      },
      policy2: {
        title: "Monetary Policy",
        content:
          "The RBA adjusts the cash rate to influence borrowing costs, asset prices, the exchange rate, and ultimately inflation and employment through the transmission mechanism. Low rates stimulate consumption and investment; high rates dampen inflationary pressure. The RBA's 2022–23 tightening cycle (from 0.10% to 4.35%) illustrates contractionary monetary policy addressing surging inflation. However, 12–18 month effect lags and household debt sensitivity constrain its precision.",
      },
      limitation:
        "Both policies face significant constraints: time lags mean interventions may arrive after conditions have changed; global shocks (commodity price falls, US rate changes) can override domestic settings; and pursuing full employment may conflict with price stability, forcing policymakers to prioritise one objective over another.",
      judgement:
        "Overall, macroeconomic policies are most effective when deployed together and calibrated to the stage of the business cycle. Their effectiveness is enhanced when complemented by microeconomic reform, which expands the economy's supply-side capacity and reduces the inflation-growth trade-off.",
      commonMistakes: [
        "Describing what fiscal/monetary policy IS without explaining HOW it achieves objectives",
        "Forgetting to use cause-and-effect chains (e.g., lower cash rate → higher spending → GDP growth)",
        "Only discussing one policy — the question asks about both",
        "Not evaluating limitations — a strong essay weighs both effectiveness AND constraints",
      ],
      band6Tip:
        "Integrate a discussion of how macroeconomic and microeconomic policy are complementary — macroeconomic policy manages short-run demand while micro reforms raise long-run supply capacity, together reducing the growth-inflation trade-off.",
    },
    q2: {
      thesis:
        "Fiscal and monetary policy are the two primary macroeconomic tools used to manage aggregate demand in Australia. While both seek to smooth the business cycle and achieve price stability and full employment, they operate through different mechanisms and are subject to distinct limitations.",
      policy1: {
        title: "Fiscal Policy — Demand Management",
        content:
          "Fiscal policy operates through the federal Budget's expenditure and tax decisions. An expansionary stance (e.g., increased government spending or tax cuts) directly injects purchasing power into the economy, raising aggregate demand through the multiplier effect. Automatic stabilisers (progressive tax, Jobseeker) provide immediate counter-cyclical support. Discretionary measures (infrastructure programs, direct payments) are more powerful but suffer from longer implementation lags.",
      },
      policy2: {
        title: "Monetary Policy — Demand Management",
        content:
          "Monetary policy works through the cash rate and the transmission mechanism. The RBA's rate decisions affect borrowing costs (interest rate channel), asset prices (wealth effect), the AUD (exchange rate channel), and credit availability. These changes collectively influence household consumption and business investment — the two largest components of aggregate demand. Monetary policy is more flexible (8 RBA Board meetings per year) but takes 12–18 months to fully affect inflation.",
      },
      limitation:
        "Both policies face timing issues: fiscal policy has longer decision and implementation lags, while monetary policy has effect lags. At the zero lower bound (as in 2020–21), monetary policy exhausts its conventional tools, requiring fiscal policy to carry the stabilisation burden. Globally, imported inflation (e.g., COVID supply shocks) cannot be fully addressed by domestic demand management.",
      judgement:
        "Fiscal and monetary policy are most effective when they operate in the same direction and are well-timed to the economic cycle. Conflict between the two (e.g., expansionary fiscal + contractionary monetary) creates policy confusion and reduces effectiveness. The greatest success in demand management occurs when both are coordinated alongside supply-side microeconomic reform.",
      commonMistakes: [
        "Not clearly distinguishing fiscal from monetary policy mechanisms",
        "Failing to explain the transmission mechanism for monetary policy",
        "Missing the complementarity — both policies work together",
        "Ignoring the zero lower bound issue for monetary policy",
      ],
      band6Tip:
        "Note the asymmetry: monetary policy is more powerful for controlling inflation (contractionary), but fiscal policy may be more effective in deep recessions when confidence is low (monetary 'pushing on a string'). Applying this distinction to real examples earns Band 6.",
    },
    q3: {
      thesis:
        "Microeconomic reform has been a central pillar of Australia's economic strategy since the 1980s, working on the supply side to improve efficiency, productivity, and international competitiveness. Over the long run, these reforms have contributed to rising living standards and non-inflationary growth, though their benefits take time to materialise and can create distributional costs in the short run.",
      policy1: {
        title: "Competition and Market Reform",
        content:
          "Trade liberalisation (tariff reductions from the 1980s) exposed Australian industries to global competition, forcing efficiency improvements. Competition policy through the ACCC prevents anti-competitive behaviour, encouraging innovation and lower prices. Deregulation of banking, telecommunications, and energy markets allowed greater private sector competition. Privatisation of Telstra, Commonwealth Bank, and Qantas transferred government enterprises to private ownership where profit incentives drive productive efficiency.",
      },
      policy2: {
        title: "Labour Market and Human Capital Reform",
        content:
          "The shift from centralised wage setting to enterprise bargaining (progressively from 1991–1996) linked wages to firm-level productivity, improving labour market flexibility. Investment in education, vocational training, and infrastructure (NBN, freight rail) builds human and physical capital — raising total factor productivity. These supply-side improvements shift the LRAS curve rightward, expanding the economy's productive capacity without generating inflationary pressure.",
      },
      limitation:
        "Microeconomic reform creates significant adjustment costs — industries protected by tariffs contract, workers in privatised enterprises may face redundancy, and deregulation can increase market volatility. Benefits are long-term and diffuse, while costs are immediate and concentrated, creating political resistance. Reform momentum can stall when distributional concerns dominate the policy debate.",
      judgement:
        "Despite these limitations, microeconomic reform has been essential for Australia's sustained economic growth — complementing macroeconomic demand management by raising the productive ceiling of the economy. The most successful periods of Australian economic performance combined macroeconomic stability with structural supply-side reform.",
      commonMistakes: [
        "Confusing microeconomic policy with monetary policy — they are very different",
        "Not explaining the supply-side mechanism (LRAS shift, productivity, efficiency)",
        "Listing reforms without explaining their economic effects",
        "Failing to acknowledge the short-run costs and distributional impacts",
      ],
      band6Tip:
        "Explicitly contrast microeconomic and macroeconomic policy: 'While fiscal stimulus raises AD in the short run, microeconomic reform expands aggregate supply in the long run, allowing the economy to grow at a higher rate without inflationary pressure.' This demonstrates synthesis.",
    },
    q4: {
      thesis:
        "Economic objectives — growth, full employment, price stability, external stability, equity, and environmental sustainability — frequently conflict with one another, creating fundamental policy dilemmas. No single policy stance can optimally achieve all objectives simultaneously, forcing policymakers to make deliberate trade-offs and accept second-best outcomes in pursuit of overall economic welfare.",
      policy1: {
        title: "Inflation vs Unemployment (Short-Run Phillips Curve)",
        content:
          "The most well-known conflict is between price stability and full employment. Expansionary policies that reduce unemployment below the NAIRU generate wage pressure and demand-pull inflation, threatening the RBA's 2–3% target. Conversely, contractionary monetary policy that controls inflation raises unemployment and slows growth. The RBA's 2022–23 rate tightening cycle explicitly accepted higher unemployment risk in order to restore price stability.",
      },
      policy2: {
        title: "Growth vs Environmental Sustainability",
        content:
          "Strong economic growth driven by energy-intensive production tends to increase greenhouse gas emissions and resource depletion. Policies prioritising rapid GDP growth can conflict with Australia's climate commitments (net zero by 2050). Addressing this requires carbon pricing, regulation, and investment in clean technology — each of which imposes short-run costs on growth. The tension reflects a fundamental conflict between short-run economic objectives and long-run environmental sustainability.",
      },
      limitation:
        "Policymakers cannot resolve these conflicts by ignoring them. Pretending all objectives can be simultaneously achieved leads to policy failure. Supply-side microeconomic reform partially resolves the growth-inflation conflict by raising productive capacity — but cannot eliminate all trade-offs, particularly those involving environmental sustainability or equity.",
      judgement:
        "Policy conflicts are inherent in economic management and cannot be fully eliminated. The role of good economic policy is to minimise these trade-offs through careful sequencing (using micro reform alongside macro stabilisation), transparent communication (anchoring expectations), and pragmatic prioritisation based on current economic conditions rather than ideological rigidity.",
      commonMistakes: [
        "Only identifying one conflict — you need at least two well-explained examples",
        "Not explaining WHY the conflict arises (e.g., what mechanism causes inflation when unemployment falls)",
        "Saying 'policies can achieve all objectives' — this ignores the point of the question",
        "Missing equity vs efficiency as a significant conflict",
      ],
      band6Tip:
        "Show awareness that the severity of conflicts is conditional: 'The growth-inflation trade-off is most acute when the economy is near its productive capacity (positive output gap). When the economy has significant spare capacity (negative output gap), expansionary policy can raise growth without triggering inflation, temporarily resolving the conflict.'",
    },
    q5: {
      thesis:
        "Fiscal policy — through both automatic stabilisers and discretionary measures — is an important tool for achieving full employment by addressing cyclical unemployment via expansion of aggregate demand. However, its effectiveness in achieving full employment is subject to significant limitations, including time lags, crowding-out effects, and the inability to address structural unemployment.",
      policy1: {
        title: "Automatic Stabilisers and Full Employment",
        content:
          "Progressive income taxation and unemployment transfer payments (Jobseeker) automatically expand the budget deficit during recessions, providing an immediate demand floor. As employment falls, Jobseeker recipients maintain spending power, supporting AD and limiting employment losses. These stabilisers do not require policy decisions, providing timely support. During COVID-19, JobKeeper payments were an emergency supplement that preserved employment relationships throughout the shutdown period.",
      },
      policy2: {
        title: "Discretionary Fiscal Expansion",
        content:
          "Active fiscal expansion — increased public investment in infrastructure, direct household stimulus payments, and targeted employment programs — raises AD beyond what automatic stabilisers provide. Government spending on construction employs workers directly while stimulating private sector activity through the multiplier effect. The GFC fiscal stimulus (2008–09) is estimated to have prevented unemployment reaching 8–10% (it peaked at 5.9%), demonstrating the employment impact of discretionary expansion.",
      },
      limitation:
        "Fiscal policy cannot address structural unemployment — caused by skills mismatches, not insufficient demand. It also risks crowding out private investment if deficit financing raises interest rates. Long implementation lags mean job-creating infrastructure projects may be completed after unemployment has already peaked. Sustained deficit spending accumulates public debt, constraining future fiscal flexibility.",
      judgement:
        "Fiscal policy is most effective at achieving full employment when unemployment is predominantly cyclical and the economy has a significant negative output gap. Its employment impact is diminished when unemployment is structural, when time lags cause mis-timing, or when global headwinds overwhelm domestic stimulus. Complementary microeconomic and labour market policies are essential for achieving and sustaining full employment.",
      commonMistakes: [
        "Forgetting to link fiscal policy to aggregate demand (the mechanism)",
        "Confusing automatic stabilisers with discretionary policy",
        "Not mentioning the multiplier effect",
        "Saying fiscal policy alone can achieve full employment — must acknowledge structural limitations",
      ],
      band6Tip:
        "Distinguish between cyclical and structural unemployment in your essay: 'Fiscal expansion is effective at reducing cyclical unemployment (insufficient demand), but cannot address structural unemployment caused by skills mismatches — which requires microeconomic and labour market reform.' This nuance distinguishes Band 6 responses.",
    },
    q6: {
      thesis:
        "Monetary policy, implemented by the RBA through the cash rate and inflation targeting framework, is the primary tool for achieving Australia's price stability objective of 2–3% CPI inflation on average over the medium term. While the inflation targeting framework has been broadly successful since 1993, monetary policy's effectiveness is constrained by time lags, the zero lower bound, and supply-side shocks beyond domestic control.",
      policy1: {
        title: "Contractionary Monetary Policy and Inflation",
        content:
          "When inflation rises above the 2–3% target, the RBA raises the cash rate, transmitting higher borrowing costs across the economy via the interest rate, asset price, exchange rate, and credit channels. Higher mortgage repayments reduce household disposable income → consumption falls → AD falls → firms face less pricing power → inflation moderates. The 2022–23 tightening cycle (from 0.10% to 4.35%) reduced headline inflation from 7.8% (Dec 2022) to 3.6% by mid-2024, demonstrating the mechanism.",
      },
      policy2: {
        title: "Anchoring Expectations",
        content:
          "Beyond direct demand management, the RBA's inflation targeting framework anchors inflationary expectations — if households and businesses believe inflation will remain within 2–3%, wage and price-setting behaviour is more restrained, reducing the second-round effects of supply shocks. This credibility, built since 1993, reduces the size of rate movements required to control inflation. The transparency of the framework (published statements, governor communications) reinforces this expectations channel.",
      },
      limitation:
        "Monetary policy faces a 12–18 month lag before fully affecting inflation, creating the risk of over-tightening (recession) or under-tightening (persistent inflation). At the zero lower bound (2020–21, cash rate 0.10%), conventional monetary policy is exhausted. Imported inflation driven by global supply chain disruptions cannot be addressed by domestic demand reduction without significant output costs. Australia's high household debt makes rate rises particularly damaging to consumption.",
      judgement:
        "Monetary policy has been broadly effective at achieving price stability in Australia over the past three decades, with CPI averaging near target for most of this period. Its effectiveness is strongest when inflation is demand-driven and the economy is operating near capacity. Supply-side or imported inflation presents greater challenges, often requiring more aggressive tightening that imposes greater output and employment costs.",
      commonMistakes: [
        "Not explaining the full transmission mechanism (just saying 'higher rates reduce spending' is insufficient)",
        "Forgetting the expectations/credibility channel",
        "Not using the 2022–23 rate cycle as a contemporary example",
        "Concluding 'monetary policy always works' without acknowledging the zero lower bound or supply shocks",
      ],
      band6Tip:
        "Discuss the asymmetry of monetary policy: 'Contractionary monetary policy is generally more effective than expansionary policy in achieving price stability, as raising rates reliably reduces borrowing and spending. However, expansionary monetary policy faces a 'pushing on a string' problem in deep recessions — low rates cannot force households and businesses to borrow and spend if confidence is low.'",
    },
    q7: {
      thesis:
        "While macroeconomic policies — fiscal and monetary — are important tools for managing the Australian economy, their effectiveness is subject to significant limitations including time lags, external shocks, political constraints, and fundamental conflicts between economic objectives. Understanding these limitations is essential for a balanced assessment of macroeconomic policy's contribution to economic stability.",
      policy1: {
        title: "Time Lags",
        content:
          "Both fiscal and monetary policy suffer from recognition, decision, implementation, and effect lags. Monetary policy takes 12–18 months to fully affect inflation and output. Fiscal infrastructure projects can take years from announcement to completion. By the time policy takes effect, economic conditions may have changed, creating the risk of pro-cyclical policy — where stimulus arrives after recovery has begun, fuelling inflation, or tightening arrives during a recession, worsening it.",
      },
      policy2: {
        title: "Global Influences and Conflicting Objectives",
        content:
          "As a small open economy, Australia is vulnerable to external shocks — commodity price falls, global recessions, US Federal Reserve rate decisions, and imported inflation — that can overwhelm domestic policy settings. Simultaneously, macroeconomic policy faces inherent trade-offs: expansionary policy that reduces unemployment may generate inflationary pressure; contractionary policy that controls inflation may slow growth and raise unemployment. No single policy stance optimally achieves all objectives.",
      },
      limitation:
        "Political constraints mean governments may resist contractionary fiscal policy before elections. Structural issues (ageing population, NDIS costs) create baseline deficits that limit fiscal flexibility. The zero lower bound constrains monetary policy in deep recessions. High household debt amplifies the contractionary impact of rate rises, constraining the RBA's ability to tighten without causing excessive economic pain.",
      judgement:
        "Despite these limitations, macroeconomic policy is not ineffective — Australia's 29-year run of uninterrupted growth (1991–2020) reflects sound macroeconomic management. Limitations should be acknowledged, but balanced against the significant evidence that well-timed, well-calibrated macro policy reduces the depth of recessions and the severity of inflationary episodes. The appropriate response to limitations is to improve policy design (better data, improved frameworks), not to abandon macroeconomic management.",
      commonMistakes: [
        "Listing limitations without explaining the economic mechanism that causes them",
        "Concluding that policy is 'completely ineffective' — this is not supported and undermines your argument",
        "Treating fiscal and monetary policy limitations as identical — they have distinct lag structures",
        "Forgetting distributional impacts as a limitation",
      ],
      band6Tip:
        "Show that limitations are conditional: 'The severity of time lag limitations depends on the nature of the policy — automatic stabilisers respond immediately (minimal lag), while infrastructure spending can take years to implement. Similarly, monetary policy lags are longer and more uncertain than fiscal policy lags, particularly in the current environment of high household debt.' Specificity earns marks.",
    },
    q8: {
      thesis:
        "Labour market policies — encompassing wage determination systems, skills training, workforce participation initiatives, and the minimum wage — can contribute to reducing unemployment while maintaining price stability by improving the efficiency of labour markets and linking wage growth to productivity rather than simply to demand pressures.",
      policy1: {
        title: "Enterprise Bargaining and Productivity-Linked Wages",
        content:
          "The shift from centralised award setting to enterprise bargaining links wage increases to firm-level productivity. When wages rise in line with productivity, unit labour costs remain stable — firms can pay more without raising prices or cutting employment. This supports the dual objectives of higher employment (firms can afford to hire) and price stability (wage-linked productivity growth is non-inflationary). Enterprise bargaining thus partially resolves the traditional inflation-unemployment trade-off.",
      },
      policy2: {
        title: "Skills Training and Structural Unemployment",
        content:
          "Skills training programs (apprenticeships, vocational education, Workforce Australia) address structural unemployment by improving the match between worker skills and employer needs. Reducing structural unemployment lowers the NAIRU — meaning the economy can sustain a lower unemployment rate without generating wage-price pressures. Childcare subsidies and flexible work arrangements improve workforce participation, expanding labour supply and reducing tightness in the labour market.",
      },
      limitation:
        "Labour market policies primarily address structural and frictional unemployment — they cannot reduce cyclical unemployment during recessions (that requires macroeconomic expansion). The minimum wage, while improving equity, risks pricing low-skill workers out of employment if set too high. Enterprise bargaining can exacerbate inequality if high-skill workers in productive firms capture wage gains unavailable to low-skill workers in non-bargaining arrangements.",
      judgement:
        "Labour market policies are most effective in reducing unemployment without inflationary pressure when they are supply-side focused — improving skills, participation, and productivity. They complement macroeconomic demand management (which reduces cyclical unemployment) and microeconomic reform (which raises overall productive efficiency). The most effective labour market policy framework combines enterprise bargaining, active training programs, and a minimum wage set with evidence-based modelling of employment effects.",
      commonMistakes: [
        "Confusing labour market policy with macroeconomic policy (they operate differently)",
        "Not explaining how productivity-linked wages help maintain price stability",
        "Ignoring the equity-efficiency tension in minimum wage policy",
        "Forgetting that labour market policy cannot address cyclical unemployment",
      ],
      band6Tip:
        "Link labour market policy explicitly to the NAIRU: 'Effective labour market reform lowers the NAIRU by reducing structural unemployment, meaning the economy can operate at a higher employment level without generating inflationary wage pressure. This is the most powerful way in which supply-side labour market policies contribute to the simultaneous achievement of full employment and price stability.'",
    },
  };
  return scaffolds[questionId] || scaffolds["q1"];
}

export function EssayPlanner({ state }: EssayPlannerProps) {
  const isDark = state.theme === "dark";
  const [selectedQ, setSelectedQ] = useState<string | null>(null);
  const [scaffold, setScaffold] = useState<Scaffold | null>(null);
  const [showMistakes, setShowMistakes] = useState(false);

  const handleGenerate = (id: string) => {
    setSelectedQ(id);
    setScaffold(generateScaffold(id));
    setShowMistakes(false);
  };

  return (
    <div className={`min-h-screen pb-20 lg:pb-0 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="max-w-4xl mx-auto px-4 py-6 lg:px-8 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
            <PenTool size={20} className="text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Essay Planner</h1>
            <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Select a question to generate a structured essay scaffold
            </p>
          </div>
        </div>

        {/* Question list */}
        <div className="space-y-2">
          {essayQuestions.map((q) => (
            <motion.button
              key={q.id}
              onClick={() => handleGenerate(q.id)}
              whileHover={{ scale: 1.005 }}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedQ === q.id
                  ? isDark
                    ? "bg-indigo-500/10 border-indigo-500/30"
                    : "bg-indigo-50 border-indigo-200"
                  : isDark
                  ? "bg-slate-900 border-slate-800 hover:border-slate-700"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                  isDark ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-indigo-50 text-indigo-600 border-indigo-200"
                }`}>
                  {q.category}
                </span>
                <p className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-800"}`}>{q.question}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Scaffold output */}
        {scaffold && selectedQ && (
          <motion.div
            key={selectedQ}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h2 className={`font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>Essay Scaffold</h2>
              <button
                onClick={() => { setSelectedQ(null); setScaffold(null); }}
                className={`text-xs ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-700"} flex items-center gap-1`}
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {[
              { label: "Introduction / Thesis", color: "cyan", content: scaffold.thesis },
              { label: "Body Paragraph 1 — " + scaffold.policy1.title, color: "violet", content: scaffold.policy1.content },
              { label: "Body Paragraph 2 — " + scaffold.policy2.title, color: "emerald", content: scaffold.policy2.content },
              { label: "Limitation Paragraph", color: "amber", content: scaffold.limitation },
              { label: "Conclusion / Judgement", color: "indigo", content: scaffold.judgement },
            ].map((section) => (
              <div
                key={section.label}
                className={`p-4 rounded-xl border ${
                  isDark ? `bg-${section.color}-500/5 border-${section.color}-500/20` : `bg-${section.color}-50 border-${section.color}-200`
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-wide mb-2 text-${section.color}-400`}>{section.label}</p>
                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>{section.content}</p>
              </div>
            ))}

            {/* Band 6 tip */}
            <div className={`p-4 rounded-xl border ${isDark ? "bg-amber-500/5 border-amber-500/20" : "bg-amber-50 border-amber-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} className="text-amber-400" />
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Band 6 Tip</p>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>{scaffold.band6Tip}</p>
            </div>

            {/* Common mistakes */}
            <div className={`rounded-xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <button
                onClick={() => setShowMistakes(!showMistakes)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left ${isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-red-400" />
                  <span className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-800"}`}>Common Mistakes to Avoid</span>
                </div>
                <ChevronDown size={14} className={`text-slate-500 transition-transform ${showMistakes ? "rotate-180" : ""}`} />
              </button>
              {showMistakes && (
                <div className="px-4 pb-4 border-t border-slate-800">
                  <ul className="mt-3 space-y-2">
                    {scaffold.commonMistakes.map((m, i) => (
                      <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
