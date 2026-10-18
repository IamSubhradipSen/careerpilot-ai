import roadmapRepository from "./roadmap.repository.js";
class RoadmapService {
    async createRoadmap(userId, data) {
        return roadmapRepository.createRoadmap({
            ...data,
            userId,
        });
    }
    async getUserRoadmaps(userId) {
        return roadmapRepository.getUserRoadmaps(userId);
    }
}
export default new RoadmapService();
