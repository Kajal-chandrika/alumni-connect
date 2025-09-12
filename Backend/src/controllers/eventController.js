import asyncHandler from "express-async-handler";
import { Event } from "../models/eventModel.js";
import { EventRegistration } from "../models/eventRegistrationModel.js";

// @desc Create a new event (Admin only)
// @route POST /api/events
export const createEvent = asyncHandler(async (req, res) => {
  const { title, description, event_date, location } = req.body;

  const event = await Event.create({
    title,
    description,
    event_date,
    location,
    created_by: req.user.user_id,
  });

  res.status(201).json(event);
});

// @desc Get all events (public)
// @route GET /api/events
export const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.findAll({ order: [["event_date", "ASC"]] });
  res.json(events);
});

// @desc Register user for an event
// @route POST /api/events/:id/register
export const registerForEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const registration = await EventRegistration.create({
    event_id: id,
    user_id: req.user.user_id,
  });

  res.status(201).json({ message: "Registered successfully", registration });
});
