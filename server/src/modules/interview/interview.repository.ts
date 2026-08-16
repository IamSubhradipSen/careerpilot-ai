import prisma from "../../shared/database/prisma.js";
import type { CreateInterviewDto } from "./interview.types.js";

class InterviewRepository {
  async createInterview(
    data: CreateInterviewDto & { userId: string }
  ) {
    return prisma.interview.create({
      data,
    });
  }

  async getUserInterviews(userId: string) {
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