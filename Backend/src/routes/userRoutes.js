import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRegister, validateLogin } from "../utils/validators.js";
import { validationResult } from "express-validator";

const router = express.Router();

// Middleware wrapper for validation
const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((v) => v.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.post("/register", validate(validateRegister), registerUser);
router.post("/login", validate(validateLogin), loginUser);
router.get("/profile", protect, getUserProfile);

export default router;
