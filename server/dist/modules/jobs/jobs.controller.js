import jobsService from "./jobs.service.js";
import sendResponse from "../../shared/utils/sendResponse.js";
class JobsController {
    async createJob(req, res) {
        const job = await jobsService.createJob(req.user.id, req.body);
        return sendResponse(res, 201, {
            success: true,
            message: "Job created successfully",
            data: job,
        });
    }
    async getUserJobs(req, res) {
        const jobs = await jobsService.getUserJobs(req.user.id);
        return sendResponse(res, 200, {
            success: true,
            message: "Jobs fetched successfully",
            data: jobs,
        });
    }
    async updateJob(req, res) {
        const job = await jobsService.updateJob(req.params.id, req.user.id, req.body);
        return sendResponse(res, 200, {
            success: true,
            message: "Job updated successfully",
            data: job,
        });
    }
    async deleteJob(req, res) {
        await jobsService.deleteJob(req.params.id, req.user.id);
        return sendResponse(res, 200, {
            success: true,
            message: "Job deleted successfully",
        });
    }
}
export default new JobsController();
