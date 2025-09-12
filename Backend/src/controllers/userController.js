import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register a new user
// @route POST /api/users/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json({
    id: user.user_id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user.user_id, user.role),
  });
});

// @desc Login user
// @route POST /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.user_id, user.role),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user) {
    res.json({
      id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
