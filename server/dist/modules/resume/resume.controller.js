import resumeService from "./resume.service.js";
import sendResponse from "../../shared/utils/sendResponse.js";
class ResumeController {
    async createResume(req, res) {
        const resume = await resumeService.uploadResume(req.user.id, req.body);
        return sendResponse(res, 201, {
            success: true,
            message: "Resume uploaded successfully",
            data: resume,
        });
    }
    async getUserResumes(req, res) {
        const resumes = await resumeService.getUserResumes(req.user.id);
        return sendResponse(res, 200, {
            success: true,
            message: "Resumes fetched successfully",
            data: resumes,
        });
    }
}
export default new ResumeController();
