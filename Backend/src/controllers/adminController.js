import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import { AlumniProfile } from "../models/alumniModel.js";
import { Event } from "../models/eventModel.js";
import { Job } from "../models/jobModel.js";
import { Donation } from "../models/donationModel.js";

// @desc Dashboard summary
// @route GET /api/admin/dashboard
// @access Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  const alumniCount = await AlumniProfile.count();
  const studentCount = await User.count({ where: { role: "student" } });
  const totalUsers = await User.count();
  const totalJobs = await Job.count();
  const totalEvents = await Event.count();
  const totalDonations = (await Donation.sum("amount")) || 0;

  res.json({
    totalUsers,
    alumniCount,
    studentCount,
    totalJobs,
    totalEvents,
    totalDonations,
  });
});
