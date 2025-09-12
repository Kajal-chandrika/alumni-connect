import express from "express";
import { donate, getDonations } from "../controllers/donationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, donate);
router.get("/", protect, getDonations);

export default router;
