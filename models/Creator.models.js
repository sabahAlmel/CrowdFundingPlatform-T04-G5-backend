import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";
const Creator = sequelize.define("Creator", {
  nbCampaign: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default Creator;
