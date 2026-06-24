export interface SubSection {
  id: string;
  title: string;
  content: string;
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  color: string;
  accent: string;
  description: string;
  subsections: SubSection[];
  causeEffect: string;
  examLink: string;
  glossaryTerms: string[];
}

export const topic4Sections: Section[] = [
  {
    id: "policy-overview",
    title: "Economic Policies Overview",
    icon: "LayoutDashboard",
    color: "from-cyan-500 to-blue-600",
    accent: "cyan",
    description: "The role of government policy in managing the economy — types, goals and instruments.",
    causeEffect: "Market failures and macroeconomic instability → government intervention through fiscal, monetary and microeconomic policies → improved efficiency, stability and equitable outcomes.",
    examLink: "Use this as a foundation for all Topic 4 essays. Define policy types, state objectives, and outline the instruments before evaluating effectiveness.",
    glossaryTerms: ["fiscal policy", "monetary policy", "microeconomic policy", "economic objectives", "policy mix"],
    subsections: [
      {
        id: "policy-overview-1",
        title: "Why Do Governments Intervene?",
        content: `<p>Governments intervene in the economy to address <strong>market failures</strong> and achieve broader <strong>economic and social objectives</strong> that free markets cannot deliver on their own.</p>
<p><strong>Reasons for intervention:</strong></p>
<ul>
  <li><strong>Market failure</strong>: Free markets may produce inefficient outcomes — externalities, public goods, information asymmetry, natural monopolies.</li>
  <li><strong>Macroeconomic stabilisation</strong>: Markets are prone to boom-bust cycles; policy can smooth these fluctuations.</li>
  <li><strong>Income distribution</strong>: Markets may produce highly unequal income distributions that society finds unacceptable.</li>
  <li><strong>Long-run growth</strong>: Markets may underinvest in education, R&D, and infrastructure — government investment raises productive capacity.</li>
</ul>
<p><strong>Types of government economic policy:</strong></p>
<ul>
  <li><strong>Demand-side (macroeconomic) policies</strong>: Fiscal policy and monetary policy — manage aggregate demand.</li>
  <li><strong>Supply-side (microeconomic) policies</strong>: Improve the efficiency of markets and the productive capacity of the economy.</li>
</ul>`,
      },
      {
        id: "policy-overview-2",
        title: "Economic Objectives",
        content: `<p>Australian governments pursue six key <strong>macroeconomic objectives</strong>:</p>
<ul>
  <li><strong>Economic growth</strong>: Sustained growth in real GDP — target approximately 3–4% pa (trend growth). Measured by ABS National Accounts.</li>
  <li><strong>Full employment</strong>: Minimise unemployment. The non-accelerating inflation rate of unemployment (NAIRU) is approximately 4–5% for Australia. "Full employment" in practice means everyone willing to work at prevailing wages can find a job.</li>
  <li><strong>Price stability (low inflation)</strong>: RBA targets 2–3% CPI inflation on average over the cycle. Low inflation preserves purchasing power and reduces uncertainty.</li>
  <li><strong>External stability</strong>: Sustainable current account and manageable net foreign liabilities. Avoid excessive dependence on foreign borrowing.</li>
  <li><strong>Equitable income distribution</strong>: Reduce poverty and ensure the benefits of growth are broadly shared. Uses Gini coefficient and poverty measures.</li>
  <li><strong>Environmental sustainability</strong>: Growth must be achieved without depleting natural resources or causing irreversible environmental damage for future generations.</li>
</ul>`,
      },
      {
        id: "policy-overview-3",
        title: "The Policy Mix",
        content: `<p>In practice, governments use a <strong>policy mix</strong> — combining fiscal, monetary, and microeconomic policies to pursue multiple objectives simultaneously.</p>
<p>The appropriate mix depends on the state of the business cycle:</p>
<ul>
  <li><strong>Economic downturn</strong>: Expansionary fiscal policy (deficit spending) + loose monetary policy (low interest rates) + microeconomic reforms to boost long-run supply.</li>
  <li><strong>Boom / inflationary period</strong>: Contractionary fiscal policy (surplus) + tight monetary policy (high interest rates).</li>
</ul>
<p><strong>Australia's recent policy mix:</strong></p>
<ul>
  <li>COVID-19 (2020): Unprecedented fiscal stimulus (JobKeeper, $90bn+) + RBA cut cash rate to 0.1% + quantitative easing.</li>
  <li>Post-COVID inflation (2022–24): RBA raised cash rate from 0.1% to 4.35% (425 basis points) — fastest tightening cycle in a generation. Fiscal policy remained broadly supportive but began returning to surplus.</li>
</ul>`,
      },
    ],
  },
  {
    id: "economic-objectives",
    title: "Economic Objectives in Depth",
    icon: "Target",
    color: "from-violet-500 to-purple-600",
    accent: "violet",
    description: "Detailed analysis of each economic objective, indicators and Australian context.",
    causeEffect: "Clear policy objectives → measurable targets → enables assessment of policy success and identification of trade-offs between goals.",
    examLink: "Always link policy action back to specific economic objectives. In essays, show how policies affect multiple objectives simultaneously.",
    glossaryTerms: ["GDP growth", "unemployment rate", "CPI", "inflation", "CAD", "Gini coefficient", "NAIRU"],
    subsections: [
      {
        id: "economic-objectives-1",
        title: "Growth and Employment",
        content: `<p><strong>Economic Growth:</strong></p>
<ul>
  <li>Measured by real GDP growth rate (real = adjusted for inflation).</li>
  <li>Australia's trend growth ≈ 3% pa (driven by population growth ~1.5% + productivity growth ~1.5%).</li>
  <li>Growth enables higher living standards, government revenue for services, and employment creation.</li>
  <li>Sources: consumption (C), investment (I), government spending (G), net exports (X–M).</li>
</ul>
<p><strong>Employment:</strong></p>
<ul>
  <li><strong>Unemployment rate</strong>: % of labour force actively seeking work but unable to find it.</li>
  <li>Australia's "full employment" NAIRU ≈ 4–4.5% (as estimated by Treasury/RBA in the mid-2020s).</li>
  <li>Types: cyclical (demand deficiency), structural (skills mismatch), frictional (between jobs), seasonal.</li>
  <li>Labour underutilisation rate = unemployment + underemployment. More comprehensive measure of slack.</li>
  <li>Post-COVID, unemployment fell to 3.5% (50-year low) in 2022–23.</li>
</ul>`,
      },
      {
        id: "economic-objectives-2",
        title: "Price Stability and Inflation",
        content: `<p><strong>Inflation</strong>: A sustained rise in the general price level, measured by the Consumer Price Index (CPI).</p>
<p><strong>RBA target</strong>: 2–3% pa on average over the cycle — enough to keep real interest rates positive and allow relative prices to adjust without confusion.</p>
<p><strong>Types of inflation:</strong></p>
<ul>
  <li><strong>Demand-pull</strong>: Aggregate demand exceeds productive capacity — too much money chasing too few goods.</li>
  <li><strong>Cost-push</strong>: Supply shocks raise production costs (e.g., oil price surge) — pushes prices up from the supply side.</li>
  <li><strong>Imported inflation</strong>: A depreciating exchange rate makes imports more expensive.</li>
</ul>
<p><strong>Australian experience:</strong></p>
<ul>
  <li>Inflation was below target (under 2%) for much of 2013–2021.</li>
  <li>Post-COVID supply chain disruptions + massive fiscal stimulus + tight labour market drove CPI to 7.8% in December 2022 — a 32-year high.</li>
  <li>RBA raised rates aggressively (0.1% → 4.35%) to return inflation to target — achieved by late 2024.</li>
</ul>`,
      },
      {
        id: "economic-objectives-3",
        title: "External Stability and Distribution",
        content: `<p><strong>External Stability:</strong></p>
<ul>
  <li>Refers to a sustainable balance of payments position — a CAD that can be financed without threatening economic stability.</li>
  <li>Historically, Australia's CAD has been 3–5% of GDP — generally considered sustainable as it reflects investment exceeding savings (a "good" CAD).</li>
  <li>Australia's net foreign liabilities (NFL) ≈ 50% of GDP — a vulnerability if confidence in the AUD declines.</li>
  <li>In 2019–21, Australia ran its first current account surplus in 44 years — commodity export surge + COVID collapse in service imports.</li>
</ul>
<p><strong>Equitable Income Distribution:</strong></p>
<ul>
  <li>Measured by Gini coefficient (Australia ≈ 0.33 post-tax and transfers).</li>
  <li>Market income inequality is high; Australia's tax and welfare system moderates this.</li>
  <li>Key policy tools: progressive income tax, Medicare, social security (Jobseeker, Age Pension), superannuation.</li>
</ul>
<p><strong>Environmental Sustainability:</strong></p>
<ul>
  <li>Growth must not deplete natural capital at a rate faster than it can be replenished.</li>
  <li>Key policies: carbon price/Safeguard Mechanism, Renewable Energy Target, National Greenhouse and Energy Reporting.</li>
</ul>`,
      },
    ],
  },
  {
    id: "objective-conflicts",
    title: "Conflicts Between Objectives",
    icon: "Swords",
    color: "from-red-500 to-rose-600",
    accent: "red",
    description: "Why economic objectives often conflict and how policymakers manage trade-offs.",
    causeEffect: "Pursuing one objective (e.g., low inflation) via tight monetary policy → may conflict with growth and employment objectives → requires careful policy calibration.",
    examLink: "Essential for 'evaluate' and 'to what extent' questions. Always acknowledge trade-offs between economic objectives in essays.",
    glossaryTerms: ["Phillips curve", "stagflation", "trade-off", "opportunity cost", "twin deficits"],
    subsections: [
      {
        id: "objective-conflicts-1",
        title: "Growth vs Inflation (Phillips Curve)",
        content: `<p>The most fundamental conflict in macroeconomics is between <strong>economic growth/employment</strong> and <strong>price stability</strong>.</p>
<p>The <strong>Phillips Curve</strong> illustrates an inverse relationship between the unemployment rate and inflation rate:</p>
<ul>
  <li>When the economy grows rapidly (unemployment falls below NAIRU) → wages rise → cost pressures → demand increases → inflation rises.</li>
  <li>To control inflation, the RBA raises interest rates → reduces spending → slows growth → unemployment rises.</li>
</ul>
<p><strong>Stagflation</strong>: The breakdown of the Phillips curve in the 1970s (when both inflation AND unemployment rose) showed the relationship is not stable. Supply shocks (oil prices) can cause cost-push inflation even in a weak economy.</p>
<p><strong>Modern context (2022–24)</strong>: Post-COVID, Australia faced a dilemma — needed to raise rates to control 7.8% inflation, but risked causing a recession and unemployment spike. The RBA attempted a "soft landing" — returning inflation to target without recession.</p>`,
      },
      {
        id: "objective-conflicts-2",
        title: "Growth vs External Stability",
        content: `<p>Strong economic growth can conflict with external stability:</p>
<ul>
  <li>Rapid economic growth → higher imports (Australian consumers and businesses buy more foreign goods and machinery).</li>
  <li>Higher imports → larger trade deficit → larger current account deficit (CAD).</li>
  <li>A widening CAD requires larger net capital inflows → increases net foreign liabilities → interest and dividend outflows grow (worsening net primary income deficit).</li>
</ul>
<p><strong>Twin deficits hypothesis</strong>: Budget deficit + current account deficit tend to occur together, because government borrowing draws in foreign capital and raises the exchange rate, which reduces export competitiveness.</p>
<p><strong>But</strong>: If Australia's CAD primarily reflects business investment (not consumption) — e.g., mining investment in the 2000s boom — it may be self-liquidating, as the new capital generates future export income. This is why the nature of the CAD matters, not just its size.</p>`,
      },
      {
        id: "objective-conflicts-3",
        title: "Growth vs Equality and Environment",
        content: `<p><strong>Growth vs Equality:</strong></p>
<ul>
  <li>Economic growth often produces unequal income gains — higher-skilled workers and capital owners benefit disproportionately (Kuznets curve hypothesis).</li>
  <li>Pro-growth policies like company tax cuts or deregulation may reduce inequality-reducing government spending.</li>
  <li>However, strong growth also generates government revenue that funds social programs.</li>
  <li>The relationship is complex: some studies find that high inequality actually constrains long-run growth (IMF research).</li>
</ul>
<p><strong>Growth vs Environment:</strong></p>
<ul>
  <li>Economic growth → greater production and consumption → resource depletion and pollution.</li>
  <li>However, the <strong>Environmental Kuznets Curve</strong> hypothesis suggests that beyond a certain income level, growth eventually leads to cleaner production as consumers demand better environmental quality.</li>
  <li>Green growth / sustainable development: Policies that decouple economic activity from environmental damage — renewables, energy efficiency, circular economy.</li>
</ul>
<p><strong>Policy dilemma</strong>: Rapid reduction of coal/fossil fuels may slow growth and displace jobs (negative short-term) but is necessary for long-run sustainable development.</p>`,
      },
    ],
  },
  {
    id: "macroeconomic-policy",
    title: "Macroeconomic Policy Framework",
    icon: "Sliders",
    color: "from-blue-500 to-cyan-600",
    accent: "blue",
    description: "The aggregate demand and supply framework for understanding macroeconomic policy.",
    causeEffect: "Changes in aggregate demand (via fiscal or monetary policy) → short-run changes in output and price level → movement along or shift of SRAS → long-run adjustment back to potential output.",
    examLink: "Draw and annotate AD/AS diagrams in answers. Show how fiscal and monetary policies shift AD. Explain short-run vs long-run effects.",
    glossaryTerms: ["aggregate demand", "aggregate supply", "AD/AS model", "output gap", "potential GDP", "business cycle"],
    subsections: [
      {
        id: "macroeconomic-policy-1",
        title: "The AD/AS Framework",
        content: `<p>The <strong>Aggregate Demand / Aggregate Supply (AD/AS)</strong> model is the core framework for analysing macroeconomic policy.</p>
<p><strong>Aggregate Demand (AD)</strong>: Total spending in the economy = C + I + G + (X - M)</p>
<ul>
  <li>Slopes downward: higher price level → reduced purchasing power + higher interest rates + exports less competitive → lower quantity of real output demanded.</li>
  <li><strong>Shifts right</strong>: fiscal stimulus (more G), monetary easing (lower rates → more C and I), rising consumer confidence.</li>
  <li><strong>Shifts left</strong>: higher taxes, higher interest rates, falling confidence.</li>
</ul>
<p><strong>Aggregate Supply (AS)</strong>:</p>
<ul>
  <li><strong>Short-run AS (SRAS)</strong>: Upward sloping — as price level rises, firms supply more (wages and input costs are sticky in the short run).</li>
  <li><strong>Long-run AS (LRAS)</strong>: Vertical at potential GDP — in the long run, output is determined by resources and technology, not price level.</li>
</ul>
<p><strong>Macroeconomic equilibrium</strong>: Where AD = SRAS. Macroeconomic policy shifts AD; microeconomic policy shifts LRAS (expands productive capacity).</p>`,
      },
      {
        id: "macroeconomic-policy-2",
        title: "The Business Cycle and Output Gap",
        content: `<p>The <strong>business cycle</strong> describes the natural fluctuations of economic activity around trend (potential) GDP:</p>
<ul>
  <li><strong>Expansion/boom</strong>: GDP above trend, unemployment falling, inflation rising.</li>
  <li><strong>Peak</strong>: Maximum output, tight labour market, inflation rising.</li>
  <li><strong>Contraction/recession</strong>: GDP falls (two consecutive quarters of negative growth = technical recession), unemployment rises, inflation falls.</li>
  <li><strong>Trough</strong>: Minimum output, high unemployment, deflation risk.</li>
</ul>
<p><strong>Output gap</strong> = actual GDP − potential GDP</p>
<ul>
  <li><strong>Positive output gap</strong>: Economy operating above capacity → inflationary pressure → contractionary policy needed.</li>
  <li><strong>Negative output gap</strong>: Economy below capacity → unemployment → expansionary policy needed.</li>
</ul>
<p><strong>Automatic stabilisers</strong>: Built-in features of fiscal policy that moderate business cycle fluctuations automatically — progressive taxes (fall in recession, rise in boom) and welfare payments (rise in recession, fall in boom) — without requiring active policy decisions.</p>`,
      },
      {
        id: "macroeconomic-policy-3",
        title: "Transmission Mechanisms",
        content: `<p>Policy works through <strong>transmission mechanisms</strong> — the channels through which policy changes affect the real economy:</p>
<p><strong>Interest rate channel</strong>: RBA lowers cash rate → banks lower mortgage and business loan rates → households spend more (less incentive to save) → businesses invest more → AD rises.</p>
<p><strong>Asset price channel</strong>: Lower rates → rise in asset prices (shares, housing) → households feel wealthier → increase consumption (wealth effect).</p>
<p><strong>Exchange rate channel</strong>: Lower rates → capital outflows → AUD depreciates → exports cheaper + imports dearer → net exports rise → AD rises.</p>
<p><strong>Credit channel</strong>: Lower rates → banks lend more freely → credit expansion → more business investment and household spending.</p>
<p><strong>Fiscal multiplier</strong>: Government spending of $1 → income to recipients → they spend a fraction → income to others → eventual total increase in GDP = $1 × (1 / (1 - MPC)). Higher MPC = larger multiplier. In practice, multiplier ~0.5–1.5 depending on context.</p>`,
      },
    ],
  },
  {
    id: "fiscal-policy",
    title: "Fiscal Policy",
    icon: "Building",
    color: "from-emerald-500 to-teal-600",
    accent: "emerald",
    description: "Government revenue and spending decisions and their impact on the economy.",
    causeEffect: "Government changes taxes or spending → changes in aggregate demand → multiplier effect on output and employment → changes in budget balance affect government debt levels.",
    examLink: "Explain fiscal stance (expansionary/contractionary), budget outcome, automatic stabilisers, and multiplier effect. Link to objectives.",
    glossaryTerms: ["budget surplus", "budget deficit", "fiscal stimulus", "automatic stabilisers", "discretionary fiscal policy", "fiscal multiplier", "structural deficit", "cyclical deficit"],
    subsections: [
      {
        id: "fiscal-policy-1",
        title: "Components of Fiscal Policy",
        content: `<p><strong>Fiscal policy</strong> refers to the use of government spending, taxation, and borrowing to influence aggregate demand and the distribution of income.</p>
<p><strong>Revenue (taxation):</strong></p>
<ul>
  <li>Personal income tax (largest revenue source in Australia — ~50% of total tax revenue).</li>
  <li>Company tax (30% standard rate; 25% for small business).</li>
  <li>GST (10% — shared with states).</li>
  <li>Excise taxes (fuel, alcohol, tobacco).</li>
  <li>Capital gains tax (CGT).</li>
</ul>
<p><strong>Government spending:</strong></p>
<ul>
  <li>Current expenditure: Welfare payments (Age Pension, NDIS, Jobseeker), health (Medicare), education, defence.</li>
  <li>Capital expenditure: Infrastructure investment (roads, rail, NBN) — raises long-run productive capacity.</li>
</ul>
<p><strong>Budget outcome:</strong></p>
<ul>
  <li>Budget surplus: Revenue > Spending → contractionary, reduces government debt.</li>
  <li>Budget deficit: Spending > Revenue → expansionary, increases government debt.</li>
  <li>Balanced budget: Revenue = Spending.</li>
</ul>`,
      },
      {
        id: "fiscal-policy-2",
        title: "Fiscal Policy Stance",
        content: `<p><strong>Expansionary fiscal policy:</strong></p>
<ul>
  <li>Increase government spending and/or cut taxes → raises aggregate demand → raises output and employment → suitable during recession.</li>
  <li>Example: COVID-19 stimulus — JobKeeper ($89bn), JobSeeker boost, HomeBuilder, cash flow boost. Australian budget swung from near-surplus to deficit of 4.3% of GDP in 2020–21.</li>
</ul>
<p><strong>Contractionary fiscal policy:</strong></p>
<ul>
  <li>Cut spending and/or raise taxes → reduces aggregate demand → reduces inflationary pressure → suitable in a boom.</li>
  <li>Example: Budget repair post-GFC — spending cuts and bracket creep returning budgets toward surplus 2013–2019.</li>
</ul>
<p><strong>Structural vs cyclical budget balance:</strong></p>
<ul>
  <li><strong>Cyclical deficit/surplus</strong>: The component that changes automatically with the business cycle — automatic stabilisers.</li>
  <li><strong>Structural deficit/surplus</strong>: The underlying balance if the economy were at full employment — reflects discretionary policy decisions.</li>
  <li>Treasury strips out the cyclical component to assess the "true" fiscal stance.</li>
</ul>`,
      },
      {
        id: "fiscal-policy-3",
        title: "Recent Australian Fiscal Policy",
        content: `<p><strong>COVID-19 response (2020–21):</strong></p>
<ul>
  <li>Massive fiscal stimulus — largest peacetime government spending in Australian history.</li>
  <li>JobKeeper: $89bn wage subsidy to 3.5 million workers — unprecedented scale.</li>
  <li>Budget deficit: -$134bn in 2020–21 (approximately 6% of GDP).</li>
  <li>Government gross debt rose to ~50% of GDP (still low by international standards — Japan ~260%, US ~130%).</li>
</ul>
<p><strong>Budget repair and surplus (2022–24):</strong></p>
<ul>
  <li>Labour government (elected 2022) inherited deficits but benefited from commodity export boom and strong employment (high tax revenues, low welfare spending).</li>
  <li>2022–23 Budget returned to surplus of +$22bn (first surplus in 15 years).</li>
  <li>2023–24 Budget: second consecutive surplus of +$9.3bn.</li>
  <li>Despite surpluses, structural budget pressures remain: NDIS, defence spending, aged care, interest on debt.</li>
</ul>
<p><strong>Fiscal challenges ahead:</strong> Ageing population → rising healthcare and aged care costs → requires either higher taxes or reduced spending elsewhere (intergenerational equity issue).</p>`,
      },
    ],
  },
  {
    id: "monetary-policy",
    title: "Monetary Policy",
    icon: "Percent",
    color: "from-amber-500 to-yellow-600",
    accent: "amber",
    description: "The Reserve Bank of Australia's tools and their economic effects.",
    causeEffect: "RBA changes cash rate → affects bank lending rates → changes in borrowing costs for households and firms → changes in consumption and investment → changes in aggregate demand → impacts on growth, employment and inflation.",
    examLink: "Explain the monetary policy transmission mechanism. Evaluate effectiveness of rate changes. Reference RBA's inflation target (2-3%).",
    glossaryTerms: ["cash rate", "RBA", "inflation target", "transmission mechanism", "open market operations", "quantitative easing", "unconventional monetary policy"],
    subsections: [
      {
        id: "monetary-policy-1",
        title: "How Monetary Policy Works",
        content: `<p><strong>Monetary policy</strong> refers to the Reserve Bank of Australia's (RBA) management of interest rates and credit conditions to achieve its objectives of price stability, full employment, and economic prosperity.</p>
<p><strong>The RBA's objectives (Section 10 of RBA Act):</strong></p>
<ul>
  <li>Stability of the Australian currency.</li>
  <li>Maintenance of full employment.</li>
  <li>Economic prosperity and welfare of Australians.</li>
</ul>
<p>In practice, the RBA implements its objective through an <strong>inflation target of 2–3% CPI on average over the cycle</strong> (since 1993).</p>
<p><strong>The cash rate:</strong></p>
<ul>
  <li>The overnight interest rate at which banks lend to each other in the interbank market.</li>
  <li>Changed through <strong>open market operations</strong> — RBA buys/sells government securities to adjust the supply of funds in the interbank market.</li>
  <li>Changes to the cash rate flow through to mortgage rates, business loan rates, and term deposit rates within weeks.</li>
</ul>`,
      },
      {
        id: "monetary-policy-2",
        title: "Transmission Mechanism in Detail",
        content: `<p>When the RBA <strong>lowers the cash rate</strong> (expansionary monetary policy):</p>
<ol style="padding-left:1.5rem; list-style:decimal; color:inherit;">
  <li>Banks lower their lending rates (mortgages, business loans, credit cards).</li>
  <li>Households with variable-rate mortgages pay less interest → have more discretionary income → increase consumption (C).</li>
  <li>Lower borrowing costs → businesses more willing to invest (I) in new capital.</li>
  <li>Lower rates → AUD depreciates → exports more competitive → net exports (X-M) rise.</li>
  <li>Lower rates → asset prices rise (shares, housing) → wealth effect → more spending.</li>
  <li>Higher AD → firms increase output → employment rises → incomes rise → further spending.</li>
</ol>
<p>The reverse applies when the RBA <strong>raises the cash rate</strong> (contractionary monetary policy) to cool inflation.</p>
<p><strong>Lag effects</strong>: Monetary policy operates with long and variable lags — interest rate changes may take 12–18 months to fully affect output and inflation. This makes it difficult to calibrate policy precisely.</p>`,
      },
      {
        id: "monetary-policy-3",
        title: "Recent Monetary Policy: COVID and Inflation",
        content: `<p><strong>COVID-19 response (2020–21):</strong></p>
<ul>
  <li>RBA cut cash rate to historic low of <strong>0.10%</strong> (March 2020).</li>
  <li>Introduced <strong>unconventional monetary policy</strong>:
    <ul>
      <li><strong>Quantitative Easing (QE)</strong>: Purchased $281bn of government bonds → lowered long-term yields → pushed down fixed mortgage rates.</li>
      <li><strong>Term Funding Facility (TFF)</strong>: Offered cheap 3-year funding to banks at 0.1% → supported business lending.</li>
      <li><strong>Yield Curve Control (YCC)</strong>: Targeted 3-year government bond yield at 0.1% — abandoned in November 2021.</li>
    </ul>
  </li>
</ul>
<p><strong>Inflation fighting cycle (2022–24):</strong></p>
<ul>
  <li>CPI peaked at 7.8% (December 2022) — 32-year high.</li>
  <li>RBA raised cash rate from 0.10% to <strong>4.35%</strong> between May 2022 and November 2023 — 425 basis point increase across 13 hikes.</li>
  <li>Fastest and largest tightening cycle since the early 1990s recession.</li>
  <li>By late 2024, inflation returned toward the 2–3% target, and the RBA began cutting rates.</li>
</ul>`,
      },
    ],
  },
  {
    id: "fiscal-vs-monetary",
    title: "Fiscal vs Monetary Policy",
    icon: "GitCompare",
    color: "from-indigo-500 to-blue-700",
    accent: "indigo",
    description: "Comparing and contrasting fiscal and monetary policy — strengths, weaknesses, and coordination.",
    causeEffect: "Policy coordination between Treasury (fiscal) and RBA (monetary) → avoid offsetting effects and maximise economic stability, though institutional independence of RBA limits explicit coordination.",
    examLink: "A key higher-order question. Compare instruments, lags, flexibility, political constraints. Evaluate which is more effective in different circumstances.",
    glossaryTerms: ["fiscal policy", "monetary policy", "policy coordination", "crowding out", "implementation lag", "recognition lag", "policy independence"],
    subsections: [
      {
        id: "fiscal-vs-monetary-1",
        title: "Comparing the Two Policies",
        content: `<table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
  <thead>
    <tr style="background:#1e3a5f; color:#94c5f8;">
      <th style="padding:8px; text-align:left; border:1px solid #334155;">Feature</th>
      <th style="padding:8px; text-align:left; border:1px solid #334155;">Fiscal Policy</th>
      <th style="padding:8px; text-align:left; border:1px solid #334155;">Monetary Policy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:8px; border:1px solid #334155;"><strong>Authority</strong></td>
      <td style="padding:8px; border:1px solid #334155;">Federal Government / Treasury</td>
      <td style="padding:8px; border:1px solid #334155;">Reserve Bank of Australia</td>
    </tr>
    <tr>
      <td style="padding:8px; border:1px solid #334155;"><strong>Key instrument</strong></td>
      <td style="padding:8px; border:1px solid #334155;">Taxes, government spending</td>
      <td style="padding:8px; border:1px solid #334155;">Cash rate (interest rates)</td>
    </tr>
    <tr>
      <td style="padding:8px; border:1px solid #334155;"><strong>Speed of decision</strong></td>
      <td style="padding:8px; border:1px solid #334155;">Slow — requires political process, budget</td>
      <td style="padding:8px; border:1px solid #334155;">Fast — RBA Board meets monthly</td>
    </tr>
    <tr>
      <td style="padding:8px; border:1px solid #334155;"><strong>Implementation lag</strong></td>
      <td style="padding:8px; border:1px solid #334155;">Long — spending programs take time to roll out</td>
      <td style="padding:8px; border:1px solid #334155;">Short — rate changes flow through quickly</td>
    </tr>
    <tr>
      <td style="padding:8px; border:1px solid #334155;"><strong>Impact lag</strong></td>
      <td style="padding:8px; border:1px solid #334155;">Moderate — multiplier effect builds over time</td>
      <td style="padding:8px; border:1px solid #334155;">Long — 12–18 months for full effect</td>
    </tr>
    <tr>
      <td style="padding:8px; border:1px solid #334155;"><strong>Distributional effects</strong></td>
      <td style="padding:8px; border:1px solid #334155;">Direct — can target specific groups</td>
      <td style="padding:8px; border:1px solid #334155;">Blunt — affects all borrowers/savers</td>
    </tr>
    <tr>
      <td style="padding:8px; border:1px solid #334155;"><strong>Political independence</strong></td>
      <td style="padding:8px; border:1px solid #334155;">Politically constrained — elections influence decisions</td>
      <td style="padding:8px; border:1px solid #334155;">Independent — RBA free from political pressure</td>
    </tr>
  </tbody>
</table>`,
      },
      {
        id: "fiscal-vs-monetary-2",
        title: "Strengths and Weaknesses",
        content: `<p><strong>Strengths of monetary policy:</strong></p>
<ul>
  <li>Rapid decision-making — RBA Board meets monthly and can act quickly.</li>
  <li>Politically independent — avoids short-term electoral bias.</li>
  <li>Flexible — can be reversed easily if conditions change.</li>
  <li>Consistent — inflation target provides credibility and anchors expectations.</li>
</ul>
<p><strong>Weaknesses of monetary policy:</strong></p>
<ul>
  <li>Long impact lag (12–18 months) — risk of over- or under-tightening.</li>
  <li>Zero lower bound: cannot cut rates below zero in practice (though unconventional tools help).</li>
  <li>Blunt instrument — affects all sectors equally (housing more sensitive than business investment).</li>
  <li>Limited when confidence is very low ("pushing on a string" — liquidity trap).</li>
</ul>
<p><strong>Strengths of fiscal policy:</strong></p>
<ul>
  <li>Can directly target specific sectors and income groups.</li>
  <li>Automatic stabilisers work immediately without active decisions.</li>
  <li>In a zero lower bound environment, fiscal stimulus may be more effective.</li>
</ul>
<p><strong>Weaknesses of fiscal policy:</strong></p>
<ul>
  <li>Long implementation lags — infrastructure projects may take years to design, approve and build.</li>
  <li>Political constraints — elections, vested interests, public opposition to cuts.</li>
  <li><strong>Crowding out</strong>: Government borrowing may raise interest rates, displacing private investment.</li>
  <li>Debt accumulation: Persistent deficits raise government debt, increasing future interest obligations.</li>
</ul>`,
      },
      {
        id: "fiscal-vs-monetary-3",
        title: "Policy Coordination",
        content: `<p>In practice, fiscal and monetary policy must be <strong>coordinated</strong> to avoid working at cross-purposes:</p>
<ul>
  <li>If the government runs an expansionary fiscal policy (deficit) while the RBA is trying to control inflation with higher rates → fiscal policy undermines monetary policy, and rates may need to go higher.</li>
  <li>Post-COVID example: Government fiscal support remained generous in 2022 as RBA was rapidly raising rates to control inflation — some economists argued fiscal consolidation should have been faster to support monetary policy.</li>
</ul>
<p><strong>Institutional separation:</strong></p>
<ul>
  <li>The RBA is legally independent — this is intentional to prevent governments from pressuring the RBA to keep rates low for electoral gain.</li>
  <li>The Statement on the Conduct of Monetary Policy (agreed between Treasurer and RBA Governor) sets out the shared objectives and ensures coordination while preserving independence.</li>
</ul>
<p><strong>General conclusion</strong>: Monetary policy is the primary macroeconomic stabilisation tool in Australia (fast, flexible, independent). Fiscal policy plays an important automatic stabilising role and is used for targeted stimulus in severe downturns (e.g., GFC, COVID). Both must be coordinated for best results.</p>`,
      },
    ],
  },
  {
    id: "microeconomic-policy",
    title: "Microeconomic Policy",
    icon: "Cpu",
    color: "from-cyan-600 to-teal-700",
    accent: "cyan",
    description: "Supply-side reforms to improve efficiency, productivity, and long-run growth.",
    causeEffect: "Structural inefficiencies in markets → microeconomic reform → improved resource allocation, productivity growth → rightward shift in LRAS → higher potential GDP without inflation.",
    examLink: "Distinguish microeconomic from macroeconomic policy. Evaluate specific reforms (competition policy, deregulation, privatisation, trade liberalisation) and their effects on productivity.",
    glossaryTerms: ["microeconomic reform", "productivity", "competition policy", "deregulation", "privatisation", "structural reform", "ACCC", "national competition policy"],
    subsections: [
      {
        id: "microeconomic-policy-1",
        title: "What is Microeconomic Policy?",
        content: `<p><strong>Microeconomic policy</strong> (also called structural or supply-side policy) refers to government policies that improve the efficiency of individual markets and firms, thereby raising the economy's productive capacity.</p>
<p><strong>Key distinction from macroeconomic policy:</strong></p>
<ul>
  <li>Macroeconomic policy manages demand fluctuations (short-run stabilisation).</li>
  <li>Microeconomic policy expands the supply side — shifts the LRAS rightward, raising potential GDP without causing inflation.</li>
</ul>
<p><strong>Why is it needed?</strong></p>
<ul>
  <li>Markets may be inefficient due to: natural monopolies, imperfect competition, information failures, externalities, labour market rigidities, government-imposed regulations.</li>
  <li>Australia's productivity growth slowed significantly from 2003 onward — the 1990s reform dividend exhausted, creating pressure for a new wave of reform.</li>
</ul>
<p><strong>Areas of microeconomic reform:</strong> Competition policy, trade liberalisation, financial deregulation, privatisation, labour market reform, education and training, infrastructure investment, innovation policy.</p>`,
      },
      {
        id: "microeconomic-policy-2",
        title: "Competition Policy",
        content: `<p><strong>Competition policy</strong> promotes competitive markets to improve efficiency and consumer welfare.</p>
<p><strong>National Competition Policy (NCP) reforms (1995):</strong></p>
<ul>
  <li>Hilmer Report recommended extending competitive principles across the economy.</li>
  <li>Government business enterprises (GBEs) subjected to competitive neutrality — they could no longer rely on government monopoly status.</li>
  <li>Led to privatisation of Telstra, Commonwealth Bank, Qantas, and other GBEs.</li>
  <li>Opened electricity, gas, water, and transport sectors to competition.</li>
  <li>Productivity Commission estimates NCP reforms added 2.5% to GDP.</li>
</ul>
<p><strong>The ACCC (Australian Competition and Consumer Commission):</strong></p>
<ul>
  <li>Enforces the Competition and Consumer Act 2010.</li>
  <li>Prohibits anti-competitive conduct: price-fixing, market sharing, misuse of market power, mergers that substantially lessen competition.</li>
  <li>Reviews significant mergers — recent focus on digital platforms (Google, Meta, Apple).</li>
</ul>
<p><strong>Current competition challenges:</strong> Digital platforms with network effects create natural monopolies. The Digital Platform Services Inquiry examined dominance of Google (search), Facebook (social media), and Apple/Google (mobile app stores).</p>`,
      },
      {
        id: "microeconomic-policy-3",
        title: "Other Microeconomic Reforms",
        content: `<p><strong>Trade Liberalisation:</strong></p>
<ul>
  <li>Reducing tariffs exposed Australian industries to international competition → forced efficiency improvements or exit.</li>
  <li>Manufacturing tariffs fell from 25%+ in the 1970s to near zero by 2000s.</li>
  <li>Estimated to have raised living standards by 5–8% (Productivity Commission).</li>
</ul>
<p><strong>Financial deregulation (1980s):</strong></p>
<ul>
  <li>Float of AUD (1983), removal of interest rate controls, entry of foreign banks.</li>
  <li>Increased efficiency of capital allocation; but also contributed to financial instability risks.</li>
</ul>
<p><strong>Infrastructure investment:</strong></p>
<ul>
  <li>Physical infrastructure (roads, ports, rail, broadband) reduces business costs, improves connectivity.</li>
  <li>Australia Infrastructure Plan identifies $120bn+ in needed projects.</li>
</ul>
<p><strong>Innovation and R&D policy:</strong></p>
<ul>
  <li>R&D Tax Incentive: 43.5% tax offset for R&D expenditure by SMEs.</li>
  <li>National Reconstruction Fund: $15bn to support domestic manufacturing and technological capabilities.</li>
  <li>Future Made in Australia: Targeted industrial policy to build clean energy and critical minerals sectors.</li>
</ul>`,
      },
    ],
  },
  {
    id: "labour-market-policy",
    title: "Labour Market Policy",
    icon: "Users",
    color: "from-violet-500 to-indigo-600",
    accent: "violet",
    description: "Wage determination, industrial relations, and policies to improve labour market efficiency.",
    causeEffect: "Labour market institutions (minimum wages, awards, enterprise bargaining) + active labour policies → affect employment levels, wage growth, productivity, and income distribution.",
    examLink: "Explain how wage-fixing arrangements affect employment and inflation. Evaluate the Fair Work Act. Analyse unemployment types and matching policies.",
    glossaryTerms: ["unemployment", "minimum wage", "Fair Work Act", "enterprise bargaining", "Award wages", "NAIRU", "labour productivity", "active labour market policy"],
    subsections: [
      {
        id: "labour-market-policy-1",
        title: "Australia's Wage-Setting System",
        content: `<p>Australia has a unique <strong>centralised wage-setting system</strong> with multiple tiers:</p>
<p><strong>1. National Minimum Wage:</strong></p>
<ul>
  <li>Set annually by the Fair Work Commission (FWC) — currently ~$24/hour (2024).</li>
  <li>Applies as a floor: no worker can be paid less.</li>
</ul>
<p><strong>2. Modern Awards:</strong></p>
<ul>
  <li>Industry or occupation-specific minimum pay rates and conditions set by the FWC.</li>
  <li>Cover approximately 20% of workers (those not covered by enterprise agreements).</li>
</ul>
<p><strong>3. Enterprise Bargaining Agreements (EBAs):</strong></p>
<ul>
  <li>Collective agreements negotiated between employers and employees (often through unions).</li>
  <li>Must pass the "better off overall test" (BOOT) — employees must be better off than under the relevant Award.</li>
  <li>Approximately 40% of workers are covered by EBAs.</li>
</ul>
<p><strong>4. Individual contracts:</strong></p>
<ul>
  <li>Particularly common for high-income professional employees negotiating above-Award rates.</li>
</ul>`,
      },
      {
        id: "labour-market-policy-2",
        title: "Unemployment and Active Labour Policy",
        content: `<p><strong>Types of unemployment and policy responses:</strong></p>
<ul>
  <li><strong>Cyclical unemployment</strong> (demand deficiency): Economy in recession → expansionary macro policy (fiscal/monetary stimulus) → raises AD → creates jobs.</li>
  <li><strong>Structural unemployment</strong> (skills mismatch, technological change): Retraining and education programs, relocation assistance, career counselling. Example: Coal miners retraining for renewable energy jobs.</li>
  <li><strong>Frictional unemployment</strong> (between jobs): Better job matching (employment services like Workforce Australia), improved information flows. Some is natural and efficient.</li>
</ul>
<p><strong>Active Labour Market Policies (ALMPs):</strong></p>
<ul>
  <li>Job placement services and employment databases.</li>
  <li>Skills training and VET (Vocational Education and Training) programs — Free TAFE initiative expanded access.</li>
  <li>Wage subsidies for hiring long-term unemployed workers.</li>
  <li>Work for the Dole programs (controversial — limited effectiveness evidence).</li>
  <li>Mutual obligation requirements for Jobseeker recipients.</li>
</ul>
<p><strong>Jobseeker (formerly Newstart)</strong>: Australia's main unemployment benefit — raised from $565/fortnight to $668/fortnight in 2021 after decades of advocacy. Many argue it remains too low relative to minimum wages.</p>`,
      },
      {
        id: "labour-market-policy-3",
        title: "Industrial Relations Reform",
        content: `<p><strong>History of Australian IR reform:</strong></p>
<ul>
  <li><strong>Prices and Incomes Accord (1983–1996)</strong>: Agreement between Labor government and ACTU — unions accepted wage restraint in exchange for "social wage" improvements (Medicare, superannuation). Helped reduce inflation and unemployment.</li>
  <li><strong>Enterprise bargaining (1991+)</strong>: Hawke/Keating government decentralised wage-setting from centralised arbitration to workplace-level bargaining — major structural reform.</li>
  <li><strong>WorkChoices (2006, Howard)</strong>: Further decentralisation, weakened unfair dismissal protections, reduced award safety net — controversial, politically damaging.</li>
  <li><strong>Fair Work Act (2009, Rudd)</strong>: Restored balance — modern awards, good faith bargaining, unfair dismissal protections, new tribunal (FWC).</li>
  <li><strong>Closing Loopholes Acts (2023–24, Albanese)</strong>: Extended casual conversion rights, right to disconnect, introduced regulated labour hire provisions.</li>
</ul>
<p><strong>Labour productivity</strong>: Output per hour worked — Australia's labour productivity growth has slowed since 2004. Improving it requires: better technology, skills development, work practices, and management quality. Higher productivity allows real wage growth without inflation.</p>`,
      },
    ],
  },
  {
    id: "environmental-management",
    title: "Environmental Management Policy",
    icon: "Leaf",
    color: "from-green-500 to-teal-600",
    accent: "green",
    description: "Government policies to address environmental market failures and promote sustainability.",
    causeEffect: "Negative environmental externalities (pollution, carbon emissions) → market failure → government policy intervention → internalise social costs → reduce environmental damage while minimising economic disruption.",
    examLink: "Apply market failure theory (externalities). Evaluate specific policies (carbon tax, ETS, regulations). Link to economic objectives — sustainability vs growth trade-off.",
    glossaryTerms: ["externality", "carbon tax", "emissions trading", "Safeguard Mechanism", "polluter pays", "market-based instruments", "command and control"],
    subsections: [
      {
        id: "environmental-management-1",
        title: "Environmental Market Failure",
        content: `<p>Environmental problems arise because markets fail to account for the full social cost of production and consumption.</p>
<p><strong>Negative externality</strong>: A cost imposed on third parties without compensation. Examples: air pollution from factories, carbon emissions from energy production, water contamination from agriculture.</p>
<p><strong>The problem</strong>: Without policy intervention, private producers consider only their private costs, not social costs → overproduce goods that generate pollution → market overproduces at Q_market instead of socially optimal Q*.</p>
<p><strong>Solutions</strong>: Government intervention to make private costs equal social costs — "internalise the externality".</p>
<p><strong>Public goods problem</strong>: Clean air, biodiversity, and climate stability are public goods (non-excludable, non-rival) — markets will not provide adequate protection without government intervention.</p>
<p><strong>Scale of challenge</strong>: The Stern Review (2006) estimated the cost of unaddressed climate change at 5–20% of global GDP — the greatest market failure in history.</p>`,
      },
      {
        id: "environmental-management-2",
        title: "Policy Instruments",
        content: `<p><strong>Market-based instruments (preferred by economists):</strong></p>
<ul>
  <li><strong>Carbon tax</strong>: Directly prices carbon emissions per tonne of CO₂ — incentivises least-cost emission reductions. Australia's Clean Energy Act (2012) introduced a $23/tonne carbon price. Repealed 2014 by Abbott government.</li>
  <li><strong>Emissions Trading Scheme (ETS)</strong>: Sets a cap on total emissions; firms buy/sell permits. EU ETS is the world's largest. Australia's Safeguard Mechanism (expanded 2023) requires Australia's largest industrial emitters to reduce emissions within "baselines" — excess can be offset by buying credits.</li>
  <li><strong>Renewable Energy Certificates (RECs)</strong>: Tradeable certificates for renewable energy generation — support investment in wind, solar.</li>
</ul>
<p><strong>Command and control (regulatory) approaches:</strong></p>
<ul>
  <li>Emission standards for vehicles and power plants.</li>
  <li>Energy efficiency standards for appliances and buildings.</li>
  <li>Bans on single-use plastics, industrial pollutants (e.g., CFCs via Montreal Protocol).</li>
</ul>
<p><strong>Government spending (subsidies):</strong></p>
<ul>
  <li>Renewable energy subsidies (small-scale solar rebates, ARENA funding for clean energy R&D).</li>
  <li>Capacity Investment Scheme: Government underwriting of renewable energy projects to accelerate transition.</li>
</ul>`,
      },
      {
        id: "environmental-management-3",
        title: "Australian Climate Policy",
        content: `<p><strong>Australia's emissions profile:</strong></p>
<ul>
  <li>Australia is one of the highest per-capita emitters in the world.</li>
  <li>Key sources: electricity (coal), agriculture (methane), transport (fuel), mining.</li>
  <li>Australia is simultaneously a major exporter of fossil fuels (coal, LNG) — creating a tension between domestic emissions reductions and export revenues.</li>
</ul>
<p><strong>Key policies:</strong></p>
<ul>
  <li><strong>Renewable Energy Target (RET)</strong>: Required electricity retailers to source a minimum % from renewables — drove major wind and solar investment. Large-scale RET achieved ahead of schedule.</li>
  <li><strong>Safeguard Mechanism (enhanced 2023)</strong>: Australia's 215 largest industrial sites (responsible for 28% of emissions) must reduce emissions to net zero by 2050 with annual declining baselines.</li>
  <li><strong>Capacity Investment Scheme</strong>: Government underwrites 32 GW of new renewable capacity by 2030.</li>
  <li><strong>Carbon offset market (ACCUs)</strong>: Australian Carbon Credit Units — businesses can offset emissions by funding carbon sequestration projects (land, reforestation).</li>
</ul>
<p><strong>Australia's targets:</strong> 43% reduction in emissions from 2005 levels by 2030; net zero by 2050. Progress: emissions have fallen ~24% from 2005 peak (as of 2023), mainly from electricity sector reforms.</p>`,
      },
    ],
  },
  {
    id: "policy-effectiveness",
    title: "Policy Effectiveness",
    icon: "CheckCircle",
    color: "from-emerald-600 to-green-700",
    accent: "emerald",
    description: "Evaluating how well Australian economic policies have achieved their objectives.",
    causeEffect: "Policy design + implementation quality + external conditions → determine whether policies achieve intended objectives → effectiveness varies by policy type, timing, and economic context.",
    examLink: "Use specific Australian examples with data to evaluate effectiveness. Always address BOTH successes AND limitations. Write nuanced judgements.",
    glossaryTerms: ["effectiveness", "transmission lag", "policy credibility", "unintended consequences", "counterfactual"],
    subsections: [
      {
        id: "policy-effectiveness-1",
        title: "Evaluating Fiscal Policy Effectiveness",
        content: `<p><strong>Evidence of fiscal policy effectiveness:</strong></p>
<ul>
  <li><strong>GFC response (2008–09)</strong>: Australia was one of very few developed economies to avoid recession — $52bn fiscal stimulus (cash handouts, school building program, social housing) contributed to growth remaining positive. Economists widely credit fiscal stimulus.</li>
  <li><strong>COVID response (2020)</strong>: JobKeeper supported ~3.5 million workers, preventing unemployment from reaching forecast 10%+. Actual peak was ~7.5% (much lower than feared). $89bn+ stimulus was the largest peacetime intervention — broadly considered successful in preventing a deeper recession.</li>
  <li><strong>Budget surplus (2022–24)</strong>: Successful fiscal consolidation reduced debt as % of GDP despite structural spending pressures.</li>
</ul>
<p><strong>Limitations:</strong></p>
<ul>
  <li>Fiscal multiplier uncertain — stimulus effect may be smaller if households save rather than spend.</li>
  <li>Infrastructure spending lags — schools built in the stimulus were sometimes of poor quality (BER program).</li>
  <li>Risk of crowding out private investment if deficit is large and persistent.</li>
  <li>Government spending is difficult to cut once established — political economy problems.</li>
</ul>`,
      },
      {
        id: "policy-effectiveness-2",
        title: "Evaluating Monetary Policy Effectiveness",
        content: `<p><strong>Evidence of monetary policy effectiveness:</strong></p>
<ul>
  <li>Inflation target (2–3%) has largely been achieved since its introduction in 1993, anchoring inflation expectations for three decades.</li>
  <li>RBA's COVID easing (0.1% cash rate + QE) supported asset prices and maintained credit flow — avoided a credit crunch.</li>
  <li>Post-COVID tightening: 425bp of hikes successfully returned inflation from 7.8% to near-target by late 2024 without causing a recession ("soft landing").</li>
</ul>
<p><strong>Limitations:</strong></p>
<ul>
  <li>Long and variable lags — risk of over-tightening (2022–23 RBA communications failed to anticipate the scale of inflation).</li>
  <li>RBA credibility issues: initially said rates would not rise until 2024 (forward guidance), then raised aggressively in 2022 — damaged trust among mortgage holders.</li>
  <li>Blunt instrument: rate rises hit mortgage holders hard while leaving renters and businesses without mortgages relatively unaffected.</li>
  <li>At the zero lower bound, conventional monetary policy is exhausted — unconventional tools (QE) have uncertain effects and create exit difficulties.</li>
</ul>`,
      },
      {
        id: "policy-effectiveness-3",
        title: "Evaluating Microeconomic Policy Effectiveness",
        content: `<p><strong>Evidence of microeconomic policy effectiveness:</strong></p>
<ul>
  <li>1990s productivity surge: Microeconomic reforms of the late 1980s–1990s (trade liberalisation, NCP, financial deregulation, enterprise bargaining) contributed to Australia's strong productivity growth in the 1990s and helped achieve 28 years of consecutive GDP growth.</li>
  <li>Trade liberalisation: Productivity Commission estimates trade reforms raised living standards by approximately 5.4% — significant long-run benefit.</li>
  <li>NCP reforms: Estimated to have added 2.5% to GDP through competition in previously protected sectors.</li>
</ul>
<p><strong>Limitations:</strong></p>
<ul>
  <li>Benefits are long-run and diffuse; costs (job losses, structural adjustment) are immediate and concentrated → political resistance to reform.</li>
  <li>Productivity growth has slowed significantly since 2004 despite ongoing reform efforts — diminishing returns or deeper structural issues?</li>
  <li>Privatisation outcomes mixed — Telstra privatisation criticised for inadequate competition regulation, resulting in poor broadband outcomes.</li>
  <li>Requires institutional capacity and political will — harder to implement in politically difficult areas (e.g., housing supply reform, superannuation, negative gearing).</li>
</ul>`,
      },
    ],
  },
  {
    id: "policy-limitations",
    title: "Limitations of Economic Policy",
    icon: "AlertTriangle",
    color: "from-red-600 to-orange-600",
    accent: "red",
    description: "Why policy doesn't always achieve its objectives — constraints, lags, and unintended consequences.",
    causeEffect: "Policy limitations → unintended consequences, ineffective interventions, or counterproductive outcomes → require constant evaluation, adjustment, and institutional design to minimise.",
    examLink: "Every effectiveness question needs a limitations section. Know the four main types of lags, crowding out, unintended consequences, and globalisation constraints.",
    glossaryTerms: ["recognition lag", "decision lag", "implementation lag", "impact lag", "crowding out", "unintended consequences", "policy credibility"],
    subsections: [
      {
        id: "policy-limitations-1",
        title: "Time Lags",
        content: `<p>A major limitation of economic policy is the <strong>time lag</strong> between recognising an economic problem and the policy having its full effect:</p>
<ul>
  <li><strong>Recognition lag</strong>: Time taken to identify a problem — economic data is released with a delay (ABS publishes GDP data 3 months after period ends); business cycle turning points only apparent in hindsight.</li>
  <li><strong>Decision lag</strong>: Time taken for policymakers to decide on an appropriate response — fiscal policy requires parliamentary approval (budget process can take months); monetary policy is faster (RBA meets monthly).</li>
  <li><strong>Implementation lag</strong>: Time between the decision and implementation — cash handouts can be quick; infrastructure projects may take years to design, approve and build.</li>
  <li><strong>Impact lag</strong>: Time between implementation and full economic effect — monetary policy: 12–18 months for full effect on inflation; fiscal multiplier effects build over several quarters.</li>
</ul>
<p><strong>Risk of pro-cyclical policy</strong>: If lags are too long, stimulus may arrive after the economy has already recovered, overheating the economy. Alternatively, contractionary policy may hit during a slowdown, deepening recession.</p>`,
      },
      {
        id: "policy-limitations-2",
        title: "Crowding Out and Political Constraints",
        content: `<p><strong>Crowding out:</strong></p>
<ul>
  <li>When government borrows heavily to finance a budget deficit, it competes with the private sector for available loanable funds.</li>
  <li>This can raise interest rates → "crowd out" private investment → partially or fully offset the expansionary effect of fiscal stimulus.</li>
  <li>Counter-argument: In a recession, private investment is already depressed, and government is the "borrower of last resort" — crowding out is minimal when there's idle capacity.</li>
  <li>In an open economy like Australia, capital inflows from abroad can fund the deficit without raising domestic interest rates significantly.</li>
</ul>
<p><strong>Political constraints:</strong></p>
<ul>
  <li>Governments face electoral incentives to cut taxes and increase spending — structurally biased toward deficits.</li>
  <li>Spending cuts and tax increases are politically unpopular — makes fiscal consolidation difficult.</li>
  <li>"Ratchet effect": Government spending programs are easy to introduce but very difficult to reduce.</li>
  <li>Short electoral cycles discourage long-run thinking — structural reforms with long-term benefits but short-term pain are politically difficult.</li>
</ul>`,
      },
      {
        id: "policy-limitations-3",
        title: "Globalisation Constraints and Unintended Consequences",
        content: `<p><strong>Globalisation constraints on policy:</strong></p>
<ul>
  <li><strong>Capital mobility</strong>: High taxes or regulations may cause capital and business to relocate to lower-cost jurisdictions — limits policy autonomy.</li>
  <li><strong>Exchange rate effects</strong>: Fiscal expansion may attract capital inflows → AUD appreciation → reduces net exports → partial crowding out.</li>
  <li><strong>External shocks</strong>: Global recessions, commodity price crashes, and financial crises can overwhelm domestic policy. Australia's fiscal stimulus in the GFC was effective partly because China's growth continued — a global recession would have been more challenging.</li>
  <li><strong>WTO constraints</strong>: Trade protection, subsidies, and industrial policies constrained by international trade rules.</li>
</ul>
<p><strong>Unintended consequences:</strong></p>
<ul>
  <li>Low interest rates (2020–22) → asset price inflation → housing affordability crisis → worsened wealth inequality.</li>
  <li>Rapid rate rises (2022–23) → mortgage stress for households → consumer spending contraction → near-recession.</li>
  <li>Carbon price (2012–14) → some industries lobbied successfully for exemptions → reduced environmental effectiveness.</li>
  <li>Privatisation of natural monopolies without adequate regulation → increased prices for consumers (electricity in Australia).</li>
</ul>`,
      },
    ],
  },
  {
    id: "t4-exam-strategy",
    title: "Topic 4 Exam Strategy",
    icon: "GraduationCap",
    color: "from-amber-500 to-orange-600",
    accent: "amber",
    description: "How to structure high-scoring answers for Topic 4 questions.",
    causeEffect: "Systematic exam preparation → structured analysis with data → band 5–6 responses.",
    examLink: "Practice writing full 20-mark essays with a clear thesis, AD/AS framework, real examples, and nuanced conclusions.",
    glossaryTerms: ["evaluate", "assess", "analyse", "AD/AS", "policy mix", "trade-off"],
    subsections: [
      {
        id: "t4-exam-1",
        title: "Common Question Types",
        content: `<p><strong>Common Topic 4 question patterns:</strong></p>
<ul>
  <li>"Evaluate the effectiveness of fiscal policy in achieving [objective]."</li>
  <li>"Assess the role of monetary policy in maintaining price stability."</li>
  <li>"To what extent can microeconomic policy improve Australia's economic performance?"</li>
  <li>"Discuss the conflicts between economic objectives."</li>
  <li>"Evaluate the effectiveness of economic policies in managing the economy since [year]."</li>
</ul>
<p><strong>What markers want to see:</strong></p>
<ul>
  <li>Clear definition of key terms (fiscal policy, monetary policy, economic objectives).</li>
  <li>Accurate explanation of how the policy works (transmission mechanism, multiplier).</li>
  <li>Real Australian examples with specific data (dates, figures, policy names).</li>
  <li>Evaluation — not just description. What worked? What didn't? Why? What were the limitations?</li>
  <li>Acknowledgement of trade-offs and objective conflicts.</li>
  <li>A clear, qualified conclusion — avoid extreme statements.</li>
</ul>`,
      },
      {
        id: "t4-exam-2",
        title: "Essay Structure Guide",
        content: `<p><strong>Introduction (4–5 sentences):</strong></p>
<ul>
  <li>Define ALL key terms in the question (e.g., "Fiscal policy refers to the use of government taxation, spending, and borrowing to...").</li>
  <li>Provide brief context (current state of the Australian economy).</li>
  <li>State your thesis — your overall judgement (e.g., "Fiscal policy has been largely effective in stabilising output during downturns, though its effectiveness is constrained by political factors and time lags in structural reforms").</li>
</ul>
<p><strong>Body paragraphs (PEEL × 3–4):</strong></p>
<ul>
  <li>Paragraph 1: How the policy works (mechanism, theory, diagram reference).</li>
  <li>Paragraph 2: Evidence of effectiveness — specific Australian examples with data.</li>
  <li>Paragraph 3: Limitations / conflicting objectives — where the policy falls short.</li>
  <li>Paragraph 4 (optional): Comparison with alternative policy or evaluation of policy mix.</li>
</ul>
<p><strong>Conclusion:</strong></p>
<ul>
  <li>Restate thesis in light of your argument.</li>
  <li>Qualify your judgement: "On balance...", "While X has been significant, Y has been more important because..."</li>
  <li>Final forward-looking statement (optional): "Going forward, a combination of..."</li>
</ul>`,
      },
      {
        id: "t4-exam-3",
        title: "Key Data and Examples to Know",
        content: `<p><strong>Must-know statistics for Topic 4 essays:</strong></p>
<ul>
  <li>RBA inflation target: 2–3% CPI on average over the cycle (since 1993).</li>
  <li>COVID cash rate: 0.10% (record low, March 2020 – May 2022).</li>
  <li>Post-COVID rate cycle: 0.10% → 4.35% (425bp increase, May 2022 – November 2023).</li>
  <li>Peak CPI inflation: 7.8% (December 2022) — 32-year high.</li>
  <li>COVID fiscal stimulus: JobKeeper $89bn; total stimulus ~$300bn+ across 2020–21.</li>
  <li>Peak unemployment: ~7.5% (2020); fell to 3.5% (2022–23) — 50-year low.</li>
  <li>Budget deficit: -$134bn in 2020–21; returned to +$22bn surplus in 2022–23.</li>
  <li>Australia's gross government debt: ~50% of GDP (low by international standards).</li>
  <li>Australia's NAIRU: ~4–4.5% (Treasury/RBA estimate).</li>
  <li>Company tax rate: 30% (25% for small business).</li>
  <li>GST rate: 10%.</li>
  <li>NCP reforms: estimated 2.5% boost to GDP.</li>
  <li>Trade liberalisation: estimated 5.4% boost to living standards (Productivity Commission).</li>
</ul>
<p><strong>Band 6 tips:</strong></p>
<ul>
  <li>Use economic theory (AD/AS, Phillips curve, multiplier) to structure your explanation.</li>
  <li>Always link policies back to specific economic objectives.</li>
  <li>Show nuance — avoid "fiscal policy always works" or "monetary policy is useless".</li>
  <li>Use the word "however", "nevertheless", "despite" to signal evaluative thinking.</li>
  <li>Name specific policies (JobKeeper, Fair Work Act, Safeguard Mechanism) — not just generic "government spending".</li>
</ul>`,
      },
    ],
  },
];
