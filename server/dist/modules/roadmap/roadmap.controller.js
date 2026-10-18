import roadmapService from "./roadmap.service.js";
import sendResponse from "../../shared/utils/sendResponse.js";
class RoadmapController {
    async createRoadmap(req, res) {
        const roadmap = await roadmapService.createRoadmap(req.user.id, req.body);
        return sendResponse(res, 201, {
            success: true,
            message: "Roadmap created successfully",
            data: roadmap,
        });
    }
    async getUserRoadmaps(req, res) {
        const roadmaps = await roadmapService.getUserRoadmaps(req.user.id);
        return sendResponse(res, 200, {
            success: true,
            message: "Roadmaps fetched successfully",
            data: roadmaps,
        });
    }
}
export default new RoadmapController();
