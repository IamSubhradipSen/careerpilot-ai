import atsService from "./ats.service.js";
import sendResponse from "../../shared/utils/sendResponse.js";
class ATSController {
    async createATSAnalysis(req, res) {
        const analysis = await atsService.createATSAnalysis(req.body, req.user.id);
        return sendResponse(res, 201, {
            success: true,
            message: "ATS analysis created successfully",
            data: analysis,
        });
    }
    async getUserATSAnalyses(req, res) {
        const analyses = await atsService.getUserATSAnalyses(req.user.id);
        return sendResponse(res, 200, {
            success: true,
            message: "ATS analyses fetched successfully",
            data: analyses,
        });
    }
    async getATSAnalysisById(req, res) {
        const analysis = await atsService.getATSAnalysisById(req.params.id, req.user.id);
        return sendResponse(res, 200, {
            success: true,
            message: "ATS analysis fetched successfully",
            data: analysis,
        });
    }
    async deleteATSAnalysis(req, res) {
        await atsService.deleteATSAnalysis(req.params.id, req.user.id);
        return sendResponse(res, 200, {
            success: true,
            message: "ATS analysis deleted successfully",
        });
    }
}
export default new ATSController();
