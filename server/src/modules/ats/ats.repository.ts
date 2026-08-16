import prisma from "../../shared/database/prisma.js";
import type { CreateATSAnalysisDto } from "./ats.types.js";

class ATSRepository {
  async createATSAnalysis(
    data: CreateATSAnalysisDto & { userId: string }
  ) {
    return prisma.aTSAnalysis.create({
      data,
    });
  }

  async getUserATSAnalyses(userId: string) {
    return prisma.aTSAnalysis.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getATSAnalysisById(
    id: string,
    userId: string
  ) {
    return prisma.aTSAnalysis.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async deleteATSAnalysis(
    id: string,
    userId: string
  ) {
    return prisma.aTSAnalysis.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}

export default new ATSRepository();