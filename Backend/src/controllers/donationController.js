import asyncHandler from "express-async-handler";
import { Donation } from "../models/donationModel.js";
import { AlumniProfile } from "../models/alumniModel.js";

// @desc Make a donation
// @route POST /api/donations
export const donate = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const alumni = await AlumniProfile.findOne({
    where: { user_id: req.user.user_id },
  });

  if (!alumni) {
    res.status(400);
    throw new Error("Only alumni can donate");
  }

  const donation = await Donation.create({
    alumni_id: alumni.alumni_id,
    amount,
  });

  res.status(201).json({ message: "Donation successful", donation });
});

// @desc Get all donations (Admin only)
// @route GET /api/donations
export const getDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.findAll({
    include: [{ model: AlumniProfile }],
    order: [["donated_at", "DESC"]],
  });

  res.json(donations);
});
