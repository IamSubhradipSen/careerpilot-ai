import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/api/v1/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "CareerPilot API Running 🚀",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

export default app;