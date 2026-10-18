import prisma from "../../shared/database/prisma.js";
class RoadmapRepository {
    async createRoadmap(data) {
        return prisma.roadmap.create({
            data,
        });
    }
    async getUserRoadmaps(userId) {
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
