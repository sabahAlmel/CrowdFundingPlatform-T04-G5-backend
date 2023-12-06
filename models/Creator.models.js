import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";
const Creator = sequelize.define("Creator", {
  nbCampaign: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
//  await Creator.create({ nbCampaign: 2});

export default Creator;
