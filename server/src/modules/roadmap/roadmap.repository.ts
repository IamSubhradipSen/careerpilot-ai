import prisma from "../../shared/database/prisma.js";
import type { CreateRoadmapDto } from "./roadmap.types.js";

class RoadmapRepository {
  async createRoadmap(
    data: CreateRoadmapDto & { userId: string }
  ) {
    return prisma.roadmap.create({
      data,
    });
  }

  async getUserRoadmaps(userId: string) {
    return prisma.roadmap.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new RoadmapRepository();