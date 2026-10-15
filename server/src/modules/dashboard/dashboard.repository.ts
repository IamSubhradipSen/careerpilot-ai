
import prisma from "../../shared/database/prisma.js";

class DashboardRepository {
  async getOverview(userId: string) {
    const [
      totalResumes,
      totalPortfolios,
      totalRoadmaps,
      totalInterviews,
      totalJobs,
      totalATSAnalyses,
      recentInterviews,
      recentJobs,
      recentATSAnalyses,
    ] = await Promise.all([
      prisma.resume.count({ where: { userId } }),
      prisma.portfolio.count({ where: { userId } }),
      prisma.roadmap.count({ where: { userId } }),
      prisma.interview.count({ where: { userId } }),
      prisma.job.count({ where: { userId } }),
      prisma.aTSAnalysis.count({ where: { userId } }),

      prisma.interview.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

      prisma.job.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

      prisma.aTSAnalysis.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          resumeId: true,
          score: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      statistics: {
        totalResumes,
        totalPortfolios,
        totalRoadmaps,
        totalInterviews,
        totalJobs,
        totalATSAnalyses,
      },
      recentActivity: {
        interviews: recentInterviews,
        jobs: recentJobs,
        atsAnalyses: recentATSAnalyses,
      },
    };
  }
}

export default new DashboardRepository();
