import {Sequelize} from "sequelize";
import {DataType, ModelType} from "../../types/other";
import {VW_ClothesModel} from "../../types/models/virtualWardrobe";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const VW_Clothes: ModelType<VW_ClothesModel> = sequelize.define<VW_ClothesModel>("VW_Clothes", {
    image: { type: DataTypes.STRING, allowNull: false },
  });

  VW_Clothes.associate = function ({ VW_Category, VW_Look }) {
    VW_Clothes.belongsTo(VW_Category);
    VW_Clothes.belongsToMany(VW_Look, { through: { model:'VW_Clothes_Look', unique: false } });
  }

  return VW_Clothes;
};
