export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  relatedTerms: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Aggregate Demand (AD)",
    definition:
      "The total demand for goods and services in an economy at any given price level. AD = Consumption + Investment + Government Spending + Net Exports (C + I + G + X – M). Both fiscal and monetary policy work primarily through shifting the AD curve.",
    category: "Macroeconomics",
    relatedTerms: ["Fiscal Policy", "Monetary Policy", "Business Cycle"],
  },
  {
    term: "Aggregate Supply (AS)",
    definition:
      "The total output of goods and services that producers in an economy are willing and able to supply at any given price level. In the short run, AS is upward sloping; in the long run, it is vertical at the economy's potential output level. Microeconomic reform aims to shift the LRAS curve to the right.",
    category: "Macroeconomics",
    relatedTerms: ["Microeconomic Reform", "Productivity", "LRAS"],
  },
  {
    term: "Fiscal Policy",
    definition:
      "The federal government's use of its budget — decisions about taxation and government expenditure — to influence aggregate demand and achieve macroeconomic objectives. An expansionary fiscal stance (deficit spending) raises AD; a contractionary stance (surplus) reduces AD.",
    category: "Policy",
    relatedTerms: ["Budget Deficit", "Budget Surplus", "Automatic Stabilisers", "Discretionary Policy"],
  },
  {
    term: "Monetary Policy",
    definition:
      "The Reserve Bank of Australia's use of the cash rate to influence borrowing costs, aggregate demand, and ultimately inflation and employment. The RBA targets inflation of 2–3% on average over the medium term and adjusts the cash rate to achieve this.",
    category: "Policy",
    relatedTerms: ["Cash Rate", "Transmission Mechanism", "Inflation Targeting", "RBA"],
  },
  {
    term: "Cash Rate",
    definition:
      "The interest rate at which financial institutions borrow and lend exchange settlement funds overnight in the interbank market. The RBA sets a target for the cash rate and uses open market operations to maintain it. Changes in the cash rate flow through to other interest rates across the economy.",
    category: "Monetary Policy",
    relatedTerms: ["Monetary Policy", "Transmission Mechanism", "RBA"],
  },
  {
    term: "Transmission Mechanism",
    definition:
      "The process by which a change in the cash rate flows through the economy to affect inflation and output. Key channels include: interest rate channel (borrowing costs), asset price channel (wealth effect), exchange rate channel (net exports), credit channel (lending availability), and expectations channel.",
    category: "Monetary Policy",
    relatedTerms: ["Cash Rate", "Monetary Policy", "Aggregate Demand"],
  },
  {
    term: "Budget Deficit",
    definition:
      "Occurs when government expenditure exceeds government revenue in a given financial year. A budget deficit injects purchasing power into the economy (expansionary effect) and, if persistent, increases public debt (net government debt). Deficits are appropriate during recessions to support aggregate demand.",
    category: "Fiscal Policy",
    relatedTerms: ["Fiscal Policy", "Budget Surplus", "Expansionary Policy"],
  },
  {
    term: "Budget Surplus",
    definition:
      "Occurs when government revenue exceeds government expenditure in a given financial year. A surplus withdraws purchasing power from the economy (contractionary effect) and, if maintained, reduces public debt. Surpluses are appropriate during economic booms to reduce inflationary pressure.",
    category: "Fiscal Policy",
    relatedTerms: ["Fiscal Policy", "Budget Deficit", "Contractionary Policy"],
  },
  {
    term: "Automatic Stabilisers",
    definition:
      "Features of the tax and transfer system that automatically stabilise the economy without requiring specific policy decisions. During recessions: tax revenue falls and welfare payments rise (injecting funds). During booms: tax revenue rises and welfare payments fall (withdrawing funds). Examples include progressive income tax and unemployment benefits.",
    category: "Fiscal Policy",
    relatedTerms: ["Fiscal Policy", "Discretionary Policy", "Business Cycle"],
  },
  {
    term: "Discretionary Policy",
    definition:
      "Deliberate government decisions to change spending or taxation to influence aggregate demand — as opposed to automatic stabilisers. Examples include infrastructure stimulus packages, direct household payments, and targeted tax cuts. Discretionary policy suffers from time lags (decision, implementation, and effect lags).",
    category: "Fiscal Policy",
    relatedTerms: ["Fiscal Policy", "Automatic Stabilisers", "Multiplier Effect"],
  },
  {
    term: "Microeconomic Reform",
    definition:
      "Policies that improve the efficiency, productivity, and competitive structure of individual markets, industries, and sectors. Unlike macroeconomic policy, microeconomic reform works on the supply side — raising the economy's productive capacity and shifting the LRAS curve to the right. Key reforms include competition policy, deregulation, privatisation, and investment in human capital.",
    category: "Microeconomics",
    relatedTerms: ["Productivity", "Efficiency", "Deregulation", "Privatisation"],
  },
  {
    term: "Productivity",
    definition:
      "The efficiency with which inputs (labour, capital) are converted into outputs. Labour productivity (output per worker or per hour worked) is a key driver of real wage growth and long-run living standards. Total Factor Productivity (TFP) measures efficiency improvements beyond capital and labour inputs alone.",
    category: "Microeconomics",
    relatedTerms: ["Microeconomic Reform", "Efficiency", "Economic Growth"],
  },
  {
    term: "Efficiency",
    definition:
      "The optimal use of available resources. Allocative efficiency occurs when resources are directed to their highest-valued uses. Productive (or technical) efficiency occurs when output is produced at minimum cost. Dynamic efficiency refers to innovation and adoption of new technologies over time. Microeconomic reform aims to improve all three.",
    category: "Microeconomics",
    relatedTerms: ["Microeconomic Reform", "Productivity", "Competition Policy"],
  },
  {
    term: "Externalities",
    definition:
      "Costs or benefits imposed on third parties who are not part of a market transaction. Negative externalities (e.g., pollution, carbon emissions) cause markets to overproduce harmful goods — a form of market failure. Positive externalities (e.g., education, vaccination) cause markets to underproduce beneficial goods. Government intervention corrects externalities.",
    category: "Market Failure",
    relatedTerms: ["Environmental Sustainability", "Market Failure", "Carbon Pricing"],
  },
  {
    term: "Environmental Sustainability",
    definition:
      "An economic objective that recognises that growth must not permanently deplete or damage the natural resource base. Balancing economic activity with environmental preservation ensures that future generations can meet their own needs. It often conflicts with short-run economic growth objectives.",
    category: "Economic Objectives",
    relatedTerms: ["Externalities", "Market Failure", "Economic Growth"],
  },
  {
    term: "Inflation Targeting",
    definition:
      "A monetary policy framework in which the central bank explicitly commits to maintaining inflation within a specified target band. Australia's RBA targets CPI inflation of 2–3% on average over the medium term. This framework provides transparency and anchors inflationary expectations, reducing inflation persistence.",
    category: "Monetary Policy",
    relatedTerms: ["Monetary Policy", "Cash Rate", "Price Stability"],
  },
  {
    term: "Full Employment",
    definition:
      "An economic objective where the unemployment rate equals the NAIRU (Non-Accelerating Inflation Rate of Unemployment) — the lowest sustainable unemployment rate that does not cause wage-driven inflation. Australia's estimated NAIRU is approximately 4–5%. Full employment does not mean zero unemployment, as some frictional and structural unemployment is always present.",
    category: "Economic Objectives",
    relatedTerms: ["Unemployment", "NAIRU", "Labour Market Policy"],
  },
  {
    term: "External Stability",
    definition:
      "An economic objective focused on maintaining a manageable current account deficit (CAD) and avoiding an unsustainable accumulation of foreign debt. Australia's CAD reflects a structural savings-investment gap. External instability can lead to exchange rate depreciation, higher borrowing costs, and reduced investor confidence.",
    category: "Economic Objectives",
    relatedTerms: ["Current Account Deficit", "Terms of Trade", "Exchange Rate"],
  },
  {
    term: "Output Gap",
    definition:
      "The difference between actual GDP and potential GDP (the economy's productive capacity). A positive output gap (actual > potential) indicates inflationary pressure. A negative output gap (actual < potential) indicates spare capacity and cyclical unemployment. Macroeconomic policy aims to close recessionary output gaps without creating inflationary pressure.",
    category: "Macroeconomics",
    relatedTerms: ["Business Cycle", "Potential GDP", "Aggregate Demand"],
  },
  {
    term: "NAIRU",
    definition:
      "Non-Accelerating Inflation Rate of Unemployment. The lowest rate of unemployment consistent with stable (non-accelerating) inflation. Below the NAIRU, tight labour markets push up wages and prices. Australia's NAIRU is estimated at around 4–5%. It represents the full employment benchmark for policy purposes.",
    category: "Labour Market",
    relatedTerms: ["Full Employment", "Inflation", "Phillips Curve"],
  },
  {
    term: "Business Cycle",
    definition:
      "The recurring pattern of expansion (rising GDP and falling unemployment) and contraction (falling GDP and rising unemployment) in economic activity around the long-run trend. Phases include expansion, peak, contraction/recession, and trough. Macroeconomic policy aims to smooth business cycle fluctuations.",
    category: "Macroeconomics",
    relatedTerms: ["Aggregate Demand", "Fiscal Policy", "Monetary Policy"],
  },
  {
    term: "Multiplier Effect",
    definition:
      "The process by which an initial injection of government spending (or other expenditure) generates a larger final increase in GDP. Recipients of government spending use part of their income for further spending, creating additional rounds of economic activity. The size of the multiplier depends on the marginal propensity to consume (MPC).",
    category: "Fiscal Policy",
    relatedTerms: ["Fiscal Policy", "Aggregate Demand", "Discretionary Policy"],
  },
  {
    term: "Current Account Deficit (CAD)",
    definition:
      "The shortfall between the value of goods and services exported plus income received from abroad, and the value of goods and services imported plus income paid abroad. A persistent CAD means Australia is net borrowing from abroad. It is measured as a percentage of GDP.",
    category: "External Sector",
    relatedTerms: ["External Stability", "Terms of Trade", "Exchange Rate"],
  },
  {
    term: "Terms of Trade",
    definition:
      "The ratio of Australia's export prices to import prices. An improvement in the terms of trade (export prices rise relative to import prices) increases national income and often appreciates the AUD. Australia's terms of trade are heavily influenced by global commodity prices, particularly iron ore and coal.",
    category: "External Sector",
    relatedTerms: ["External Stability", "Current Account Deficit", "Economic Growth"],
  },
];
