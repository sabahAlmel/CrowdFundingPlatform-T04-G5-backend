import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

const Donor = sequelize.define('Donor', {
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 500,
    },
    numberOfContribution:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    amountPaid:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
})

// Donor.hasMany(Donations)
// Donor.belongsToMany(Campaigns, {through: 'Donations'})

// await Donor.sync({alter: true})

export default Donor