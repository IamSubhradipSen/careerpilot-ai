import prisma from "../../shared/database/prisma.js";
import type {
  CreateJobDto,
  UpdateJobDto,
} from "./jobs.types.js";

class JobsRepository {
  async createJob(
    data: CreateJobDto & { userId: string }
  ) {
    return prisma.job.create({
      data,
    });
  }

  async getUserJobs(userId: string) {
    return prisma.job.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateJob(
    id: string,
    userId: string,
    data: UpdateJobDto
  ) {
    return prisma.job.update({
      where: {
        id,
        userId,
      },
      data,
    });
  }

  async deleteJob(
    id: string,
    userId: string
  ) {
    return prisma.job.delete({
      where: {
        id,
        userId,
      },
    });
  }
}

export default new JobsRepository();