import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { AlumniProfile } from "./alumniModel.js";

export const Education = sequelize.define(
  "Education",
  {
    edu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alumni_id: {
      type: DataTypes.INTEGER,
      references: { model: AlumniProfile, key: "alumni_id" },
    },
    degree: DataTypes.STRING(100),
    institution: DataTypes.STRING(150),
    start_year: DataTypes.INTEGER,
    end_year: DataTypes.INTEGER,
  },
  {
    tableName: "Education",
    timestamps: false,
  }
);

AlumniProfile.hasMany(Education, { foreignKey: "alumni_id" });
Education.belongsTo(AlumniProfile, { foreignKey: "alumni_id" });
