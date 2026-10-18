import jobsRepository from "./jobs.repository.js";
class JobsService {
    async createJob(userId, data) {
        return jobsRepository.createJob({
            ...data,
            userId,
        });
    }
    async getUserJobs(userId) {
        return jobsRepository.getUserJobs(userId);
    }
    async updateJob(id, userId, data) {
        return jobsRepository.updateJob(id, userId, data);
    }
    async deleteJob(id, userId) {
        return jobsRepository.deleteJob(id, userId);
    }
}
export default new JobsService();
