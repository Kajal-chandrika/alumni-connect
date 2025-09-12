import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { User } from "./userModel.js";

export const Job = sequelize.define(
  "Job",
  {
    job_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    posted_by: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "user_id" },
    },
    title: DataTypes.STRING(150),
    company: DataTypes.STRING(150),
    description: DataTypes.TEXT,
    location: DataTypes.STRING(100),
    type: DataTypes.ENUM("job", "internship"),
    posted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "Jobs",
    timestamps: false,
  }
);

User.hasMany(Job, { foreignKey: "posted_by" });
Job.belongsTo(User, { foreignKey: "posted_by" });
