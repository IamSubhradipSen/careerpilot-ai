import interviewRepository from "./interview.repository.js";
class InterviewService {
    async createInterview(userId, data) {
        return interviewRepository.createInterview({
            ...data,
            userId,
        });
    }
    async getUserInterviews(userId) {
        return interviewRepository.getUserInterviews(userId);
    }
}
export default new InterviewService();
