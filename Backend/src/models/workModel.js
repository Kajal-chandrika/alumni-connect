import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { AlumniProfile } from "./alumniModel.js";

export const WorkExperience = sequelize.define(
  "WorkExperience",
  {
    work_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alumni_id: {
      type: DataTypes.INTEGER,
      references: { model: AlumniProfile, key: "alumni_id" },
    },
    company: DataTypes.STRING(150),
    role: DataTypes.STRING(100),
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
  },
  {
    tableName: "WorkExperience",
    timestamps: false,
  }
);

AlumniProfile.hasMany(WorkExperience, { foreignKey: "alumni_id" });
WorkExperience.belongsTo(AlumniProfile, { foreignKey: "alumni_id" });
