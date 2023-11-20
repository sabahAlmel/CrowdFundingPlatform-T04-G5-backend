import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const Donations = sequelize.define('Donations', {
    transferredAmount: DataTypes.INTEGER
})

await Donations.sync()

export default Donations
