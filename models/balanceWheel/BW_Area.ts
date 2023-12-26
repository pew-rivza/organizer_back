import { Sequelize } from "sequelize";
import {BW_AreaModel} from "../../types/models/balanceWheel";
import {DataType, ModelType} from "../../types/other";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const BW_Area: ModelType<BW_AreaModel> = sequelize.define<BW_AreaModel>("BW_Area", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    icon: { type: DataTypes.STRING, allowNull: false },
  });

  BW_Area.associate = function ({ BW_AreaValue, BW_Todo }) {
    BW_Area.hasMany(BW_AreaValue);
    BW_Area.hasMany(BW_Todo);
  }

  return BW_Area;
};
