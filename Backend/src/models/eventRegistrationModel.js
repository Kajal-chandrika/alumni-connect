import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { Event } from "./eventModel.js";
import { User } from "./userModel.js";

export const EventRegistration = sequelize.define(
  "EventRegistration",
  {
    registration_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: { model: Event, key: "event_id" },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "user_id" },
    },
    registered_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "EventRegistrations",
    timestamps: false,
  }
);

Event.hasMany(EventRegistration, { foreignKey: "event_id" });
User.hasMany(EventRegistration, { foreignKey: "user_id" });
