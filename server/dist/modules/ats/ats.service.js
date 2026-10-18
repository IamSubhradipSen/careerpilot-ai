import atsRepository from "./ats.repository.js";
class ATSService {
    async createATSAnalysis(data, userId) {
        return atsRepository.createATSAnalysis({
            ...data,
            userId,
        });
    }
    async getUserATSAnalyses(userId) {
        return atsRepository.getUserATSAnalyses(userId);
    }
    async getATSAnalysisById(id, userId) {
        const analysis = await atsRepository.getATSAnalysisById(id, userId);
        if (!analysis) {
            throw new Error("ATS analysis not found");
        }
        return analysis;
    }
    async deleteATSAnalysis(id, userId) {
        const result = await atsRepository.deleteATSAnalysis(id, userId);
        if (result.count === 0) {
            throw new Error("ATS analysis not found");
        }
        return result;
    }
}
export default new ATSService();
