import portfolioRepository from "./portfolio.repository.js";
class PortfolioService {
    async createPortfolio(userId, data) {
        return portfolioRepository.createPortfolio({
            ...data,
            userId,
        });
    }
    async getUserPortfolios(userId) {
        return portfolioRepository.getUserPortfolios(userId);
    }
}
export default new PortfolioService();
