import {Sequelize} from "sequelize";
import {DataType, ModelType} from "../../types/other";
import {VW_LookModel} from "../../types/models/virtualWardrobe";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const VW_Look: ModelType<VW_LookModel> = sequelize.define<VW_LookModel>("VW_Look", {
    canvasSize: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  });

  VW_Look.associate = function ({ VW_Look, VW_Clothes, CR_Look }) {
    VW_Look.belongsToMany(VW_Clothes, { through: { model: 'VW_Clothes_Look', unique: false} });
    VW_Look.hasMany(CR_Look);
  }

  return VW_Look;
};
