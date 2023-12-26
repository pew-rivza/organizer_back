import {Sequelize} from "sequelize";
import {DataType, ModelType} from "../../types/other";
import {VW_Clothes_LookModel} from "../../types/models/virtualWardrobe";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const VW_Clothes_Look: ModelType<VW_Clothes_LookModel> = sequelize.define<VW_Clothes_LookModel>("VW_Clothes_Look", {
    x: { type: DataTypes.FLOAT, allowNull: false },
    y: { type: DataTypes.FLOAT, allowNull: false },
    idOnCanvas: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    width: { type: DataTypes.FLOAT, allowNull: false },
    height: { type: DataTypes.FLOAT, allowNull: false },
    offsetX: { type: DataTypes.FLOAT, allowNull: false },
    offsetY: { type: DataTypes.FLOAT, allowNull: false },
    zIndex: { type: DataTypes.INTEGER, allowNull: false },
  });

  return VW_Clothes_Look;
};
