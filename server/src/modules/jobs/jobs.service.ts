import jobsRepository from "./jobs.repository.js";
import type {
  CreateJobDto,
  UpdateJobDto,
} from "./jobs.types.js";

class JobsService {
  async createJob(
    userId: string,
    data: CreateJobDto
  ) {
    return jobsRepository.createJob({
      ...data,
      userId,
    });
  }

  async getUserJobs(userId: string) {
    return jobsRepository.getUserJobs(userId);
  }

  async updateJob(
    id: string,
    userId: string,
    data: UpdateJobDto
  ) {
    return jobsRepository.updateJob(
      id,
      userId,
      data
    );
  }

  async deleteJob(
    id: string,
    userId: string
  ) {
    return jobsRepository.deleteJob(
      id,
      userId
    );
  }
}

export default new JobsService();