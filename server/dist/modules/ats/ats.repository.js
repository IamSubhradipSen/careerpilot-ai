import prisma from "../../shared/database/prisma.js";
class ATSRepository {
    async createATSAnalysis(data) {
        return prisma.aTSAnalysis.create({
            data,
        });
    }
    async getUserATSAnalyses(userId) {
        return prisma.aTSAnalysis.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async getATSAnalysisById(id, userId) {
        return prisma.aTSAnalysis.findFirst({
            where: {
                id,
                userId,
            },
        });
    }
    async deleteATSAnalysis(id, userId) {
        return prisma.aTSAnalysis.deleteMany({
            where: {
                id,
                userId,
            },
        });
    }
}
export default new ATSRepository();
