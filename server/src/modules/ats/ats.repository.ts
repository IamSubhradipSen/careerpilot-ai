import prisma from "../../shared/database/prisma.js";
import type { CreateATSAnalysisRecord } from "./ats.types.js";

class ATSRepository {
  async createATSAnalysis(data: CreateATSAnalysisRecord) {
    return prisma.aTSAnalysis.create({
      data: {
        resumeId: data.resumeId,
        jobDescription: data.jobDescription,
        score: data.score,
        matchedSkills: data.matchedSkills,
        missingSkills: data.missingSkills,
        suggestions: data.suggestions,
        userId: data.userId,
      },
    });
  }

  async getUserATSAnalyses(userId: string) {
    return prisma.aTSAnalysis.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getATSAnalysisById(id: string, userId: string) {
    return prisma.aTSAnalysis.findFirst({
      where: { id, userId },
    });
  }

  async deleteATSAnalysis(id: string, userId: string) {
    return prisma.aTSAnalysis.deleteMany({
      where: { id, userId },
    });
  }
}

export default new ATSRepository();