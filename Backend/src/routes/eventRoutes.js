import express from "express";
import {
  createEvent,
  getEvents,
  registerForEvent,
} from "../controllers/eventController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createEvent); // Admin creates event
router.get("/", getEvents); // Public list
router.post("/:id/register", protect, registerForEvent); // Any user can register

export default router;
