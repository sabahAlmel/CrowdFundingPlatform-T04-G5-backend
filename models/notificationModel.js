import sequelize from "../config/dbConnection.js";
import { DataTypes } from "sequelize";

const Notification = sequelize.define('Notification', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  
