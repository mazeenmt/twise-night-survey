export interface SatisfactionData {
  eventTitle: string;
  lastUpdated: string;
  overallSatisfaction: number;
  totalResponses: number;
  responseBreakdown: {
    verySatisfied: number;
    satisfied: number;
    neutral: number;
    dissatisfied: number;
    veryDissatisfied: number;
  };
  topPraisedAspects: Array<{ aspect: string; score: number }>;
  improvements: Array<{ aspect: string; count: number }>;
  trendData: Array<{ date: string; satisfaction: number }>;
  recentComments: Array<{
    id: string;
    comment: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    timestamp: string;
  }>;
  activities: Array<{
    id: string;
    name: string;
    satisfaction: number;
    participantCount: number;
    duration: string;
    category: string;
    engagement: number;
  }>;
}