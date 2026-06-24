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

export const topic1Sections: Section[] = [
  {
    id: "t1-global-intro",
    title: "Introduction to the Global Economy",
    icon: "Globe",
    color: "from-cyan-500 to-blue-600",
    accent: "cyan",
    description: "The nature of the global economy, key features and indicators.",
    causeEffect: "Rising interconnectedness of economies → greater trade flows, capital mobility, and interdependence → economic growth but also greater vulnerability to external shocks.",
    examLink: "Often used as context in essay introductions. Always define 'global economy' and reference Australia's open economy.",
    glossaryTerms: ["globalisation", "interdependence", "GDP", "GNI", "trade openness"],
    subsections: [
      {
        id: "t1-global-intro-1",
        title: "What is the Global Economy?",
        content: `<p>The <strong>global economy</strong> refers to the interconnected system of economies of all nations, linked through trade in goods and services, financial flows, and the movement of labour and capital across borders.</p>
<ul>
  <li><strong>Integration</strong>: The extent to which national economies have merged into one global market.</li>
  <li><strong>Interdependence</strong>: Economies rely on each other for resources, markets and finance.</li>
  <li><strong>Openness</strong>: Australia is a small, open economy — highly dependent on trade and foreign investment.</li>
</ul>
<p>Key indicators of global economic integration include rising trade-to-GDP ratios, increasing foreign direct investment (FDI) flows, and cross-border financial transactions.</p>`,
      },
      {
        id: "t1-global-intro-2",
        title: "Measuring the Global Economy",
        content: `<p>Economists use several measures to describe the size and performance of the global economy:</p>
<ul>
  <li><strong>GDP (Gross Domestic Product)</strong>: Total value of goods and services produced within a country's borders in a given period.</li>
  <li><strong>GNI (Gross National Income)</strong>: GDP plus net income from abroad — measures the income of a country's residents regardless of location.</li>
  <li><strong>GDP per capita</strong>: GDP divided by population — used as a proxy for living standards.</li>
  <li><strong>PPP (Purchasing Power Parity)</strong>: Adjusts GDP for price level differences between countries — enables fairer cross-country comparisons.</li>
</ul>
<p>As of the 2020s, the US, China, EU, Japan, and India are the world's largest economies. China has grown rapidly and is the world's largest economy by PPP.</p>`,
      },
      {
        id: "t1-global-intro-3",
        title: "Australia in the Global Economy",
        content: `<p>Australia is a small, open, developed economy that is highly integrated into the global economy:</p>
<ul>
  <li>Australia is ranked approximately 13th largest economy by nominal GDP.</li>
  <li>Trade accounts for over 40% of Australian GDP.</li>
  <li>Australia's main trading partners are China, Japan, South Korea, the US, and India.</li>
  <li>Australia relies heavily on <strong>commodity exports</strong> (iron ore, coal, LNG, gold) and services exports (education, tourism).</li>
  <li>Australia attracts significant inflows of foreign direct investment (FDI), particularly in mining, real estate, and finance.</li>
</ul>
<p>Australia's economic performance is therefore heavily influenced by global economic conditions — particularly the economic growth of China and other Asian trading partners.</p>`,
      },
    ],
  },
  {
    id: "t1-globalisation",
    title: "Globalisation",
    icon: "Network",
    color: "from-violet-500 to-purple-600",
    accent: "violet",
    description: "Forces driving globalisation and its dimensions.",
    causeEffect: "Technological advances and trade liberalisation → reduced barriers to trade and capital flows → deeper integration of national economies → benefits for efficiency and growth, but also challenges for inequality and sovereignty.",
    examLink: "Essays often ask you to evaluate whether globalisation has benefited or harmed Australia/developing nations. Use specific data.",
    glossaryTerms: ["globalisation", "FDI", "trade liberalisation", "deregulation", "MNC"],
    subsections: [
      {
        id: "t1-globalisation-1",
        title: "What is Globalisation?",
        content: `<p><strong>Globalisation</strong> is the process of increased integration and interdependence among national economies through trade, investment, migration, technology, and information flows.</p>
<p>It has four main dimensions:</p>
<ul>
  <li><strong>Trade globalisation</strong>: Growth in international trade in goods and services relative to GDP.</li>
  <li><strong>Financial globalisation</strong>: Growth in cross-border capital flows — FDI, portfolio investment, bank lending.</li>
  <li><strong>Production globalisation</strong>: Global supply chains — production spread across multiple countries.</li>
  <li><strong>Cultural globalisation</strong>: Spread of ideas, culture, and consumer preferences across borders.</li>
</ul>`,
      },
      {
        id: "t1-globalisation-2",
        title: "Drivers of Globalisation",
        content: `<p>Several forces have accelerated globalisation since the 1980s:</p>
<ul>
  <li><strong>Technological change</strong>: The internet, containerisation, and communications technology dramatically reduced the cost of international trade and transactions.</li>
  <li><strong>Trade liberalisation</strong>: Multilateral (WTO), bilateral, and regional trade agreements reduced tariffs and non-tariff barriers.</li>
  <li><strong>Financial deregulation</strong>: Countries removed capital controls, allowing free movement of money across borders. Australia floated the dollar and deregulated finance in the 1980s.</li>
  <li><strong>Rise of transnational corporations (TNCs)</strong>: Large corporations operate globally, organising production across countries to minimise costs.</li>
  <li><strong>Policy reforms</strong>: Many economies adopted market-based policies (privatisation, deregulation) that opened them to global competition.</li>
</ul>`,
      },
      {
        id: "t1-globalisation-3",
        title: "Benefits and Costs of Globalisation",
        content: `<p><strong>Benefits:</strong></p>
<ul>
  <li>Increased efficiency through specialisation and comparative advantage.</li>
  <li>Greater access to consumer goods and lower prices.</li>
  <li>Technology transfer and knowledge spillovers to developing nations.</li>
  <li>Greater FDI and capital accumulation in developing economies.</li>
  <li>Higher economic growth and rising living standards globally (800 million lifted out of poverty since 1990).</li>
</ul>
<p><strong>Costs:</strong></p>
<ul>
  <li>Job displacement in industries exposed to import competition (e.g., Australian manufacturing).</li>
  <li>Growing income inequality within countries — skilled workers benefit more.</li>
  <li>Environmental degradation from increased production and transport.</li>
  <li>Loss of economic sovereignty — policy decisions constrained by global markets.</li>
  <li>Greater vulnerability to external shocks (e.g., GFC 2008–09, COVID-19 pandemic).</li>
</ul>`,
      },
    ],
  },
  {
    id: "t1-trade",
    title: "International Trade",
    icon: "ArrowLeftRight",
    color: "from-emerald-500 to-teal-600",
    accent: "emerald",
    description: "Trade theory, comparative advantage, terms of trade and Australia's trade patterns.",
    causeEffect: "Specialisation according to comparative advantage → greater total output and consumption possibilities → rising living standards, but dependent on terms of trade.",
    examLink: "Calculate comparative advantage examples, explain TOT movements, analyse Australia's trade structure.",
    glossaryTerms: ["comparative advantage", "absolute advantage", "terms of trade", "exports", "imports", "balance of trade"],
    subsections: [
      {
        id: "t1-trade-1",
        title: "Absolute and Comparative Advantage",
        content: `<p><strong>Absolute advantage</strong> (Adam Smith): A country has an absolute advantage if it can produce a good using fewer resources than another country.</p>
<p><strong>Comparative advantage</strong> (David Ricardo): A country should specialise in the good for which its <em>opportunity cost</em> of production is lowest — even if it has absolute advantage in all goods.</p>
<p><strong>Example:</strong> If Australia produces 10 tonnes of wheat or 5 tonnes of steel per unit of labour, and Japan produces 4 tonnes of wheat or 4 tonnes of steel:</p>
<ul>
  <li>Australia's opportunity cost of wheat = 0.5 steel; opportunity cost of steel = 2 wheat.</li>
  <li>Japan's opportunity cost of wheat = 1 steel; opportunity cost of steel = 1 wheat.</li>
  <li>Australia has comparative advantage in wheat; Japan in steel. Both gain from trade.</li>
</ul>
<p>Gains from trade come from specialisation and exchange — total world output rises when each country specialises in its comparative advantage.</p>`,
      },
      {
        id: "t1-trade-2",
        title: "Terms of Trade",
        content: `<p>The <strong>terms of trade (TOT)</strong> measure the ratio of export prices to import prices:</p>
<p style="font-family:monospace; background:#1e293b; padding:8px; border-radius:6px; color:#94a3b8;">TOT = (Export Price Index / Import Price Index) × 100</p>
<ul>
  <li>An <strong>improvement</strong> in TOT: export prices rise relative to import prices → more imports per unit of exports → real income rises.</li>
  <li>A <strong>deterioration</strong> in TOT: export prices fall relative to import prices → less purchasing power from exports.</li>
</ul>
<p><strong>Australia's TOT</strong> reached record highs in 2010–11 and again in 2021–22 due to surging commodity prices (iron ore, coal, LNG). This boosted national income significantly. A fall in commodity prices (as seen 2012–2016) caused a deterioration in Australia's TOT.</p>
<p>Note: Improved TOT raises real incomes but may reduce export volumes if foreign buyers switch to cheaper substitutes.</p>`,
      },
      {
        id: "t1-trade-3",
        title: "Australia's Trade Patterns",
        content: `<p>Australia's trade is characterised by:</p>
<ul>
  <li><strong>Commodity-dominant exports</strong>: Iron ore, coal, LNG, gold, and agricultural products make up the majority of goods exports.</li>
  <li><strong>Services exports</strong>: Education and tourism are major services exports, though these were severely disrupted by COVID-19.</li>
  <li><strong>Import composition</strong>: Australia imports capital goods (machinery), fuel, and consumer goods.</li>
  <li><strong>Asian focus</strong>: China absorbs ~30% of Australian exports, followed by Japan, South Korea, India, and the US.</li>
</ul>
<p>Australia's <strong>trade openness</strong> (exports + imports as % of GDP) reflects deep global integration. However, heavy reliance on commodity exports creates volatility — commodity prices fluctuate with global demand, particularly Chinese demand.</p>
<p>Australia has negotiated bilateral Free Trade Agreements with China (ChAFTA), the US (AUSFTA), Japan (JAEPA), South Korea (KAFTA), and through multilateral agreements like CPTPP and RCEP.</p>`,
      },
    ],
  },
  {
    id: "t1-protection",
    title: "Trade Liberalisation and Protection",
    icon: "ShieldOff",
    color: "from-red-500 to-orange-600",
    accent: "red",
    description: "Forms of protection, arguments for and against, trade liberalisation policies.",
    causeEffect: "Trade protection → reduced import competition → domestic industry benefits short-term but efficiency losses and higher consumer prices long-term. Trade liberalisation reverses this.",
    examLink: "Evaluate the effectiveness of trade protection. Use infant industry, strategic trade, and national security arguments with counter-arguments.",
    glossaryTerms: ["tariff", "quota", "subsidy", "dumping", "free trade", "WTO", "FTA"],
    subsections: [
      {
        id: "t1-protection-1",
        title: "Forms of Trade Protection",
        content: `<p>Governments use various instruments to restrict imports and protect domestic industries:</p>
<ul>
  <li><strong>Tariffs</strong>: Taxes on imported goods, raising their price. Revenue for government, but higher prices for consumers.</li>
  <li><strong>Quotas</strong>: Physical limits on the quantity of imports. Can cause domestic shortages and higher prices.</li>
  <li><strong>Subsidies</strong>: Government payments to domestic producers, enabling them to compete at lower prices. Costly for taxpayers.</li>
  <li><strong>Embargoes</strong>: Complete ban on trade with a specific country (usually for political/security reasons).</li>
  <li><strong>Local content requirements</strong>: Require a minimum proportion of domestic inputs in products.</li>
  <li><strong>Regulatory barriers</strong>: Health, safety, or environmental standards used as non-tariff barriers (NTBs).</li>
  <li><strong>Anti-dumping duties</strong>: Imposed when foreign producers sell below cost to undercut domestic competitors.</li>
</ul>`,
      },
      {
        id: "t1-protection-2",
        title: "Arguments For and Against Protection",
        content: `<p><strong>Arguments FOR protection:</strong></p>
<ul>
  <li><strong>Infant industry argument</strong>: New industries need temporary protection to develop competitive advantage before facing world competition.</li>
  <li><strong>Employment protection</strong>: Prevent job losses in import-competing industries (e.g., manufacturing).</li>
  <li><strong>National security</strong>: Maintain domestic capacity for strategically vital industries (defence, food, energy).</li>
  <li><strong>Anti-dumping</strong>: Protect against unfair competition from foreign producers selling below cost.</li>
  <li><strong>Terms of trade argument</strong>: Large countries can improve TOT by restricting imports (only applies to major importers).</li>
</ul>
<p><strong>Arguments AGAINST protection:</strong></p>
<ul>
  <li>Higher consumer prices — protection is effectively a tax on consumers.</li>
  <li>Reduced efficiency — protected industries lack incentive to innovate or reduce costs.</li>
  <li>Retaliatory tariffs from trading partners — trade wars reduce global welfare (e.g., US–China trade war).</li>
  <li>Misallocation of resources away from comparative advantage industries.</li>
  <li>WTO rules prohibit most forms of protection.</li>
</ul>`,
      },
      {
        id: "t1-protection-3",
        title: "Trade Liberalisation",
        content: `<p><strong>Trade liberalisation</strong> refers to the reduction or removal of trade barriers to promote free trade. It occurs at three levels:</p>
<ul>
  <li><strong>Multilateral</strong>: Negotiations under the World Trade Organisation (WTO), e.g., GATT rounds, Doha Development Agenda (stalled since 2001).</li>
  <li><strong>Regional/Plurilateral</strong>: Trade blocs like CPTPP (Comprehensive and Progressive Agreement for Trans-Pacific Partnership) and RCEP (Regional Comprehensive Economic Partnership).</li>
  <li><strong>Bilateral</strong>: Free Trade Agreements (FTAs) between two countries — Australia has FTAs with China, Japan, Korea, US, UK, and others.</li>
</ul>
<p><strong>Australia's experience</strong>: Australia has significantly reduced tariffs since the 1980s (manufacturing tariffs fell from 25%+ to near zero). This has improved resource allocation and productivity, though it displaced workers in manufacturing.</p>
<p>Modern "trade liberalisation" now focuses more on non-tariff barriers, regulatory harmonisation, and services trade.</p>`,
      },
    ],
  },
  {
    id: "t1-finance",
    title: "International Finance",
    icon: "DollarSign",
    color: "from-yellow-500 to-amber-600",
    accent: "yellow",
    description: "Balance of Payments, exchange rates, and Australia's external accounts.",
    causeEffect: "Large CAD → accumulation of foreign debt and liabilities → income outflows (net income deficit) → constraint on future growth and vulnerability to capital reversal.",
    examLink: "Explain components of BoP, calculate CAD, explain exchange rate impacts, discuss Australia's twin deficits.",
    glossaryTerms: ["balance of payments", "current account", "capital account", "CAD", "exchange rate", "net income deficit", "net primary income"],
    subsections: [
      {
        id: "t1-finance-1",
        title: "Balance of Payments",
        content: `<p>The <strong>Balance of Payments (BoP)</strong> is a record of all economic transactions between residents of a country and the rest of the world over a given period.</p>
<p>It has two main accounts:</p>
<p><strong>1. Current Account (CA):</strong></p>
<ul>
  <li><strong>Trade in goods</strong>: Exports minus imports of merchandise.</li>
  <li><strong>Trade in services</strong>: Tourism, education, financial services (Australia typically runs a services surplus).</li>
  <li><strong>Net primary income</strong>: Income flows — interest, dividends, profits. Australia runs a persistent <em>net primary income deficit</em> because foreigners own substantial Australian assets.</li>
  <li><strong>Net secondary income</strong>: Transfers — foreign aid, remittances.</li>
</ul>
<p><strong>2. Capital and Financial Account (KFA):</strong></p>
<ul>
  <li>Records flows of investment and capital: FDI, portfolio investment, other investment, reserve assets.</li>
  <li>A current account deficit (CAD) must be financed by a surplus on the KFA (net capital inflow).</li>
</ul>
<p>BoP always balances: CA + KFA = 0 (with statistical discrepancy).</p>`,
      },
      {
        id: "t1-finance-2",
        title: "Australia's Current Account",
        content: `<p>Australia historically ran a <strong>current account deficit (CAD)</strong> — typically 3–5% of GDP — because:</p>
<ul>
  <li>Investment exceeds domestic saving → net capital inflows required.</li>
  <li>Persistent <strong>net primary income deficit</strong>: Australia has large foreign debt and liabilities, generating large outflows of interest and dividends to foreign investors.</li>
  <li>Services deficits (imports of travel, business services exceed exports).</li>
</ul>
<p>However, in 2019–20 and 2020–21, Australia recorded its first <strong>current account surpluses</strong> in 44 years, driven by a <strong>record trade surplus</strong> in goods (surging iron ore and LNG prices) combined with a collapse in imports of services (especially tourism and education) due to COVID-19 border closures.</p>
<p>The persistent CAD means Australia accumulates <strong>net foreign liabilities (NFL)</strong> — Australia owes more to the rest of the world than foreigners owe to Australia. NFL reached approximately 50% of GDP by the mid-2020s.</p>`,
      },
      {
        id: "t1-finance-3",
        title: "Exchange Rates",
        content: `<p>The <strong>exchange rate</strong> is the price of one currency expressed in terms of another.</p>
<p>Australia has a <strong>floating exchange rate</strong> since 1983 — the AUD's value is determined by supply and demand in foreign exchange markets.</p>
<p><strong>Factors determining the AUD:</strong></p>
<ul>
  <li>Commodity prices (especially iron ore) — higher prices → more demand for AUD → AUD appreciates.</li>
  <li>Relative interest rates — higher Australian rates attract foreign capital → AUD appreciates.</li>
  <li>Economic growth differentials — stronger Australian growth → stronger AUD.</li>
  <li>Speculation and risk appetite — in global downturns, investors flee to safe-haven currencies.</li>
</ul>
<p><strong>Effects of exchange rate changes:</strong></p>
<ul>
  <li><strong>Depreciation (AUD falls)</strong>: Exports become cheaper for foreigners (competitiveness improves); imports become more expensive (inflationary); CAD may improve via J-curve effect.</li>
  <li><strong>Appreciation (AUD rises)</strong>: Exports more expensive → competitiveness falls; imports cheaper → deflationary pressure; CAD may worsen.</li>
</ul>
<p>The <strong>J-curve effect</strong>: Initially after depreciation, CAD worsens (import bills rise in AUD before export volumes respond), then improves as export volumes increase.</p>`,
      },
    ],
  },
  {
    id: "t1-tncs",
    title: "Transnational Corporations",
    icon: "Building2",
    color: "from-indigo-500 to-blue-700",
    accent: "indigo",
    description: "Role, impact and evaluation of TNCs in the global economy.",
    causeEffect: "TNCs organise global production → efficiency gains and technology transfer to host countries, but may exploit resources and avoid taxes → ambiguous net effect on development.",
    examLink: "Evaluate benefits and costs of TNCs for Australia and developing economies. Reference specific examples like Apple, BHP, Rio Tinto.",
    glossaryTerms: ["TNC", "FDI", "transfer pricing", "host country", "home country", "global supply chain"],
    subsections: [
      {
        id: "t1-tncs-1",
        title: "What are TNCs?",
        content: `<p><strong>Transnational corporations (TNCs)</strong> (also called <strong>multinational corporations, MNCs</strong>) are companies that operate production facilities, subsidiaries, or affiliates in more than one country.</p>
<p>TNCs are central to globalisation:</p>
<ul>
  <li>They account for approximately one-third of world trade (intra-firm trade between subsidiaries).</li>
  <li>They are the primary vehicle for foreign direct investment (FDI).</li>
  <li>They organise global <strong>value chains</strong> — breaking production into stages across many countries.</li>
</ul>
<p><strong>Examples:</strong> Apple (design in USA, manufacturing in China, sales globally), BHP (Australian HQ, operations in Australia, Americas, Africa), Toyota (Japanese parent, factories in Australia until 2017, Thailand, US).</p>`,
      },
      {
        id: "t1-tncs-2",
        title: "Benefits and Costs of TNCs",
        content: `<p><strong>Benefits for host countries:</strong></p>
<ul>
  <li><strong>Capital inflows</strong>: FDI provides finance for development without generating foreign debt.</li>
  <li><strong>Employment creation</strong>: Provide jobs, training, and skills development.</li>
  <li><strong>Technology and knowledge transfer</strong>: Bring advanced technology, management practices, and IP.</li>
  <li><strong>Tax revenue</strong>: Corporate taxes fund government services.</li>
  <li><strong>Export platform</strong>: TNCs may use host countries to manufacture for export (e.g., China, Vietnam).</li>
</ul>
<p><strong>Costs for host countries:</strong></p>
<ul>
  <li><strong>Profit repatriation</strong>: Profits flow back to home country — worsens net primary income deficit.</li>
  <li><strong>Transfer pricing</strong>: TNCs manipulate intra-firm prices to shift profits to low-tax jurisdictions (tax avoidance).</li>
  <li><strong>Environmental damage</strong>: TNCs may exploit weaker environmental regulations in developing countries.</li>
  <li><strong>Labour exploitation</strong>: Low wages and poor conditions in some host countries.</li>
  <li><strong>Crowding out</strong>: TNCs may outcompete local firms that cannot match their resources.</li>
  <li><strong>Policy influence</strong>: Large TNCs may exert political pressure on host governments.</li>
</ul>`,
      },
      {
        id: "t1-tncs-3",
        title: "TNCs and Australia",
        content: `<p>Australia both hosts and produces TNCs:</p>
<p><strong>Foreign TNCs in Australia:</strong></p>
<ul>
  <li>Finance: HSBC, Citibank, Deutsche Bank</li>
  <li>Retail: Amazon, H&M, Zara</li>
  <li>Technology: Google, Apple, Microsoft</li>
  <li>Resources: Shell (LNG), ExxonMobil, Chevron</li>
</ul>
<p><strong>Australian TNCs operating globally:</strong></p>
<ul>
  <li>BHP (mining, global), Rio Tinto (mining, global), ANZ Bank (Asia-Pacific), Macquarie Group (infrastructure, global), Cochlear (medical devices), CSL (biotech).</li>
</ul>
<p><strong>Policy response:</strong> Australia uses the Foreign Investment Review Board (FIRB) to screen foreign investment, particularly by state-owned enterprises and in critical infrastructure. Recent stricter controls on Chinese investment in sensitive sectors reflect national security concerns.</p>`,
      },
    ],
  },
  {
    id: "t1-labour-migration",
    title: "Labour, Migration and the Global Economy",
    icon: "Users",
    color: "from-pink-500 to-rose-600",
    accent: "pink",
    description: "International division of labour, migration flows and their economic effects.",
    causeEffect: "Global wage differentials + open borders → labour migration from low-wage to high-wage countries → remittances to source countries, skill gains for host countries, but brain drain concerns.",
    examLink: "Discuss how the international division of labour and migration affect income distribution globally and within countries.",
    glossaryTerms: ["international division of labour", "migration", "remittances", "brain drain", "skilled migration", "demographic dividend"],
    subsections: [
      {
        id: "t1-labour-1",
        title: "International Division of Labour",
        content: `<p>The <strong>international division of labour</strong> refers to the specialisation of countries in producing particular goods and services based on their factor endowments and comparative advantage.</p>
<p>Patterns of specialisation:</p>
<ul>
  <li><strong>Developed economies</strong>: Specialise in capital-intensive, high-technology, and services sectors (finance, pharmaceuticals, aerospace).</li>
  <li><strong>Emerging economies</strong>: Specialise in labour-intensive manufacturing (China, Vietnam, Bangladesh — textiles, electronics assembly).</li>
  <li><strong>Developing economies</strong>: Often specialise in resource extraction and agriculture.</li>
</ul>
<p>Global supply chains have deepened the international division of labour — a single smartphone may be designed in the US, have components made in South Korea, Taiwan, and Japan, and be assembled in China.</p>
<p><strong>Australia's position</strong>: Australia specialises in resource-intensive commodities and some advanced services, reflecting its factor endowments (land, resources) and level of development.</p>`,
      },
      {
        id: "t1-labour-2",
        title: "Migration",
        content: `<p><strong>International migration</strong> is the movement of people across national borders, motivated by economic opportunities, family reunification, or humanitarian reasons.</p>
<p><strong>Types of migration:</strong></p>
<ul>
  <li><strong>Economic migration</strong>: Workers moving for better wages and opportunities.</li>
  <li><strong>Skilled migration</strong>: Targeted programs attracting workers with specific qualifications.</li>
  <li><strong>Family migration</strong>: Reunification with existing residents.</li>
  <li><strong>Humanitarian migration</strong>: Refugees and asylum seekers.</li>
  <li><strong>Student migration</strong>: International students (significant for Australia).</li>
</ul>
<p><strong>Effects on host countries:</strong></p>
<ul>
  <li>Expands labour supply → fills skills shortages, increases GDP.</li>
  <li>Increases demand for housing, education, healthcare.</li>
  <li>May suppress wages in some low-skilled sectors.</li>
  <li>Fiscal contributions via taxes (migrants tend to be working-age).</li>
</ul>
<p><strong>Effects on source countries:</strong></p>
<ul>
  <li><strong>Remittances</strong>: Money sent home — major income source for many developing countries (e.g., Philippines, Nepal).</li>
  <li><strong>Brain drain</strong>: Loss of educated and skilled workers damages development potential.</li>
</ul>`,
      },
      {
        id: "t1-labour-3",
        title: "Australia's Migration Program",
        content: `<p>Australia has one of the world's most structured and skills-focused migration programs:</p>
<ul>
  <li><strong>Skilled stream</strong>: The largest component — points-tested visa (subclass 189, 190) favouring qualifications, age, and English language ability.</li>
  <li><strong>Employer-sponsored</strong>: Businesses sponsor workers to fill skill shortages (subclass 482).</li>
  <li><strong>Temporary skilled workers</strong>: Working Holiday Makers, 457/482 visas.</li>
  <li><strong>Humanitarian stream</strong>: Approximately 13,750 places per year (though fluctuates with policy).</li>
</ul>
<p>Australia's net overseas migration (NOM) is a key driver of population growth and demand in the economy. Post-COVID, NOM surged to record levels (500,000+) contributing to housing market pressures and wage stabilisation.</p>
<p>Migration also supports Australia's demographic challenge — an ageing population raises dependency ratios and strains the superannuation and healthcare systems.</p>`,
      },
    ],
  },
  {
    id: "t1-organisations",
    title: "International Economic Organisations",
    icon: "Landmark",
    color: "from-teal-500 to-cyan-700",
    accent: "teal",
    description: "The WTO, IMF, World Bank and G20 — roles, effectiveness, and criticisms.",
    causeEffect: "International institutions → coordinate global economic policy → reduce trade barriers and prevent financial crises, but tensions between national sovereignty and global rules create limitations.",
    examLink: "Evaluate the role and effectiveness of the WTO, IMF, and World Bank. Use specific examples of their interventions.",
    glossaryTerms: ["WTO", "IMF", "World Bank", "G20", "conditionality", "structural adjustment", "most favoured nation"],
    subsections: [
      {
        id: "t1-organisations-1",
        title: "The World Trade Organisation (WTO)",
        content: `<p>The <strong>WTO</strong> (established 1995, replacing GATT 1947) is the principal international organisation governing trade between nations.</p>
<p><strong>Key functions:</strong></p>
<ul>
  <li>Setting and enforcing trade rules through binding multilateral agreements.</li>
  <li>Providing a forum for trade negotiations.</li>
  <li>Operating a <strong>dispute settlement mechanism</strong> — the most important innovation over GATT.</li>
  <li>Reviewing member countries' trade policies.</li>
</ul>
<p><strong>Core principles:</strong></p>
<ul>
  <li><strong>Most Favoured Nation (MFN)</strong>: Trade concessions extended to one member must be extended to all members.</li>
  <li><strong>National Treatment</strong>: Imported and domestic goods must be treated equally once the tariff is paid.</li>
</ul>
<p><strong>Criticisms:</strong></p>
<ul>
  <li>Decision by consensus → slow and prone to deadlock (Doha Round unresolved since 2001).</li>
  <li>Wealthy nations dominate negotiations and maintain agricultural subsidies.</li>
  <li>Dispute settlement body under strain (US blocked Appellate Body appointments).</li>
  <li>Does not cover adequately: labour standards, environment, digital trade.</li>
</ul>`,
      },
      {
        id: "t1-organisations-2",
        title: "The IMF and World Bank",
        content: `<p>The <strong>IMF (International Monetary Fund)</strong> and <strong>World Bank</strong> were established at the Bretton Woods Conference (1944) to stabilise the international monetary system after WWII.</p>
<p><strong>IMF:</strong></p>
<ul>
  <li>Provides short-term balance of payments support (loans) to countries in financial crisis.</li>
  <li>Loans come with <strong>conditionality</strong> — recipient countries must implement economic reforms (austerity, privatisation, deregulation).</li>
  <li>Monitors global economic and financial stability (World Economic Outlook reports).</li>
  <li>Manages Special Drawing Rights (SDRs) — international reserve assets.</li>
</ul>
<p><strong>World Bank:</strong></p>
<ul>
  <li>Provides long-term development finance (loans, grants) to developing and low-income countries.</li>
  <li>Funds infrastructure, education, health, and poverty reduction programs.</li>
  <li>Subsidiary institutions: IBRD (middle-income countries), IDA (poorest countries).</li>
</ul>
<p><strong>Criticisms of IMF/World Bank:</strong> Structural adjustment programs (SAPs) often imposed harsh austerity that reduced social spending and worsened inequality. Governance weighted toward developed nations (US holds veto at IMF). "Washington Consensus" policies sometimes inappropriate for developing country contexts.</p>`,
      },
      {
        id: "t1-organisations-3",
        title: "The G20",
        content: `<p>The <strong>G20</strong> (Group of Twenty) is an international forum of the world's largest economies — comprising 19 countries and the EU, accounting for approximately 85% of global GDP and 75% of world trade.</p>
<p><strong>Members include:</strong> Australia, USA, China, Japan, Germany, UK, France, India, Brazil, Canada, and others.</p>
<p><strong>Role:</strong></p>
<ul>
  <li>Forum for coordination of global economic and financial policy.</li>
  <li>Became the premier forum for international economic cooperation during the Global Financial Crisis (GFC) in 2008–09.</li>
  <li>Coordinates policies on: financial regulation, tax avoidance (BEPS), climate finance, development.</li>
  <li>Australia hosted the G20 in Brisbane in 2014.</li>
</ul>
<p><strong>Limitations:</strong></p>
<ul>
  <li>Decisions are non-binding — no enforcement mechanism.</li>
  <li>Geopolitical tensions between major powers (US, China, Russia) limit effective cooperation.</li>
  <li>Excludes many developing countries (though outreach programs exist).</li>
</ul>`,
      },
    ],
  },
  {
    id: "t1-growth-development",
    title: "Global Growth and Development",
    icon: "TrendingUp",
    color: "from-lime-500 to-green-600",
    accent: "lime",
    description: "Economic growth vs development, the role of institutions, and development strategies.",
    causeEffect: "Capital accumulation + technological progress → economic growth → may or may not translate to development depending on distribution, institutions, and social investment.",
    examLink: "Distinguish growth from development. Analyse why some countries grow faster. Evaluate development strategies (export-led, import substitution).",
    glossaryTerms: ["economic growth", "economic development", "HDI", "Gini coefficient", "institutional quality", "poverty trap"],
    subsections: [
      {
        id: "t1-growth-1",
        title: "Economic Growth vs Development",
        content: `<p><strong>Economic growth</strong>: Increase in real GDP or real GDP per capita over time — a quantitative measure of output.</p>
<p><strong>Economic development</strong>: A broader concept encompassing improvements in human wellbeing — including income, health, education, freedom, and equality.</p>
<p>Key measures of development:</p>
<ul>
  <li><strong>Human Development Index (HDI)</strong>: Composite of life expectancy, education (mean and expected years of schooling), and GNI per capita. Norway consistently ranks first; Niger and Chad rank lowest.</li>
  <li><strong>Gini coefficient</strong>: Measures income inequality (0 = perfect equality; 1 = perfect inequality).</li>
  <li><strong>Multidimensional Poverty Index (MPI)</strong>: Captures deprivation across health, education, and living standards.</li>
  <li><strong>Gender Inequality Index (GII)</strong>: Measures gender disparities in reproductive health, empowerment, and labour market participation.</li>
</ul>
<p><strong>Key distinction</strong>: Growth is necessary but not sufficient for development. High growth may occur alongside persistent poverty if gains are concentrated at the top (e.g., some Gulf states — high GDP per capita but poor HDI indicators for migrant workers).</p>`,
      },
      {
        id: "t1-growth-2",
        title: "Sources of Economic Growth",
        content: `<p>Economic growth arises from increases in the quantity and quality of factors of production and improvements in technology:</p>
<ul>
  <li><strong>Capital accumulation</strong>: Investment in physical capital (machinery, infrastructure) raises productive capacity.</li>
  <li><strong>Labour force growth</strong>: More workers → more output (extensive growth). Often driven by population growth or immigration.</li>
  <li><strong>Human capital development</strong>: Education and training increase labour productivity (intensive growth).</li>
  <li><strong>Technological progress</strong>: Allows more output from the same inputs — the key driver of long-run growth (endogenous growth theory).</li>
  <li><strong>Institutional quality</strong>: Rule of law, property rights, low corruption, and political stability support investment and growth.</li>
  <li><strong>Trade and openness</strong>: Export-led growth allows countries to exploit comparative advantage and access larger markets.</li>
</ul>
<p><strong>Why do some countries grow faster?</strong> China's rapid growth (averaging ~10% pa for three decades) reflects: high investment rates (40%+ of GDP), technology adoption, export-led manufacturing, institutional reforms, and a large pool of low-cost labour.</p>`,
      },
      {
        id: "t1-growth-3",
        title: "Development Strategies",
        content: `<p>Countries have pursued different strategies for economic development:</p>
<p><strong>1. Import Substitution Industrialisation (ISI):</strong></p>
<ul>
  <li>Protect domestic manufacturing industries from foreign competition to build industrial capacity.</li>
  <li>Common in Latin America (Brazil, Argentina) in mid-20th century. Led to inefficiency and debt crises.</li>
</ul>
<p><strong>2. Export-led Growth (ELG):</strong></p>
<ul>
  <li>Expand output through exports — compete globally and use trade revenue to fund development.</li>
  <li>Successfully adopted by East Asian "Tigers" (South Korea, Taiwan, Singapore, Hong Kong) and China.</li>
</ul>
<p><strong>3. Foreign Aid and Debt Relief:</strong></p>
<ul>
  <li>Aid can fund infrastructure and social services, but concerns about dependency and effectiveness.</li>
  <li>Debt relief programs (HIPC Initiative) freed resources for development spending.</li>
</ul>
<p><strong>4. Microfinance and Grassroots Development:</strong></p>
<ul>
  <li>Small loans to entrepreneurs (especially women) in developing countries (Grameen Bank model).</li>
</ul>
<p><strong>Role of institutions:</strong> Acemoglu and Robinson argue that <em>inclusive institutions</em> (broad property rights, rule of law, political participation) are the key determinant of long-run development — extractive institutions (narrow elite control) perpetuate underdevelopment.</p>`,
      },
    ],
  },
  {
    id: "t1-inequality",
    title: "Income Distribution and Inequality",
    icon: "Scale",
    color: "from-orange-500 to-red-600",
    accent: "orange",
    description: "Global income inequality, poverty, and the distribution of wealth.",
    causeEffect: "Globalisation + technological change → rising returns to capital and skilled labour → widening income inequality within countries, though inequality between countries has narrowed as developing nations grow.",
    examLink: "Distinguish between inequality within and between countries. Evaluate whether globalisation increases or reduces inequality.",
    glossaryTerms: ["Gini coefficient", "income inequality", "wealth inequality", "poverty line", "absolute poverty", "relative poverty"],
    subsections: [
      {
        id: "t1-inequality-1",
        title: "Measuring Inequality",
        content: `<p><strong>Income inequality</strong> refers to the unequal distribution of income among individuals and households in an economy.</p>
<p><strong>Measuring tools:</strong></p>
<ul>
  <li><strong>Gini coefficient</strong>: Ranges from 0 (perfect equality) to 1 (perfect inequality). Australia's Gini ≈ 0.33; US ≈ 0.39; Brazil ≈ 0.53.</li>
  <li><strong>Lorenz curve</strong>: Graphical representation of income distribution — further from diagonal = more unequal.</li>
  <li><strong>Quintile ratios</strong>: Ratio of income of top 20% to bottom 20%.</li>
  <li><strong>Palma ratio</strong>: Ratio of income of top 10% to bottom 40%.</li>
</ul>
<p><strong>Poverty measures:</strong></p>
<ul>
  <li><strong>Absolute poverty</strong>: Living below a fixed income threshold (World Bank: US$2.15/day at 2017 PPP).</li>
  <li><strong>Relative poverty</strong>: Living below 50% (or 60%) of median income — relevant in developed countries.</li>
</ul>`,
      },
      {
        id: "t1-inequality-2",
        title: "Global Inequality Trends",
        content: `<p>A crucial distinction: inequality has changed differently <em>between</em> countries versus <em>within</em> countries:</p>
<p><strong>Between-country inequality (narrowing):</strong></p>
<ul>
  <li>Rapid growth in China, India, and other emerging economies has dramatically reduced income gaps between rich and poor nations.</li>
  <li>Global absolute poverty has declined significantly — from over 35% in 1990 to under 10% by 2019 (World Bank).</li>
  <li>China alone lifted over 800 million people out of extreme poverty.</li>
</ul>
<p><strong>Within-country inequality (widening in many countries):</strong></p>
<ul>
  <li>Gini coefficients have risen in many developed and developing nations since the 1980s.</li>
  <li>Technology (skill-biased technical change) → higher returns for high-skilled workers.</li>
  <li>Globalisation → offshoring of low-skilled jobs → wage stagnation for low-income workers in advanced economies.</li>
  <li>Capital income (returns to assets) has grown faster than labour income.</li>
  <li>Tax system changes (lower top marginal rates, capital gains concessions) reduced redistribution.</li>
</ul>
<p><strong>Australia</strong>: Market income inequality is relatively high, but Australia's tax and transfer system is moderately effective at reducing it — post-tax Gini is significantly lower than pre-tax Gini.</p>`,
      },
      {
        id: "t1-inequality-3",
        title: "Policy Responses to Inequality",
        content: `<p>Governments and international organisations employ various strategies to address inequality:</p>
<ul>
  <li><strong>Progressive taxation</strong>: Higher-income earners pay a higher proportion of income in tax.</li>
  <li><strong>Transfer payments</strong>: Welfare payments, pensions, and social security redistribute income.</li>
  <li><strong>Public services</strong>: Universal education, healthcare, and housing reduce inequality in living standards even if income inequality persists.</li>
  <li><strong>Minimum wages</strong>: Establish a wage floor to protect low-income workers.</li>
  <li><strong>Investment in human capital</strong>: Education and training programs help low-income individuals access better opportunities.</li>
</ul>
<p><strong>International responses:</strong></p>
<ul>
  <li>UN Sustainable Development Goal 10: Reduce inequality within and among countries.</li>
  <li>OECD's BEPS (Base Erosion and Profit Shifting) initiative to reduce corporate tax avoidance.</li>
  <li>World Bank development programs targeting health and education in poorest nations.</li>
</ul>
<p><strong>Trade-off debate</strong>: Some argue reducing inequality may reduce growth (by reducing incentives); others argue too much inequality undermines social cohesion, human capital development, and political stability, ultimately harming growth (IMF research).</p>`,
      },
    ],
  },
  {
    id: "t1-environment",
    title: "Environmental Sustainability",
    icon: "Leaf",
    color: "from-green-500 to-emerald-700",
    accent: "green",
    description: "Environmental externalities, climate change, and international environmental agreements.",
    causeEffect: "Economic growth → increased production and consumption → environmental degradation → threatens long-run sustainable growth → requires policy intervention to correct market failure.",
    examLink: "Discuss the conflict between economic growth and environmental sustainability. Evaluate global and domestic policy responses to climate change.",
    glossaryTerms: ["externality", "carbon tax", "emissions trading scheme", "sustainable development", "Paris Agreement", "tragedy of the commons"],
    subsections: [
      {
        id: "t1-environment-1",
        title: "Environmental Externalities and Market Failure",
        content: `<p>Environmental degradation represents a classic case of <strong>market failure</strong> due to negative externalities:</p>
<ul>
  <li><strong>Negative externality</strong>: A cost imposed on third parties not involved in a transaction. Pollution is the key example — a factory producing goods also produces pollution that harms the environment and health of others.</li>
  <li>Without intervention, the market will <strong>overproduce</strong> goods with negative externalities (the social cost exceeds the private cost).</li>
  <li><strong>Carbon emissions</strong>: The most significant environmental externality — burning fossil fuels generates CO₂ emissions contributing to climate change, a <em>global</em> negative externality.</li>
</ul>
<p><strong>Tragedy of the commons</strong>: Common resources (fisheries, atmosphere) are overexploited because individual users do not bear the full social cost of their use. Climate change is often described as the greatest market failure in history (Stern Review, 2006).</p>`,
      },
      {
        id: "t1-environment-2",
        title: "Climate Change and Global Responses",
        content: `<p>Climate change poses an existential challenge to the global economy:</p>
<ul>
  <li>Global average temperature has risen approximately 1.1°C above pre-industrial levels.</li>
  <li>The IPCC projects GDP losses of 2–20% by 2100 under different warming scenarios.</li>
  <li>Impacts: rising sea levels, extreme weather events, agricultural disruption, water scarcity, species extinction.</li>
</ul>
<p><strong>International agreements:</strong></p>
<ul>
  <li><strong>Kyoto Protocol (1997)</strong>: First binding commitments to reduce greenhouse gas emissions for developed nations. US did not ratify; modest impact.</li>
  <li><strong>Paris Agreement (2015)</strong>: 196 parties committed to limiting warming to 1.5–2°C above pre-industrial levels. Nationally Determined Contributions (NDCs) set by each country. Non-binding enforcement; relies on transparency and peer pressure.</li>
  <li><strong>COP (Conference of the Parties)</strong>: Annual UN climate summit to review progress and negotiate new commitments.</li>
</ul>
<p><strong>Australia and climate policy</strong>: Australia's coal and LNG exports are central to the economy but contribute to global emissions. Australia has faced international pressure to adopt stronger climate targets. The Safeguard Mechanism and Capacity Investment Scheme are key domestic policies.</p>`,
      },
      {
        id: "t1-environment-3",
        title: "Policy Tools for Environmental Sustainability",
        content: `<p>Governments use various tools to correct environmental market failures:</p>
<p><strong>Market-based instruments:</strong></p>
<ul>
  <li><strong>Carbon tax / carbon price</strong>: Places a price on each tonne of CO₂ emitted — incentivises producers and consumers to reduce emissions. Australia had a carbon tax 2012–2014 (abolished by Abbott government).</li>
  <li><strong>Emissions Trading Scheme (ETS)</strong>: Sets a cap on total emissions; firms buy and sell permits. The EU ETS is the largest. Australia's Safeguard Mechanism functions as a baseline-and-credit scheme.</li>
</ul>
<p><strong>Regulatory approaches:</strong></p>
<ul>
  <li>Vehicle emission standards, mandatory renewable energy targets, banning fossil fuel subsidies.</li>
</ul>
<p><strong>Government spending:</strong></p>
<ul>
  <li>Subsidising renewable energy (solar, wind), public transport, and green technology research.</li>
</ul>
<p><strong>International trade and environment:</strong> Growth of renewable energy trade; but also concern that climate policies (carbon border adjustment mechanisms) may act as disguised trade barriers.</p>
<p><strong>Sustainable development</strong>: Meeting the needs of the present without compromising the ability of future generations to meet their own needs (Brundtland Commission, 1987).</p>`,
      },
    ],
  },
  {
    id: "t1-effects-globalisation",
    title: "Effects of Globalisation on Australia",
    icon: "BarChart2",
    color: "from-blue-600 to-indigo-700",
    accent: "blue",
    description: "How globalisation has shaped Australia's economy, living standards and policy choices.",
    causeEffect: "Australia's integration into global economy → specialisation in resources and services → higher living standards but vulnerability to external shocks and commodity price cycles.",
    examLink: "Comprehensive question: evaluate the overall effects of globalisation on the Australian economy with reference to trade, investment, living standards, and challenges.",
    glossaryTerms: ["living standards", "structural change", "deindustrialisation", "commodity cycle", "productivity"],
    subsections: [
      {
        id: "t1-effects-1",
        title: "Trade and Investment Effects",
        content: `<p>Globalisation has profoundly shaped Australia's trade and investment landscape:</p>
<ul>
  <li><strong>Export boom</strong>: Asia's industrialisation (especially China's) created massive demand for Australian iron ore, coal, and LNG — driving record commodity prices and a terms of trade boom in the 2000s–2010s.</li>
  <li><strong>Rising FDI</strong>: Foreign investment has funded development of Australian resource and agricultural sectors. Australia's stock of inward FDI is approximately 50% of GDP.</li>
  <li><strong>Import competition</strong>: Cheap imports from Asia (electronics, clothing, furniture) lowered consumer prices but displaced Australian manufacturing jobs — manufacturing's share of GDP fell from ~20% in the 1970s to ~6% by 2020s.</li>
  <li><strong>Services trade</strong>: Growth in education and tourism exports until COVID-19 (international students contributed $40bn+ pa).</li>
</ul>`,
      },
      {
        id: "t1-effects-2",
        title: "Living Standards and the Labour Market",
        content: `<p>Overall, globalisation has raised Australian living standards through higher incomes and lower prices:</p>
<ul>
  <li>Real GDP per capita approximately doubled between 1990 and 2020 — Australia experienced 28 consecutive years of economic growth (1991–2020), a world record.</li>
  <li>Consumer prices for manufactured goods and electronics fell significantly, raising real purchasing power.</li>
  <li>Higher commodity export revenues funded higher wages and government services.</li>
</ul>
<p><strong>But challenges:</strong></p>
<ul>
  <li><strong>Manufacturing job losses</strong>: Car industry (Holden, Ford, Toyota) closed Australian plants by 2017 — 50,000+ jobs lost in manufacturing over two decades. Displaced workers faced structural unemployment.</li>
  <li><strong>Wage inequality</strong>: High-skilled workers in resource, finance, and technology sectors gained more than low-skilled workers.</li>
  <li><strong>Housing affordability</strong>: Strong migration and foreign investment have contributed to house price inflation, worsening affordability for lower-income Australians.</li>
</ul>`,
      },
      {
        id: "t1-effects-3",
        title: "Policy Challenges from Globalisation",
        content: `<p>Globalisation constrains and shapes Australian economic policy:</p>
<ul>
  <li><strong>Reduced policy autonomy</strong>: Australia cannot raise corporate taxes too high without risking capital flight; it cannot impose trade barriers without violating WTO rules and FTAs.</li>
  <li><strong>Currency volatility</strong>: The floating AUD amplifies commodity price swings — the "two-speed economy" problem of the 2000s (resource states boom while manufacturing states struggle).</li>
  <li><strong>External vulnerability</strong>: Australia's large net foreign liabilities (~50% of GDP) and CAD make it vulnerable to sudden stops in capital inflows (the "sudden stop" risk).</li>
  <li><strong>China dependence</strong>: Approximately 30% of Australian exports go to China — political tensions (2020–2023 trade dispute) demonstrated the economic risk of concentrated export markets.</li>
  <li><strong>Digital economy challenges</strong>: Regulating and taxing digital multinationals (Google, Apple, Facebook) operating across borders.</li>
</ul>
<p><strong>Australia's response</strong>: Pursue market diversification through new FTAs (India, UK), invest in critical minerals supply chains, strengthen domestic industry policy (Future Made in Australia Act), and maintain fiscal discipline to preserve AAA credit rating.</p>`,
      },
    ],
  },
  {
    id: "t1-exam-strategy",
    title: "Topic 1 Exam Strategy",
    icon: "Target",
    color: "from-amber-500 to-yellow-600",
    accent: "amber",
    description: "How to answer Topic 1 questions, key essay structures and high-scoring techniques.",
    causeEffect: "Systematic exam preparation → accurate recall + structured analysis → high band 5–6 responses.",
    examLink: "Practice writing 20-mark essays with a clear thesis, multiple body paragraphs, real-world data, and a nuanced judgement.",
    glossaryTerms: ["evaluate", "assess", "analyse", "discuss", "PEEL", "band 6"],
    subsections: [
      {
        id: "t1-exam-1",
        title: "Command Words and Question Types",
        content: `<p>Topic 1 questions typically use these command words:</p>
<ul>
  <li><strong>Analyse</strong>: Break down the issue into components, explain cause-and-effect relationships, use data.</li>
  <li><strong>Evaluate / Assess</strong>: Make a judgement about effectiveness, weighing positives against negatives with evidence.</li>
  <li><strong>Discuss</strong>: Present both sides of an argument with evidence and a conclusion.</li>
  <li><strong>Explain</strong>: State how or why something occurs with clear cause-and-effect logic.</li>
  <li><strong>To what extent</strong>: Partial agreement — acknowledge both supporting and contradictory evidence, conclude with a qualified judgement.</li>
</ul>
<p><strong>Common Topic 1 question themes:</strong></p>
<ul>
  <li>Evaluate the impacts of globalisation on a country/Australia.</li>
  <li>Assess the effectiveness of the WTO / IMF / World Bank.</li>
  <li>Analyse the factors affecting Australia's current account or exchange rate.</li>
  <li>Discuss the relationship between economic growth and environmental sustainability.</li>
  <li>Evaluate the role of TNCs in development.</li>
</ul>`,
      },
      {
        id: "t1-exam-2",
        title: "Essay Structure for Topic 1",
        content: `<p><strong>Introduction (4–5 sentences):</strong></p>
<ul>
  <li>Define key terms from the question.</li>
  <li>Provide context/scope (e.g., "In an increasingly integrated global economy...").</li>
  <li>State your thesis — your overall argument/judgement.</li>
  <li>Preview your main points.</li>
</ul>
<p><strong>Body Paragraphs (PEEL structure):</strong></p>
<ul>
  <li><strong>P</strong>oint: Topic sentence stating your argument.</li>
  <li><strong>E</strong>xplain: Economic reasoning — cause and effect.</li>
  <li><strong>E</strong>vidence: Statistics, real-world examples, policy references.</li>
  <li><strong>L</strong>ink: Explicitly link back to the question.</li>
</ul>
<p><strong>Counter-argument paragraph</strong>: Acknowledge limitations, opposing views, or qualifications.</p>
<p><strong>Conclusion:</strong></p>
<ul>
  <li>Restate your thesis (don't just repeat — synthesise).</li>
  <li>Make a clear judgement using qualifying language ("On balance..."; "While X has been significant, Y has been more important because...").</li>
  <li>Do NOT introduce new evidence.</li>
</ul>`,
      },
      {
        id: "t1-exam-3",
        title: "Key Statistics and Examples to Know",
        content: `<p><strong>Must-know data for Topic 1 essays:</strong></p>
<ul>
  <li>China: ~30% of Australian merchandise exports (largest trading partner).</li>
  <li>Australia's current account: First surplus in 44 years in 2019–20.</li>
  <li>Australia's net foreign liabilities: ~50% of GDP.</li>
  <li>Global poverty: Fell from 36% in 1990 to under 10% in 2019 (World Bank).</li>
  <li>China's growth: averaged ~10% pa 1980–2010.</li>
  <li>Australia: 28 years of continuous GDP growth 1991–2020.</li>
  <li>Manufacturing share of Australian GDP: fell from ~20% (1970s) to ~6% (2020s).</li>
  <li>Paris Agreement: Limit warming to 1.5–2°C above pre-industrial levels.</li>
  <li>Australia's carbon tax: Operated 2012–2014.</li>
  <li>CPTPP members: 11 countries, including Australia, Japan, Canada, NZ.</li>
  <li>WTO established: 1995 (replacing GATT 1947).</li>
  <li>Australia's FTAs: USA (AUSFTA), Japan (JAEPA), China (ChAFTA), Korea (KAFTA), UK (A-UKFTA), India (ECTA).</li>
</ul>
<p><strong>Band 6 tips:</strong></p>
<ul>
  <li>Always connect economic concepts to Australia's specific circumstances.</li>
  <li>Use current data (reference years when citing statistics).</li>
  <li>Show nuance — avoid absolute statements; use "however", "nevertheless", "to some extent".</li>
  <li>Link to multiple economic objectives where relevant.</li>
  <li>Draw on theory (comparative advantage, externalities) to underpin your arguments.</li>
</ul>`,
      },
    ],
  },
];
