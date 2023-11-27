import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";

const Admin = sequelize.define('Admin', {
    token: DataTypes.STRING
})

export default Admin