import { Sequelize } from "sequelize";
import {BW_AreaValueModel} from "../../types/models/balanceWheel";
import {DataType, ModelType} from "../../types/other";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const BW_AreaValue: ModelType<BW_AreaValueModel> = sequelize.define("BW_AreaValue", {
    value: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  });

  BW_AreaValue.associate = function ({ BW_Area, BW_Wheel }) {
    BW_AreaValue.belongsTo(BW_Wheel, { onDelete: 'cascade' });
    BW_AreaValue.belongsTo(BW_Area);
  }

  return BW_AreaValue;
};


