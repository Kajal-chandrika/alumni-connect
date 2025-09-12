import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { User } from "./userModel.js";

export const Message = sequelize.define(
  "Message",
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "user_id" },
    },
    content: DataTypes.TEXT,
    posted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "Messages",
    timestamps: false,
  }
);

User.hasMany(Message, { foreignKey: "user_id" });
Message.belongsTo(User, { foreignKey: "user_id" });
