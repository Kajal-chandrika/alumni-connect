import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { User } from "./userModel.js";

export const AlumniProfile = sequelize.define(
  "AlumniProfile",
  {
    alumni_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
    },
    phone: DataTypes.STRING(15),
    graduation_year: DataTypes.INTEGER,
    department: DataTypes.STRING(100),
    location: DataTypes.STRING(100),
    linkedin_url: DataTypes.STRING(255),
  },
  {
    tableName: "AlumniProfiles",
    timestamps: false,
  }
);

User.hasOne(AlumniProfile, { foreignKey: "user_id" });
AlumniProfile.belongsTo(User, { foreignKey: "user_id" });
