import {Sequelize} from "sequelize";
import {DataType, ModelType} from "../../types/other";
import {BW_WheelModel} from "../../types/models/balanceWheel";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const BW_Wheel: ModelType<BW_WheelModel> = sequelize.define<BW_WheelModel>("BW_Wheel", {
    date: { type: DataTypes.STRING, allowNull: false },
  });

  BW_Wheel.associate = function ({ BW_AreaValue, BW_Todo }) {
    BW_Wheel.hasMany(BW_AreaValue);
    BW_Wheel.hasMany(BW_Todo);
  }

  return BW_Wheel;
};
