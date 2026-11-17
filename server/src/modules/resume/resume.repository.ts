
import prisma from "../../shared/database/prisma.js";
import type { CreateResumeDto } from "./resume.types.js";

class ResumeRepository {
  async createResume(data: CreateResumeDto) {
    return prisma.resume.create({
      data: {
        title: data.title,
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        mimeType: data.mimeType,
        fileSize: data.fileSize,
        extractedText: data.extractedText ?? "",
        userId: data.userId,
      },
    });
  }

  
  async getUserResumes(userId: string) {
    return prisma.resume.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        fileName: true,
        fileUrl: true,
        mimeType: true,
        fileSize: true,
        uploadedAt: true,
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });
  }

  async getResumeForAnalysis(resumeId: string, userId: string) {
    return prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId,
      },
      select: {
        id: true,
        title: true,
        extractedText: true,
      },
    });
  }


}

export default new ResumeRepository();
