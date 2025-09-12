import sequelize from "../config/db.js";
import { User } from "./userModel.js";
import { AlumniProfile } from "./alumniModel.js";
import { Education } from "./educationModel.js";
import { WorkExperience } from "./workModel.js";
import { Event } from "./eventModel.js";
import { EventRegistration } from "./eventRegistrationModel.js";
import { Job } from "./jobModel.js";
import { Donation } from "./donationModel.js";
import { Message } from "./messageModel.js";

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    // Sync schema
    await sequelize.sync({ alter: true });
    console.log("✅ Models synchronized");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

export {
  connectDB,
  User,
  AlumniProfile,
  Education,
  WorkExperience,
  Event,
  EventRegistration,
  Job,
  Donation,
  Message,
};
