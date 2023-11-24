import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";
import bcrypt from "bcrypt";
const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 255],
        msg: "Password must be at least 6 characters long",
      },
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "donor",
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
