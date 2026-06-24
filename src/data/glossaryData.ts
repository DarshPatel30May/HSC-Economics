export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  relatedTerms: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  // ─── MACROECONOMICS ────────────────────────────────────────────────────────
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
    term: "Business Cycle",
    definition:
      "The recurring pattern of expansion (rising GDP and falling unemployment) and contraction (falling GDP and rising unemployment) in economic activity around the long-run trend. Phases include expansion, peak, contraction/recession, and trough. Macroeconomic policy aims to smooth business cycle fluctuations.",
    category: "Macroeconomics",
    relatedTerms: ["Aggregate Demand", "Fiscal Policy", "Monetary Policy"],
  },
  {
    term: "Output Gap",
    definition:
      "The difference between actual GDP and potential GDP (the economy's productive capacity). A positive output gap (actual > potential) indicates inflationary pressure. A negative output gap (actual < potential) indicates spare capacity and cyclical unemployment. Macroeconomic policy aims to close recessionary output gaps without creating inflationary pressure.",
    category: "Macroeconomics",
    relatedTerms: ["Business Cycle", "Potential GDP", "Aggregate Demand"],
  },
  {
    term: "Multiplier Effect",
    definition:
      "The process by which an initial injection of government spending (or other expenditure) generates a larger final increase in GDP. Recipients of government spending use part of their income for further spending, creating additional rounds of economic activity. The size of the multiplier depends on the marginal propensity to consume (MPC).",
    category: "Fiscal Policy",
    relatedTerms: ["Fiscal Policy", "Aggregate Demand", "Discretionary Policy"],
  },
  {
    term: "Phillips Curve",
    definition:
      "A theoretical inverse relationship between inflation and unemployment: lower unemployment tends to coincide with higher inflation as wages rise in tight labour markets. In the short run the curve is downward sloping; in the long run it is vertical at the NAIRU, meaning there is no permanent trade-off. Policy makers must balance both objectives.",
    category: "Macroeconomics",
    relatedTerms: ["NAIRU", "Inflation", "Full Employment"],
  },
  {
    term: "Crowding Out",
    definition:
      "The reduction in private-sector investment caused by government borrowing. When government runs large deficits it must borrow heavily, competing with private borrowers and pushing up interest rates, which discourages private investment. Crowding out is a key criticism of expansionary fiscal policy in near-full-employment conditions.",
    category: "Fiscal Policy",
    relatedTerms: ["Budget Deficit", "Fiscal Policy", "Interest Rates"],
  },

  // ─── FISCAL POLICY ─────────────────────────────────────────────────────────
  {
    term: "Fiscal Policy",
    definition:
      "The federal government's use of its budget — decisions about taxation and government expenditure — to influence aggregate demand and achieve macroeconomic objectives. An expansionary fiscal stance (deficit spending) raises AD; a contractionary stance (surplus) reduces AD.",
    category: "Policy",
    relatedTerms: ["Budget Deficit", "Budget Surplus", "Automatic Stabilisers", "Discretionary Policy"],
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
    term: "Infrastructure Investment",
    definition:
      "Government spending on long-lived capital such as roads, railways, ports, energy networks, and broadband. Provides both a short-run demand stimulus (construction spending) and a long-run supply-side benefit by lifting productivity and reducing business costs. A key form of discretionary fiscal policy in Australia.",
    category: "Fiscal Policy",
    relatedTerms: ["Fiscal Policy", "Productivity", "Discretionary Policy"],
  },

  // ─── MONETARY POLICY ───────────────────────────────────────────────────────
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
    term: "Inflation Targeting",
    definition:
      "A monetary policy framework in which the central bank explicitly commits to maintaining inflation within a specified target band. Australia's RBA targets CPI inflation of 2–3% on average over the medium term. This framework provides transparency and anchors inflationary expectations, reducing inflation persistence.",
    category: "Monetary Policy",
    relatedTerms: ["Monetary Policy", "Cash Rate", "Price Stability"],
  },
  {
    term: "Quantitative Easing (QE)",
    definition:
      "An unconventional monetary policy tool used when interest rates are near zero, whereby the central bank purchases government bonds and other financial assets to inject money into the economy, lower long-term interest rates, and stimulate lending. The RBA deployed QE during COVID-19 (2020–22), purchasing $281 billion in bonds.",
    category: "Monetary Policy",
    relatedTerms: ["Monetary Policy", "Cash Rate", "Unconventional Monetary Policy"],
  },
  {
    term: "Unconventional Monetary Policy",
    definition:
      "Non-standard monetary policy tools used when the cash rate reaches the effective lower bound (near zero) and further rate cuts are not possible. Includes quantitative easing (asset purchases), yield curve control, forward guidance, and Term Funding Facility. Used by the RBA during the COVID-19 pandemic.",
    category: "Monetary Policy",
    relatedTerms: ["Quantitative Easing (QE)", "Cash Rate", "Monetary Policy"],
  },

  // ─── ECONOMIC OBJECTIVES ───────────────────────────────────────────────────
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
    term: "Environmental Sustainability",
    definition:
      "An economic objective that recognises that growth must not permanently deplete or damage the natural resource base. Balancing economic activity with environmental preservation ensures that future generations can meet their own needs. It often conflicts with short-run economic growth objectives.",
    category: "Economic Objectives",
    relatedTerms: ["Externalities", "Market Failure", "Economic Growth"],
  },
  {
    term: "Income Distribution",
    definition:
      "An economic objective concerned with how national income is shared across the population. Measured by the Gini coefficient (0 = perfect equality, 1 = maximum inequality). Australia uses progressive taxation and social transfers to reduce inequality. Excessive inequality can reduce social cohesion and long-run economic growth.",
    category: "Economic Objectives",
    relatedTerms: ["Gini Coefficient", "Fiscal Policy", "Living Standards"],
  },
  {
    term: "Price Stability",
    definition:
      "An economic objective seeking low and stable inflation (2–3% in Australia). Price stability preserves the real value of money, reduces uncertainty for businesses and investors, and prevents the redistribution of income from creditors to debtors. It is the primary objective of the RBA.",
    category: "Economic Objectives",
    relatedTerms: ["Inflation Targeting", "Monetary Policy", "CPI"],
  },

  // ─── MICROECONOMICS ────────────────────────────────────────────────────────
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
    term: "Competition Policy",
    definition:
      "Government policies designed to promote competitive markets and prevent anti-competitive conduct such as cartels, price-fixing, and market collusion. In Australia, the Australian Competition and Consumer Commission (ACCC) enforces competition law under the Competition and Consumer Act 2010. Greater competition drives efficiency and lower prices.",
    category: "Microeconomics",
    relatedTerms: ["Microeconomic Reform", "Deregulation", "Efficiency"],
  },
  {
    term: "Deregulation",
    definition:
      "The reduction or removal of government regulations that restrict competition or entry into markets. Deregulation can lower business costs, increase competition, and improve productive efficiency. Examples include financial market deregulation in the 1980s (floating the AUD, allowing foreign banks) and electricity market reform.",
    category: "Microeconomics",
    relatedTerms: ["Microeconomic Reform", "Competition Policy", "Privatisation"],
  },
  {
    term: "Privatisation",
    definition:
      "The transfer of ownership of government-owned enterprises to the private sector. The rationale is that private firms face profit incentives and market discipline, improving efficiency. Australian examples include the sale of Telstra, Qantas, and the Commonwealth Bank. Critics argue it reduces public accountability for essential services.",
    category: "Microeconomics",
    relatedTerms: ["Microeconomic Reform", "Deregulation", "Efficiency"],
  },
  {
    term: "Supply-Side Policy",
    definition:
      "Policies aimed at increasing the economy's productive capacity (shifting LRAS right) rather than managing demand. Includes microeconomic reforms (deregulation, privatisation, competition policy), investment in education and training, infrastructure spending, and reductions in business taxes. Contrasts with demand-side fiscal and monetary policy.",
    category: "Microeconomics",
    relatedTerms: ["Microeconomic Reform", "Aggregate Supply", "Productivity"],
  },

  // ─── LABOUR MARKET ─────────────────────────────────────────────────────────
  {
    term: "NAIRU",
    definition:
      "Non-Accelerating Inflation Rate of Unemployment. The lowest rate of unemployment consistent with stable (non-accelerating) inflation. Below the NAIRU, tight labour markets push up wages and prices. Australia's NAIRU is estimated at around 4–5%. It represents the full employment benchmark for policy purposes.",
    category: "Labour Market",
    relatedTerms: ["Full Employment", "Inflation", "Phillips Curve"],
  },
  {
    term: "Structural Unemployment",
    definition:
      "Unemployment caused by a mismatch between the skills workers have and the skills demanded by employers, often following structural changes in the economy (e.g., decline of manufacturing, automation). Long-term and requires retraining, education, and labour market reform — not merely demand stimulus — to reduce.",
    category: "Labour Market",
    relatedTerms: ["Frictional Unemployment", "Labour Market Policy", "Microeconomic Reform"],
  },
  {
    term: "Frictional Unemployment",
    definition:
      "Temporary unemployment that arises as workers move between jobs. It reflects normal labour market turnover and information search time. Frictional unemployment exists even in a healthy economy and is part of the NAIRU. Policies that improve job-matching information (e.g., employment services) can reduce it.",
    category: "Labour Market",
    relatedTerms: ["Structural Unemployment", "NAIRU", "Full Employment"],
  },
  {
    term: "Cyclical Unemployment",
    definition:
      "Unemployment caused by insufficient aggregate demand during the contractionary phase of the business cycle. It falls when the economy expands. Cyclical unemployment is the target of expansionary fiscal and monetary policy. It is sometimes called demand-deficient unemployment.",
    category: "Labour Market",
    relatedTerms: ["Business Cycle", "Aggregate Demand", "Fiscal Policy"],
  },
  {
    term: "Wage Flexibility",
    definition:
      "The ability of wages to adjust to labour market conditions. Greater wage flexibility allows real wages to fall during downturns (preserving employment) and rise during booms. Enterprise bargaining and WorkChoices-era reforms aimed to increase flexibility. Critics argue flexibility can reduce wages and conditions for low-income workers.",
    category: "Labour Market",
    relatedTerms: ["Labour Market Policy", "NAIRU", "Structural Unemployment"],
  },

  // ─── MARKET FAILURE / ENVIRONMENT ──────────────────────────────────────────
  {
    term: "Externalities",
    definition:
      "Costs or benefits imposed on third parties who are not part of a market transaction. Negative externalities (e.g., pollution, carbon emissions) cause markets to overproduce harmful goods — a form of market failure. Positive externalities (e.g., education, vaccination) cause markets to underproduce beneficial goods. Government intervention corrects externalities.",
    category: "Market Failure",
    relatedTerms: ["Environmental Sustainability", "Market Failure", "Carbon Pricing"],
  },
  {
    term: "Carbon Pricing",
    definition:
      "A market-based instrument that puts a price on greenhouse gas emissions to internalise the negative externality of carbon pollution. Forms include a carbon tax (fixed price per tonne of CO₂-e) or an Emissions Trading Scheme (cap-and-trade). Australia implemented a carbon price (2012–14) and has a Safeguard Mechanism for large emitters.",
    category: "Environmental Policy",
    relatedTerms: ["Emissions Trading Scheme", "Externalities", "Environmental Sustainability"],
  },
  {
    term: "Emissions Trading Scheme (ETS)",
    definition:
      "A cap-and-trade system where the government sets a limit (cap) on total emissions and issues permits. Firms that reduce emissions below their allocation can sell permits; firms that exceed it must buy them. The price of permits is determined by the market. Australia's Safeguard Mechanism operates as a form of emissions trading for large facilities.",
    category: "Environmental Policy",
    relatedTerms: ["Carbon Pricing", "Environmental Sustainability", "Externalities"],
  },

  // ─── EXTERNAL SECTOR ───────────────────────────────────────────────────────
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
  {
    term: "Balance of Payments (BoP)",
    definition:
      "A systematic record of all economic transactions between Australian residents and the rest of the world over a period. Comprises the Current Account (trade in goods/services + income + transfers) and the Capital and Financial Account (investment flows). By definition, the BoP must balance — a CAD is financed by a net capital inflow.",
    category: "External Sector",
    relatedTerms: ["Current Account Deficit", "Financial Account", "External Stability"],
  },
  {
    term: "Exchange Rate",
    definition:
      "The price of one currency in terms of another. Australia operates a free-floating exchange rate determined by supply and demand in the foreign exchange market. A higher AUD makes exports more expensive and imports cheaper; a lower AUD does the opposite. The exchange rate is a key automatic stabiliser for Australia's external position.",
    category: "External Sector",
    relatedTerms: ["Appreciation", "Depreciation", "Terms of Trade"],
  },
  {
    term: "Appreciation",
    definition:
      "An increase in the value of the Australian dollar relative to other currencies under a floating exchange rate. Appreciation makes imports cheaper (lowering inflation) but reduces export competitiveness. It is typically caused by rising commodity prices, higher interest rate differentials, or stronger economic outlook attracting capital inflows.",
    category: "External Sector",
    relatedTerms: ["Exchange Rate", "Depreciation", "Terms of Trade"],
  },
  {
    term: "Depreciation",
    definition:
      "A fall in the value of the Australian dollar relative to other currencies. Depreciation makes exports cheaper for foreigners (boosting export revenue) but raises import prices, potentially increasing inflation. It is caused by falling commodity prices, lower interest rate differentials, or capital outflows driven by risk-off sentiment.",
    category: "External Sector",
    relatedTerms: ["Exchange Rate", "Appreciation", "J-Curve Effect"],
  },
  {
    term: "J-Curve Effect",
    definition:
      "The short-run deterioration in the current account following a currency depreciation, before an eventual improvement. Immediately after depreciation, import costs rise (in AUD terms) while export volumes respond slowly (due to existing contracts). Over time, the higher competitiveness of exports raises volumes, improving the CAD. The path traces a 'J' shape.",
    category: "External Sector",
    relatedTerms: ["Depreciation", "Current Account Deficit", "Exchange Rate"],
  },
  {
    term: "Capital and Financial Account",
    definition:
      "The component of the Balance of Payments recording financial flows between Australia and the rest of the world. Includes foreign direct investment (FDI), portfolio investment (shares and bonds), and other financial flows. A net inflow (financial account surplus) finances Australia's current account deficit.",
    category: "External Sector",
    relatedTerms: ["Balance of Payments", "Foreign Direct Investment", "Current Account Deficit"],
  },

  // ─── GLOBAL ECONOMY ────────────────────────────────────────────────────────
  {
    term: "Globalisation",
    definition:
      "The increasing integration and interdependence of economies, societies, and cultures around the world through the flow of goods, services, capital, labour, and information. Key drivers include trade liberalisation, technological advancement (internet, containerisation), and the rise of transnational corporations. It has accelerated since the 1980s.",
    category: "Global Economy",
    relatedTerms: ["Trade Liberalisation", "Transnational Corporation (TNC)", "Foreign Direct Investment"],
  },
  {
    term: "Trade Liberalisation",
    definition:
      "The reduction or elimination of barriers to international trade, including tariffs, quotas, and subsidies. Promoted by the WTO through multilateral trade rounds and by bilateral and regional Free Trade Agreements (FTAs). Australia has pursued extensive trade liberalisation since the 1980s, reducing average tariffs from around 30% to under 5%.",
    category: "Global Economy",
    relatedTerms: ["Globalisation", "World Trade Organization (WTO)", "Comparative Advantage"],
  },
  {
    term: "Comparative Advantage",
    definition:
      "The ability of a country to produce a good at a lower opportunity cost than another country. Even if one country has an absolute advantage in all goods, trade is still mutually beneficial if each country specialises in goods with the lowest opportunity cost. Comparative advantage is the theoretical foundation for international trade.",
    category: "Global Economy",
    relatedTerms: ["Absolute Advantage", "Trade Liberalisation", "Protectionism"],
  },
  {
    term: "Absolute Advantage",
    definition:
      "The ability of a country to produce more of a good with the same resources (or the same output with fewer resources) than another country. Australia has an absolute advantage in iron ore mining. Unlike comparative advantage, absolute advantage does not by itself determine the pattern of trade.",
    category: "Global Economy",
    relatedTerms: ["Comparative Advantage", "Trade Liberalisation"],
  },
  {
    term: "Protectionism",
    definition:
      "Government policies that restrict international trade to protect domestic industries from foreign competition. Includes tariffs, quotas, subsidies, and non-tariff barriers. Protectionist arguments include infant industry protection, national security, and job preservation. Critics argue it raises prices for consumers, reduces efficiency, and invites retaliation.",
    category: "Global Economy",
    relatedTerms: ["Tariff", "Quota", "Trade Liberalisation", "Comparative Advantage"],
  },
  {
    term: "Tariff",
    definition:
      "A tax levied on imported goods, making them more expensive relative to domestically produced goods. Tariffs raise government revenue and protect domestic producers from import competition, but reduce consumer welfare and economic efficiency. Australia has significantly reduced tariffs since the 1980s as part of trade liberalisation.",
    category: "Global Economy",
    relatedTerms: ["Protectionism", "Quota", "Trade Liberalisation"],
  },
  {
    term: "Quota",
    definition:
      "A quantitative restriction on the volume of goods that can be imported or exported in a given period. Import quotas limit foreign competition and support domestic producers, but restrict consumer choice and raise prices. Unlike tariffs, quotas generate no government revenue. They are generally considered less efficient than tariffs.",
    category: "Global Economy",
    relatedTerms: ["Protectionism", "Tariff", "Trade Liberalisation"],
  },
  {
    term: "Subsidy",
    definition:
      "A government payment to domestic producers, reducing their costs and enabling them to compete with cheaper foreign imports or to sell on world markets at lower prices. Subsidies are a form of protectionism that distorts trade and can constitute unfair competition under WTO rules. Agricultural subsidies by the US and EU are a major trade dispute.",
    category: "Global Economy",
    relatedTerms: ["Protectionism", "Dumping", "World Trade Organization (WTO)"],
  },
  {
    term: "Dumping",
    definition:
      "The practice of exporting goods at prices below the cost of production or below domestic market prices in order to undercut foreign competitors and gain market share. Dumping is considered an unfair trade practice under WTO rules. Affected countries can impose anti-dumping duties to counteract the price advantage.",
    category: "Global Economy",
    relatedTerms: ["Protectionism", "World Trade Organization (WTO)", "Subsidy"],
  },
  {
    term: "World Trade Organization (WTO)",
    definition:
      "The international body established in 1995 to oversee global trade rules, facilitate trade negotiations, and resolve disputes. Replaced the GATT. Key principles include non-discrimination (MFN and national treatment), transparency, and reciprocity. WTO dispute settlement is binding. Australia is a founding member.",
    category: "Global Economy",
    relatedTerms: ["Trade Liberalisation", "Protectionism", "Free Trade Agreement"],
  },
  {
    term: "Free Trade Agreement (FTA)",
    definition:
      "A bilateral or regional agreement between countries to reduce or eliminate tariffs, quotas, and other barriers to trade and investment. Australia has FTAs with major partners including the US, China, Japan, South Korea, ASEAN, and the UK. FTAs can divert trade away from more efficient non-partner countries (trade diversion).",
    category: "Global Economy",
    relatedTerms: ["Trade Liberalisation", "World Trade Organization (WTO)", "Comparative Advantage"],
  },
  {
    term: "Infant Industry Argument",
    definition:
      "The protectionist rationale that new domestic industries need temporary trade protection to develop economies of scale and become internationally competitive before being exposed to free trade. Accepted as a valid but limited exception to free trade. Critics note governments often struggle to identify genuine infant industries and protection tends to become permanent.",
    category: "Global Economy",
    relatedTerms: ["Protectionism", "Tariff", "Comparative Advantage"],
  },
  {
    term: "Transnational Corporation (TNC)",
    definition:
      "A large firm that owns or controls production, services, or assets in two or more countries. TNCs are major drivers of globalisation through foreign direct investment, technology transfer, and global supply chains. Examples include BHP, Apple, Toyota, and Shell. They can bring capital and technology to host countries but may reduce tax revenue through transfer pricing.",
    category: "Global Economy",
    relatedTerms: ["Foreign Direct Investment", "Globalisation", "Transfer Pricing"],
  },
  {
    term: "Foreign Direct Investment (FDI)",
    definition:
      "Investment by a firm or individual in one country into business interests in another country — typically involving establishment or acquisition of business operations (10%+ ownership stake). FDI provides capital, technology, and employment to host countries. Australia is a major recipient of FDI in mining, agriculture, and financial services.",
    category: "Global Economy",
    relatedTerms: ["Transnational Corporation (TNC)", "Globalisation", "Capital and Financial Account"],
  },
  {
    term: "Portfolio Investment",
    definition:
      "Cross-border investment in financial assets such as shares, bonds, and money market instruments where the investor does not seek management control (less than 10% ownership). Distinguished from FDI by its shorter-term and more liquid nature. Large portfolio inflows can make countries vulnerable to sudden capital flight ('sudden stops').",
    category: "Global Economy",
    relatedTerms: ["Foreign Direct Investment", "Capital and Financial Account", "Exchange Rate"],
  },
  {
    term: "International Monetary Fund (IMF)",
    definition:
      "An international organisation with 190 member countries that promotes global monetary cooperation, exchange rate stability, and balanced trade. Provides emergency loans to countries facing balance of payments crises, usually with conditions (austerity measures). Also monitors global economic trends and advises on policy.",
    category: "Global Economy",
    relatedTerms: ["World Bank", "G20", "External Stability"],
  },
  {
    term: "World Bank",
    definition:
      "An international financial institution that provides loans and grants to developing countries for capital programs aimed at reducing poverty and promoting development. Comprises the IBRD (middle-income countries) and IDA (low-income countries). Distinct from the IMF, which focuses on monetary stability rather than development finance.",
    category: "Global Economy",
    relatedTerms: ["International Monetary Fund (IMF)", "Economic Development", "Foreign Aid"],
  },
  {
    term: "G20",
    definition:
      "The Group of Twenty: a forum for governments and central bank governors from 19 countries plus the EU, representing around 85% of global GDP. Established in 1999, the G20 coordinates international economic and financial policy, including responses to global crises. Australia hosted the G20 in Brisbane in 2014.",
    category: "Global Economy",
    relatedTerms: ["International Monetary Fund (IMF)", "Globalisation", "Economic Policy"],
  },
  {
    term: "Economic Development",
    definition:
      "A broader concept than economic growth, referring to improvements in living standards, quality of life, health, education, and income distribution — particularly in developing countries. Measured by the Human Development Index (HDI) which combines GDP per capita, life expectancy, and education. Development requires not just growth but equitable distribution of its benefits.",
    category: "Development",
    relatedTerms: ["Human Development Index (HDI)", "Economic Growth", "Income Inequality"],
  },
  {
    term: "Human Development Index (HDI)",
    definition:
      "A composite measure of human development combining three dimensions: health (life expectancy at birth), education (mean and expected years of schooling), and living standard (Gross National Income per capita). Published annually by the UNDP. Countries with high HDI (above 0.8) include Australia, which consistently ranks in the top 10.",
    category: "Development",
    relatedTerms: ["Economic Development", "Income Inequality", "Living Standards"],
  },
  {
    term: "Income Inequality",
    definition:
      "The uneven distribution of income across individuals or households in an economy. Measured by the Gini coefficient (0 = perfect equality, 1 = maximum inequality). Rising income inequality in many developed economies since the 1980s is partly linked to globalisation (labour market pressures), skill-biased technological change, and policy settings.",
    category: "Development",
    relatedTerms: ["Gini Coefficient", "Income Distribution", "Human Development Index (HDI)"],
  },
  {
    term: "Gini Coefficient",
    definition:
      "A statistical measure of income or wealth inequality within a population, ranging from 0 (perfect equality) to 1 (maximum inequality). Australia's Gini coefficient is around 0.33. A rising Gini indicates worsening inequality. Policy tools to reduce inequality include progressive taxation, social welfare transfers, and investment in public education and healthcare.",
    category: "Development",
    relatedTerms: ["Income Inequality", "Income Distribution", "Fiscal Policy"],
  },
  {
    term: "Transfer Pricing",
    definition:
      "The prices set by transnational corporations for transactions between their subsidiaries in different countries. By manipulating these prices, TNCs can shift profits to low-tax jurisdictions, reducing their tax liability in high-tax countries like Australia. The OECD's Base Erosion and Profit Shifting (BEPS) project aims to address this.",
    category: "Global Economy",
    relatedTerms: ["Transnational Corporation (TNC)", "Foreign Direct Investment", "Globalisation"],
  },
  {
    term: "Labour Mobility",
    definition:
      "The ability of workers to move between jobs, industries, or geographic locations. International labour mobility (migration) is a component of globalisation. Skilled migration fills labour shortages and transfers knowledge; unskilled migration can reduce wages in low-skill sectors. Australia's immigration program is a major source of labour supply.",
    category: "Global Economy",
    relatedTerms: ["Globalisation", "Structural Unemployment", "Brain Drain"],
  },
  {
    term: "Brain Drain",
    definition:
      "The emigration of highly educated and skilled workers from developing (or lower-income) countries to developed countries seeking higher wages and better opportunities. Reduces human capital in origin countries and can widen development gaps. Conversely, 'brain gain' occurs when skilled migrants improve productivity in the destination country.",
    category: "Global Economy",
    relatedTerms: ["Labour Mobility", "Economic Development", "Human Development Index (HDI)"],
  },
  {
    term: "Global Financial Crisis (GFC)",
    definition:
      "The worldwide economic downturn of 2007–09 triggered by the collapse of the US subprime mortgage market and the consequent failure of major financial institutions. Caused a sharp contraction in global trade and credit. Australia avoided recession due to strong fiscal stimulus (Rudd Government stimulus packages worth ~$52 billion) and rising Chinese demand for commodities.",
    category: "Global Economy",
    relatedTerms: ["Fiscal Policy", "Aggregate Demand", "Discretionary Policy"],
  },
  {
    term: "Foreign Aid",
    definition:
      "Voluntary transfers of resources (grants, concessional loans, technical assistance) from developed to developing countries to promote development and reduce poverty. Australia channels aid through DFAT's Official Development Assistance (ODA) program, targeting the Indo-Pacific region. Aid represents less than 0.22% of Australian GNI, below the UN target of 0.7%.",
    category: "Global Economy",
    relatedTerms: ["Economic Development", "World Bank", "Income Inequality"],
  },
];
