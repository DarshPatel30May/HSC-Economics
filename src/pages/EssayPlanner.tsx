import { useState } from "react";
import { motion } from "framer-motion";
import { PenTool, ChevronDown, Lightbulb, AlertTriangle, RotateCcw, Globe, Building2 } from "lucide-react";
import type { AppState } from "../hooks/useAppState";

interface EssayPlannerProps {
  state: AppState;
}

interface Scaffold {
  thesis: string;
  policy1: { title: string; content: string };
  policy2: { title: string; content: string };
  limitation: string;
  judgement: string;
  commonMistakes: string[];
  band6Tip: string;
}

const topic4Questions = [
  { id: "t4q1", question: "Discuss the effectiveness of macroeconomic policies in achieving Australia's economic objectives.", category: "Macroeconomic Policy" },
  { id: "t4q2", question: "Analyse the role of fiscal and monetary policy in managing aggregate demand in the Australian economy.", category: "Fiscal & Monetary" },
  { id: "t4q3", question: "Evaluate the contribution of microeconomic reform to Australia's long-run economic performance.", category: "Microeconomic Reform" },
  { id: "t4q4", question: "Discuss how conflicts between economic objectives create challenges for economic policymakers.", category: "Policy Conflicts" },
  { id: "t4q5", question: "Explain how fiscal policy can be used to achieve the economic objective of full employment.", category: "Fiscal Policy" },
  { id: "t4q6", question: "Assess the effectiveness of monetary policy in achieving Australia's inflation target.", category: "Monetary Policy" },
  { id: "t4q7", question: "Discuss the limitations of macroeconomic policy in managing the Australian economy.", category: "Limitations" },
  { id: "t4q8", question: "Explain how labour market policies can reduce unemployment while maintaining price stability.", category: "Labour Market" },
];

const topic1Questions = [
  { id: "t1q1", question: "Evaluate the impact of globalisation on the Australian economy.", category: "Globalisation" },
  { id: "t1q2", question: "Assess the effectiveness of the World Trade Organisation (WTO) in promoting free trade.", category: "Trade Institutions" },
  { id: "t1q3", question: "Analyse the factors influencing Australia's current account and exchange rate.", category: "International Finance" },
  { id: "t1q4", question: "Discuss the role of transnational corporations (TNCs) in promoting economic development.", category: "TNCs" },
  { id: "t1q5", question: "Evaluate whether globalisation has increased or reduced global income inequality.", category: "Income Inequality" },
  { id: "t1q6", question: "Assess the effectiveness of international environmental agreements in addressing climate change.", category: "Environment" },
  { id: "t1q7", question: "Analyse the relationship between trade liberalisation and economic growth in Australia.", category: "Trade Policy" },
  { id: "t1q8", question: "Discuss how Australia can achieve economic growth while maintaining environmental sustainability.", category: "Sustainability" },
];

