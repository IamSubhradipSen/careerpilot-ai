import resumeRepository from "./resume.repository.js";
class ResumeService {
    async uploadResume(userId, data) {
        return resumeRepository.createResume({
            ...data,
            userId,
        });
    }
    async getUserResumes(userId) {
        return resumeRepository.getUserResumes(userId);
    }
}
export default new ResumeService();
