import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { User } from "./userModel.js";

export const Event = sequelize.define(
  "Event",
  {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING(150),
    description: DataTypes.TEXT,
    event_date: DataTypes.DATE,
    location: DataTypes.STRING(100),
    created_by: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "user_id" },
    },
  },
  {
    tableName: "Events",
    timestamps: false,
  }
);

User.hasMany(Event, { foreignKey: "created_by" });
Event.belongsTo(User, { foreignKey: "created_by" });
