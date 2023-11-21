import { DataType, DataTypes } from "sequelize";
import sequelize from "../config/config";

const Campaign = sequelize.define('Campaign',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      target:{
        type:DataTypes.DECIMAL,
      }
})

export default Campaign;