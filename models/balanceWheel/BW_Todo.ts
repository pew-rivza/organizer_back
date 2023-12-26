import {Sequelize} from "sequelize";
import {DataType, ModelType} from "../../types/other";
import {BW_TodoModel} from "../../types/models/balanceWheel";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const BW_Todo: ModelType<BW_TodoModel> = sequelize.define<BW_TodoModel>("BW_Todo", {
    name: { type: DataTypes.STRING , allowNull: false },
    checked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  });

  BW_Todo.associate = function ({ BW_Area, BW_Wheel }) {
    BW_Todo.belongsTo(BW_Wheel, { onDelete: 'cascade' });
    BW_Todo.belongsTo(BW_Area);
  }

  return BW_Todo;
};
