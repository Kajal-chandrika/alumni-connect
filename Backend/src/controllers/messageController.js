import asyncHandler from "express-async-handler";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";

// @desc Post a message
// @route POST /api/messages
export const postMessage = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const message = await Message.create({
    user_id: req.user.user_id,
    content,
  });

  res.status(201).json(message);
});

// @desc Get all messages
// @route GET /api/messages
export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.findAll({
    include: [{ model: User, attributes: ["name", "role"] }],
    order: [["posted_at", "DESC"]],
  });

  res.json(messages);
});
