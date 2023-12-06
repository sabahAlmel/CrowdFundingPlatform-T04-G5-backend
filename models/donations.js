import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConnection.js";
import Donor from "./donor.js";
import Campaign from "./campaignModel.js";

const Donations = sequelize.define("Donations", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  transferredAmount: DataTypes.INTEGER,
  CampaignId: {
    type: DataTypes.INTEGER,
    references: { model: Campaign, key: "id", allowNull: false },
    unique: false,
  },
  DonorId: {
    type: DataTypes.INTEGER,
    references: { model: Donor, key: "id", allowNull: false },
    unique: false,
  },
});
export default Donations;
