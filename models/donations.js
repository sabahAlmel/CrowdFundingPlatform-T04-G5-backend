import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";

const Donations = sequelize.define("Donations", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  transferredAmount: DataTypes.INTEGER,
});
export default Donations;
