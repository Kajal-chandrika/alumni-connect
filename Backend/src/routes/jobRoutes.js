import express from "express";
import { createJob, getJobs } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { paginate } from "../middleware/paginationMiddleware.js";
import { Job } from "../models/jobModel.js";

const router = express.Router();

router.post("/", protect, createJob); // Alumni can post
router.get("/", paginate(Job), getJobs);

export default router;
