import resumeRepository from "./resume.repository.js";
import type { CreateResumeDto } from "./resume.types.js";

class ResumeService {
  async uploadResume(userId: string, data: CreateResumeDto) {
    return resumeRepository.createResume({
      ...data,
      userId,
    });
  }

  async getUserResumes(userId: string) {
    return resumeRepository.getUserResumes(userId);
  }
}

export default new ResumeService();