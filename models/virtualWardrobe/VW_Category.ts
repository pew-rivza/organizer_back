import {Sequelize} from "sequelize";
import {DataType, ModelType} from "../../types/other";
import {VW_CategoryModel} from "../../types/models/virtualWardrobe";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const VW_Category: ModelType<VW_CategoryModel> = sequelize.define<VW_CategoryModel>("VW_Category", {
    name: { type: DataTypes.STRING, allowNull: false },
  });

  VW_Category.associate = function ({ VW_Clothes }) {
    VW_Category.hasMany(VW_Clothes);
  }

  return VW_Category;
};
