const getHealthStatus = () => {
  return {
    success: true,
    message: "CareerPilot API Running 🚀",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  };
};

export default {
  getHealthStatus,
};