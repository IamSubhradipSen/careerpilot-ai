import prisma from "../../shared/database/prisma.js";
class InterviewRepository {
    async createInterview(data) {
        return prisma.interview.create({
            data,
        });
    }
    async getUserInterviews(userId) {
        return prisma.interview.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
}
export default new InterviewRepository();
