import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
