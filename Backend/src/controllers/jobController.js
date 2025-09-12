import asyncHandler from "express-async-handler";
import { Job } from "../models/jobModel.js";

// @desc Post a new job (Alumni/Student/Admin)
// @route POST /api/jobs
export const createJob = asyncHandler(async (req, res) => {
  const { title, company, description, location, type } = req.body;

  const job = await Job.create({
    posted_by: req.user.user_id,
    title,
    company,
    description,
    location,
    type,
  });

  res.status(201).json(job);
});

// @desc Get all jobs with pagination
// @route GET /api/jobs?page=1&limit=5
export const getJobs = asyncHandler(async (req, res) => {
  const { type, location } = req.query;
  const { limit, offset } = req.pagination;

  const whereClause = {};
  if (type) whereClause.type = type;
  if (location) whereClause.location = location;

  const { count, rows } = await Job.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [["posted_at", "DESC"]],
  });

  res.json({
    total: count,
    page: Math.ceil(offset / limit) + 1,
    limit,
    data: rows,
  });
});
