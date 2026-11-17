import prisma from "../../shared/database/prisma.js";
class ATSRepository {
    async createATSAnalysis(data) {
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
    async getUserATSAnalyses(userId) {
        return prisma.aTSAnalysis.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    }
    async getATSAnalysisById(id, userId) {
        return prisma.aTSAnalysis.findFirst({
            where: { id, userId },
        });
    }
    async deleteATSAnalysis(id, userId) {
        return prisma.aTSAnalysis.deleteMany({
            where: { id, userId },
        });
    }
}
export default new ATSRepository();
