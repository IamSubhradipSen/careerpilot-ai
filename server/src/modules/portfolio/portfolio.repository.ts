import prisma from "../../shared/database/prisma.js";
import type { CreatePortfolioDto } from "./portfolio.types.js";

class PortfolioRepository {
  async createPortfolio(data: CreatePortfolioDto & { userId: string }) {
    return prisma.portfolio.create({
      data,
    });
  }

  async getUserPortfolios(userId: string) {
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