const topic4Scaffolds: Record<string, Scaffold> = {
  t4q1: {
    thesis: "Macroeconomic policies — fiscal and monetary — are the primary tools used by the Australian government and the RBA to manage aggregate demand and achieve the nation's key economic objectives. While both instruments are broadly effective at stabilising the business cycle, their long-run impact is constrained by time lags, global influences, and inherent trade-offs between objectives.",
    policy1: {
      title: "Fiscal Policy",
      content: "The federal government uses its annual Budget to expand or contract aggregate demand. During recessions, expansionary fiscal policy (deficit spending, automatic stabilisers) injects purchasing power into the economy, raising output and employment. During the GFC, Australia's fiscal stimulus — including direct household payments and the Building the Education Revolution — helped avoid recession. COVID-19 JobKeeper ($89bn) preserved 3.5 million jobs. However, time lags and public debt accumulation limit its effectiveness.",
    },
    policy2: {
      title: "Monetary Policy",
      content: "The RBA adjusts the cash rate to influence borrowing costs, asset prices, the exchange rate, and ultimately inflation and employment through the transmission mechanism. Low rates stimulate consumption and investment; high rates dampen inflationary pressure. The RBA's 2022–23 tightening cycle (from 0.10% to 4.35%) illustrates contractionary monetary policy addressing surging 7.8% inflation. However, 12–18 month effect lags and household debt sensitivity constrain its precision.",
    },
    limitation: "Both policies face significant constraints: time lags mean interventions may arrive after conditions have changed; global shocks (commodity price falls, US rate changes) can override domestic settings; and pursuing full employment may conflict with price stability, forcing policymakers to prioritise one objective over another.",
    judgement: "Overall, macroeconomic policies are most effective when deployed together and calibrated to the stage of the business cycle. Their effectiveness is enhanced when complemented by microeconomic reform, which expands the economy's supply-side capacity and reduces the inflation-growth trade-off.",
    commonMistakes: [
      "Describing what fiscal/monetary policy IS without explaining HOW it achieves objectives",
      "Forgetting to use cause-and-effect chains (e.g., lower cash rate → higher spending → GDP growth)",
      "Only discussing one policy — the question asks about both",
      "Not evaluating limitations — a strong essay weighs both effectiveness AND constraints",
    ],
    band6Tip: "Integrate a discussion of how macroeconomic and microeconomic policy are complementary — macroeconomic policy manages short-run demand while micro reforms raise long-run supply capacity, together reducing the growth-inflation trade-off.",
  },
  t4q2: {
    thesis: "Fiscal and monetary policy are the two primary macroeconomic tools used to manage aggregate demand in Australia. While both seek to smooth the business cycle and achieve price stability and full employment, they operate through different mechanisms and are subject to distinct limitations.",
    policy1: {
      title: "Fiscal Policy — Demand Management",
      content: "Fiscal policy operates through the federal Budget's expenditure and tax decisions. An expansionary stance (e.g., increased government spending or tax cuts) directly injects purchasing power into the economy, raising aggregate demand through the multiplier effect. Automatic stabilisers (progressive tax, Jobseeker) provide immediate counter-cyclical support. Discretionary measures (infrastructure programs, direct payments) are more powerful but suffer from longer implementation lags.",
    },
    policy2: {
      title: "Monetary Policy — Demand Management",
      content: "Monetary policy works through the cash rate and the transmission mechanism. The RBA's rate decisions affect borrowing costs (interest rate channel), asset prices (wealth effect), the AUD (exchange rate channel), and credit availability. These changes collectively influence household consumption and business investment — the two largest components of aggregate demand. Monetary policy is more flexible (monthly RBA Board meetings) but takes 12–18 months to fully affect inflation.",
    },
    limitation: "Both policies face timing issues: fiscal policy has longer decision and implementation lags, while monetary policy has effect lags. At the zero lower bound (as in 2020–21), monetary policy exhausts its conventional tools, requiring fiscal policy to carry the stabilisation burden. Globally, imported inflation (e.g., COVID supply shocks) cannot be fully addressed by domestic demand management.",
    judgement: "Fiscal and monetary policy are most effective when they operate in the same direction and are well-timed to the economic cycle. Conflict between the two reduces effectiveness. The greatest success in demand management occurs when both are coordinated alongside supply-side microeconomic reform.",
    commonMistakes: [
      "Not clearly distinguishing fiscal from monetary policy mechanisms",
      "Failing to explain the transmission mechanism for monetary policy",
      "Missing the complementarity — both policies work together",
      "Ignoring the zero lower bound issue for monetary policy",
    ],
    band6Tip: "Note the asymmetry: monetary policy is more powerful for controlling inflation (contractionary), but fiscal policy may be more effective in deep recessions when confidence is low (monetary 'pushing on a string'). Applying this distinction to real examples earns Band 6.",
  },
  t4q3: {
    thesis: "Microeconomic reform has been a central pillar of Australia's economic strategy since the 1980s, working on the supply side to improve efficiency, productivity, and international competitiveness. Over the long run, these reforms have contributed to rising living standards and non-inflationary growth, though their benefits take time to materialise and can create distributional costs in the short run.",
    policy1: {
      title: "Competition and Market Reform",
      content: "Trade liberalisation (tariff reductions from the 1980s) exposed Australian industries to global competition, forcing efficiency improvements — estimated to raise living standards by 5.4% (Productivity Commission). Competition policy through the ACCC prevents anti-competitive behaviour, encouraging innovation and lower prices. National Competition Policy (1995) added 2.5% to GDP by extending competition principles across utilities and GBEs.",
    },
    policy2: {
      title: "Labour Market and Human Capital Reform",
      content: "The shift from centralised wage setting to enterprise bargaining (progressively from 1991–1996) linked wages to firm-level productivity, improving labour market flexibility. Investment in education, vocational training, and infrastructure (NBN, freight rail) builds human and physical capital — raising total factor productivity. These supply-side improvements shift the LRAS curve rightward, expanding productive capacity without generating inflationary pressure.",
    },
    limitation: "Microeconomic reform creates significant adjustment costs — industries protected by tariffs contract, workers in privatised enterprises may face redundancy, and deregulation can increase market volatility. Benefits are long-term and diffuse, while costs are immediate and concentrated, creating political resistance. Productivity growth has slowed since 2004 despite reform efforts, suggesting diminishing returns from past reforms.",
    judgement: "Despite limitations, microeconomic reform has been essential for Australia's sustained economic growth — complementing macroeconomic demand management by raising the productive ceiling of the economy. The most successful periods combined macroeconomic stability with structural supply-side reform.",
    commonMistakes: [
      "Confusing microeconomic policy with monetary policy — they are very different",
      "Not explaining the supply-side mechanism (LRAS shift, productivity, efficiency)",
      "Listing reforms without explaining their economic effects",
      "Failing to acknowledge the short-run costs and distributional impacts",
    ],
    band6Tip: "Explicitly contrast microeconomic and macroeconomic policy: 'While fiscal stimulus raises AD in the short run, microeconomic reform expands aggregate supply in the long run, allowing the economy to grow at a higher rate without inflationary pressure.' This demonstrates synthesis.",
  },
  t4q4: {
    thesis: "Economic objectives — growth, full employment, price stability, external stability, equity, and environmental sustainability — frequently conflict with one another, creating fundamental policy dilemmas. No single policy stance can optimally achieve all objectives simultaneously, forcing policymakers to make deliberate trade-offs.",
    policy1: {
      title: "Inflation vs Unemployment (Short-Run Phillips Curve)",
      content: "The most well-known conflict is between price stability and full employment. Expansionary policies that reduce unemployment below the NAIRU generate wage pressure and demand-pull inflation, threatening the RBA's 2–3% target. Conversely, contractionary monetary policy that controls inflation raises unemployment and slows growth. The RBA's 2022–23 rate tightening cycle explicitly accepted higher unemployment risk in order to restore price stability.",
    },
    policy2: {
      title: "Growth vs Environmental Sustainability",
      content: "Strong economic growth driven by energy-intensive production tends to increase greenhouse gas emissions and resource depletion. Policies prioritising rapid GDP growth can conflict with Australia's climate commitments (net zero by 2050). Addressing this requires carbon pricing, regulation, and investment in clean technology — each of which imposes short-run costs on growth. The tension reflects a fundamental conflict between short-run economic objectives and long-run environmental sustainability.",
    },
    limitation: "Policymakers cannot resolve these conflicts by ignoring them. Supply-side microeconomic reform partially resolves the growth-inflation conflict by raising productive capacity — but cannot eliminate all trade-offs, particularly those involving environmental sustainability or equity.",
    judgement: "Policy conflicts are inherent in economic management. The role of good economic policy is to minimise trade-offs through careful sequencing, transparent communication (anchoring expectations), and pragmatic prioritisation based on current economic conditions rather than ideological rigidity.",
    commonMistakes: [
      "Only identifying one conflict — you need at least two well-explained examples",
      "Not explaining WHY the conflict arises (e.g., what mechanism causes inflation when unemployment falls)",
      "Saying 'policies can achieve all objectives' — this ignores the point of the question",
      "Missing equity vs efficiency as a significant conflict",
    ],
    band6Tip: "Show awareness that the severity of conflicts is conditional: 'The growth-inflation trade-off is most acute when the economy is near its productive capacity (positive output gap). When the economy has significant spare capacity, expansionary policy can raise growth without triggering inflation, temporarily resolving the conflict.'",
  },
  t4q5: {
    thesis: "Fiscal policy — through both automatic stabilisers and discretionary measures — is an important tool for achieving full employment by addressing cyclical unemployment via expansion of aggregate demand. However, its effectiveness is subject to significant limitations, including time lags, crowding-out effects, and the inability to address structural unemployment.",
    policy1: {
      title: "Automatic Stabilisers and Full Employment",
      content: "Progressive income taxation and unemployment transfer payments (Jobseeker) automatically expand the budget deficit during recessions, providing an immediate demand floor. During COVID-19, JobKeeper payments ($89bn) were an emergency supplement that preserved employment relationships throughout the shutdown period, keeping unemployment peak at ~7.5% rather than the forecast 10%+.",
    },
    policy2: {
      title: "Discretionary Fiscal Expansion",
      content: "Active fiscal expansion — increased public investment in infrastructure, direct household stimulus payments, and targeted employment programs — raises AD beyond what automatic stabilisers provide. Government spending on construction employs workers directly while stimulating private sector activity through the multiplier effect. The GFC fiscal stimulus (2008–09) is estimated to have prevented unemployment reaching 8–10% (it peaked at 5.9%).",
    },
    limitation: "Fiscal policy cannot address structural unemployment — caused by skills mismatches, not insufficient demand. It also risks crowding out private investment if deficit financing raises interest rates. Long implementation lags mean job-creating infrastructure projects may be completed after unemployment has already peaked. Sustained deficit spending accumulates public debt, constraining future fiscal flexibility.",
    judgement: "Fiscal policy is most effective at achieving full employment when unemployment is predominantly cyclical and the economy has a significant negative output gap. Complementary microeconomic and labour market policies are essential for achieving and sustaining full employment.",
    commonMistakes: [
      "Forgetting to link fiscal policy to aggregate demand (the mechanism)",
      "Confusing automatic stabilisers with discretionary policy",
      "Not mentioning the multiplier effect",
      "Saying fiscal policy alone can achieve full employment — must acknowledge structural limitations",
    ],
    band6Tip: "Distinguish between cyclical and structural unemployment: 'Fiscal expansion is effective at reducing cyclical unemployment (insufficient demand), but cannot address structural unemployment caused by skills mismatches — which requires microeconomic and labour market reform.' This nuance distinguishes Band 6 responses.",
  },
  t4q6: {
    thesis: "Monetary policy, implemented by the RBA through the cash rate and inflation targeting framework, is the primary tool for achieving Australia's price stability objective of 2–3% CPI inflation on average over the medium term. While the framework has been broadly successful since 1993, monetary policy's effectiveness is constrained by time lags, the zero lower bound, and supply-side shocks beyond domestic control.",
    policy1: {
      title: "Contractionary Monetary Policy and Inflation",
      content: "When inflation rises above the 2–3% target, the RBA raises the cash rate, transmitting higher borrowing costs across the economy via the interest rate, asset price, exchange rate, and credit channels. Higher mortgage repayments reduce household disposable income → consumption falls → AD falls → inflation moderates. The 2022–23 tightening cycle (from 0.10% to 4.35%) reduced headline inflation from 7.8% (Dec 2022) toward the 2–3% target by late 2024.",
    },
    policy2: {
      title: "Anchoring Expectations",
      content: "Beyond direct demand management, the RBA's inflation targeting framework anchors inflationary expectations — if households and businesses believe inflation will remain within 2–3%, wage and price-setting behaviour is more restrained, reducing second-round effects of supply shocks. This credibility, built since 1993, reduces the size of rate movements required to control inflation. The transparency of the framework reinforces this expectations channel.",
    },
    limitation: "Monetary policy faces a 12–18 month lag before fully affecting inflation, creating the risk of over-tightening (recession) or under-tightening (persistent inflation). At the zero lower bound (2020–21, cash rate 0.10%), conventional monetary policy is exhausted. Imported inflation driven by global supply chain disruptions cannot be addressed by domestic demand reduction without significant output costs.",
    judgement: "Monetary policy has been broadly effective at achieving price stability in Australia over the past three decades, with CPI averaging near target for most of this period. Its effectiveness is strongest when inflation is demand-driven and the economy is operating near capacity. Supply-side or imported inflation presents greater challenges.",
    commonMistakes: [
      "Not explaining the full transmission mechanism (just saying 'higher rates reduce spending' is insufficient)",
      "Forgetting the expectations/credibility channel",
      "Not using the 2022–23 rate cycle as a contemporary example",
      "Concluding 'monetary policy always works' without acknowledging the zero lower bound or supply shocks",
    ],
    band6Tip: "Discuss the asymmetry of monetary policy: 'Contractionary monetary policy is generally more effective than expansionary policy in achieving price stability, as raising rates reliably reduces borrowing and spending. However, expansionary monetary policy faces a 'pushing on a string' problem in deep recessions — low rates cannot force households and businesses to borrow and spend if confidence is low.'",
  },
  t4q7: {
    thesis: "While macroeconomic policies — fiscal and monetary — are important tools for managing the Australian economy, their effectiveness is subject to significant limitations including time lags, external shocks, political constraints, and fundamental conflicts between economic objectives.",
    policy1: {
      title: "Time Lags",
      content: "Both fiscal and monetary policy suffer from recognition, decision, implementation, and effect lags. Monetary policy takes 12–18 months to fully affect inflation and output. Fiscal infrastructure projects can take years from announcement to completion. By the time policy takes effect, economic conditions may have changed, creating the risk of pro-cyclical policy — where stimulus arrives after recovery has begun, fuelling inflation.",
    },
    policy2: {
      title: "Global Influences and Conflicting Objectives",
      content: "As a small open economy, Australia is vulnerable to external shocks — commodity price falls, global recessions, US Federal Reserve rate decisions, and imported inflation — that can overwhelm domestic policy settings. Simultaneously, macroeconomic policy faces inherent trade-offs: expansionary policy that reduces unemployment may generate inflationary pressure; contractionary policy that controls inflation may slow growth and raise unemployment.",
    },
    limitation: "Political constraints mean governments may resist contractionary fiscal policy before elections. Structural issues (ageing population, NDIS costs) create baseline deficits that limit fiscal flexibility. The zero lower bound constrains monetary policy in deep recessions. High household debt amplifies the contractionary impact of rate rises.",
    judgement: "Despite these limitations, macroeconomic policy is not ineffective — Australia's 29-year run of uninterrupted growth (1991–2020) reflects sound macroeconomic management. Limitations should be acknowledged, but balanced against the significant evidence that well-timed, well-calibrated macro policy reduces the depth of recessions and severity of inflationary episodes.",
    commonMistakes: [
      "Listing limitations without explaining the economic mechanism that causes them",
      "Concluding that policy is 'completely ineffective' — this is not supported",
      "Treating fiscal and monetary policy limitations as identical — they have distinct lag structures",
      "Forgetting distributional impacts as a limitation",
    ],
    band6Tip: "Show that limitations are conditional: 'The severity of time lag limitations depends on the nature of the policy — automatic stabilisers respond immediately (minimal lag), while infrastructure spending can take years to implement. Similarly, monetary policy lags are longer and more uncertain than fiscal policy lags, particularly in the current environment of high household debt.' Specificity earns marks.",
  },
  t4q8: {
    thesis: "Labour market policies — encompassing wage determination systems, skills training, workforce participation initiatives, and the minimum wage — can contribute to reducing unemployment while maintaining price stability by improving the efficiency of labour markets and linking wage growth to productivity.",
    policy1: {
      title: "Enterprise Bargaining and Productivity-Linked Wages",
      content: "The shift from centralised award setting to enterprise bargaining links wage increases to firm-level productivity. When wages rise in line with productivity, unit labour costs remain stable — firms can pay more without raising prices or cutting employment. This supports the dual objectives of higher employment (firms can afford to hire) and price stability (wage-linked productivity growth is non-inflationary).",
    },
    policy2: {
      title: "Skills Training and Structural Unemployment",
      content: "Skills training programs (apprenticeships, vocational education, Workforce Australia) address structural unemployment by improving the match between worker skills and employer needs. Reducing structural unemployment lowers the NAIRU — meaning the economy can sustain a lower unemployment rate without generating wage-price pressures. Childcare subsidies and flexible work arrangements improve workforce participation, expanding labour supply.",
    },
    limitation: "Labour market policies primarily address structural and frictional unemployment — they cannot reduce cyclical unemployment during recessions (that requires macroeconomic expansion). The minimum wage, while improving equity, risks pricing low-skill workers out of employment if set too high.",
    judgement: "Labour market policies are most effective in reducing unemployment without inflationary pressure when they are supply-side focused — improving skills, participation, and productivity. They complement macroeconomic demand management (which reduces cyclical unemployment) and microeconomic reform (which raises overall productive efficiency).",
    commonMistakes: [
      "Confusing labour market policy with macroeconomic policy (they operate differently)",
      "Not explaining how productivity-linked wages help maintain price stability",
      "Ignoring the equity-efficiency tension in minimum wage policy",
      "Forgetting that labour market policy cannot address cyclical unemployment",
    ],
    band6Tip: "Link labour market policy explicitly to the NAIRU: 'Effective labour market reform lowers the NAIRU by reducing structural unemployment, meaning the economy can operate at a higher employment level without generating inflationary wage pressure. This is the most powerful way in which supply-side labour market policies contribute to the simultaneous achievement of full employment and price stability.'",
  },
};

