import prisma from "../../shared/database/prisma.js";
class JobsRepository {
    async createJob(data) {
        return prisma.job.create({
            data,
        });
    }
    async getUserJobs(userId) {
        return prisma.job.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async updateJob(id, userId, data) {
        return prisma.job.update({
            where: {
                id,
                userId,
            },
            data,
        });
    }
    async deleteJob(id, userId) {
        return prisma.job.delete({
            where: {
                id,
                userId,
            },
        });
    }
}
export default new JobsRepository();
