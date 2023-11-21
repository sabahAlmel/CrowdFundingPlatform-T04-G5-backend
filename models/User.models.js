import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

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
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.create({
//   firstName: "hi",
//   lastName: "hii2",
//   userName: "2hi",
//   password: "hello",
//   role: "admin",
//   profileId: "profile",
//   image: "image12",
// }).then(() => {
//   console.log("fist element");
// });
// User.sync();

export default User;