const topic1Scaffolds: Record<string, Scaffold> = {
  t1q1: {
    thesis: "Globalisation — the process of increasing integration among national economies through trade, investment, migration, and technology — has profoundly shaped the Australian economy. While it has raised living standards, created export opportunities, and improved consumer welfare, globalisation has also generated structural adjustment costs, increased external vulnerability, and constrained policy autonomy.",
    policy1: {
      title: "Benefits of Globalisation for Australia",
      content: "Australia's 28 consecutive years of economic growth (1991–2020) — a world record — reflects its successful integration into the global economy. China's industrialisation created massive demand for Australian iron ore, coal, and LNG, driving a commodity export boom. FTAs with major partners (China ChAFTA, Japan JAEPA, Korea KAFTA, US AUSFTA, UK A-UKFTA) expanded market access. Trade liberalisation raised living standards by an estimated 5.4% (Productivity Commission). Lower import prices have improved consumer purchasing power.",
    },
    policy2: {
      title: "Costs and Challenges of Globalisation for Australia",
      content: "Globalisation also imposed significant costs. Manufacturing's share of GDP fell from ~20% (1970s) to ~6% (2020s) as cheap imports displaced domestic production — causing structural unemployment among low-skilled workers. Australia's China concentration (~30% of exports) was exposed by the 2020–23 trade dispute, when China imposed restrictions on Australian coal, barley, wine, and beef — demonstrating the risk of concentrated export markets. Net foreign liabilities (~50% of GDP) reflect accumulation of foreign debt, generating a persistent net primary income deficit.",
    },
    limitation: "The benefits of globalisation have been unevenly distributed — high-skilled workers and capital owners have gained disproportionately. Environmental costs of increased production and trade have worsened global warming. The COVID-19 pandemic demonstrated the vulnerability of global supply chains and the cost of deep economic interdependence.",
    judgement: "On balance, globalisation has been broadly beneficial for Australia, raising living standards, diversifying trade, and attracting investment. However, the benefits are not automatic or equally distributed — effective domestic policy (structural adjustment support, income redistribution, market diversification) is needed to maximise gains and minimise costs.",
    commonMistakes: [
      "Listing only benefits without balanced evaluation of costs",
      "Not using specific Australian data (trade figures, living standards statistics)",
      "Confusing globalisation with trade — globalisation also includes capital flows, migration, and technology",
      "Failing to link back to economic objectives (growth, equity, sustainability)",
    ],
    band6Tip: "Distinguish between different dimensions of globalisation: 'While trade globalisation has clearly raised Australian incomes, financial globalisation has increased external vulnerability through Australia's large net foreign liabilities (~50% of GDP). This nuanced analysis demonstrates understanding of globalisation's multiple dimensions.'",
  },
  t1q2: {
    thesis: "The World Trade Organisation (WTO) has been an important force for trade liberalisation since its establishment in 1995, providing a rules-based framework, dispute settlement mechanism, and forum for negotiations. However, its effectiveness has been constrained by the failure of the Doha Development Round, the rise of bilateral trade agreements, and geopolitical tensions between major powers.",
    policy1: {
      title: "Successes of the WTO",
      content: "The WTO has achieved significant results: average global tariffs have fallen from 22% in 1947 to under 5% today. The dispute settlement mechanism has resolved hundreds of trade disputes in a rules-based manner — including Australian wins against Japan (apples), the EU (aviation subsidies), and Brazil (orange juice). The Most Favoured Nation (MFN) principle ensures concessions are multilaterally extended. WTO membership has provided developing countries with predictable market access, supporting export-led growth.",
    },
    policy2: {
      title: "Limitations of the WTO",
      content: "The Doha Development Round (launched 2001) has remained unresolved for over two decades — failing to address agricultural subsidies, services trade, and development issues. Decision by consensus among 166 members means any member can veto progress. The Appellate Body (dispute resolution) was effectively paralysed from 2019 when the US blocked new appointments. The rise of bilateral and regional FTAs (CPTPP, RCEP) has partially substituted for multilateral progress, potentially fragmenting global trade.",
    },
    limitation: "The WTO's rules-based system is poorly equipped to address modern trade challenges: digital trade, intellectual property in services, state subsidies for strategic industries (as used by China), and the interaction between trade policy and environmental standards. Major powers increasingly bypass the WTO through bilateral agreements.",
    judgement: "The WTO remains valuable as a framework for rules-based trade and dispute resolution, but its effectiveness as a vehicle for trade liberalisation has diminished significantly since the Doha failure. Reform is needed — particularly to restore the Appellate Body and address 21st century trade issues — but geopolitical tensions between the US and China make comprehensive reform unlikely in the near term.",
    commonMistakes: [
      "Confusing the WTO with the IMF or World Bank — they have very different functions",
      "Only discussing benefits or only limitations — the question requires evaluation",
      "Not mentioning specific WTO agreements (GATT, TRIPS, GATS) or decisions",
      "Failing to provide a balanced conclusion with qualified judgement",
    ],
    band6Tip: "Acknowledge the WTO's role in constraining unilateral protectionism: 'Even when the WTO fails to liberalise trade further, its rules prevent backsliding — the fear of WTO dispute resolution deters countries from imposing arbitrary tariffs.' This demonstrates sophisticated understanding of institutions as constraints on bad policy, not just vehicles for good policy.",
  },
  t1q3: {
    thesis: "Australia's current account balance and exchange rate are determined by a complex set of domestic and global factors, including commodity prices, relative interest rates, economic growth differentials, and investor sentiment. Understanding these determinants is essential for analysing Australia's external stability and the effectiveness of macroeconomic policy.",
    policy1: {
      title: "Factors Affecting Australia's Current Account",
      content: "Australia has historically run a current account deficit (CAD) of 3–5% of GDP — reflecting investment exceeding domestic savings, requiring capital inflows. The trade balance is heavily influenced by commodity prices: when iron ore and coal prices surged in 2020–22, Australia's trade surplus widened significantly, contributing to Australia's first current account surpluses in 44 years (2019–21). The net primary income deficit is persistent (~$45–60bn pa) because foreigners own large shares of Australian assets and repatriate profits and interest.",
    },
    policy2: {
      title: "Factors Affecting the AUD Exchange Rate",
      content: "Australia has a floating exchange rate since 1983 — the AUD is determined by supply and demand in foreign exchange markets. The most important determinants for Australia are: commodity prices (especially iron ore — China's demand drives both Australian exports and AUD demand), relative interest rates (RBA rate rises relative to the US Fed attract capital, appreciating AUD), and risk sentiment (in global downturns, investors sell AUD as a risk-sensitive commodity currency). The AUD has ranged from US$0.47 (2001) to US$1.10 (2011).",
    },
    limitation: "The J-curve effect means that an AUD depreciation may initially worsen the current account (import bills rise in AUD before export volumes respond), before improving it. Australia's current account remains vulnerable to commodity price cycles — a sharp fall in iron ore prices would simultaneously reduce export income and depreciate the AUD (imported inflation). The large net foreign liabilities (~50% of GDP) create a 'twin deficit' vulnerability.",
    judgement: "Australia's current account and exchange rate reflect deep structural features — commodity export specialisation, investment-savings imbalance, and deep financial integration. Policy interventions (beyond the floating rate acting as a buffer) have limited impact on these fundamentals. The key risks are commodity price volatility, China's economic slowdown, and a reversal of foreign capital inflows.",
    commonMistakes: [
      "Confusing current account with capital account — define both clearly",
      "Not explaining why Australia runs a persistent net primary income deficit",
      "Forgetting the J-curve effect when discussing exchange rate impacts on CAD",
      "Mixing up depreciation and devaluation — Australia has a floating rate (depreciation, not devaluation)",
    ],
    band6Tip: "Integrate the relationship between CAD and exchange rate: 'A persistent CAD requires capital inflows to finance it. If foreign investors reduce their willingness to hold Australian assets (e.g., in a global risk-off event), capital outflows can cause rapid AUD depreciation — which raises import prices, worsening inflation. This demonstrates how external stability and price stability objectives can conflict.' This cross-objective analysis earns Band 6.",
  },
  t1q4: {
    thesis: "Transnational corporations (TNCs) play an ambiguous role in economic development. While they provide capital, technology, employment, and export opportunities to host countries, they may also repatriate profits, exploit weaker regulations, and undermine domestic competitors. The net effect depends on the quality of host country institutions and the nature of TNC operations.",
    policy1: {
      title: "Benefits of TNCs for Host Countries",
      content: "TNCs provide foreign direct investment (FDI), which finances capital accumulation without generating foreign debt. They transfer technology, management skills, and intellectual property to host countries — the 'spillover effects' can raise the productivity of domestic industries. TNCs create employment, pay taxes, and can use host countries as export platforms (e.g., Samsung's manufacturing in Vietnam, BHP's Australian operations). The World Bank estimates FDI generates 1.5–2 times more economic activity than equivalent domestic investment due to knowledge spillovers.",
    },
    policy2: {
      title: "Limitations and Risks of TNCs",
      content: "TNCs repatriate profits to their home country — worsening the host country's net primary income account. Transfer pricing allows TNCs to artificially shift profits to low-tax jurisdictions, reducing host country tax revenue. In developing countries, TNCs may exploit weaker labour and environmental standards ('race to the bottom'). Large TNCs can crowd out domestic firms by outcompeting them on capital and technology, limiting local entrepreneurial development. TNCs in resource-rich developing countries may perpetuate commodity dependence (Dutch Disease).",
    },
    limitation: "The impact of TNCs varies enormously by sector, host country, and the quality of regulatory frameworks. Resource-extraction TNCs (mining, oil) tend to generate fewer spillovers than manufacturing or technology TNCs. Countries with strong institutions (property rights, rule of law, anti-corruption) are better able to capture the benefits of TNC investment while managing the risks.",
    judgement: "TNCs are neither simply beneficial nor harmful to development — they create both opportunities and risks. The key determinant of net impact is the policy framework: countries that negotiate strong FDI agreements, maintain regulatory capacity, and invest TNC tax revenues in education and infrastructure are best positioned to benefit.",
    commonMistakes: [
      "Only discussing benefits or only costs — the question requires balanced evaluation",
      "Confusing FDI (TNCs) with portfolio investment — they are different",
      "Not connecting TNC profits to the net primary income deficit in the current account",
      "Failing to provide a clear conclusion about net impact",
    ],
    band6Tip: "Distinguish between different types of TNCs: 'Resource-extraction TNCs (e.g., ExxonMobil in developing countries) typically generate fewer positive spillovers than manufacturing or technology TNCs, because resource extraction requires specialised equipment and skills that are imported rather than developed locally.' This sectoral nuance demonstrates higher-order thinking.",
  },
  t1q5: {
    thesis: "The impact of globalisation on income inequality is complex and contested: while between-country inequality has narrowed as developing nations grow, within-country inequality has widened in many economies including Australia. The net effect depends on the economic structure, policy framework, and stage of development of each country.",
    policy1: {
      title: "Globalisation Has Reduced Between-Country Inequality",
      content: "The most dramatic development of the past four decades has been the rise of China, India, and other emerging economies — driven largely by export-led globalisation. China's average GDP growth of ~10% pa from 1980–2010 lifted over 800 million people out of extreme poverty. Global absolute poverty has fallen from 36% in 1990 to under 10% by 2019 (World Bank). Narrowing income gaps between rich and poor nations is a clear benefit of globalisation.",
    },
    policy2: {
      title: "Globalisation Has Widened Within-Country Inequality",
      content: "Within developed countries including Australia, income inequality has increased since the 1980s. The Gini coefficient has risen in most OECD countries. Skill-biased technical change (driven by globalisation and technology) has raised returns for high-skilled workers while suppressing wages for low-skilled workers facing import competition (from manufacturing in developing countries). The outsourcing of jobs, growth of casual work, and declining unionisation have reduced the bargaining power of low-income workers in developed economies.",
    },
    limitation: "The evidence is nuanced: globalisation is not the only driver of within-country inequality — technological change, tax policy changes (lower top marginal rates), and reduced social spending also play roles. Countries that combine open trade with strong redistributive tax-transfer systems (Scandinavian countries) have maintained low inequality despite globalisation.",
    judgement: "Globalisation has both reduced global inequality (through convergence in living standards between nations) and increased inequality within many nations (through skill-biased labour market changes). The distributional impact is not inevitable — policy choices about taxation, redistribution, education, and social protection determine how the gains from globalisation are shared.",
    commonMistakes: [
      "Treating inequality as purely between countries OR purely within countries — you need both dimensions",
      "Not using specific data (Gini coefficients, poverty rates, specific country examples)",
      "Conflating correlation and causation — globalisation correlates with inequality, but technology and policy also matter",
      "Failing to address the 'to what extent' or evaluative element of the question",
    ],
    band6Tip: "Make the between/within distinction explicit and early: 'A crucial distinction must be drawn between between-country and within-country inequality. Globalisation has reduced the former by raising incomes in developing nations, while simultaneously widening the latter in many developed economies through skill-biased labour demand shifts.' This structural framing signals Band 6 analysis.",
  },
  t1q6: {
    thesis: "International environmental agreements — particularly the Paris Agreement (2015) — have established a framework for global action on climate change. However, their effectiveness has been constrained by the non-binding nature of national commitments, inadequate ambition, free-rider problems, and the tension between economic development and environmental sustainability.",
    policy1: {
      title: "Successes of International Environmental Agreements",
      content: "The Montreal Protocol (1987) is widely regarded as the most successful international environmental agreement — it has achieved a 98% reduction in ozone-depleting substances, demonstrating that binding agreements with compliance mechanisms can work. The Paris Agreement engaged 196 parties in voluntary emissions commitments (NDCs) — covering virtually all global emissions. Global renewable energy investment has surged. The IPCC provides the scientific credibility that informs policy globally.",
    },
    policy2: {
      title: "Limitations of International Environmental Agreements",
      content: "The Paris Agreement's NDCs are voluntary and non-binding — there is no enforcement mechanism for countries that fail to meet their commitments. Current NDC commitments are insufficient to limit warming to 1.5°C (the IPCC's preferred target), with estimates suggesting they lead to ~2.5°C by 2100. Free-rider problems persist — countries benefit from global emissions reductions achieved by others without bearing the full cost. The US withdrew from the Paris Agreement under Trump (2017–21), weakening its credibility.",
    },
    limitation: "A fundamental challenge is the tension between economic development and environmental sustainability. Developing nations argue that they should not be denied the path to industrialisation that rich countries took — requiring technology transfer and climate finance from developed nations. Carbon leakage — where production shifts to countries with weaker environmental standards — can undermine agreements in developed countries.",
    judgement: "International environmental agreements have been valuable in raising global awareness, establishing frameworks for action, and driving renewable energy investment. However, they remain insufficient to address climate change at the required speed and scale. More stringent, binding mechanisms — including carbon border adjustment mechanisms and stronger technology transfer commitments — are needed to significantly enhance effectiveness.",
    commonMistakes: [
      "Confusing Kyoto Protocol (1997) with Paris Agreement (2015) — know their key differences",
      "Only discussing climate change — mention biodiversity (Convention on Biological Diversity) or ozone (Montreal Protocol) for range",
      "Not explaining the free-rider problem in the context of global public goods",
      "Saying 'international agreements are effective' or 'ineffective' without qualification",
    ],
    band6Tip: "Apply the public goods framework: 'Climate stability is a global public good — non-excludable and non-rival. This creates a fundamental free-rider problem: every country benefits from global emission reductions regardless of their own contribution. International agreements must overcome this problem, but voluntary frameworks without enforcement mechanisms are inherently vulnerable to defection.' This theoretical grounding demonstrates Band 6 analytical depth.",
  },
  t1q7: {
    thesis: "Trade liberalisation — the reduction of barriers to international trade through bilateral FTAs, regional agreements, and multilateral negotiations — has played a significant role in Australia's economic growth by promoting specialisation, competition, and access to new markets. However, the benefits have not been uniform, and adjustment costs have created distributional tensions.",
    policy1: {
      title: "Benefits of Trade Liberalisation for Australia",
      content: "Australia's progressive dismantling of trade barriers since the 1980s has generated significant economic benefits. Manufacturing tariff reductions forced efficiency improvements and reallocation of resources to sectors of comparative advantage (resources, services). The Productivity Commission estimates trade liberalisation raised living standards by approximately 5.4%. FTAs have expanded market access: ChAFTA (2015) reduced tariffs on Australian agricultural and services exports to China; the CPTPP (2018) provides preferential access to 11 markets. Australia's export composition has shifted toward high-value resources and services where it has comparative advantage.",
    },
    policy2: {
      title: "Costs and Limitations of Trade Liberalisation",
      content: "Trade liberalisation has imposed significant structural adjustment costs. Manufacturing employment fell from ~20% of the workforce in the 1970s to under 7% by the 2020s, displacing workers who required retraining or faced long-term unemployment. The auto industry's exit (Ford 2016, GM Holden 2017, Toyota 2017) eliminated 50,000+ jobs. Benefits of liberalisation accrue primarily to owners of capital and highly-skilled labour, potentially worsening income inequality without compensating policies.",
    },
    limitation: "The Doha Round's failure demonstrates limits to multilateral liberalisation. Modern trade barriers are increasingly non-tariff (regulatory standards, rules of origin, digital trade) — harder to address through traditional tariff negotiations. Trade diversion from bilateral FTAs may reduce global efficiency compared to multilateral liberalisation. Australia's exposure to China dependence (~30% of exports) creates geopolitical vulnerability.",
    judgement: "Trade liberalisation has been broadly beneficial for Australia's long-run economic growth, raising efficiency and living standards. However, the benefits have been unevenly distributed, and structural adjustment support has been inadequate. Going forward, the focus should be on market diversification (reducing China concentration), addressing modern non-tariff barriers, and stronger adjustment assistance for displaced workers.",
    commonMistakes: [
      "Defining 'trade liberalisation' too narrowly — include multilateral, regional, and bilateral dimensions",
      "Ignoring distributional impacts and structural adjustment costs",
      "Not distinguishing between trade liberalisation and globalisation more broadly",
      "Using the wrong terminology: 'devaluation' vs 'depreciation'; 'tariff' vs 'NTB'",
    ],
    band6Tip: "Distinguish short-run from long-run effects: 'Trade liberalisation imposes short-run adjustment costs — particularly structural unemployment as uncompetitive industries contract — but generates long-run gains through improved resource allocation and productivity. The policy challenge is managing the transition, which requires targeted structural adjustment assistance alongside trade reforms.'",
  },
  t1q8: {
    thesis: "Australia faces a fundamental challenge in achieving sustained economic growth while maintaining environmental sustainability — two objectives that frequently conflict in the short run, but can be reconciled in the long run through appropriate policy frameworks, technological innovation, and international cooperation.",
    policy1: {
      title: "Policies to Promote Green Growth",
      content: "The Capacity Investment Scheme (underwrites 32 GW of new renewables by 2030), the enhanced Safeguard Mechanism (declining emissions baselines for Australia's 215 largest industrial emitters), and the Future Made in Australia industrial policy framework represent a coordinated push toward decoupling economic growth from emissions. Renewable energy now accounts for over 35% of Australia's electricity generation and growing. Carbon Credit Units (ACCUs) provide market incentives for emissions reduction. The transition to clean energy is estimated to create 60,000+ jobs in renewable energy and critical minerals by 2030.",
    },
    policy2: {
      title: "Tensions Between Growth and Sustainability",
      content: "Australia simultaneously exports vast quantities of coal and LNG — a fundamental tension with global climate commitments. Coal and LNG exports represent 15–20% of total export revenue; reducing them risks deteriorating the terms of trade and widening the current account deficit. Strong economic growth increases consumption and production → higher emissions → conflicts with net zero by 2050 target. The 'carbon curse' dilemma: Australia's resource sector is both its greatest comparative advantage and its greatest sustainability challenge.",
    },
    limitation: "Environmental policies (carbon pricing, regulations) impose short-run costs on growth — businesses face higher input costs, some industries become uncompetitive. The risk of carbon leakage means that if Australia strengthens environmental policies without international coordination, emissions-intensive production simply shifts offshore. The just transition problem: communities dependent on coal mining (Hunter Valley, Latrobe Valley) face structural unemployment as the industry declines.",
    judgement: "Growth and environmental sustainability can be reconciled in the long run through investment in renewable energy, energy efficiency, and green technology — but this requires sustained policy commitment, investment certainty, and international cooperation. The transition is not cost-free: managing the social costs of structural adjustment in fossil fuel communities is critical for maintaining political support for the policy framework.",
    commonMistakes: [
      "Treating growth and sustainability as always in conflict — green growth shows they can be compatible",
      "Not mentioning specific Australian policies (Safeguard Mechanism, Capacity Investment Scheme)",
      "Failing to acknowledge Australia's coal/LNG export dilemma",
      "Not linking environmental policy to economic objectives like growth, employment, and external stability",
    ],
    band6Tip: "Apply the Environmental Kuznets Curve (EKC) hypothesis: 'As economies grow and reach higher income levels, they tend to prioritise environmental quality and develop the technological capacity to decouple growth from emissions. Australia's transition from coal toward renewables may represent movement along the EKC — but active policy is required to accelerate this transition and prevent long-run environmental damage.' This theoretical framework demonstrates synthesis.",
  },
};

