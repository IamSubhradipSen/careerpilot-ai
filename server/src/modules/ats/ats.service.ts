import atsRepository from "./ats.repository.js";
import type { CreateATSAnalysisDto } from "./ats.types.js";

class ATSService {
  async createATSAnalysis(
    data: CreateATSAnalysisDto,
    userId: string
  ) {
    return atsRepository.createATSAnalysis({
      ...data,
      userId,
    });
  }

  async getUserATSAnalyses(userId: string) {
    return atsRepository.getUserATSAnalyses(userId);
  }

  async getATSAnalysisById(
    id: string,
    userId: string
  ) {
    const analysis =
      await atsRepository.getATSAnalysisById(id, userId);

    if (!analysis) {
      throw new Error("ATS analysis not found");
    }

    return analysis;
  }

  async deleteATSAnalysis(
    id: string,
    userId: string
  ) {
    const result =
      await atsRepository.deleteATSAnalysis(id, userId);

    if (result.count === 0) {
      throw new Error("ATS analysis not found");
    }

    return result;
  }
}

export default new ATSService();