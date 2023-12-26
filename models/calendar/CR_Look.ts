import {Sequelize} from "sequelize";
import {DataType, ModelType} from "../../types/other";
import {CR_LookModel} from "../../types/models/calendar";

module.exports = (sequelize: Sequelize, DataTypes: DataType) => {
  const CR_Look: ModelType<CR_LookModel> = sequelize.define<CR_LookModel>("CR_Look", {
    date: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
  });

  CR_Look.associate = function ({ VW_Look }) {
    CR_Look.belongsTo(VW_Look);
  }

  return CR_Look;
};
