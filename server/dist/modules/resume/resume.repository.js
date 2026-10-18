import prisma from "../../shared/database/prisma.js";
class ResumeRepository {
    async createResume(data) {
        return prisma.resume.create({
            data,
        });
    }
    async getUserResumes(userId) {
        return prisma.resume.findMany({
            where: {
                userId,
            },
            orderBy: {
                uploadedAt: "desc",
            },
        });
    }
}
export default new ResumeRepository();
