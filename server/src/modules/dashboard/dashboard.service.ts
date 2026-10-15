
import dashboardRepository from "./dashboard.repository.js";

class DashboardService {
  async getOverview(userId: string) {
    const overview = await dashboardRepository.getOverview(userId);

    return overview;
  }
}

export default new DashboardService();
