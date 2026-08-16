import interviewRepository from "./interview.repository.js";
import type { CreateInterviewDto } from "./interview.types.js";

class InterviewService {
  async createInterview(userId: string, data: CreateInterviewDto) {
    return interviewRepository.createInterview({
      ...data,
      userId,
    });
  }

  async getUserInterviews(userId: string) {
    return interviewRepository.getUserInterviews(userId);
  }
}

export default new InterviewService();