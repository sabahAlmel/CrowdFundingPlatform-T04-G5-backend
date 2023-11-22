import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";

const Donations = sequelize.define('Donations', {
  transferredAmount: DataTypes.INTEGER,
  // DonorId: {
  //   type: DataTypes.INTEGER,
  //   references:{
  //     model: 'Donors',
  //     key: 'id'
  //   }
  // }
})


export default Donations
