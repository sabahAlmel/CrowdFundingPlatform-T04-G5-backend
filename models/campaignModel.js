// models/CampaignModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";

const Campaign = sequelize.define(
  "Campaign",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
      },
    },
    target: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [30, Infinity],
      },
    },
    amountContributed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("active", "pending", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
Campaign.beforeSave(async (campaign, options) => {
  // Check if the amount has reached the target
  if (campaign.amountContributed >= campaign.target) {
    // Update the status to completed
    campaign.status = "completed";
  }
});

export default Campaign;
