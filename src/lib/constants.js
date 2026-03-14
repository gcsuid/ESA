export const ROUTES = {
  HOME: 'home',
  LIBRARY: 'library',
  CHAT: 'chat',
};

export const AGENT_THEMES = {
  search: {
    id: 'search',
    name: 'Search Agent',
    color: '#4AABEC',
    bg: '#0D2137',
    border: '#0F2D4A',
    icon: 'search',
    description: 'Finds anything inside your enterprise knowledge base'
  },
  data: {
    id: 'data',
    name: 'Data Analyst',
    color: '#3ECF72',
    bg: '#0D2016',
    border: '#0F2D1C',
    icon: 'bar-chart-2',
    description: 'Runs analysis and generates visual insights from your data'
  },
  research: {
    id: 'research',
    name: 'Research Agent',
    color: '#E8C547',
    bg: '#1F1A08',
    border: '#2D260A',
    icon: 'globe',
    description: 'Benchmarks against industry data and external intelligence'
  },
  strategy: {
    id: 'strategy',
    name: 'Strategy Agent',
    color: '#A855F7',
    bg: '#1A0F24',
    border: '#260F38',
    icon: 'lightbulb',
    description: 'Synthesizes everything into actionable strategic recommendations'
  }
};

export const MOCK_RECENTS = [
  { id: 1, title: 'Q3 revenue breakdown by region', agents: ['search', 'data'], date: '2 hrs ago' },
  { id: 2, title: 'Find employee leave policy', agents: ['search'], date: '5 hrs ago' },
  { id: 3, title: 'Competitor pricing analysis 2024', agents: ['research', 'strategy'], date: 'Yesterday' },
  { id: 4, title: 'APAC market entry strategy', agents: ['research', 'strategy'], date: '2 days ago' },
  { id: 5, title: 'Analyze churn rate last 6 months', agents: ['data', 'strategy'], date: '3 days ago' },
];

export const MOCK_LIBRARY = [
  ...MOCK_RECENTS,
  { id: 6, title: 'Customer feedback sentiment analysis', agents: ['data'], date: '4 days ago' },
  { id: 7, title: 'Q2 performance review guidelines', agents: ['search'], date: '1 week ago' },
  { id: 8, title: 'EU data compliance summary', agents: ['search', 'research'], date: '1 week ago' },
  { id: 9, title: 'Sales pipeline forecast Q4', agents: ['data', 'strategy'], date: '2 weeks ago' },
  { id: 10, title: 'Onboarding deck templates', agents: ['search'], date: '2 weeks ago' },
  { id: 11, title: 'SaaS market growth projections', agents: ['research'], date: '3 weeks ago' },
  { id: 12, title: 'Server infrastructure cost reduction', agents: ['data', 'strategy'], date: '1 month ago' },
];

export const MOCK_CONVERSATIONS = {
  1: {
    query: "Analyze Q3 revenue trends and suggest optimizations",
    agents: ["data", "strategy"],
    response: `Q3 revenue totaled $4.2M across all departments, reflecting a 12% YoY growth. The strongest performing segment was Enterprise SaaS at $1.8M, while SMB contracts declined 6% compared to Q2.

Key cost optimization opportunities include consolidating underperforming regional offices and renegotiating vendor contracts in logistics, which currently represent 18% of operational expenditure.`,
    chart: "Chart: Q3 Revenue by Department",
  },
  2: {
    query: "Find our procurement policy document",
    agents: ["search"],
    response: `Located 1 matching document in your enterprise knowledge base. The procurement policy was last updated in March 2024 and covers vendor onboarding, approval thresholds, and compliance requirements.`,
    document: "Procurement_Policy_2024.pdf"
  },
  3: {
    query: "Best GTM strategy for APAC expansion in 2025",
    agents: ["research", "strategy"],
    response: `Based on current market intelligence, Southeast Asia represents the highest-opportunity entry point for 2025, driven by rising enterprise software adoption in Singapore, Indonesia, and Vietnam.

Recommended GTM approach:
1. Establish a regional HQ in Singapore for regulatory and talent advantages
2. Partner-led distribution in Indonesia and Vietnam before direct sales
3. Prioritize fintech and logistics verticals where enterprise tooling penetration is lowest

Competitive benchmarking shows your pricing sits 22% below regional competitors, giving room for value-based positioning rather than cost leadership.`
  }
};
