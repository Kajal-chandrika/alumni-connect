import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { AlumniProfile } from "./alumniModel.js";

export const Donation = sequelize.define(
  "Donation",
  {
    donation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alumni_id: {
      type: DataTypes.INTEGER,
      references: { model: AlumniProfile, key: "alumni_id" },
    },
    amount: DataTypes.DECIMAL(10, 2),
    donated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "Donations",
    timestamps: false,
  }
);

AlumniProfile.hasMany(Donation, { foreignKey: "alumni_id" });
Donation.belongsTo(AlumniProfile, { foreignKey: "alumni_id" });
