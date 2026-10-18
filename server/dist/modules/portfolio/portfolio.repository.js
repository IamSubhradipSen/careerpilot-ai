import prisma from "../../shared/database/prisma.js";
class PortfolioRepository {
    async createPortfolio(data) {
        return prisma.portfolio.create({
            data,
        });
    }
    async getUserPortfolios(userId) {
        return prisma.portfolio.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
}
export default new PortfolioRepository();
