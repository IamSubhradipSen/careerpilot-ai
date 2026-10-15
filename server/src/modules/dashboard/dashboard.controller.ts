
import type { Response } from "express";
import type { AuthRequest } from "../../shared/middleware/auth.middleware.js";
import dashboardService from "./dashboard.service.js";
import sendResponse from "../../shared/utils/sendResponse.js";

class DashboardController {
  async getOverview(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;

      const overview = await dashboardService.getOverview(userId);

      return sendResponse(res, 200, {
        success: true,
        message: "Dashboard overview fetched successfully",
        data: overview,
      });
    } catch (error) {
      console.error("Dashboard overview error:", error);

      return sendResponse(res, 500, {
        success: false,
        message: "Failed to fetch dashboard overview",
      });
    }
  }
}

export default new DashboardController();
