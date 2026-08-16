import roadmapRepository from "./roadmap.repository.js";
import type { CreateRoadmapDto } from "./roadmap.types.js";

class RoadmapService {
  async createRoadmap(
    userId: string,
    data: CreateRoadmapDto
  ) {
    return roadmapRepository.createRoadmap({
      ...data,
      userId,
    });
  }

  async getUserRoadmaps(userId: string) {
    return roadmapRepository.getUserRoadmaps(userId);
  }
}

export default new RoadmapService();