export function EssayPlanner({ state }: EssayPlannerProps) {
  const isDark = state.theme === "dark";
  const [activeTopic, setActiveTopic] = useState<"topic1" | "topic4">(state.currentTopic === "topic1" ? "topic1" : "topic4");
  const [selectedQ, setSelectedQ] = useState<string | null>(null);
  const [scaffold, setScaffold] = useState<Scaffold | null>(null);
  const [showMistakes, setShowMistakes] = useState(false);

  const questions = activeTopic === "topic1" ? topic1Questions : topic4Questions;
  const scaffolds = activeTopic === "topic1" ? topic1Scaffolds : topic4Scaffolds;

  const handleGenerate = (id: string) => {
    setSelectedQ(id);
    setScaffold(scaffolds[id] || null);
    setShowMistakes(false);
  };

  const handleTopicChange = (topic: "topic1" | "topic4") => {
    setActiveTopic(topic);
    setSelectedQ(null);
    setScaffold(null);
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

        {/* Topic toggle */}
        <div className={`flex gap-2 p-1 rounded-xl ${isDark ? "bg-slate-900 border border-slate-800" : "bg-slate-100 border border-slate-200"}`}>
          <button
            onClick={() => handleTopicChange("topic1")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTopic === "topic1"
                ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-400 border border-violet-500/30"
                : isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Globe size={14} />
            Topic 1: Global Economy
          </button>
          <button
            onClick={() => handleTopicChange("topic4")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTopic === "topic4"
                ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400 border border-cyan-500/30"
                : isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Building2 size={14} />
            Topic 4: Economic Policy
          </button>
        </div>

        {/* Question list */}
        <div className="space-y-2">
          {questions.map((q) => (
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
