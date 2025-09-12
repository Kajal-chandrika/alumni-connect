import express from "express";
import { postMessage, getMessages } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, postMessage);
router.get("/", getMessages);

export default router;
