module.exports = (sequelize, DataTypes) => {
  const VW_Clothes = sequelize.define("VW_Clothes", {
    image: { type: DataTypes.STRING, allowNull: false },
  });

  VW_Clothes.associate = function ({ VW_Category, VW_Look }) {
    VW_Clothes.belongsTo(VW_Category);
    VW_Clothes.belongsToMany(VW_Look, { through: { model:'VW_Clothes_Look', unique: false } });
  }

  return VW_Clothes;
};
