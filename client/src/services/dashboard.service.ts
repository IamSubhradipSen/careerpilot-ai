
import apiClient from "../api/client";

export interface DashboardStatistics {
  totalResumes: number;
  totalPortfolios: number;
  totalRoadmaps: number;
  totalInterviews: number;
  totalJobs: number;
  totalATSAnalyses: number;
}

export interface DashboardInterview {
  id: string;
  jobRole: string;
  difficulty: string;
  score: number | null;
  feedback: string | null;
  createdAt: string;
}

export interface DashboardData {
  statistics: DashboardStatistics;
  recentActivity: {
    interviews: DashboardInterview[];
    [key: string]: unknown;
  };
}

interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

const dashboardService = {
  async getOverview(): Promise<DashboardData> {
    const response =
      await apiClient.get<DashboardResponse>("/dashboard");

    return response.data.data;
  },
};

export default dashboardService;
