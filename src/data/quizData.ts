export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SectionQuiz {
  sectionId: string;
  questions: QuizQuestion[];
}

export const quizData: SectionQuiz[] = [
  {
    sectionId: "economic-objectives",
    questions: [
      {
        id: "eo-1",
        question: "Australia's Reserve Bank inflation target band is:",
        options: ["0–2% per annum", "2–3% on average over the medium term", "3–5% per annum", "1–4% per annum"],
        correctIndex: 1,
        explanation: "The RBA's inflation target is 2–3% on average over the medium term, providing flexibility to respond to cyclical conditions while maintaining price stability.",
      },
      {
        id: "eo-2",
        question: "Full employment in Australia refers to:",
        options: [
          "Zero unemployment",
          "Unemployment rate of exactly 2%",
          "Unemployment equal to the NAIRU (approximately 4–5%)",
          "All working-age adults employed",
        ],
        correctIndex: 2,
        explanation: "Full employment means unemployment at the NAIRU (Non-Accelerating Inflation Rate of Unemployment) — around 4–5% in Australia. Some unemployment is always natural (frictional, structural).",
      },
      {
        id: "eo-3",
        question: "Which of the following best describes the conflict between economic growth and price stability?",
        options: [
          "Strong growth increases unemployment",
          "Rapid growth above productive capacity can generate inflationary pressure",
          "Growth always causes deflation",
          "Price stability prevents economic growth",
        ],
        correctIndex: 1,
        explanation: "When the economy grows faster than its productive capacity (positive output gap), excess demand pushes prices up — creating inflationary pressure. This is the core growth vs price stability conflict.",
      },
      {
        id: "eo-4",
        question: "The Gini coefficient measures:",
        options: [
          "The rate of economic growth",
          "The level of unemployment",
          "Income inequality (0 = perfect equality, 1 = perfect inequality)",
          "The current account deficit",
        ],
        correctIndex: 2,
        explanation: "The Gini coefficient is the standard measure of income inequality. A higher value indicates greater inequality. Australia's Gini coefficient is around 0.33.",
      },
      {
        id: "eo-5",
        question: "Australia's Current Account Deficit (CAD) is primarily a concern for which objective?",
        options: ["Price stability", "Full employment", "External stability", "Environmental sustainability"],
        correctIndex: 2,
        explanation: "A persistent CAD is a key indicator of external instability. It means Australia is spending more on imports and servicing foreign debt than it earns from exports and income from abroad.",
      },
    ],
  },
  {
    sectionId: "macroeconomic-policy",
    questions: [
      {
        id: "mp-1",
        question: "Macroeconomic policy primarily works through:",
        options: [
          "Improving productivity in individual industries",
          "Managing aggregate demand across the entire economy",
          "Deregulating specific product markets",
          "Setting wages for workers",
        ],
        correctIndex: 1,
        explanation: "Macroeconomic policy (fiscal and monetary) operates on the demand side — adjusting the overall level of spending (aggregate demand) to stabilise output and employment.",
      },
      {
        id: "mp-2",
        question: "A negative output gap indicates:",
        options: [
          "The economy is growing above its potential",
          "Inflation is above the RBA target",
          "Actual GDP is below potential GDP — spare capacity exists",
          "The budget is in surplus",
        ],
        correctIndex: 2,
        explanation: "A negative output gap means the economy is operating below its productive potential, with spare capacity and elevated unemployment. Expansionary macroeconomic policy is typically appropriate.",
      },
      {
        id: "mp-3",
        question: "What distinguishes microeconomic policy from macroeconomic policy?",
        options: [
          "Microeconomic policy is more expensive",
          "Microeconomic policy works on the supply side; macroeconomic policy works on the demand side",
          "Macroeconomic policy is only used during recessions",
          "There is no difference",
        ],
        correctIndex: 1,
        explanation: "Macroeconomic policy manages aggregate demand (short-run stabilisation), while microeconomic policy improves efficiency and productivity on the supply side (long-run capacity growth).",
      },
    ],
  },
  {
    sectionId: "fiscal-policy",
    questions: [
      {
        id: "fp-1",
        question: "An automatic stabiliser is:",
        options: [
          "A deliberate government spending decision",
          "A feature of the tax/transfer system that automatically dampens economic fluctuations",
          "A tool used only by the RBA",
          "A type of microeconomic reform",
        ],
        correctIndex: 1,
        explanation: "Automatic stabilisers (progressive tax, unemployment benefits) automatically respond to the business cycle without requiring specific policy decisions — increasing deficits in recessions and shrinking them in booms.",
      },
      {
        id: "fp-2",
        question: "A budget surplus has what effect on aggregate demand?",
        options: [
          "Expansionary — it injects money into the economy",
          "Neutral — no impact on AD",
          "Contractionary — it withdraws more from the economy than it injects",
          "It only affects supply, not demand",
        ],
        correctIndex: 2,
        explanation: "A budget surplus (revenue > spending) is contractionary because the government withdraws more purchasing power from the economy through taxes than it returns through spending.",
      },
      {
        id: "fp-3",
        question: "The fiscal multiplier refers to:",
        options: [
          "The number of budget items in the federal Budget",
          "The final increase in GDP relative to the initial government spending injection",
          "The tax rate applied to the highest income bracket",
          "The size of Australia's budget deficit",
        ],
        correctIndex: 1,
        explanation: "The multiplier measures how much total GDP increases for each dollar of government spending. If the multiplier is 1.5, a $1 billion injection generates $1.5 billion in total GDP growth through rounds of spending.",
      },
      {
        id: "fp-4",
        question: "Which of the following is a limitation of discretionary fiscal policy?",
        options: [
          "It can only be used during booms",
          "It operates through the cash rate",
          "Implementation lags mean stimulus may arrive after recovery has already begun",
          "It is managed by the RBA, not the government",
        ],
        correctIndex: 2,
        explanation: "Discretionary fiscal policy suffers from significant time lags — particularly for infrastructure spending. By the time projects are designed, tendered, and built, economic conditions may have changed.",
      },
      {
        id: "fp-5",
        question: "Australia's fiscal response to the Global Financial Crisis (2008–09) involved:",
        options: [
          "Raising taxes to protect the budget surplus",
          "Leaving the budget unchanged (neutral stance)",
          "Significant deficit spending including household payments and infrastructure investment",
          "Cutting government spending to reduce debt",
        ],
        correctIndex: 2,
        explanation: "Australia's GFC fiscal stimulus (direct payments to households, Building the Education Revolution, Nation Building) is a key example of expansionary discretionary fiscal policy successfully averting a recession.",
      },
    ],
  },
  {
    sectionId: "monetary-policy",
    questions: [
      {
        id: "monp-1",
        question: "The cash rate is best described as:",
        options: [
          "The rate banks charge consumers for home loans",
          "The overnight rate at which banks lend to each other in the money market",
          "The interest rate on government bonds",
          "The savings rate offered by commercial banks",
        ],
        correctIndex: 1,
        explanation: "The cash rate is the interest rate for overnight borrowing/lending between financial institutions in the interbank market. The RBA sets a target and maintains it through open market operations.",
      },
      {
        id: "monp-2",
        question: "The exchange rate channel of monetary policy transmission means:",
        options: [
          "Lower interest rates raise the AUD, making exports cheaper",
          "Lower interest rates cause capital outflow, depreciating the AUD and boosting exports",
          "Higher interest rates always depreciate the AUD",
          "The exchange rate is not affected by interest rates",
        ],
        correctIndex: 1,
        explanation: "Lower domestic interest rates make Australian assets less attractive to foreign investors → capital outflow → AUD depreciates → Australian exports are relatively cheaper → net exports rise → AD rises.",
      },
      {
        id: "monp-3",
        question: "A key limitation of monetary policy is:",
        options: [
          "It can only be used once per year",
          "It requires parliamentary approval",
          "Time lags of 12–18 months before full effect on inflation and output",
          "It has no effect on consumer spending",
        ],
        correctIndex: 2,
        explanation: "Monetary policy operates with long and variable lags — rate changes take 12–18 months to fully flow through to inflation and GDP. This makes it difficult to calibrate policy precisely.",
      },
      {
        id: "monp-4",
        question: "The RBA raised interest rates aggressively in 2022–23 primarily to:",
        options: [
          "Stimulate economic growth after COVID",
          "Reduce the unemployment rate",
          "Control surging inflation that reached 7.8% in 2022",
          "Support the Australian dollar",
        ],
        correctIndex: 2,
        explanation: "After the COVID-19 recovery, Australian CPI inflation surged to 7.8% — well above the 2–3% target. The RBA tightened monetary policy rapidly to bring inflation back toward target.",
      },
      {
        id: "monp-5",
        question: "What is the 'zero lower bound' problem?",
        options: [
          "The cash rate cannot be set above zero",
          "Monetary policy loses effectiveness when the cash rate cannot be lowered further (at/near zero)",
          "Banks refuse to lend when inflation is zero",
          "GDP cannot grow below zero",
        ],
        correctIndex: 1,
        explanation: "When the cash rate is at or near zero, the RBA has limited capacity to stimulate further through conventional rate cuts. This was the situation in 2020–21 when the cash rate was 0.10%.",
      },
    ],
  },
  {
    sectionId: "microeconomic-policy",
    questions: [
      {
        id: "mcp-1",
        question: "Microeconomic reform primarily aims to:",
        options: [
          "Increase aggregate demand in the short run",
          "Improve the efficiency and productive capacity of the economy (supply side)",
          "Reduce the budget deficit",
          "Lower the cash rate",
        ],
        correctIndex: 1,
        explanation: "Microeconomic reform works on the supply side — improving efficiency, productivity, and competition in individual markets. This shifts the LRAS curve right, increasing potential GDP.",
      },
      {
        id: "mcp-2",
        question: "Privatisation involves:",
        options: [
          "Government taking ownership of private companies",
          "Reducing taxes on private businesses",
          "Transferring government-owned enterprises to private sector ownership",
          "Increasing competition in public sector markets",
        ],
        correctIndex: 2,
        explanation: "Privatisation transfers GOEs (Government-Owned Enterprises) to private ownership. Examples include Telstra, Commonwealth Bank, and Qantas. The rationale is that private firms operate more efficiently under competitive pressure.",
      },
      {
        id: "mcp-3",
        question: "Trade liberalisation (reducing tariffs) supports microeconomic reform because:",
        options: [
          "It reduces government spending",
          "It exposes domestic industries to international competition, forcing efficiency improvements",
          "It lowers the exchange rate",
          "It raises tax revenue for the government",
        ],
        correctIndex: 1,
        explanation: "Removing tariff protection exposes Australian industries to global competition, compelling firms to reduce costs, improve quality, and innovate. This raises allocative and productive efficiency.",
      },
    ],
  },
  {
    sectionId: "labour-market-policy",
    questions: [
      {
        id: "lmp-1",
        question: "Enterprise bargaining was introduced primarily to:",
        options: [
          "Set a uniform national wage",
          "Link wages to firm-level productivity and improve labour market flexibility",
          "Abolish trade unions",
          "Increase the minimum wage for all workers",
        ],
        correctIndex: 1,
        explanation: "Enterprise bargaining (introduced from 1991) allows wages to be negotiated at the firm level, linking pay to productivity. This replaced the rigid centralised award system and improved labour market flexibility.",
      },
      {
        id: "lmp-2",
        question: "Structural unemployment is best addressed by:",
        options: [
          "Lowering the cash rate",
          "Increasing government spending",
          "Training, education, and skills programs that match workers to available jobs",
          "Raising the minimum wage",
        ],
        correctIndex: 2,
        explanation: "Structural unemployment reflects a mismatch between worker skills and employer needs. It cannot be solved by stimulating aggregate demand — it requires supply-side interventions like skills training and retraining programs.",
      },
      {
        id: "lmp-3",
        question: "Rapid wage growth that exceeds productivity growth tends to cause:",
        options: [
          "Deflation",
          "Reduced unemployment",
          "Cost-push inflation and reduced competitiveness",
          "An appreciation of the AUD",
        ],
        correctIndex: 2,
        explanation: "When wages rise faster than productivity, unit labour costs increase. Firms pass these higher costs on to consumers as higher prices (cost-push inflation), and export competitiveness falls.",
      },
    ],
  },
  {
    sectionId: "environmental-management",
    questions: [
      {
        id: "em-1",
        question: "Carbon emissions create a negative externality because:",
        options: [
          "They make goods more expensive",
          "The social cost of emissions is not reflected in the market price — third parties bear costs the producer does not",
          "Firms never consider environmental impacts",
          "Carbon is a public good",
        ],
        correctIndex: 1,
        explanation: "Negative externalities occur when production/consumption imposes costs on third parties not captured in market prices. Carbon emissions impose climate costs on society that emitters don't pay for, leading to market overproduction.",
      },
      {
        id: "em-2",
        question: "A carbon price is designed to:",
        options: [
          "Subsidise fossil fuel production",
          "Internalise the negative externality by making emitters pay the social cost of their emissions",
          "Reduce government revenue",
          "Increase industrial output",
        ],
        correctIndex: 1,
        explanation: "A carbon price (tax or emissions trading scheme) attaches a financial cost to emissions, making emitters pay the external cost they impose. This creates incentives to reduce emissions and invest in clean technology.",
      },
      {
        id: "em-3",
        question: "Australia's current approach to reducing industrial emissions is through:",
        options: [
          "A broad carbon tax on all consumers",
          "The Safeguard Mechanism, requiring major emitters to reduce emissions baselines",
          "Complete deregulation of the energy market",
          "Nationalisation of the energy industry",
        ],
        correctIndex: 1,
        explanation: "Australia's Safeguard Mechanism (strengthened in 2023) requires Australia's ~215 largest industrial emitters to reduce their emissions baselines, creating an incentive-based regulatory framework for emission reductions.",
      },
    ],
  },
  {
    sectionId: "policy-limitations",
    questions: [
      {
        id: "pl-1",
        question: "Which of the following describes an 'implementation lag'?",
        options: [
          "The time taken to identify that economic conditions have changed",
          "The time between a policy decision and its actual implementation",
          "The time for a policy to fully affect economic outcomes",
          "Political resistance to policy change",
        ],
        correctIndex: 1,
        explanation: "The implementation lag is the gap between when a policy is decided and when it actually takes effect. For infrastructure spending, this can be years — the project must be designed, tendered, and constructed.",
      },
      {
        id: "pl-2",
        question: "A key external constraint on Australian economic policy is:",
        options: [
          "The RBA's independence",
          "Federal Budget timing",
          "Global economic conditions, including commodity prices and foreign interest rates",
          "The structure of the progressive tax system",
        ],
        correctIndex: 2,
        explanation: "As a small open economy, Australia is highly exposed to global conditions. Commodity price falls, global recessions, and US Federal Reserve rate decisions can all significantly offset or overwhelm domestic policy settings.",
      },
      {
        id: "pl-3",
        question: "Pro-cyclical policy refers to:",
        options: [
          "Policy that always works in favour of economic growth",
          "Policy that inadvertently amplifies the business cycle (e.g., stimulus arriving after recovery)",
          "Policy that targets the business cycle directly",
          "Monetary policy that responds to fiscal changes",
        ],
        correctIndex: 1,
        explanation: "Pro-cyclical policy makes the business cycle worse — for example, if a recession-era stimulus arrives after the economy has recovered and fuels inflation, or if austerity measures hit during a recession. Time lags are a key cause.",
      },
    ],
  },
  {
    sectionId: "exam-strategy",
    questions: [
      {
        id: "es-1",
        question: "In an HSC essay on fiscal policy, the most important element to include is:",
        options: [
          "A full history of the Australian economy",
          "The transmission mechanism — how policy changes flow through to economic outcomes",
          "A comparison with other countries' fiscal policies",
          "A detailed description of the federal Budget process",
        ],
        correctIndex: 1,
        explanation: "HSC markers reward explicit cause-and-effect chains. Explaining HOW fiscal policy changes affect aggregate demand, output, and objectives is worth more than descriptive content alone.",
      },
      {
        id: "es-2",
        question: "A Band 6 response on monetary policy effectiveness would:",
        options: [
          "Simply describe what monetary policy is",
          "List all the RBA's recent decisions",
          "Evaluate both effectiveness and limitations, use evidence, link to objectives, and make a conditional judgement",
          "Focus only on the interest rate channel",
        ],
        correctIndex: 2,
        explanation: "Band 6 responses demonstrate analytical depth — weighing effectiveness against limitations, integrating evidence, linking to multiple objectives, and reaching a nuanced conclusion (not just 'it works' or 'it doesn't work').",
      },
    ],
  },
];
