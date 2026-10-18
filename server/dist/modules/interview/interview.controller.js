import interviewService from "./interview.service.js";
import sendResponse from "../../shared/utils/sendResponse.js";
class InterviewController {
    async createInterview(req, res) {
        const interview = await interviewService.createInterview(req.user.id, req.body);
        return sendResponse(res, 201, {
            success: true,
            message: "Interview created successfully",
            data: interview,
        });
    }
    async getUserInterviews(req, res) {
        const interviews = await interviewService.getUserInterviews(req.user.id);
        return sendResponse(res, 200, {
            success: true,
            message: "Interviews fetched successfully",
            data: interviews,
        });
    }
}
export default new InterviewController();
