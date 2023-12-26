import {Sequelize} from "sequelize";
import {MT_OptionModel} from "../../types/models/medicationTaking";
import {DataType, ModelType} from "../../types/other";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const MT_Option: ModelType<MT_OptionModel> = sequelize.define<MT_OptionModel>("MT_Option", {
    key: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: true },
    one: { type: DataTypes.STRING, allowNull: true },
    few: { type: DataTypes.STRING, allowNull: true },
    many: { type: DataTypes.STRING, allowNull: true },
    nominativeOne: { type: DataTypes.STRING, allowNull: true },
    feminine: { type: DataTypes.STRING, allowNull: true },
    masculine: { type: DataTypes.STRING, allowNull: true },
    neuter: { type: DataTypes.STRING, allowNull: true },
  });

  return MT_Option;
};
