import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import { apiLimiter } from "./middleware/rateLimiter";
import { setupSwagger } from "./docs/swagger";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiLimiter);

app.use("/api/auth", authRoutes);
setupSwagger(app);

app.get("/", (req, res) => res.json({ status: "ok" }));

export default app;
