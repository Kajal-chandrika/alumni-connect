import asyncHandler from "express-async-handler";
import { AlumniProfile } from "../models/alumniModel.js";

// @desc Create alumni profile
// @route POST /api/alumni
export const createAlumniProfile = asyncHandler(async (req, res) => {
  const { phone, graduation_year, department, location, linkedin_url } =
    req.body;
  console.log(req.user);
  // prevent duplicates for the same user
  const existing = await AlumniProfile.findOne({
    where: { user_id: req.user.user_id },
  });
  if (existing) {
    return res
      .status(409)
      .json({ message: "Alumni profile already exists for this user" });
  }

  const profile = await AlumniProfile.create({
    user_id: req.user.user_id,
    phone,
    graduation_year,
    department,
    location,
    linkedin_url,
  });

  res.status(201).json(profile);
});

// @desc Get alumni profile by user_id
// @route GET /api/alumni/:id
export const getAlumniProfile = asyncHandler(async (req, res) => {
  const profile = await AlumniProfile.findOne({
    where: { user_id: req.params.id },
  });

  if (profile) {
    res.json(profile);
  } else {
    res.status(404);
    throw new Error("Alumni profile not found");
  }
});

// @desc Update alumni profile
// @route PUT /api/alumni/:id
export const updateAlumniProfile = asyncHandler(async (req, res) => {
  const profile = await AlumniProfile.findByPk(req.params.id);

  if (!profile) {
    res.status(404);
    throw new Error("Profile not found");
  }

  await profile.update(req.body);

  res.json(profile);
});
