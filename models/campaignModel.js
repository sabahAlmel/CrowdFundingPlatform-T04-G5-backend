// models/CampaignModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";
import Category from "./categoryModel.js";
import Creator from "./Creator.models.js";

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
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "completed"),
      allowNull: false,
      defaultValue:"active"
    },
    image:{
      type : DataTypes.STRING,
      allowNull:false
    },
    categoryId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: Category,
        key: 'id',
      },
    },
    creatorId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model: Creator,
        key:'id',
      }
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

try {
  await Campaign.sync({ force: true });
  console.log('Tables synced successfully');
} catch (error) {
  console.error('Error syncing tables:', error);
}



export default Campaign;