import portfolioService from "./portfolio.service.js";
import sendResponse from "../../shared/utils/sendResponse.js";
class PortfolioController {
    async createPortfolio(req, res) {
        const portfolio = await portfolioService.createPortfolio(req.user.id, req.body);
        return sendResponse(res, 201, {
            success: true,
            message: "Portfolio created successfully",
            data: portfolio,
        });
    }
    async getUserPortfolios(req, res) {
        const portfolios = await portfolioService.getUserPortfolios(req.user.id);
        return sendResponse(res, 200, {
            success: true,
            message: "Portfolios fetched successfully",
            data: portfolios,
        });
    }
}
export default new PortfolioController();
