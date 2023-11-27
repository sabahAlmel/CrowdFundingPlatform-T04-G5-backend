// models/CampaignModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";
import Category from "./categoryModel.js";
import Creator from "./Creator.models.js";

const Campaign = sequelize.define(
  "Campaign",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[1,30]
      }
    },
    target: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        len:[30,Infinity]
      }
    },
    amountContributed: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM("active", "pending", "completed"),
      allowNull: false,
      defaultValue:"pending"
    },
    image:{
      type : DataTypes.STRING,
      allowNull:false
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);


export default Campaign;