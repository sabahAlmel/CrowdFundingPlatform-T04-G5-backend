// models/CampaignModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";

const Campaign = sequelize.define(
  "Campaign",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[1,30]
      }
    },
    target: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        len:[30,Infinity]
      }
    },
    amountContributed: {
      type: DataTypes.DECIMAL(10,2),
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "completed"),
      allowNull: false,
      defaultValue:"active"
    },
    image:{
      type : DataTypes.STRING,
      allowNull:false
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// try {
//   await sequelize.sync({ force: true });
//   console.log('Tables synced successfully');
// } catch (error) {
//   console.error('Error syncing tables:', error);
// }


export default Campaign;