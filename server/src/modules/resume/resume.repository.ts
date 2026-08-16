import prisma from "../../shared/database/prisma.js";
import type { CreateResumeDto } from "./resume.types.js";

class ResumeRepository {
  async createResume(data: CreateResumeDto) {
    return prisma.resume.create({
      data,
    });
  }

  async getUserResumes(userId: string) {
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