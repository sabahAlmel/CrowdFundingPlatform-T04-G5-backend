import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";

const Admin = sequelize.define("Admin", {});

export default Admin;
