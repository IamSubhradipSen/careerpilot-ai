import healthService from "./health.service.js";
const healthCheck = (_req, res) => {
    const data = healthService.getHealthStatus();
    res.status(200).json(data);
};
export default {
    healthCheck,
};
