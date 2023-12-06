import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";

const Donor = sequelize.define("Donor", {
  balance: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
  numberOfContribution: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  amountPaid: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false }
});

export default Donor;
