import express from "express";
import {
  createAlumniProfile,
  getAlumniProfile,
  updateAlumniProfile,
} from "../controllers/alumniController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Alumni routes
router.post("/", protect, createAlumniProfile);
router.get("/:id", protect, getAlumniProfile);
router.put("/:id", protect, updateAlumniProfile);

export default router;
