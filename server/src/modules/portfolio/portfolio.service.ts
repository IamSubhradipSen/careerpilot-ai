import portfolioRepository from "./portfolio.repository.js";
import type { CreatePortfolioDto } from "./portfolio.types.js";

class PortfolioService {
  async createPortfolio(userId: string, data: CreatePortfolioDto) {
    return portfolioRepository.createPortfolio({
      ...data,
      userId,
    });
  }

  async getUserPortfolios(userId: string) {
    return portfolioRepository.getUserPortfolios(userId);
  }
}

export default new PortfolioService();